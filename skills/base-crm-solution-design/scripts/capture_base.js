// Chụp giao diện thật của Prospect, Lead, Sales từ base.vn (giao diện dựng bằng HTML, phải chụp bằng trình duyệt).
// Dùng: node capture_base.js <thư-mục-ra>
// Cần: Playwright + Chromium (có sẵn trong môi trường cloud), mạng cho phép base.vn.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2] || 'base-captures';
fs.mkdirSync(OUT, { recursive: true });
const wait = (p, ms) => p.waitForTimeout(ms);

async function open(b, url, vp = { width: 1440, height: 1000 }) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: 2 });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  const ok = p.getByText('Tôi đồng ý', { exact: true });
  if (await ok.count()) await ok.first().click().catch(() => {});
  // Ẩn thanh điều hướng và nút Zalo / điện thoại nổi để không dính vào ảnh
  await p.addStyleTag({ content: 'header,[class*=zalo],[class*=Zalo],a[href^="tel"]{visibility:hidden!important}' });
  return p;
}
// Giao diện chỉ hiện khi cuộn tới: cuộn từ từ hết trang
async function scrollAll(p) {
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) { await p.evaluate((y) => window.scrollTo(0, y), y); await wait(p, 200); }
}
// Chụp theo khung bao của mọi phần tử con (một số khối có con tràn khỏi khung)
async function shoot(p, loc, file, pad = 12) {
  await loc.scrollIntoViewIfNeeded().catch(() => {});
  await wait(p, 3500);
  const bb = await loc.boundingBox();
  if (!bb) return console.log('bỏ qua', file);
  await p.screenshot({ path: path.join(OUT, file), clip: { x: Math.max(0, bb.x - pad), y: Math.max(0, bb.y - pad), width: bb.width + pad * 2, height: bb.height + pad * 2 } });
  console.log('đã chụp', file);
}

(async () => {
  const b = await chromium.launch();

  // 1. Trang CRM: 3 cửa sổ lớn đầu trang (Prospect / Lead / Sales), chụp riêng từng cái
  let p = await open(b, 'https://base.vn/platform/crm', { width: 2400, height: 1400 });
  await wait(p, 7000);
  for (const [n, file] of [['left', 'prospect-hopthu.png'], ['center', 'lead-hoso.png'], ['right', 'sales-cohoi.png']]) {
    const box = await p.evaluate((n) => {
      document.querySelectorAll('.pm-win').forEach((w) => (w.style.visibility = w.classList.contains('pm-win--' + n) ? 'visible' : 'hidden'));
      const w = document.querySelector('.pm-win--' + n);
      if (!w) return null;
      w.style.transform = 'none'; w.style.filter = 'none'; w.style.opacity = '1'; w.style.zIndex = '99';
      w.querySelectorAll('*').forEach((c) => (c.style.visibility = 'visible'));
      const r = w.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, n);
    if (!box) { console.log('không thấy cửa sổ', n); continue; }
    await wait(p, 800);
    await p.screenshot({ path: path.join(OUT, file), clip: { x: box.x - 2, y: box.y - 2, width: box.w + 4, height: box.h + 4 } });
    console.log('đã chụp', file);
  }
  await p.close();

  // 2. Trang CRM: màn hình từng app trong phần "Mỗi ứng dụng một thế mạnh" + AI xếp ưu tiên
  p = await open(b, 'https://base.vn/platform/crm');
  await scrollAll(p);
  const cards = p.locator('.ps-pf-card');
  const n = await cards.count();
  for (let i = 0; i < n; i++) {
    const c = cards.nth(i);
    const app = ((await c.locator('.ps-pf-app').innerText().catch(() => '')) || 'app' + i).split('\n')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'app' + i;
    await shoot(p, c.locator('.ps-pf-moment'), `app-${String(i + 1).padStart(2, '0')}-${app}.png`);
  }
  if (await p.locator('.pm-dk-stage').count()) await shoot(p, p.locator('.pm-dk-stage').first(), 'lead-ai-uu-tien.png');
  await p.close();

  // 3. Trang Sales: bảng quy trình bán + hồ sơ khách có Copilot
  p = await open(b, 'https://base.vn/app/sales');
  await wait(p, 5000);
  if (await p.locator('.sales-heroboard').count()) await p.locator('.sales-heroboard').first().screenshot({ path: path.join(OUT, 'sales-bang.png') });
  await scrollAll(p);
  if (await p.locator('.cread-surface').count()) {
    const s = p.locator('.cread-surface').first();
    await s.scrollIntoViewIfNeeded(); await wait(p, 9000);
    await s.screenshot({ path: path.join(OUT, 'sales-hoso.png') });
  }
  console.log('đã chụp sales-bang.png, sales-hoso.png');

  await b.close();
  console.log('\nXong. Mở xem từng ảnh: cắt viền nền tối, loại ảnh dính nút nổi, đổi sang .webp ≤1800px.');
})();
