// Chụp giao diện sản phẩm thật từ các trang base.vn — tự dò khung giao diện, không phụ thuộc tên khối cố định.
// Dùng:  node capture_app.js <thư-mục-ra> <đường-dẫn...>
//   vd:  node capture_app.js out /app/lead /app/sales /platform/crm
// Mỗi trang ra một thư mục con: ảnh từng khung (2×) + index.json (vị trí, tiêu đề section gần nhất, chữ đầu khung).
// Cách dò: khối có nền + viền/bóng + bo góc, rộng ≥ 300px, cao ≥ 180px, ≥ 40 phần tử con; chỉ giữ khung ngoài cùng,
// bỏ khối hỏi đáp. Tên class trên base.vn đổi theo từng trang nên không dò theo tên.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [, , OUT = 'captures', ...PATHS] = process.argv;
if (!PATHS.length) { console.log('Cần ít nhất một đường dẫn, vd: /app/lead'); process.exit(1); }

async function run(b, u) {
  const slug = u === '/' ? 'home' : u.replace(/^\//, '').replace(/\//g, '_');
  const dir = path.join(OUT, slug); fs.mkdirSync(dir, { recursive: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await p.goto('https://base.vn' + u, { waitUntil: 'networkidle', timeout: 90000 });
  const ok = p.getByText('Tôi đồng ý', { exact: true }); if (await ok.count()) await ok.first().click().catch(() => {});
  await p.addStyleTag({ content: 'header,[class*=zalo],[class*=Zalo],a[href^="tel"],[class*=cookie]{visibility:hidden!important}' });
  // Giao diện chỉ dựng khi cuộn tới
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(180); }

  const found = await p.evaluate(() => {
    // Khung giao diện = khối có nền + (viền hoặc bóng) + bo góc ≥ 8px, đủ lớn và đủ nhiều phần tử con.
    // Chỉ giữ khung ngoài cùng; bỏ khối hỏi đáp (FAQ) và khối toàn chữ.
    const root = document.querySelector('main') || document.body;
    const cand = [];
    root.querySelectorAll('*').forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.width < 300 || r.height < 180 || r.width > 1300) return;
      if (e.querySelectorAll('*').length < 40) return;
      const cs = getComputedStyle(e);
      const framed = (cs.boxShadow !== 'none' || cs.borderTopWidth !== '0px') && parseFloat(cs.borderRadius) >= 8 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
      if (!framed) return;
      const txt = e.innerText || '';
      if ((txt.match(/\?/g) || []).length >= 3 || e.querySelectorAll('details,summary,[aria-expanded]').length >= 3) return;
      cand.push(e);
    });
    const list = cand.filter((e) => !cand.some((o) => o !== e && o.contains(e)));
    return list.map((e, i) => {
      e.setAttribute('data-cap', i);
      const r = e.getBoundingClientRect();
      let sec = e.parentElement, head = '';
      while (sec && !head) { const h = [...sec.querySelectorAll('h1,h2')].find((h) => !e.contains(h)); if (h) head = h.innerText.replace(/\s+/g, ' ').trim(); sec = sec.parentElement; }
      return { i, cls: (e.className || '').toString().slice(0, 80), w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), section: head.slice(0, 120), text: (e.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 160) };
    }).sort((a, b) => a.y - b.y);
  });

  const out = [];
  for (const f of found) {
    const loc = p.locator(`[data-cap="${f.i}"]`);
    try {
      await loc.scrollIntoViewIfNeeded({ timeout: 3000 }); await p.waitForTimeout(2800);
      const file = `${String(out.length + 1).padStart(2, '0')}.png`;
      await loc.screenshot({ path: path.join(dir, file), timeout: 8000 });
      out.push({ file, ...f });
    } catch (e) { /* khung ẩn hoặc đang chuyển động — bỏ qua */ }
  }
  fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify({ url: 'https://base.vn' + u, captured: new Date().toISOString(), frames: out }, null, 1));
  console.log(`✓ ${u}: ${out.length} khung → ${dir}`);
  await p.close();
}

(async () => {
  const b = await chromium.launch();
  const q = [...PATHS];
  await Promise.all(Array.from({ length: Math.min(3, q.length) }, async () => { while (q.length) { const u = q.shift(); await run(b, u).catch((e) => console.log('✗', u, e.message.split('\n')[0])); } }));
  await b.close();
  console.log('\nMở xem từng ảnh trước khi dùng: loại khung trang trí, khung bị cắt; đổi sang .webp ≤1800px.');
})();
