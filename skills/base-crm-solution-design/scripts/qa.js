// Kiểm tra trang solution design trước khi giao.
// Dùng: node qa.js /đường/dẫn/index.html <thư-mục-ảnh>
// In ra lỗi nếu có; chụp màn hình desktop + mobile để tự mở xem.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(process.argv[2] || 'index.html');
const OUT = process.argv[3] || 'qa-shots';
const URL = 'file://' + FILE;
fs.mkdirSync(OUT, { recursive: true });
const problems = [];
const fail = (m) => { problems.push(m); console.log('✗', m); };
const pass = (m) => console.log('✓', m);

(async () => {
  const b = await chromium.launch();
  const errs = [];

  // ---------- Desktop ----------
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  const where = () => p.evaluate(() => ({ where: document.getElementById('where')?.innerText || '', hash: location.hash }));

  await p.goto(URL); await p.waitForTimeout(1500);
  await p.screenshot({ path: path.join(OUT, '1-tong-quan.png') });

  await p.click('#tabs a[href="#giai-phap"]'); await p.waitForTimeout(1300);
  let w = await where();
  w.where.includes('2/') ? pass('Tab Lưu đồ → "Phần 2"') : fail('Tab Lưu đồ không cập nhật vị trí: ' + w.where);
  const hub = p.locator('#hub');
  if (await hub.count()) { await hub.scrollIntoViewIfNeeded(); await p.waitForTimeout(4000); await hub.screenshot({ path: path.join(OUT, '2-mot-cua.png') }); }
  const flow = p.locator('#flow');
  if (await flow.count()) {
    await flow.scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await flow.screenshot({ path: path.join(OUT, '2-luu-do-voi-base.png') });
    const before = p.locator('.mode [data-mode=before]');
    if (await before.count()) { await before.click(); await p.waitForTimeout(400); await flow.screenshot({ path: path.join(OUT, '2-luu-do-hom-nay.png') }); await p.click('.mode [data-mode=after]'); }
  }

  const mod = p.locator('.mod[href="#buoc-3"]');
  if (await mod.count()) {
    await mod.click(); await p.waitForTimeout(1400); w = await where();
    w.hash === '#buoc-3' ? pass('Bấm ô lưu đồ → mở đúng bước 3') : fail('Bấm ô lưu đồ không mở bước 3: ' + w.hash);
  }

  // Chống nhảy: đổi bước và đổi tab ảnh không được làm đổi chiều cao trang / vị trí cuộn
  const st = () => p.evaluate(() => ({ H: document.body.scrollHeight, y: Math.round(scrollY) }));
  const rail = await p.locator('#rail button').count();
  const base = await st();
  let jumped = false;
  for (let s = 1; s <= rail; s++) {
    await p.click(`#rail button[data-step="${s}"]`); await p.waitForTimeout(800);
    const now = await st();
    if (now.H !== base.H || Math.abs(now.y - base.y) > 2) { jumped = true; fail(`Đổi sang bước ${s} làm trang nhảy (cao ${base.H}→${now.H}, cuộn ${base.y}→${now.y})`); }
    await p.screenshot({ path: path.join(OUT, `3-buoc-${s}.png`) });
    const tabs = p.locator(`#buoc-${s} .shot-tabs button`);
    for (let k = 1; k < await tabs.count(); k++) {
      const y0 = (await st()).y; await tabs.nth(k).click(); await p.waitForTimeout(400);
      const n2 = await st();
      if (n2.H !== base.H) { jumped = true; fail(`Tab ảnh ${k + 1} ở bước ${s} làm đổi chiều cao trang`); }
      if (Math.abs(n2.y - y0) > 2) { jumped = true; fail(`Tab ảnh ${k + 1} ở bước ${s} làm trang cuộn`); }
    }
  }
  if (!jumped) pass('Đổi bước / tab ảnh không làm trang nhảy');

  // Ảnh của bước đang ẩn không được lộ ra
  const leak = await p.evaluate(() => [...document.querySelectorAll('.panel[hidden] .shot')].filter((f) => getComputedStyle(f).visibility === 'visible').length);
  leak ? fail(`${leak} ảnh của bước đang ẩn vẫn hiện`) : pass('Bước đang ẩn không lộ ảnh');

  // Phím tắt
  await p.keyboard.press('4'); await p.waitForTimeout(1300); w = await where();
  w.where.includes('4/') ? pass('Phím 4 → phần 4') : fail('Phím 4 không chuyển phần: ' + w.where);
  await p.screenshot({ path: path.join(OUT, '4-quan-ly.png') });

  // Link sâu
  const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p2.goto(URL + '#buoc-2'); await p2.waitForTimeout(1500);
  const sel = await p2.evaluate(() => document.querySelector('#rail button[aria-selected="true"]')?.dataset.step);
  sel === '2' ? pass('Link #buoc-2 mở đúng bước 2') : fail('Link #buoc-2 mở sai bước: ' + sel);

  // ---------- Mobile ----------
  const m = await b.newPage({ viewport: { width: 375, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  m.on('pageerror', (e) => errs.push('mobile: ' + e.message));
  await m.goto(URL); await m.waitForTimeout(1500);
  const sw = await m.evaluate(() => document.documentElement.scrollWidth);
  sw <= 375 ? pass('Điện thoại không tràn ngang') : fail('Điện thoại tràn ngang: ' + sw + 'px');
  await m.screenshot({ path: path.join(OUT, 'm-1.png') });
  for (const [id, f] of [['giai-phap', 'm-2.png'], ['hanh-trinh', 'm-3.png'], ['quan-ly', 'm-4.png']]) {
    await m.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id); await m.waitForTimeout(900);
    await m.screenshot({ path: path.join(OUT, f) });
  }

  errs.length ? fail('Lỗi console: ' + errs.join(' | ')) : pass('Không lỗi console');
  await b.close();
  console.log(`\n${problems.length ? problems.length + ' vấn đề' : 'Đạt'} · ảnh chụp ở ${path.resolve(OUT)} — mở xem từng ảnh: chữ rơi dòng, ảnh tràn, thẻ đè nhau.`);
  process.exit(problems.length ? 1 : 0);
})();
