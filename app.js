/* Base CRM · Solution design
   Mục tiêu UX: người xem luôn biết mình đang ở phần nào, bước nào.
   - Thanh điều hướng: tô phần đang xem, đánh dấu phần đã qua, thanh tiến độ.
   - Lưu đồ giải pháp: chuyển "Hôm nay" / "Với Base CRM", bấm ô để tới bước chi tiết.
   - Chi tiết: 6 bước dạng tab, thanh bước dính khi cuộn, có "Bước x/6", link sâu #buoc-x.
   - Phóng to ảnh: đóng lại thì về đúng chỗ cũ.
*/
(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cssNum = (v) => parseFloat(getComputedStyle(root).getPropertyValue(v)) || 0;

  /* ---------------- Phần đang xem ---------------- */
  const sections = $$('main > section.sec');
  const tabs = $$('#tabs a');
  const tabsBox = $('#tabs');
  const whereSec = $('#whereSec');
  const whereStep = $('#whereStep');
  const bar = $('#bar');
  const keys = $('.keys');
  const railWrap = $('#railWrap');
  let current = -1;

  function activeIndex() {
    const line = cssNum('--hh') + window.innerHeight * 0.35;
    let idx = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) idx = i; });
    // Cuộn chạm đáy thì là phần cuối
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = sections.length - 1;
    return idx;
  }

  function updateNav() {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';

    const idx = activeIndex();
    if (idx === current) return;
    current = idx;
    tabs.forEach((t, i) => {
      if (i === idx) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      t.classList.toggle('done', i < idx);
    });
    whereSec.textContent = `Phần ${idx + 1}/${sections.length} · ${sections[idx].dataset.name}`;
    // Gợi ý phím tắt chỉ hiện ở phần mở đầu, không che nội dung các phần sau
    keys.classList.toggle('hide', idx !== 0);
    // Thanh bước chỉ hiện khi đang ở phần Chi tiết từng bước
    railWrap.classList.toggle('off', idx !== journeyIdx);
    updateWhereStep();
    syncHash();
    // Giữ tab đang xem trong khung (điện thoại), không làm cuộn trang
    const t = tabs[idx];
    tabsBox.scrollTo({ left: t.offsetLeft - tabsBox.offsetLeft - (tabsBox.clientWidth - t.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }

  // Địa chỉ trang luôn trỏ đúng chỗ đang xem: gửi link hay tải lại đều mở đúng phần/bước
  function syncHash() {
    if (!history.replaceState || current < 0) return;
    const id = current === journeyIdx ? 'buoc-' + step : sections[current].id;
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateNav(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', () => { current = -1; updateNav(); });

  /* ---------------- Hành trình 6 bước ---------------- */
  const journeyIdx = sections.findIndex((s) => s.id === 'hanh-trinh');
  const panels = $$('.panel');
  const railBtns = $$('#rail button');
  const fill = $('#railFill');
  const prev = $('#prevStep'), next = $('#nextStep');
  const footPrev = $('#footPrev'), footNext = $('#footNext');
  const panelsBox = $('#panels');
  const total = panels.length;
  let step = 1;

  function updateWhereStep() {
    whereStep.textContent = current === journeyIdx ? `Bước ${step}/${total}` : '';
  }

  function scrollToPanels() {
    const y = panelsBox.getBoundingClientRect().top + window.scrollY - cssNum('--hh') - cssNum('--rh') - 8;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }

  function setStep(n, opts = {}) {
    n = Math.max(1, Math.min(total, n));
    const changed = n !== step;
    step = n;
    panels.forEach((p) => {
      const on = +p.dataset.step === n;
      p.hidden = !on;
      if (on && changed && !reduce) { p.classList.remove('enter'); void p.offsetWidth; p.classList.add('enter'); }
    });
    railBtns.forEach((b) => {
      const s = +b.dataset.step;
      b.setAttribute('aria-selected', s === n ? 'true' : 'false');
      b.tabIndex = s === n ? 0 : -1;
      b.classList.toggle('done', s < n);
    });
    fill.style.width = (n / total) * 100 + '%';
    [prev, footPrev].forEach((b) => (b.disabled = n === 1));
    [next, footNext].forEach((b) => (b.disabled = n === total));
    footNext.textContent = n === total ? 'Hết hành trình' : `Bước sau: ${panels[n].dataset.title} →`;
    footPrev.textContent = n === 1 ? '← Bước trước' : `← ${panels[n - 2].dataset.title}`;
    updateWhereStep();
    syncHash();
    if (opts.init) return;
    // Nếu người xem đang ở giữa/cuối nội dung bước cũ, đưa về đầu bước mới
    if (opts.scroll || panelsBox.getBoundingClientRect().top < cssNum('--hh') + cssNum('--rh') - 4) scrollToPanels();
    if (opts.focus) railBtns[n - 1].focus({ preventScroll: true });
  }

  railBtns.forEach((b) => b.addEventListener('click', () => setStep(+b.dataset.step)));
  // Mũi tên trái/phải trong thanh bước (chuẩn tab)
  $('#rail').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); e.stopPropagation();
      setStep(step + (e.key === 'ArrowRight' ? 1 : -1), { focus: true });
    }
  });
  prev.addEventListener('click', () => setStep(step - 1));
  next.addEventListener('click', () => setStep(step + 1));
  footPrev.addEventListener('click', () => setStep(step - 1, { scroll: true }));
  footNext.addEventListener('click', () => setStep(step + 1, { scroll: true }));

  // Link tới một bước (#buoc-3) từ bất kỳ đâu, ví dụ ô trong lưu đồ giải pháp
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#buoc-"]');
    if (!a) return;
    e.preventDefault();
    setStep(+a.getAttribute('href').split('-')[1], { scroll: true });
  });

  addEventListener('hashchange', () => {
    const h = location.hash.match(/^#buoc-(\d)$/);
    if (h) setStep(+h[1], { scroll: true });
  });

  /* ---------------- Ảnh trong từng bước ---------------- */
  $$('[data-shots]').forEach((box) => {
    const btns = $$('.shot-tabs button', box);
    const figs = $$('.shot', box);
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach((x, j) => x.setAttribute('aria-selected', j === i ? 'true' : 'false'));
      figs.forEach((f, j) => f.classList.toggle('is-on', j === i));
    }));
  });

  /* ---------------- Lưu đồ: Hôm nay / Với Base CRM ---------------- */
  const flow = $('#flow');
  const modeBtns = $$('.mode button');
  modeBtns.forEach((b) => b.addEventListener('click', () => {
    const after = b.dataset.mode === 'after';
    flow.classList.toggle('is-after', after);
    flow.classList.toggle('is-before', !after);
    modeBtns.forEach((x) => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
  }));

  // Ô "Giám đốc thấy" mở đúng câu hỏi ở phần Góc quản lý
  $$('.out[data-mgr]').forEach((a) => a.addEventListener('click', () => {
    const btn = $$('#mgr .shot-tabs button')[+a.dataset.mgr];
    if (btn) btn.click();
  }));

  /* ---------------- Phần mở đầu: Prospect → Lead → Sales lần lượt sáng, ảnh theo chuột ---------------- */
  const heroSec = $('#tong-quan'), shots = $('#heroShots');
  if (heroSec && shots) {
    const apps = $$('#heroApps li'), toasts = $$('.toast', shots), layers = $$('[data-depth]', shots), hs = $$('.hs', shots);
    let hi = -1, htimer = null;
    function heroStep() {
      hi = (hi + 1) % 3;
      shots.classList.add('focus');
      apps.forEach((li, k) => li.classList.toggle('on', k === hi));
      toasts.forEach((t) => t.classList.toggle('on', +t.dataset.app === hi));
      hs.forEach((h) => h.classList.toggle('on', +h.dataset.app === hi));
    }
    const hStart = () => { if (!reduce && !htimer) { heroStep(); htimer = setInterval(heroStep, 2600); } };
    const hStop = () => { clearInterval(htimer); htimer = null; };
    if (reduce) { toasts.forEach((t) => t.classList.add('on')); }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver((ents) => ents.forEach((en) => (en.isIntersecting ? hStart() : hStop())), { threshold: 0.25 }).observe(heroSec);
    } else hStart();

    if (!reduce && matchMedia('(pointer:fine)').matches) {
      let raf = 0;
      heroSec.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = heroSec.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { const d = +l.dataset.depth; l.style.translate = `${-dx * d * 2}px ${-dy * d * 2}px`; });
        });
      });
      heroSec.addEventListener('mouseleave', () => layers.forEach((l) => (l.style.translate = '')));
    }
  }

  /* ---------------- Một cửa tiếp nhận: Nguồn → Lead → Sales ----------------
     Mỗi lượt: một nguồn sáng lên, chấm màu chạy vào Lead, qua 4 bước xử lý,
     ra danh sách khách mới, thẻ khách chuẩn hóa, rồi sang quy trình bán.
     Lượt thứ 2 là khách trùng (cùng một người đã nhắn Zalo, sau đó điền form website) để thấy gộp trùng. */
  const hub = $('#hub');
  if (hub) {
    const svg = $('#hubLines'), core = $('.core', hub), coreWrap = $('#hubCore');
    const srcs = $$('.src', hub), proc = $$('.proc li', hub);
    const inCard = $('#hubIn'), std = $('#hubStd'), dst = $('#hubDst'), dup = $('#hubDup');
    const list = $('#hubList'), dstCount = $('#dstCount'), timer = $('#hubTimer');
    const NS = 'http://www.w3.org/2000/svg';
    const COLORS = ['#6366F1', '#1877F2', '#0EA5E9', '#16A34A'];
    let pSrc = [], pIn, pStd, pDst;

    const rel = (el) => { const h = hub.getBoundingClientRect(), r = el.getBoundingClientRect(); return { l: r.left - h.left, t: r.top - h.top, r: r.right - h.left, b: r.bottom - h.top, w: r.width, h: r.height }; };
    const mk = (d, color) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('class', 'hub-path'); if (color) p.style.setProperty('--hc', color); svg.appendChild(p); return p; };
    const curve = (x1, y1, x2, y2) => `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;

    function drawHub() {
      svg.innerHTML = '';
      pSrc = []; pIn = pStd = pDst = null;
      if (getComputedStyle(svg).display === 'none') return;
      const h = hub.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${h.width} ${h.height}`);
      const c = rel(core), cx = c.l + c.w / 2, cy = c.t + c.h / 2, R = c.w / 2;
      srcs.forEach((s, i) => {
        const r = rel(s);
        const ty = cy + (i - 1.5) * 22;
        pSrc.push(mk(curve(r.r, r.t + r.h / 2, cx - Math.sqrt(Math.max(R * R - (ty - cy) ** 2, 0)), ty), COLORS[i]));
      });
      const ri = rel(inCard), rs = rel(std), rd = rel(dst);
      pIn = mk(curve(cx + R * .93, cy - 30, ri.l, ri.t + ri.h / 2), '#3b82f6');
      pStd = mk(curve(cx + R * .93, cy + 30, rs.l, rs.t + rs.h / 2), '#c2410c');
      pDst = mk(`M${rs.l + rs.w / 2},${rs.b} L${rd.l + rd.w / 2},${rd.t}`, '#17936a');
    }

    // Chấm màu chạy dọc một đường
    function travel(path, ms) {
      return new Promise((res) => {
        if (!path || reduce) return res();
        const len = path.getTotalLength();
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('r', 4.5); dot.setAttribute('class', 'hub-dot');
        dot.style.setProperty('--hc', path.style.getPropertyValue('--hc'));
        svg.appendChild(dot);
        const t0 = performance.now();
        (function step(now) {
          const k = Math.min((now - t0) / ms, 1);
          const pt = path.getPointAtLength(len * k);
          dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
          if (k < 1) requestAnimationFrame(step); else { dot.remove(); res(); }
        })(t0);
      });
    }
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const on = (el, v) => el && el.classList.toggle('on', v);

    const LEADS = [
      { src: 0, n: 'Thu Trang', co: 'An Phát', ch: 'Zalo OA', chip: 'Prospect', s: 'Nóng', k: 'hot', sale: 'Thu Hà', av: '#17936a' },
      { src: 2, dup: true, n: 'Thu Trang', co: 'An Phát', ch: 'Zalo OA + Form web', chip: 'Form web', s: 'Nóng', k: 'hot', sale: 'Thu Hà', av: '#17936a' },
      { src: 1, n: 'Văn Bình', co: 'Halden Tech', ch: 'Quảng cáo Facebook', chip: 'QC Facebook', s: 'Ấm', k: 'warm', sale: 'Hoàng Nam', av: '#2563eb' },
      { src: 3, n: 'Phương Hà', co: 'Nội thất Vĩnh Hằng', ch: 'Hội chợ', chip: 'Excel', s: 'Lạnh', k: 'cold', sale: 'Thu Hà', av: '#16a34a' },
    ];
    let idx = 0, running = false, alive = false, count = 12, secs = 15 * 60, tick = null;
    const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    function showStd(L) {
      $('#stdAv').textContent = L.n[0]; $('#stdAv').style.background = L.av;
      $('#stdName').textContent = L.n; $('#stdSub').textContent = `${L.co} · ${L.ch}`;
      $('#stdScore').textContent = L.s; $('#stdScore').className = 'score ' + L.k; $('#stdAi').textContent = L.s; $('#stdSale').textContent = L.sale;
      secs = 15 * 60; timer.textContent = fmt(secs);
    }
    function addRow(L) {
      if (L.dup) {
        const first = list.firstElementChild;
        if (first) { first.classList.remove('new'); void first.offsetWidth; first.classList.add('new', 'merged'); }
        return;
      }
      list.insertAdjacentHTML('afterbegin', `<li class="new"><span class="av" style="background:${L.av}">${L.n[0]}</span><div class="nm"><b>${L.n}</b><small>${L.co}</small></div><span class="chip">${L.chip}</span><span class="score ${L.k}">${L.s}</span></li>`);
      while (list.children.length > 3) list.lastElementChild.remove();
    }

    async function runOne() {
      const L = LEADS[idx % LEADS.length];
      idx++;
      if (idx % LEADS.length === 1) list.querySelectorAll('.merged').forEach((li) => li.classList.remove('merged'));
      const s = srcs[L.src], p = pSrc[L.src];
      on(s, true); on(p, true);
      await travel(p, 900);
      core.classList.remove('pulse'); void core.offsetWidth; core.classList.add('pulse');
      for (let k = 0; k < proc.length; k++) {
        proc.forEach((x, i) => on(x, i === k));
        if (k === 0 && L.dup) on(dup, true);
        await wait(260);
      }
      proc.forEach((x) => on(x, false));
      on(s, false); on(p, false);
      on(pIn, true); on(pStd, true);
      await Promise.all([travel(pIn, 700), travel(pStd, 700)]);
      on(inCard, true); addRow(L); showStd(L);
      await wait(500);
      on(inCard, false); on(pIn, false); on(pStd, false);
      if (!L.dup) {
        on(pDst, true); on(std, true);
        await travel(pDst, 500);
        on(dst, true); count++; dstCount.textContent = count;
        await wait(700);
        on(dst, false); on(pDst, false); on(std, false);
      } else {
        await wait(900);
      }
      on(dup, false);
    }

    async function loop() {
      if (running) return;
      running = true;
      while (alive) { await runOne(); await wait(700); }
      running = false;
    }
    function start() {
      if (reduce) return;
      alive = true; loop();
      if (!tick) tick = setInterval(() => { secs = Math.max(secs - 1, 0); timer.textContent = fmt(secs); }, 1000);
    }
    function stop() { alive = false; clearInterval(tick); tick = null; }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((ents) => ents.forEach((en) => (en.isIntersecting ? start() : stop())), { threshold: 0.3 }).observe(hub);
    } else start();

    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(drawHub, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawHub);
    drawHub();
  }

  /* ---------------- Phóng to ảnh ---------------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbClose = $('#lbClose');
  let lastFocus = null;
  function openLb(btn) {
    const img = $('img', btn);
    const fig = btn.closest('figure');
    const where = current >= 0 ? `Phần ${current + 1}/${sections.length} · ${sections[current].dataset.name}` : '';
    const label = fig.dataset.cap || $('.win-bar span', fig).textContent;
    lbCap.textContent = where && !fig.dataset.cap ? `${where} · ${label}` : label;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lastFocus = btn;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    keys.classList.add('hide');
    lbClose.focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    keys.classList.toggle('hide', current !== 0);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('.zoom').forEach((b) => b.addEventListener('click', () => openLb(b)));
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-body')) closeLb(); });

  /* ---------------- Phím tắt khi trình bày ---------------- */
  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'Tab') { e.preventDefault(); lbClose.focus(); }
      return;
    }
    if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (/^[1-9]$/.test(e.key) && +e.key <= sections.length) {
      const s = sections[+e.key - 1];
      if (s) window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - cssNum('--hh'), behavior: reduce ? 'auto' : 'smooth' });
    } else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && current === journeyIdx) {
      e.preventDefault();
      setStep(step + (e.key === 'ArrowRight' ? 1 : -1));
    }
  });

  /* ---------------- Hiện dần khi cuộn ---------------- */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 60 + 'ms'; io.observe(el); });
  } else {
    $$('.rv').forEach((el) => el.classList.add('in'));
  }

  /* ---------------- Khởi tạo ---------------- */
  const m = location.hash.match(/^#buoc-(\d)$/);
  setStep(m ? +m[1] : 1, { init: true });
  if (m) scrollToPanels();
  else {
    // Link tới một phần (#giai-phap...) phải mở đúng phần đó trước khi địa chỉ được cập nhật
    const target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (target && target.matches('main > section.sec')) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - cssNum('--hh'), behavior: 'auto' });
    }
  }
  updateNav();
})();
