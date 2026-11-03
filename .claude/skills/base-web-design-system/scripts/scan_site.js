// Quét lại base.vn để cập nhật hệ thiết kế và danh mục sản phẩm.
// Dùng:  node scan_site.js <thư-mục-ra> [--catalog] [--pages] [--tokens] [--icons] [--only=/app/lead,/app/sales]
//        (không ghi cờ nào = chạy tất cả)
// Ra:
//   catalog.json     69+ app: nhóm, nhãn, tên, mô tả, trạng thái, trang (bấm từng tab nhóm trên /app)
//   pages/<slug>/    mỗi trang sản phẩm: text.txt, info.json (section, tiêu đề, hiệu ứng đang chạy, kết quả bấm nút),
//                    vp-XX.jpg (ảnh từng khung nhìn), click-XX.jpg (trạng thái sau khi bấm từng nút / tab)
//   tokens.json      biến CSS :root (màu, bóng, chuyển động), font, màu dùng nhiều nhất, @keyframes
//   icons/           icon SVG từng app (static-ai.stdfiles.com/fav/<app>)
// Bỏ qua theo mặc định: /industry/* (giải pháp theo ngành), customers.base.vn, blog, tuyển dụng.
// Cần: Playwright + Chromium, mạng cho phép base.vn và static-ai.stdfiles.com.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const OUT = args.find((a) => !a.startsWith('--')) || 'base-scan';
const has = (f) => args.includes(f);
const ALL = !['--catalog', '--pages', '--tokens', '--icons'].some(has);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const BASE = 'https://base.vn';
const CORE_PAGES = ['/', '/app', '/platform/work', '/platform/hrm', '/platform/crm', '/kien-truc-nen-tang', '/bang-gia'];
const SKIP_BTN = /đăng ký|đăng nhập|demo|liên hệ|tải trên|zalo|gọi:|cookie|từ chối|đồng ý|cài đặt|bắt đầu ngay/i;
fs.mkdirSync(OUT, { recursive: true });

async function open(b, url, vp = { width: 1440, height: 900 }) {
  const p = await b.newPage({ viewport: vp });
  const resp = await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  const ok = p.getByText('Tôi đồng ý', { exact: true }); if (await ok.count()) await ok.first().click().catch(() => {});
  await p.addStyleTag({ content: '[class*=zalo],[class*=Zalo],a[href^="tel"]{visibility:hidden!important}' });
  return { p, status: resp && resp.status() };
}
async function scrollAll(p, step = 600, wait = 120) {
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += step) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(wait); }
}

// ---------- Danh mục app ----------
async function catalog(b) {
  const { p } = await open(b, BASE + '/app');
  await scrollAll(p);
  const tabs = await p.locator('main button').all();
  const apps = new Map();
  for (const t of tabs) {
    const label = ((await t.innerText().catch(() => '')) || '').replace(/\s+/g, ' ').trim();
    if (!/\d+$/.test(label) || /^Tất cả/.test(label)) continue;
    await t.click().catch(() => {}); await p.waitForTimeout(800); await scrollAll(p, 800, 60);
    const group = label.replace(/\s*\d+$/, '');
    const cards = await p.evaluate(() => [...document.querySelectorAll('*')].filter((e) => e.children.length === 0 && /^(Chi tiết →|Coming soon)$/.test((e.textContent || '').trim())).map((m) => {
      let c = m; for (let i = 0; i < 6; i++) { c = c.parentElement; if ((c.innerText || '').split('\n').filter(Boolean).length >= 3) break; }
      const a = c.closest('a') || c.querySelector('a');
      return { lines: (c.innerText || '').split('\n').map((s) => s.trim()).filter(Boolean), href: a ? a.href : '' };
    }));
    for (const k of cards) {
      const L = k.lines.filter((s) => !/^(Phổ biến|Mới|Doanh nghiệp|Core|Core AI|Enterprise|AI Powered)$/.test(s));
      const [tag, name, desc] = L; const status = /Coming soon/.test(L[L.length - 1]) ? 'coming-soon' : 'live';
      apps.set(group + '|' + name, { group, tag, name, desc, status, page: k.href.replace(BASE, '') });
    }
  }
  await p.close();
  const list = [...apps.values()];
  fs.writeFileSync(path.join(OUT, 'catalog.json'), JSON.stringify({ scanned: new Date().toISOString(), count: list.length, apps: list }, null, 1));
  console.log(`✓ catalog: ${list.length} app, ${list.filter((a) => a.status === 'live').length} có trang`);
  return list;
}

// ---------- Từng trang: cuộn, chụp, bấm mọi nút ----------
async function crawlPage(b, u) {
  const slug = u === '/' ? 'home' : u.slice(1).replace(/\//g, '_');
  const dir = path.join(OUT, 'pages', slug); fs.mkdirSync(dir, { recursive: true });
  const t0 = Date.now();
  const { p, status } = await open(b, BASE + u);
  const H = await p.evaluate(() => document.body.scrollHeight);
  let i = 0;
  for (let y = 0; y < H; y += 900) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(1300); await p.screenshot({ path: path.join(dir, `vp-${String(i++).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 70 }); }
  const info = await p.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const secs = [...new Set([...main.querySelectorAll(':scope > *, section')])].filter((s) => s.getBoundingClientRect().height > 200).map((s) => ({
      cls: (s.className || '').toString().slice(0, 90), h: Math.round(s.getBoundingClientRect().height),
      heads: [...s.querySelectorAll('h1,h2,h3')].map((h) => h.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 8) }));
    const anims = {};
    document.querySelectorAll('*').forEach((e) => { const cs = getComputedStyle(e); if (cs.animationName && cs.animationName !== 'none') { const k = cs.animationName + ' ' + cs.animationDuration; (anims[k] = anims[k] || new Set()).add((e.className || '').toString().split(' ')[0].slice(0, 40)); } });
    return { title: document.title, desc: document.querySelector('meta[name=description]')?.content || '', sections: secs, anims: Object.fromEntries(Object.entries(anims).map(([k, v]) => [k, [...v].slice(0, 6)])) };
  });
  fs.writeFileSync(path.join(dir, 'text.txt'), await p.evaluate(() => document.body.innerText));
  const cands = await p.evaluate(() => [...new Set([...document.querySelectorAll('main button, main [role=tab], main [role=button], main summary, main [aria-expanded]')])]
    .map((e, k) => { e.setAttribute('data-scan', k); const r = e.getBoundingClientRect(); return { k, t: (e.innerText || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 60), ok: r.width > 0 && r.height > 0 && r.height < 200 }; }).filter((c) => c.ok));
  const clicks = []; let n = 0;
  for (const c of cands) {
    if (SKIP_BTN.test(c.t) || n >= 60) continue;
    const loc = p.locator(`[data-scan="${c.k}"]`);
    try {
      await loc.scrollIntoViewIfNeeded({ timeout: 2000 });
      const url0 = p.url().split('#')[0];
      await loc.click({ timeout: 2500 }); await p.waitForTimeout(900);
      if (p.url().split('#')[0] !== url0) { clicks.push({ t: c.t, nav: p.url() }); await p.goBack({ waitUntil: 'networkidle' }).catch(() => {}); continue; }
      const f = `click-${String(n++).padStart(2, '0')}.jpg`;
      await p.screenshot({ path: path.join(dir, f), type: 'jpeg', quality: 65 });
      clicks.push({ t: c.t, shot: f });
    } catch (e) { clicks.push({ t: c.t, err: e.message.split('\n')[0].slice(0, 60) }); }
  }
  fs.writeFileSync(path.join(dir, 'info.json'), JSON.stringify({ url: u, status, ...info, clicks }, null, 1));
  await p.close();
  console.log(`✓ ${u}: ${i} khung nhìn, bấm ${n}/${cands.length} nút, ${Math.round((Date.now() - t0) / 1000)}s`);
}

// ---------- Token thiết kế ----------
// Tải bằng curl: đi qua proxy / CA của môi trường như trình duyệt
async function get(url) { return execFileSync('curl', ['-sSL', '--max-time', '60', url], { maxBuffer: 64 * 1024 * 1024 }).toString(); }
async function tokens() {
  const html = await get(BASE + '/');
  const cssPath = (html.match(/\/assets\/index-[\w-]+\.css/) || [])[0];
  if (!cssPath) return console.log('✗ tokens: không tìm thấy file CSS');
  const css = await get(BASE + cssPath);
  fs.writeFileSync(path.join(OUT, 'site.css'), css);
  const roots = [...css.matchAll(/:root\s*\{([^}]*)\}/g)].map((m) => m[1]).filter((b) => (b.match(/--/g) || []).length > 5)
    .map((b) => Object.fromEntries(b.split(';').map((d) => d.split(':')).filter((x) => x.length >= 2).map(([k, ...v]) => [k.trim(), v.join(':').trim()])));
  const count = (re) => { const m = {}; for (const x of css.matchAll(re)) m[x[1].toLowerCase()] = (m[x[1].toLowerCase()] || 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  const out = { cssPath, scanned: new Date().toISOString(), rootVars: roots, fonts: count(/font-family:\s*([^;}]+)/g).slice(0, 10), colors: count(/(#[0-9a-fA-F]{6})\b/g).slice(0, 60),
    radius: count(/border-radius:\s*([^;}]+)/g).slice(0, 12), easing: count(/(cubic-bezier\([^)]+\))/g).slice(0, 8), keyframes: [...new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]))] };
  fs.writeFileSync(path.join(OUT, 'tokens.json'), JSON.stringify(out, null, 1));
  console.log(`✓ tokens: ${roots.length} khối :root, ${out.keyframes.length} @keyframes, màu chính ${out.colors[0] && out.colors[0][0]}`);
}

// ---------- Icon app ----------
async function icons(b) {
  const dir = path.join(OUT, 'icons'); fs.mkdirSync(dir, { recursive: true });
  const set = new Map();
  for (const u of ['/app', '/', '/platform/crm', '/platform/work', '/platform/hrm']) {
    const { p } = await open(b, BASE + u); await scrollAll(p);
    if (u === '/app') for (const t of await p.locator('main button').all()) { await t.click({ timeout: 1500 }).catch(() => {}); await p.waitForTimeout(250); (await p.evaluate(() => [...document.images].map((i) => i.src))).forEach((s) => s.includes('/fav/') && set.set(s.split('/fav/')[1].split('?')[0], s)); }
    (await p.evaluate(() => [...document.images].map((i) => i.src))).forEach((s) => { if (s.includes('/fav/')) { const k = s.split('/fav/')[1].split('?')[0]; if (!set.has(k)) set.set(k, s); } });
    await p.close();
  }
  for (const [k, u] of set) { const svg = await get(u).catch(() => ''); if (svg.startsWith('<svg') && !/<script/i.test(svg)) fs.writeFileSync(path.join(dir, k + '.svg'), svg); }
  fs.writeFileSync(path.join(dir, '_sources.json'), JSON.stringify(Object.fromEntries(set), null, 1));
  console.log(`✓ icons: ${set.size} app`);
}

(async () => {
  const b = await chromium.launch();
  let list = [];
  if (ALL || has('--catalog') || has('--pages')) list = await catalog(b);
  if (ALL || has('--tokens')) await tokens();
  if (ALL || has('--icons')) await icons(b);
  if (ALL || has('--pages')) {
    const pages = only.length ? only : [...new Set([...CORE_PAGES, ...list.filter((a) => a.status === 'live' && a.page.startsWith('/app/')).map((a) => a.page)])];
    const q = [...pages];
    await Promise.all(Array.from({ length: 4 }, async () => { while (q.length) { const u = q.shift(); await crawlPage(b, u).catch((e) => console.log('✗', u, e.message.split('\n')[0])); } }));
  }
  await b.close();
  console.log(`\nXong → ${path.resolve(OUT)}. So với references/*.md của skill; cập nhật nếu có app mới, màu mới hoặc trang đổi bố cục.`);
})();
