/* =====================================================================
   WEBSITE SOLUTION DESIGN · dựng nội dung, hiệu ứng, chế độ trình bày
   ===================================================================== */
(() => {
  const { SRC, SHOTS, CONTEXT, PROBLEMS, STAGES, SUMMARY, ROLE_LABEL, SCRIPT } = window.CRM;
  const META = window.SHOT_META || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = (u) => u.replace(/^https?:\/\//, "");
  const pad2 = (n) => String(n).padStart(2, "0");
  let presenting = false;

  const tagProc = `<span class="tag proc">Đề xuất quy trình</span>`;
  const sysLine = (c) =>
    `<span class="sysline"><span class="sys-k">Trên Base CRM:</span> ${esc(c.t)}${
      c.status === "verified" ? "" : ` <span class="tag pend">Cần xác minh</span>`
    }</span>`;

  /* ----------------------------- NAV ----------------------------- */
  const navItems = [
    { id: "bai-toan", label: "Bài toán" },
    { id: "hanh-trinh", label: "Hành trình" },
    ...STAGES.map((s) => ({ id: s.id, label: s.nav, n: s.n })),
    { id: "tong-ket", label: "Tổng kết" }
  ];
  $("#jnav").innerHTML = `<ol>${navItems
    .map((it) => `<li><a href="#${it.id}" data-id="${it.id}">${it.n ? `<i>${it.n}</i>` : ""}<span>${esc(it.label)}</span></a></li>`)
    .join("")}</ol>`;

  /* --------------------------- BÀI TOÁN --------------------------- */
  const probStage = [1, 2, 5, 3];
  $("#problems").innerHTML = PROBLEMS.map(
    (p, i) => `<li data-rv><span class="pdot" aria-hidden="true"></span><div><b>${esc(p.k)}</b><p>${esc(p.t)}</p></div>
      <a class="plink" href="#chang-${probStage[i]}">Giải ở chặng ${probStage[i]} <span aria-hidden="true">→</span></a></li>`
  ).join("");
  $("#ctx").innerHTML = `<span class="tag ctx-tag">Bối cảnh giả định</span><p>${esc(CONTEXT.team)}. Khách đến từ: ${esc(CONTEXT.sources.join(", "))}.</p>
    <p class="fine">Giả định để thiết kế giải pháp, không phải dữ kiện của một doanh nghiệp cụ thể.</p>`;

  /* --------------------------- HÀNH TRÌNH --------------------------- */
  $("#journey").innerHTML = `
    <div class="jgroups" aria-hidden="true"><span style="grid-column:1/4">Khách hàng tiềm năng (Lead)</span><span style="grid-column:4/6">Cơ hội bán hàng (Deal)</span><span style="grid-column:6/7">Quản trị</span></div>
    <ol class="jcards">${STAGES.map(
      (s) => `<li data-rv><a class="jcard" href="#${s.id}">
        <span class="jtop"><img src="assets/icons/${s.icon}.svg" alt="" width="28" height="28"><span class="jn">Chặng ${s.n}</span></span>
        <b>${esc(s.name)}</b>
        <span class="jq">${esc(s.question)}</span>
        <span class="japp">${esc(s.app)}</span>
      </a></li>`
    ).join("")}</ol>`;

  /* ----------------------------- CHẶNG ----------------------------- */
  function extrasHtml(s) {
    let h = "";
    if (s.scenario)
      h += `<div class="ex"><h4>Ví dụ trong đội 12 Sales <span class="tag ctx-tag">Minh họa</span></h4>
        <ol class="chain">${s.scenario.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>`;
    if (s.criteria)
      h += `<div class="ex"><h4>Điều kiện để chuyển thành cơ hội ${tagProc}</h4>
        <ul class="crit">${s.criteria.map((c) => `<li><b>${esc(c.k)}</b><span>${esc(c.t)}</span></li>`).join("")}</ul></div>`;
    if (s.stages)
      h += `<div class="ex"><h4>Giai đoạn bán hàng ${tagProc}</h4>
        <ol class="pipe">${s.stages.map((x) => `<li><b>${esc(x.k)}</b><span>${x.p ? `${esc(x.p)} · tối đa ${esc(x.d)}` : esc(x.d)}</span></li>`).join("")}</ol>
        <p class="fine">${esc(s.stagesNote)}</p></div>`;
    if (s.metrics)
      h += `<div class="ex"><h4>Chỉ số quản trị ${tagProc}</h4>
        <dl class="metrics">${s.metrics.map((m) => `<div><dt>${esc(m.g)}</dt>${m.items.map((i) => `<dd>${esc(i)}</dd>`).join("")}</div>`).join("")}</dl>
        <p class="fine">${esc(s.metricsNote)}</p></div>`;
    return h;
  }

  const flowHtml = (f) => `<ol class="flow">${f.map((x) => `<li><span class="actor">${esc(x.a)}</span><span>${esc(x.t)}</span></li>`).join("")}</ol>`;
  const tableHtml = (head, rows) =>
    `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r) => `<tr>${r.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<th scope="row">${esc(c)}</th>`)).join("")}</tr>`)
      .join("")}</tbody></table></div>`;
  const rolesHtml = (roles) =>
    `<div class="roles">${Object.keys(ROLE_LABEL)
      .map((k) => `<div class="role"><h5>${ROLE_LABEL[k]}</h5><ul>${(roles[k] || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`)
      .join("")}</div>`;

  function detailHtml(s) {
    const d = s.detail;
    const claims = [...s.steps.map((x) => x.claim), ...(d.claims || [])];
    let flow = "";
    if (d.flow) flow += `<h4>Các bước ${tagProc}</h4>${flowHtml(d.flow)}`;
    if (d.stageTable) flow += `<h4>Điều kiện chuyển giai đoạn ${tagProc}</h4>${tableHtml(["Giai đoạn", "Điều kiện vào", "Điều kiện để sang bước sau"], d.stageTable)}`;
    if (d.readGuide) flow += `<h4>Đọc chỉ số để tìm điểm nghẽn ${tagProc}</h4>${tableHtml(["Dấu hiệu", "Có thể do", "Xem lại"], d.readGuide)}`;
    if (d.cadence) flow += `<h4>Nhịp xem số liệu ${tagProc}</h4>${tableHtml(["Nhịp", "Ai xem", "Xem gì"], d.cadence)}`;
    return `
      <div class="dgrid">
        <div class="dblk"><h4>Vấn đề nghiệp vụ</h4><p>${esc(d.problem.now)}</p><ul>${d.problem.effects.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        ${d.rules ? `<div class="dblk"><h4>Quy tắc đề xuất ${tagProc}</h4><ul>${d.rules.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
      </div>
      <div class="dblk wide">${flow}</div>
      <div class="dblk wide"><h4>Vai trò</h4>${rolesHtml(d.roles)}</div>
      <div class="dblk wide"><h4>Khả năng Base CRM dùng ở chặng này</h4>
        <ul class="claims">${claims.map((c) => `<li><span>${esc(c.t)}</span>${c.status === "verified" ? `<a class="src-chip" href="${esc(c.src)}" target="_blank" rel="noopener">Đã đối chiếu · ${esc(host(c.src))}</a>` : `<span class="tag pend">Cần xác minh</span>`}</li>`).join("")}</ul>
      </div>
      <div class="dgrid">
        <div class="dblk"><h4>Giả định</h4><ul>${d.assumptions.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        <div class="dblk"><h4>Cần xác nhận thêm với Base</h4>${d.verify.length ? `<ul>${d.verify.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : `<p class="fine">Các khả năng dùng ở chặng này đều đã đối chiếu với trang sản phẩm.</p>`}</div>
      </div>`;
  }

  $("#stages").innerHTML = STAGES.map((s, si) => `
    <section class="sec stage${si % 2 ? " soft" : ""}" id="${s.id}" aria-labelledby="h-${s.id}" data-stage="${si}">
      <div class="wrap">
        <div class="st-head" data-rv>
          <div>
            <p class="eyebrow">Chặng ${pad2(s.n)} · ${esc(s.name)}</p>
            <h2 id="h-${s.id}">${esc(s.question)}</h2>
            <p class="sub">${esc(s.message)}</p>
          </div>
          <span class="app-chip"><img src="assets/icons/${s.icon}.svg" alt="" width="20" height="20">${esc(s.app)}</span>
        </div>
        <div class="st-grid">
          <div class="steps" role="tablist" aria-label="Thao tác trên hệ thống ở chặng ${s.n}" aria-orientation="vertical">
            ${s.steps.map((st, i) => `
              <button type="button" role="tab" class="step" id="t-${s.id}-${i}" aria-controls="p-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
                <span class="step-n">${i + 1}</span>
                <span class="step-c"><span class="step-h">${esc(st.h)}</span>
                  <span class="step-b"><span class="step-t">${esc(st.t)}</span>${sysLine(st.claim)}</span></span>
                <span class="step-bar" aria-hidden="true"><i></i></span>
              </button>`).join("")}
          </div>
          <div class="view" role="tabpanel" id="p-${s.id}" aria-labelledby="t-${s.id}-0"></div>
        </div>
        <div class="st-foot">
          <div class="card org"><p class="org-t">${tagProc} ${esc(s.org.t)}</p>${extrasHtml(s)}</div>
          <div class="card val">
            <h4>Giá trị</h4>
            <div class="val-r"><span class="who">Nhân viên Sales</span><p>${esc(s.value.sales)}</p></div>
            <div class="val-r"><span class="who">Quản lý</span><p>${esc(s.value.manager)}</p></div>
          </div>
        </div>
        <button type="button" class="detail-btn" aria-expanded="false" aria-controls="d-${s.id}"><span>Chi tiết giải pháp chặng ${s.n}: vấn đề, luồng xử lý, vai trò, giả định</span><i aria-hidden="true">+</i></button>
        <div class="detail" id="d-${s.id}" hidden>${detailHtml(s)}</div>
      </div>
    </section>`).join("");

  /* ảnh + điểm chú thích */
  function shotHtml(id) {
    const s = SHOTS[id];
    const m = (META[id] && META[id].m) || {};
    const pts = s.marks.map((mk, i) => ({ ...mk, i, pos: m[mk.k] })).filter((x) => x.pos && x.pos[0] != null);
    const w = META[id] ? META[id].w : 1600, h = META[id] ? META[id].h : 1000;
    return `<figure class="shot">
      <div class="frame" style="max-width:${Math.round((w / 2) * 1.3)}px">
        <div class="shot-img">
          <button type="button" class="zoom" data-zoom="${id}" aria-label="Phóng to: ${esc(s.title)}"><img src="${s.file}" alt="${esc(s.title)} — giao diện Base CRM" width="${w}" height="${h}"></button>
          ${pts.map((p) => `<span class="mk${p.pos[0] < 5 ? " edge" : ""}" data-i="${p.i}" style="left:${p.pos[0]}%;top:${p.pos[1]}%">${p.i + 1}</span>`).join("")}
        </div>
      </div>
      <figcaption>
        ${s.marks.length ? `<ol class="legend">${s.marks.map((mk, i) => `<li data-i="${i}"><span class="ln">${i + 1}</span>${esc(mk.t)}</li>`).join("")}</ol>` : ""}
        <span class="src">Ảnh: <a href="${s.src}" target="_blank" rel="noopener">${esc(host(s.src))}</a> · dữ liệu mẫu của Base</span>
      </figcaption>
    </figure>`;
  }

  /* ------------------------- TAB THAO TÁC ------------------------- */
  const stageState = STAGES.map(() => ({ i: 0, auto: !reduced, visible: false, timer: null, foot: false }));
  const STEP_MS = 7000;

  function selectStep(si, i, { focus = false, user = false } = {}) {
    const s = STAGES[si], st = stageState[si];
    const sec = document.getElementById(s.id);
    if (user) stopAuto(si, true);
    st.i = i;
    $$(".step", sec).forEach((b, k) => {
      const on = k === i;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      b.classList.remove("playing");
      if (on && focus) b.focus();
    });
    const view = $(".view", sec);
    view.setAttribute("aria-labelledby", `t-${s.id}-${i}`);
    view.classList.remove("in");
    view.innerHTML = shotHtml(s.steps[i].shot);
    requestAnimationFrame(() => view.classList.add("in"));
    if (st.auto && st.visible && !presenting) play(si);
    updateHud();
  }
  function play(si) {
    const st = stageState[si];
    clearTimeout(st.timer);
    const btn = $$(".step", document.getElementById(STAGES[si].id))[st.i];
    btn.classList.remove("playing");
    void btn.offsetWidth;
    btn.style.setProperty("--dur", STEP_MS + "ms");
    btn.classList.add("playing");
    st.timer = setTimeout(() => selectStep(si, (st.i + 1) % STAGES[si].steps.length), STEP_MS);
  }
  function stopAuto(si, forever) {
    const st = stageState[si];
    clearTimeout(st.timer);
    if (forever) st.auto = false;
    $$(".step", document.getElementById(STAGES[si].id)).forEach((b) => b.classList.remove("playing"));
  }

  /* giữ chiều cao khung ảnh ổn định khi đổi thao tác, tránh trang bị xô */
  function sizeViews() {
    STAGES.forEach((s) => {
      const view = $(".view", document.getElementById(s.id));
      const W = view.clientWidth;
      if (!W) return;
      const cap = presenting ? innerHeight * 0.52 : 640;
      const hs = s.steps.map((st) => {
        const m = META[st.shot]; if (!m) return 0;
        const w = Math.min(W, Math.round((m.w / 2) * 1.3));
        return Math.min(cap, (w * m.h) / m.w);
      });
      view.style.setProperty("--shot-h", Math.ceil(Math.max(...hs)) + "px");
    });
  }
  addEventListener("resize", () => requestAnimationFrame(sizeViews));

  STAGES.forEach((s, si) => {
    const sec = document.getElementById(s.id);
    selectStep(si, 0);
    $(".steps", sec).addEventListener("click", (e) => {
      const b = e.target.closest(".step");
      if (b) selectStep(si, +b.dataset.i, { user: true });
    });
    $(".steps", sec).addEventListener("keydown", (e) => {
      const n = s.steps.length, cur = stageState[si].i;
      let k = null;
      if (e.key === "ArrowDown" || (e.key === "ArrowRight" && !presenting)) k = (cur + 1) % n;
      if (e.key === "ArrowUp" || (e.key === "ArrowLeft" && !presenting)) k = (cur - 1 + n) % n;
      if (e.key === "Home") k = 0;
      if (e.key === "End") k = n - 1;
      if (k !== null) { e.preventDefault(); e.stopPropagation(); selectStep(si, k, { focus: true, user: true }); }
    });
  });

  sizeViews();

  // chỉ tự chuyển khi chặng đang hiện trên màn hình
  const stageIO = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      const si = +en.target.dataset.stage, st = stageState[si];
      st.visible = en.intersectionRatio >= 0.45;
      if (st.visible && st.auto && !presenting) play(si);
      else stopAuto(si, false);
    });
  }, { threshold: [0, 0.45, 0.8] });
  $$(".stage").forEach((el) => stageIO.observe(el));

  /* chú thích ↔ điểm trên ảnh */
  document.addEventListener("mouseover", (e) => {
    const li = e.target.closest(".legend li, .mk");
    $$(".mk.on, .legend li.on").forEach((x) => x.classList.remove("on"));
    if (!li) return;
    const fig = li.closest("figure");
    $$(`[data-i="${li.dataset.i}"]`, fig).forEach((x) => x.classList.add("on"));
  });

  /* ------------------------------ TỔNG KẾT ------------------------------ */
  $("#answers").innerHTML = SUMMARY.answers.map(
    (a) => `<li><a href="#chang-${a.n}"><span class="an">${a.n}</span><span class="aq">${esc(a.q)}</span><span class="aa">${esc(a.a)}</span></a></li>`
  ).join("");
  $("#next").innerHTML = SUMMARY.next.map((n) => `<li><b>${esc(n.k)}</b><span>${esc(n.t)}</span></li>`).join("");
  $("#sumDetail").innerHTML = `
    <div class="dblk wide"><h4>Giá trị kỳ vọng theo vai trò</h4><div class="roles">${Object.keys(ROLE_LABEL)
      .map((k) => `<div class="role"><h5>${ROLE_LABEL[k]}</h5><ul>${SUMMARY.roleValue[k].map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`)
      .join("")}</div></div>
    <div class="dblk wide"><h4>Đo giá trị như thế nào</h4>${tableHtml(["Chỉ số", "Trước triển khai", "Sau 3 tháng"], SUMMARY.measure)}
      <p class="fine">Cột 'Trước triển khai' để trống cho tới khi đo. Không dùng số giả định để hứa hẹn kết quả.</p></div>
    <div class="dblk wide"><h4>Điều kiện để giải pháp hiệu quả</h4><ul>${SUMMARY.conditions.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;

  /* -------------------------- MỞ / ĐÓNG CHI TIẾT -------------------------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".detail-btn");
    if (!b) return;
    const panel = document.getElementById(b.getAttribute("aria-controls"));
    const open = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    b.querySelector("i").textContent = open ? "−" : "+";
  });

  /* ------------------------------ PHÓNG TO ẢNH ------------------------------ */
  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (!z) return;
    const s = SHOTS[z.dataset.zoom];
    $("#lbBody").innerHTML = `<img src="${s.file}" alt="${esc(s.title)}"><p><b>${esc(s.title)}</b> · <a href="${s.src}" target="_blank" rel="noopener">${esc(host(s.src))}</a></p>`;
    $("#lightbox").showModal();
  });
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") e.target.close(); });

  /* ------------------------------- SCROLLSPY ------------------------------- */
  const spyTargets = navItems.map((it) => document.getElementById(it.id));
  let currentId = null;
  function spy() {
    const y = innerHeight * 0.35;
    let cur = null;
    for (const el of spyTargets) if (el.getBoundingClientRect().top <= y) cur = el.id;
    if (cur === currentId) return;
    currentId = cur;
    $$("#jnav a").forEach((a) => {
      if (a.dataset.id === cur) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    const on = $("#jnav a[aria-current]");
    if (on) on.scrollIntoView({ block: "nearest", inline: "nearest" });
    updateHud();
  }
  addEventListener("scroll", () => requestAnimationFrame(spy), { passive: true });
  document.getElementById("nav").classList.toggle("on-dark", true);
  const heroIO = new IntersectionObserver(([en]) => $("#nav").classList.toggle("on-dark", en.isIntersecting), { rootMargin: "-60px 0px -90% 0px" });
  heroIO.observe($("#top"));

  /* ------------------------------- HIỆN DẦN ------------------------------- */
  if (!reduced && "IntersectionObserver" in window) {
    const rvIO = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("rv-in"); rvIO.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$("[data-rv]").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("rv"); rvIO.observe(el); }
    });
  }

  /* ============================ CHẾ ĐỘ TRÌNH BÀY ============================ */
  const SCREENS = ["top", "bai-toan", "hanh-trinh", ...STAGES.map((s) => s.id), "tong-ket", "buoc-tiep"];
  const scriptOf = (id) => SCRIPT.find((x) => x.id === (id === "top" || id === "bai-toan" ? "mo-dau" : id === "buoc-tiep" ? "tong-ket" : id));
  let presIdx = 0, navLock = 0;
  const curScreen = () => {
    if (presenting && Date.now() < navLock) return presIdx;
    const y = innerHeight * 0.4;
    let k = 0;
    SCREENS.forEach((id, i) => { if (document.getElementById(id).getBoundingClientRect().top <= y) k = i; });
    presIdx = k;
    return k;
  };
  function goScreen(k, stepAt = 0) {
    k = Math.max(0, Math.min(SCREENS.length - 1, k));
    presIdx = k; navLock = Date.now() + 900;
    const el = document.getElementById(SCREENS[k]);
    const si = STAGES.findIndex((s) => s.id === SCREENS[k]);
    if (si >= 0) { stageState[si].foot = stepAt === "last"; selectStep(si, stepAt === "last" ? STAGES[si].steps.length - 1 : stepAt); }
    if (si >= 0 && stepAt === "last") $(".st-foot", el).scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setTimeout(updateHud, 450);
  }
  function step(dir) {
    const k = curScreen();
    const si = STAGES.findIndex((s) => s.id === SCREENS[k]);
    if (si >= 0) {
      const st = stageState[si], n = STAGES[si].steps.length;
      const sec = document.getElementById(STAGES[si].id), foot = $(".st-foot", sec);
      if (dir > 0 && st.i < n - 1) return selectStep(si, st.i + 1);
      // sau bước thao tác cuối: hiện phần cách tổ chức và giá trị
      if (dir > 0 && !st.foot) {
        st.foot = true;
        navLock = Date.now() + 900;
        if (foot.getBoundingClientRect().bottom > innerHeight - 80) foot.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
        foot.classList.add("hl");
        setTimeout(() => foot.classList.remove("hl"), 1200);
        return updateHud();
      }
      if (dir < 0 && st.foot) { st.foot = false; navLock = Date.now() + 900; sec.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); return setTimeout(updateHud, 450); }
      if (dir < 0 && st.i > 0) return selectStep(si, st.i - 1);
    }
    goScreen(k + dir, dir < 0 ? "last" : 0);
  }
  function setPresent(on) {
    presenting = on;
    document.body.classList.toggle("present", on);
    $("#hud").hidden = !on;
    $("#presentBtn").setAttribute("aria-pressed", String(on));
    $("#presentBtn").textContent = on ? "Thoát trình bày" : "Trình bày";
    sizeViews();
    if (on) {
      STAGES.forEach((_, si) => stopAuto(si, false));
      $$(".detail-btn[aria-expanded='true']").forEach((b) => b.click());
      goScreen(curScreen());
    } else {
      toggleNotes(false);
      STAGES.forEach((_, si) => { const st = stageState[si]; if (st.visible && st.auto) play(si); });
    }
    updateHud();
  }
  function updateHud() {
    if (!presenting) return;
    const k = curScreen(), id = SCREENS[k];
    const s = STAGES.find((x) => x.id === id);
    const ss = s && stageState[STAGES.indexOf(s)];
    const label = s ? `Chặng ${s.n} · ${s.nav} · ${ss.foot ? "cách tổ chức và giá trị" : `bước ${ss.i + 1}/${s.steps.length}`}` : { top: "Mở đầu", "bai-toan": "Bài toán", "hanh-trinh": "Hành trình", "tong-ket": "Tổng kết", "buoc-tiep": "Bước tiếp theo" }[id];
    $("#hudWhere").textContent = `${k + 1}/${SCREENS.length} · ${label}`;
    const sc = scriptOf(id);
    const before = SCRIPT.slice(0, SCRIPT.indexOf(sc)).reduce((a, b) => a + b.min, 0);
    const fmt = (m) => `${Math.floor(m)}:${pad2(Math.round((m % 1) * 60))}`;
    $("#notesPlan").textContent = `${sc.part} · ${fmt(sc.min)} phút · mốc ${fmt(before)}–${fmt(before + sc.min)} / 10:00`;
    const notes = s ? s.notes : id === "tong-ket" || id === "buoc-tiep" ? SUMMARY.notes : sc.notes;
    $("#notesList").innerHTML = notes.map((n) => `<li>${esc(n)}</li>`).join("");
  }
  function toggleNotes(force) {
    const on = force ?? $("#notes").hidden;
    $("#notes").hidden = !on;
    $("#hudNotes").setAttribute("aria-pressed", String(on));
  }
  let t0 = null, acc = 0, tick = null;
  const showTime = () => { const s = Math.floor((acc + (t0 ? Date.now() - t0 : 0)) / 1000); $("#hudTime").textContent = `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`; };
  $("#hudTimer").addEventListener("click", (e) => {
    if (t0) { acc += Date.now() - t0; t0 = null; clearInterval(tick); e.target.textContent = "Tiếp tục giờ"; }
    else { t0 = Date.now(); tick = setInterval(showTime, 500); e.target.textContent = "Dừng giờ"; }
    showTime();
  });
  $("#presentBtn").addEventListener("click", () => setPresent(!presenting));
  $("#presentBtn2").addEventListener("click", () => setPresent(true));
  $("#hudExit").addEventListener("click", () => setPresent(false));
  $("#hudPrev").addEventListener("click", () => step(-1));
  $("#hudNext").addEventListener("click", () => step(1));
  $("#hudNotes").addEventListener("click", () => toggleNotes());

  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || $("#lightbox").open) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    const k = e.key;
    if (k === "p" || k === "P") return setPresent(!presenting);
    if (!presenting) return;
    const onCtl = e.target.closest("button, a");
    if (k === "ArrowRight" || k === "ArrowDown" || k === "PageDown" || (k === " " && !onCtl)) { e.preventDefault(); step(1); }
    else if (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") { e.preventDefault(); step(-1); }
    else if (k === "n" || k === "N") toggleNotes();
    else if (k === "Escape") setPresent(false);
    else if (/^[1-6]$/.test(k)) goScreen(SCREENS.indexOf(`chang-${k}`));
    else if (k === "Home") { e.preventDefault(); goScreen(0); }
    else if (k === "End") { e.preventDefault(); goScreen(SCREENS.length - 1); }
    else if (k === "f" || k === "F") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.().catch(() => {});
    }
  });
  addEventListener("scroll", () => { if (presenting) requestAnimationFrame(updateHud); }, { passive: true });

  /* mở đúng vị trí khi vào bằng liên kết có #chang-n */
  if (location.hash) {
    const t = document.getElementById(location.hash.slice(1));
    if (t) requestAnimationFrame(() => t.scrollIntoView());
  }
  spy();
})();
