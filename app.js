/* Base CRM · Solution design
   Mục tiêu UX: người xem luôn biết mình đang ở phần nào, bước nào.
   - Thanh điều hướng: tô phần đang xem, đánh dấu phần đã qua, thanh tiến độ.
   - Hành trình: 6 bước dạng tab, thanh bước dính khi cuộn, có "Bước x/6", link sâu #buoc-x.
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
    whereSec.textContent = `Phần ${idx + 1}/6 · ${sections[idx].dataset.name}`;
    // Gợi ý phím tắt chỉ hiện ở phần mở đầu, không che nội dung các phần sau
    keys.classList.toggle('hide', idx !== 0);
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
  const footPrev = $('#footPrev'), footNext = $('#footNext'), footInfo = $('#footInfo');
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
    footInfo.textContent = `Bước ${n}/${total} · ${panels[n - 1].dataset.title}`;
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

  // Link tới một bước (#buoc-3) từ bất kỳ đâu, ví dụ thẻ ở phần Hiện trạng
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#buoc-"]');
    if (!a) return;
    e.preventDefault();
    setStep(+a.getAttribute('href').split('-')[1], { scroll: true });
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

  /* ---------------- Phóng to ảnh ---------------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbClose = $('#lbClose');
  let lastFocus = null;
  function openLb(btn) {
    const img = $('img', btn);
    const fig = btn.closest('figure');
    const where = current >= 0 ? `Phần ${current + 1}/6 · ${sections[current].dataset.name}` : '';
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
    if (/^[1-6]$/.test(e.key)) {
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
  if (m) requestAnimationFrame(() => scrollToPanels());
  updateNav();
})();
