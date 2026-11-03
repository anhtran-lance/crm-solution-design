/* Base design system — hiệu ứng dựng lại từ base.vn. Không phụ thuộc thư viện.
   Mọi vòng lặp tự dừng khi khuất màn hình và khi người xem bật giảm chuyển động.
   Dùng: <script src="effects.js"></script> rồi gọi BDS.*  (xem demo.html) */
(function (w) {
  const reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Chạy fn khi root hiện trên màn hình, dừng khi khuất. fn trả về hàm dọn dẹp.
  function whenVisible(root, start) {
    let stop = null;
    if (!('IntersectionObserver' in w)) { stop = start(); return; }
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !stop) stop = start() || (() => {});
      else if (!e.isIntersecting && stop) { stop(); stop = null; }
    }), { threshold: 0.2 }).observe(root);
  }

  const BDS = {
    reduce,
    whenVisible,

    // Xuất hiện lần lượt khi cuộn tới: thêm .in, trễ 90ms giữa các phần tử cùng nhóm
    reveal(sel = '.bds-reveal', step = 90) {
      const els = $$(sel);
      if (reduce || !('IntersectionObserver' in w)) return els.forEach((e) => e.classList.add('in'));
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
      els.forEach((e, i) => { e.style.transitionDelay = (i % 4) * step + 'ms'; io.observe(e); });
    },

    // Bật .on lần lượt cho các phần tử (thẻ sáng theo lượt, thông báo bật lên, bước đang chạy)
    cycle(els, ms = 2600, root, onStep) {
      els = Array.isArray(els) ? els : $$(els);
      if (!els.length) return;
      if (reduce) { els[0].classList.add('on'); return; }
      let i = -1;
      const step = () => { i = (i + 1) % els.length; els.forEach((e, k) => e.classList.toggle('on', k === i)); onStep && onStep(i); };
      whenVisible(root || els[0].parentElement, () => { step(); const t = setInterval(step, ms); return () => clearInterval(t); });
    },

    // Dải chạy vô tận: nhân đôi nội dung track
    marquee(sel = '.bds-marquee-track') {
      $$(sel).forEach((t) => {
        if (t.dataset.dup) return; t.dataset.dup = 1;
        [...t.children].forEach((c) => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); t.appendChild(k); });
      });
    },

    // Gõ chữ; trả về Promise
    typewriter(el, text, cps = 28) {
      return new Promise((res) => {
        if (reduce) { el.textContent = text; return res(); }
        el.textContent = ''; el.classList.add('bds-caret');
        let i = 0;
        const t = setInterval(() => { el.textContent = text.slice(0, ++i); if (i >= text.length) { clearInterval(t); el.classList.remove('bds-caret'); res(); } }, 1000 / cps);
      });
    },

    // Đếm số lên: <b data-count="1360" data-suffix=" tr">0</b>
    countUp(sel = '[data-count]', ms = 1200) {
      $$(sel).forEach((el) => whenVisible(el, () => {
        const to = +el.dataset.count, suf = el.dataset.suffix || '', fmt = (n) => Math.round(n).toLocaleString('vi-VN') + suf;
        if (reduce) { el.textContent = fmt(to); return; }
        const t0 = performance.now();
        let raf = requestAnimationFrame(function f(now) { const k = Math.min((now - t0) / ms, 1); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) raf = requestAnimationFrame(f); });
        return () => cancelAnimationFrame(raf);
      }));
    },

    // Lớp ảnh dịch nhẹ theo chuột: các phần tử [data-depth="6..20"] trong root
    parallax(root) {
      if (reduce || !w.matchMedia('(pointer:fine)').matches) return;
      const layers = $$('[data-depth]', root); let raf = 0;
      root.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0; const r = root.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { const d = +l.dataset.depth; l.style.translate = `${-dx * d * 2}px ${-dy * d * 2}px`; });
        });
      });
      root.addEventListener('mouseleave', () => layers.forEach((l) => (l.style.translate = '')));
    },

    // Vẽ đường cong nối hai phần tử trong một khung (svg.bds-lines nằm trong khung đó). Trả về <path>.
    connect(svg, a, b, opts = {}) {
      const box = svg.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const side = opts.side || 'h';
      let x1, y1, x2, y2, d;
      if (side === 'h') { x1 = ra.right - box.left; y1 = ra.top + ra.height / 2 - box.top; x2 = rb.left - box.left; y2 = rb.top + rb.height / 2 - box.top; const mx = (x1 + x2) / 2; d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`; }
      else { x1 = ra.left + ra.width / 2 - box.left; y1 = ra.bottom - box.top; x2 = rb.left + rb.width / 2 - box.left; y2 = rb.top - box.top; const my = (y1 + y2) / 2; d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`; }
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d); p.setAttribute('class', opts.cls || 'bds-path');
      if (opts.color) p.style.setProperty('--hc', opts.color);
      svg.appendChild(p); return p;
    },

    // Chấm sáng chạy dọc một <path>; trả về Promise
    travel(path, ms = 1150) {
      return new Promise((res) => {
        if (reduce || !path) return res();
        const svg = path.ownerSVGElement, len = path.getTotalLength();
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', 4.5); dot.setAttribute('class', 'bds-dot');
        dot.style.setProperty('--hc', getComputedStyle(path).getPropertyValue('--hc') || '');
        svg.appendChild(dot);
        const t0 = performance.now();
        requestAnimationFrame(function f(now) {
          const k = Math.min((now - t0) / ms, 1), pt = path.getPointAtLength(len * k);
          dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
          if (k < 1) requestAnimationFrame(f); else { dot.remove(); res(); }
        });
      });
    },

    // Accordion trái + màn hình phải (mẫu 9): items[i] ứng với screens[i]; tự chuyển, bấm để chọn
    accordionStage(items, screens, ms = 5000) {
      items = Array.isArray(items) ? items : $$(items); screens = Array.isArray(screens) ? screens : $$(screens);
      let i = 0, t = null;
      const show = (k) => { i = k; items.forEach((e, n) => { e.classList.toggle('on', n === k); e.style.setProperty('--acc-ms', ms + 'ms'); }); screens.forEach((e, n) => e.classList.toggle('on', n === k)); };
      const run = () => { clearInterval(t); if (!reduce) t = setInterval(() => show((i + 1) % items.length), ms); };
      items.forEach((e, k) => { e.tabIndex = 0; e.addEventListener('click', () => { show(k); run(); }); e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); show(k); run(); } }); });
      show(0);
      whenVisible(items[0].parentElement, () => { run(); return () => clearInterval(t); });
    },
  };
  w.BDS = BDS;
})(window);
