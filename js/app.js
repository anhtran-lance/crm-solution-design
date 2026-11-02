/* =====================================================================
   ỨNG DỤNG: điều hướng, hiển thị slide, lớp chi tiết, kịch bản, kiểm tra
   Route (hash):
     #/s/<id>   Presentation Mode
     #/d/<id>   Solution Detail của cùng slide (giữ ngữ cảnh chặng)
     #/script   Kịch bản trình bày 10 phút
     #/qa       Kết quả kiểm tra & danh sách cần xác minh
   ===================================================================== */
(() => {
  const { SHOTS, CONTEXT, SLIDES, ROLE_VALUE, ROLE_LABEL, QA } = window.CRM;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const idx = (id) => SLIDES.findIndex((s) => s.id === id);
  const shotOk = {}; // id -> true nếu file ảnh tải được

  const view = $("#view");
  let route = { mode: "s", id: SLIDES[0].id };

  /* ----------------------------- tiện ích ----------------------------- */
  const fmtMin = (m) => {
    const sec = Math.round(m * 60);
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  };
  const stageLabel = (s) => (s.kind === "stage" ? `Chặng ${s.stage}` : s.nav);

  const tagProc = `<span class="tag proc" title="Cách doanh nghiệp tổ chức công việc. Không phụ thuộc phần mềm.">Đề xuất quy trình</span>`;
  const tagSys = `<span class="tag sys" title="Khả năng của Base CRM">Trên Base CRM</span>`;
  const badge = (it) =>
    it.status === "verified"
      ? `<span class="vf ok" title="${esc(it.src)}">Đã xác minh</span>`
      : `<span class="vf pend" title="Chưa đối chiếu được với trang sản phẩm base.vn. Xem trang Kiểm tra.">Cần xác minh</span>`;
  const sysList = (items) =>
    `<ul class="syslist">${items.map((it) => `<li><span>${esc(it.t)}</span>${badge(it)}</li>`).join("")}</ul>`;

  /* ------------------------------ ảnh ------------------------------ */
  function probeShots() {
    const jobs = Object.entries(SHOTS).map(
      ([id, s]) =>
        new Promise((res) => {
          const im = new Image();
          const done = (ok) => { shotOk[id] = ok; res(); };
          im.onload = () => done(im.naturalWidth > 0);
          im.onerror = () => done(false);
          im.src = s.file;
          setTimeout(() => done(false), 4000);
        })
    );
    return Promise.all(jobs);
  }

  function shotFigure(id, { big = false, showNeed = true } = {}) {
    const s = SHOTS[id];
    if (!s) return "";
    if (!shotOk[id]) {
      return `<figure class="shot missing${big ? " big" : ""}">
        <div class="ph" role="img" aria-label="Vị trí ảnh giao diện chưa có: ${esc(s.title)}">
          <span class="ph-k">Cần bổ sung ảnh giao diện Base CRM</span>
          <b>${esc(s.title)}</b>
          ${showNeed ? `<p>${esc(s.need)}</p>` : ""}
          <code>${esc(s.file)}</code>
        </div>
      </figure>`;
    }
    const marks = s.callouts
      .map((c, i) => (c.x == null || c.y == null ? "" : `<span class="mk" data-i="${i}" style="left:${c.x}%;top:${c.y}%">${i + 1}</span>`))
      .join("");
    const hasMarks = s.callouts.some((c) => c.x != null);
    return `<figure class="shot${big ? " big" : ""}">
      <div class="shot-wrap">
        <button type="button" class="zoom" data-zoom="${esc(id)}" aria-label="Phóng to ảnh: ${esc(s.title)}">
          <img src="${esc(s.file)}" alt="${esc(s.title)}">
        </button>
        ${marks}
      </div>
      <figcaption>
        <b>${esc(s.title)}</b>
        ${hasMarks ? `<ol class="callouts">${s.callouts.map((c, i) => `<li data-i="${i}">${esc(c.t)}</li>`).join("")}</ol>` : ""}
        ${s.source ? `<span class="src">Nguồn: ${esc(s.source)}</span>` : ""}
      </figcaption>
    </figure>`;
  }

  /* --------------------------- thanh hành trình --------------------------- */
  function renderJourney() {
    const el = $("#journey");
    el.innerHTML = `<ol>${SLIDES.map((s) => {
      const num = s.kind === "stage" ? `<i>${s.stage}</i>` : "";
      return `<li class="${s.kind === "stage" ? "st" : "ex"}"><a href="#/${route.mode === "d" ? "d" : "s"}/${s.id}" data-id="${s.id}" title="${esc(s.navLong || s.nav)}">${num}<span>${esc(s.nav)}</span></a></li>`;
    }).join("")}</ol>`;
  }
  function updateJourney() {
    const cur = route.id;
    const ci = idx(cur);
    document.querySelectorAll("#journey a").forEach((a) => {
      const i = idx(a.dataset.id);
      a.href = `#/${route.mode === "d" ? "d" : "s"}/${a.dataset.id}`;
      a.classList.toggle("done", ci >= 0 && i < ci);
      if (a.dataset.id === cur && (route.mode === "s" || route.mode === "d")) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
    const curA = $("#journey a[aria-current]");
    if (curA) curA.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  /* ------------------------------ SLIDES ------------------------------ */
  function slideIntro(s) {
    return `<section class="slide intro">
      <div class="intro-t">
        <h1>${esc(s.title)}</h1>
        <p class="lead">${esc(s.lead)}</p>
      </div>
      <ul class="symptoms">${s.symptoms.map((x) => `<li><b>${esc(x.k)}</b><span>${esc(x.t)}</span></li>`).join("")}</ul>
      <p class="ctx"><span class="tag ctxtag">Bối cảnh giả định</span> ${esc(CONTEXT.team)}. Khách đến từ: ${esc(CONTEXT.sources.join(", "))}.</p>
      ${detailLink(s, "Phạm vi và giả định")}
    </section>`;
  }

  function slideOverview(s) {
    const stages = SLIDES.filter((x) => x.kind === "stage");
    const groups = [
      { h: "Khách hàng tiềm năng", from: 1, to: 3 },
      { h: "Cơ hội bán hàng", from: 4, to: 5 },
      { h: "Quản trị", from: 6, to: 6 }
    ];
    return `<section class="slide overview">
      <div class="ov-t"><h1>${esc(s.title)}</h1><p class="lead">${esc(s.lead)}</p></div>
      <div class="map">
        <div class="groups" aria-hidden="true">${groups.map((g) => `<span style="grid-column:${g.from} / ${g.to + 1}">${esc(g.h)}</span>`).join("")}</div>
        <ol class="nodes">${stages.map((x) => `<li>
          <a href="#/s/${x.id}" class="node">
            <span class="n">${x.stage}</span>
            <b>${esc(x.navLong)}</b>
            <span class="q">${esc(x.question)}</span>
            <span class="go">Mở chặng ${x.stage} →</span>
          </a></li>`).join("")}</ol>
      </div>
      ${detailLink(s, "Cấu trúc và vai trò theo chặng")}
    </section>`;
  }

  function stageExtras(s) {
    let h = "";
    if (s.scenario)
      h += `<div class="blk scen"><h3>${esc(s.scenario.h)} <span class="tag ctxtag">Minh họa</span></h3>
        <ol class="chain">${s.scenario.steps.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>`;
    if (s.criteria)
      h += `<div class="blk"><h3>Điều kiện để tạo cơ hội ${tagProc}</h3>
        <ul class="crit">${s.criteria.map((c) => `<li><b>${esc(c.k)}</b><span>${esc(c.t)}</span></li>`).join("")}</ul></div>`;
    if (s.metrics)
      h += `<div class="blk"><h3>Chỉ số quản trị ${tagProc}</h3>
        <dl class="metrics">${s.metrics.map((m) => `<div><dt>${esc(m.g)}</dt>${m.items.map((i) => `<dd>${esc(i)}</dd>`).join("")}</div>`).join("")}</dl>
        <p class="fine">${esc(s.metricsNote)}</p></div>`;
    return h;
  }

  function slideStage(s) {
    const stagesStrip = s.stages
      ? `<div class="pipe-strip"><div class="ps-h">Giai đoạn bán hàng ${tagProc}<span class="fine">${esc(s.stagesNote)}</span></div>
          <ol>${s.stages.map((x) => `<li><b>${esc(x.k)}</b><span>${esc(x.t)}</span></li>`).join("")}</ol></div>`
      : "";
    return `<section class="slide stage">
      <div class="st-copy">
        <p class="kicker">Chặng ${s.stage} / 6 · ${esc(s.navLong)}</p>
        <h1>${esc(s.question)}</h1>
        <p class="msg">${esc(s.message)}</p>
        <div class="blk"><h3>Cách tổ chức ${tagProc}</h3><p>${esc(s.org.t)}</p></div>
        ${stageExtras(s)}
        <div class="blk val"><h3>Giá trị</h3>
          <div class="val2"><div><span class="who">Nhân viên Sales</span><p>${esc(s.value.sales)}</p></div>
          <div><span class="who">Quản lý</span><p>${esc(s.value.manager)}</p></div></div>
        </div>
      </div>
      <div class="st-sys">
        ${shotFigure(s.shot, { showNeed: false })}
        <div class="blk sysblk"><h3>Thao tác trên hệ thống ${tagSys}</h3>${sysList(s.system)}</div>
        ${detailLink(s, `Chi tiết chặng ${s.stage}`)}
      </div>
      ${stagesStrip}
    </section>`;
  }

  function slideSummary(s) {
    return `<section class="slide summary">
      <div class="sum-l">
        <h1>${esc(s.title)}</h1>
        <ol class="answers">${s.answers.map((a) => {
          const st = SLIDES.find((x) => x.stage === a.s);
          return `<li><a href="#/s/${st.id}"><span class="n">${a.s}</span><span class="q">${esc(a.q)}</span><span class="a">${esc(a.a)}</span></a></li>`;
        }).join("")}</ol>
      </div>
      <div class="sum-r">
        <h2>Bước tiếp theo đề xuất</h2>
        <ol class="next">${s.next.map((n) => `<li><b>${esc(n.k)}</b><span>${esc(n.t)}</span></li>`).join("")}</ol>
        ${detailLink(s, "Giá trị, điều kiện và kế hoạch")}
      </div>
    </section>`;
  }

  const detailLink = (s, label) =>
    `<a class="detail-link" href="#/d/${s.id}">${esc(label)} <span aria-hidden="true">→</span></a>`;

  function renderSlide(s) {
    const map = { intro: slideIntro, overview: slideOverview, stage: slideStage, summary: slideSummary };
    view.className = "v-slide";
    view.innerHTML = map[s.kind](s);
  }

  /* ------------------------------ DETAIL ------------------------------ */
  function detailHeader(s, sections) {
    const title = s.kind === "stage" ? s.navLong : s.nav;
    const q = s.kind === "stage" ? s.question : s.detail.intro;
    return `<header class="d-head">
      <div>
        <p class="kicker">Solution Detail · ${esc(stageLabel(s))}</p>
        <h1>${esc(title)}</h1>
        <p class="lead">${esc(q)}</p>
      </div>
      <a class="back" href="#/s/${s.id}"><span aria-hidden="true">←</span> Quay lại slide trình bày</a>
    </header>
    <nav class="d-toc" aria-label="Mục trong trang chi tiết">${sections.map((x) => `<a href="#${x.id}" data-anchor="${x.id}">${esc(x.h)}</a>`).join("")}</nav>`;
  }

  function flowHtml(steps) {
    return `<ol class="flow">${steps.map((f) => `<li><span class="actor">${esc(f.a)}</span><span>${esc(f.t)}</span></li>`).join("")}</ol>`;
  }
  function rolesHtml(roles) {
    return `<div class="roles">${Object.keys(ROLE_LABEL).map((k) => `<div class="role"><h4>${ROLE_LABEL[k]}</h4><ul>${(roles[k] || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  }
  function tableHtml(head, rows, cls = "") {
    return `<div class="tbl-wrap"><table class="tbl ${cls}"><thead><tr>${head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function detailStage(s) {
    const d = s.detail;
    const sec = [];
    sec.push({
      id: "van-de", h: "Vấn đề nghiệp vụ",
      html: `<div class="prob"><div><h4>Hiện trạng thường gặp</h4><p>${esc(d.problem.now)}</p></div>
        <div><h4>Hệ quả</h4><ul>${d.problem.effects.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div>`
    });
    let flow = "";
    if (d.flow) flow += `<h4>Các bước ${tagProc}</h4>${flowHtml(d.flow)}`;
    if (d.stageTable) flow += `<h4>Giai đoạn và điều kiện chuyển tiếp ${tagProc}</h4>${tableHtml(["Giai đoạn", "Điều kiện vào", "Điều kiện để sang bước sau"], d.stageTable)}<p class="fine">Đề xuất cho B2B SME, điều chỉnh theo quy trình thực tế.</p>`;
    if (d.readGuide) flow += `<h4>Đọc chỉ số để tìm điểm nghẽn ${tagProc}</h4>${tableHtml(["Dấu hiệu", "Có thể do", "Xem lại"], d.readGuide)}`;
    if (d.cadence) flow += `<h4>Nhịp xem số liệu ${tagProc}</h4>${tableHtml(["Nhịp", "Ai xem", "Xem gì"], d.cadence)}`;
    if (d.rules) flow += `<h4>Quy tắc đề xuất ${tagProc}</h4><ul class="rules">${d.rules.map((t) => `<li>${esc(t)}</li>`).join("")}</ul><p class="fine">Các ngưỡng thời gian là gợi ý ban đầu, doanh nghiệp chốt lại trong buổi khảo sát.</p>`;
    sec.push({ id: "luong", h: s.stage === 6 ? "Cách đọc và sử dụng" : "Luồng xử lý", html: flow });
    sec.push({ id: "vai-tro", h: "Vai trò", html: rolesHtml(d.roles) });
    const shots = d.system.filter((x) => x.shot).map((x) => x.shot);
    sec.push({
      id: "he-thong", h: "Vận hành trên hệ thống",
      html: `<p class="fine">Mỗi dòng là một khả năng của Base CRM được dùng ở chặng này. Nhãn "Cần xác minh" nghĩa là chưa đối chiếu được với trang sản phẩm và chưa được khẳng định với khách hàng.</p>
        ${sysList(d.system.map((x) => x.s))}
        <div class="shots">${shots.map((id) => shotFigure(id, { big: true })).join("")}</div>`
    });
    sec.push({
      id: "dieu-kien", h: "Điều kiện, giả định, phạm vi",
      html: `<div class="two"><div><h4>Giả định</h4><ul>${d.assumptions.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        <div><h4>Cần xác minh với sản phẩm</h4><ul class="verify">${d.verify.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div>`
    });
    return sec;
  }

  function detailGeneric(s) {
    return s.detail.sections.map((x, i) => {
      let html = "";
      if (x.list) html += `<ul>${x.list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
      if (x.flow) html += flowHtml(x.flow);
      if (x.terms) html += `<dl class="terms">${x.terms.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
      if (x.table) html += tableHtml(x.table.head, x.table.rows);
      if (x.legend)
        html += `<dl class="legend">
          <div><dt>${tagProc}</dt><dd>Cách doanh nghiệp nên tổ chức công việc. Đúng với mọi phần mềm, doanh nghiệp tự điều chỉnh.</dd></div>
          <div><dt>${tagSys}</dt><dd>Thao tác hoặc khả năng của Base CRM dùng để thực hiện quy trình.</dd></div>
          <div><dt><span class="vf pend">Cần xác minh</span></dt><dd>Khả năng sản phẩm chưa đối chiếu được với trang tham chiếu. Không khẳng định với khách cho tới khi xác minh.</dd></div>
          <div><dt><span class="tag ctxtag">Bối cảnh giả định</span></dt><dd>Ví dụ dùng để minh họa, không phải số liệu của doanh nghiệp.</dd></div>
        </dl>`;
      if (x.roleMatrix) {
        const st = SLIDES.filter((z) => z.kind === "stage");
        html += tableHtml(["Chặng", ...Object.values(ROLE_LABEL)], st.map((z) => [`${z.stage}. ${z.navLong}`, ...Object.keys(ROLE_LABEL).map((k) => (z.detail.roles[k] || [])[0] || "—")]), "roles-t");
      }
      if (x.roleValue)
        html += `<div class="roles">${Object.values(ROLE_VALUE).map((r) => `<div class="role"><h4>${esc(r.h)}</h4><ul>${r.t.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>`;
      if (x.note) html += `<p class="fine note">${esc(x.note)}</p>`;
      return { id: `muc-${i + 1}`, h: x.h, html };
    });
  }

  function renderDetail(s) {
    const sections = s.kind === "stage" ? detailStage(s) : detailGeneric(s);
    view.className = "v-detail";
    view.innerHTML = `<article class="detail">${detailHeader(s, sections)}
      ${sections.map((x) => `<section class="d-sec" id="${x.id}" tabindex="-1"><h2>${esc(x.h)}</h2>${x.html}</section>`).join("")}
    </article>`;
  }

  /* ------------------------------ SCRIPT ------------------------------ */
  function renderScript() {
    const parts = [
      { p: "Mở đầu: bài toán quản lý khách hàng và bán hàng", ids: ["mo-dau"] },
      { p: "Tổng quan hành trình khách hàng", ids: ["tong-quan"] },
      { p: "Tiếp nhận, phân công, chăm sóc", ids: ["c1", "c2", "c3"] },
      { p: "Chuyển đổi và quản lý cơ hội", ids: ["c4", "c5"] },
      { p: "Hiệu quả đội Sales và báo cáo quản trị", ids: ["c6"] },
      { p: "Tổng kết giải pháp và giá trị", ids: ["tong-ket"] }
    ];
    let acc = 0;
    const rows = parts.map((pt, i) => {
      const sl = pt.ids.map((id) => SLIDES[idx(id)]);
      const m = sl.reduce((a, b) => a + b.minutes, 0);
      const start = acc; acc += m;
      return `<tr>
        <th scope="row"><span class="pn">${i + 1}</span> ${esc(pt.p)}</th>
        <td class="num">${fmtMin(m)}</td><td class="num">${fmtMin(start)}–${fmtMin(acc)}</td>
        <td>${sl.map((x) => `<div class="sc-sl"><a href="#/s/${x.id}">${esc(stageLabel(x))}${x.kind === "stage" ? ` · ${esc(x.nav)}` : ""}</a> <span class="fine">${fmtMin(x.minutes)}</span>
          <ul>${x.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>`).join("")}</td>
      </tr>`;
    }).join("");
    view.className = "v-doc";
    view.innerHTML = `<article class="doc">
      <header class="d-head"><div><p class="kicker">Tài liệu người trình bày</p><h1>Kịch bản trình bày 10 phút</h1>
      <p class="lead">Thời lượng là phân bổ tham khảo. Khi khách quan tâm một chặng, mở lớp Chi tiết của chặng đó thay vì kéo dài slide.</p></div>
      <a class="back" href="#/s/${route.lastId || "mo-dau"}"><span aria-hidden="true">←</span> Quay lại trình bày</a></header>
      <div class="tbl-wrap"><table class="tbl script"><thead><tr><th scope="col">Phần</th><th scope="col">Thời lượng</th><th scope="col">Mốc</th><th scope="col">Slide và lời dẫn</th></tr></thead>
      <tbody>${rows}</tbody><tfoot><tr><th scope="row">Tổng</th><td class="num">${fmtMin(acc)}</td><td></td><td></td></tr></tfoot></table></div>
      <section class="d-sec"><h2>Phím tắt khi trình chiếu</h2>
      <dl class="keys"><div><dt><kbd>→</kbd> <kbd>PageDown</kbd> <kbd>Space</kbd></dt><dd>Slide tiếp theo</dd></div>
      <div><dt><kbd>←</kbd> <kbd>PageUp</kbd></dt><dd>Slide trước</dd></div>
      <div><dt><kbd>D</kbd></dt><dd>Mở / đóng lớp Chi tiết của chặng đang xem</dd></div>
      <div><dt><kbd>O</kbd></dt><dd>Về sơ đồ hành trình</dd></div>
      <div><dt><kbd>1</kbd>–<kbd>6</kbd></dt><dd>Đi thẳng tới chặng</dd></div>
      <div><dt><kbd>N</kbd></dt><dd>Ghi chú người trình bày và đồng hồ</dd></div>
      <div><dt><kbd>F</kbd></dt><dd>Toàn màn hình</dd></div></dl></section>
    </article>`;
  }

  /* -------------------------------- QA -------------------------------- */
  function renderQa() {
    const pend = [];
    SLIDES.forEach((s) => {
      if (s.kind !== "stage") return;
      const items = [...s.system, ...s.detail.system.map((x) => x.s)];
      const seen = new Set();
      items.forEach((it) => { if (!seen.has(it.t)) { seen.add(it.t); pend.push({ s, it }); } });
    });
    const unverified = pend.filter((p) => p.it.status !== "verified");
    const shotRows = Object.entries(SHOTS).map(([id, s]) => {
      const used = SLIDES.filter((x) => x.shot === id || (x.detail && x.detail.system && x.detail.system.some((y) => y.shot === id))).map((x) => stageLabel(x));
      return `<tr><th scope="row"><code>${esc(s.file)}</code></th><td>${esc([...new Set(used)].join(", "))}</td><td>${esc(s.need)}</td>
        <td>${shotOk[id] ? `<span class="vf ok">Đã có</span>` : `<span class="vf pend">Chưa có</span>`}</td></tr>`;
    }).join("");
    const groups = (window.QA_RESULTS && window.QA_RESULTS.groups) || [];
    const stLabel = { pass: ["ok", "Đạt"], fail: ["bad", "Lỗi"], limit: ["pend", "Chưa kiểm tra được"], pending: ["pend", "Chờ xác minh"] };
    view.className = "v-doc";
    view.innerHTML = `<article class="doc">
      <header class="d-head"><div><p class="kicker">Tài liệu nội bộ</p><h1>Kết quả kiểm tra và nội dung cần xác minh</h1>
      <p class="lead">${esc((window.QA_RESULTS && window.QA_RESULTS.summary) || "Chưa có kết quả kiểm tra.")}</p></div>
      <a class="back" href="#/s/${route.lastId || "mo-dau"}"><span aria-hidden="true">←</span> Quay lại trình bày</a></header>
      ${groups.map((g) => `<section class="d-sec"><h2>${esc(g.h)}</h2><ul class="qa">${g.items.map((it) => {
        const [c, l] = stLabel[it.st] || stLabel.pending;
        return `<li><span class="vf ${c}">${l}</span><div><b>${esc(it.t)}</b>${it.how ? `<p class="fine">${esc(it.how)}</p>` : ""}</div></li>`;
      }).join("")}</ul></section>`).join("")}
      <section class="d-sec"><h2>Khả năng sản phẩm cần xác minh (${unverified.length})</h2>
        <p class="fine">Danh sách lấy tự động từ nội dung. Xác minh bằng trang https://base.vn/platform/crm, https://base.vn/ hoặc tài liệu chính thức; sau đó đổi trạng thái trong js/content.js.</p>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Chặng</th><th scope="col">Khả năng được nhắc tới</th><th scope="col">Trạng thái</th></tr></thead>
        <tbody>${pend.map((p) => `<tr><th scope="row">${esc(stageLabel(p.s))}</th><td>${esc(p.it.t)}</td><td>${badge(p.it)}</td></tr>`).join("")}</tbody></table></div>
      </section>
      <section class="d-sec"><h2>Ảnh giao diện cần bổ sung</h2>
        <p class="fine">Đặt ảnh đúng tên file vào thư mục assets/base/. Website tự hiển thị ảnh, không cần sửa mã. Sau đó điền nguồn ảnh và tọa độ điểm chú thích trong js/content.js.</p>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">File</th><th scope="col">Dùng ở</th><th scope="col">Ảnh cần có</th><th scope="col">Trạng thái</th></tr></thead><tbody>${shotRows}</tbody></table></div>
      </section>
    </article>`;
  }

  /* ----------------------------- ROUTER ----------------------------- */
  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    const [m, id] = h.split("/");
    if (m === "script" || m === "qa") return { mode: m, id: null };
    if ((m === "s" || m === "d") && idx(id) >= 0) return { mode: m, id };
    return { mode: "s", id: SLIDES[0].id };
  }

  function go(mode, id) { location.hash = `#/${mode}/${id}`; }

  function render() {
    const prevMode = route.mode, prevId = route.id;
    route = { ...parse(), lastId: route.lastId };
    if (route.id) route.lastId = route.id;
    const s = route.id ? SLIDES[idx(route.id)] : null;
    if (route.mode === "s") renderSlide(s);
    else if (route.mode === "d") renderDetail(s);
    else if (route.mode === "script") renderScript();
    else renderQa();

    document.body.dataset.mode = route.mode;
    updateJourney();
    updateBar(s);
    updateNotes();
    $("#lnkScript").toggleAttribute("aria-current", route.mode === "script");
    $("#lnkQa").toggleAttribute("aria-current", route.mode === "qa");
    if (route.mode === "script") $("#lnkScript").setAttribute("aria-current", "page");
    if (route.mode === "qa") $("#lnkQa").setAttribute("aria-current", "page");

    document.title = `${s ? (s.kind === "stage" ? `Chặng ${s.stage}: ${s.navLong}` : s.nav) : route.mode === "script" ? "Kịch bản" : "Kiểm tra"} · Giải pháp CRM`;
    if (prevMode !== route.mode || prevId !== route.id) {
      window.scrollTo(0, 0);
      view.scrollTop = 0;
      view.focus({ preventScroll: true });
    }
  }

  function updateBar(s) {
    const modeBtns = document.querySelectorAll("#modeSwitch button");
    modeBtns.forEach((b) => {
      const on = b.dataset.mode === route.mode;
      b.setAttribute("aria-pressed", String(on));
      b.disabled = !s; // trên trang Kịch bản / Kiểm tra không có chặng để chuyển chế độ
    });
    const prev = $("#prev"), next = $("#next");
    if (!s) {
      prev.hidden = next.hidden = true;
      $("#where").textContent = route.mode === "script" ? "Kịch bản trình bày" : "Kiểm tra và xác minh";
      return;
    }
    prev.hidden = next.hidden = false;
    const i = idx(s.id);
    prev.disabled = i === 0;
    next.disabled = i === SLIDES.length - 1;
    const pl = SLIDES[i - 1], nl = SLIDES[i + 1];
    prev.querySelector(".lbl").textContent = pl ? stageLabel(pl) : "Trước";
    next.querySelector(".lbl").textContent = nl ? stageLabel(nl) : "Hết";
    prev.setAttribute("aria-label", pl ? `Trước: ${pl.navLong || pl.nav}` : "Không có slide trước");
    next.setAttribute("aria-label", nl ? `Tiếp: ${nl.navLong || nl.nav}` : "Đã tới slide cuối");
    $("#where").textContent = `${i + 1} / ${SLIDES.length} · ${route.mode === "d" ? "Chi tiết" : "Trình bày"}`;
    $("#mapBtn").toggleAttribute("aria-current", s.id === "tong-quan" && route.mode === "s");
  }

  function step(dir) {
    if (!route.id) return;
    const i = idx(route.id) + dir;
    if (i < 0 || i >= SLIDES.length) return;
    go(route.mode, SLIDES[i].id);
  }

  /* --------------------------- GHI CHÚ & GIỜ --------------------------- */
  let t0 = null, tAcc = 0, tick = null;
  const notes = $("#notes");
  function updateNotes() {
    const s = route.id ? SLIDES[idx(route.id)] : null;
    if (!s) { $("#notesTitle").textContent = "Không có ghi chú cho trang này"; $("#notesList").innerHTML = ""; $("#notesPlan").textContent = ""; return; }
    const i = idx(s.id);
    const before = SLIDES.slice(0, i).reduce((a, b) => a + b.minutes, 0);
    const total = SLIDES.reduce((a, b) => a + b.minutes, 0);
    $("#notesTitle").textContent = `${stageLabel(s)}${s.kind === "stage" ? ` · ${s.navLong}` : ""}`;
    $("#notesPlan").textContent = `Thời lượng ${fmtMin(s.minutes)} · nên bắt đầu ở ${fmtMin(before)}, kết thúc ở ${fmtMin(before + s.minutes)} / ${fmtMin(total)}`;
    $("#notesList").innerHTML = s.notes.map((n) => `<li>${esc(n)}</li>`).join("");
  }
  function toggleNotes(force) {
    const open = force ?? notes.hidden;
    notes.hidden = !open;
    $("#notesBtn").setAttribute("aria-pressed", String(open));
    document.body.classList.toggle("notes-open", open);
  }
  const showTime = () => {
    const ms = tAcc + (t0 ? Date.now() - t0 : 0);
    const sec = Math.floor(ms / 1000);
    $("#timerVal").textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  };
  $("#timerBtn").addEventListener("click", (e) => {
    if (t0) { tAcc += Date.now() - t0; t0 = null; clearInterval(tick); e.target.textContent = "Tiếp tục"; }
    else { t0 = Date.now(); tick = setInterval(showTime, 500); e.target.textContent = "Tạm dừng"; }
    showTime();
  });
  $("#timerReset").addEventListener("click", () => { t0 = null; tAcc = 0; clearInterval(tick); $("#timerBtn").textContent = "Bắt đầu"; showTime(); });
  $("#notesBtn").addEventListener("click", () => toggleNotes());
  $("#notesClose").addEventListener("click", () => toggleNotes(false));

  /* ----------------------------- SỰ KIỆN ----------------------------- */
  $("#prev").addEventListener("click", () => step(-1));
  $("#next").addEventListener("click", () => step(1));
  $("#modeSwitch").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-mode]");
    if (!b || !route.id || b.dataset.mode === route.mode) return;
    go(b.dataset.mode, route.id);
  });
  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };
  $("#fsBtn").addEventListener("click", toggleFs);
  document.addEventListener("fullscreenchange", () => {
    $("#fsBtn").textContent = document.fullscreenElement ? "Thoát toàn màn hình" : "Toàn màn hình";
  });
  if (!document.documentElement.requestFullscreen) $("#fsBtn").hidden = true;

  // Liên kết neo trong trang chi tiết: cuộn tới mục mà không đổi route
  view.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-anchor]");
    if (a) {
      e.preventDefault();
      const t = document.getElementById(a.dataset.anchor);
      if (t) { t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); t.focus({ preventScroll: true }); }
      return;
    }
    const z = e.target.closest("[data-zoom]");
    if (z) {
      const s = SHOTS[z.dataset.zoom];
      $("#lbBody").innerHTML = `<img src="${esc(s.file)}" alt="${esc(s.title)}"><p>${esc(s.title)}</p>`;
      $("#lightbox").showModal();
    }
  });
  // Nối chú thích và điểm đánh dấu trên ảnh
  view.addEventListener("mouseover", (e) => {
    const li = e.target.closest(".callouts li, .mk");
    view.querySelectorAll(".mk.on, .callouts li.on").forEach((x) => x.classList.remove("on"));
    if (!li) return;
    const fig = li.closest("figure");
    fig.querySelectorAll(`[data-i="${li.dataset.i}"]`).forEach((x) => x.classList.add("on"));
  });
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") e.target.close(); });

  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    if ($("#lightbox").open) return;
    const k = e.key;
    const onSlide = route.mode === "s";
    const onCtl = e.target.closest("button, a, summary");
    if (k === "ArrowRight" || k === "PageDown" || (k === " " && onSlide && !onCtl)) { e.preventDefault(); step(1); }
    else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); step(-1); }
    else if (k === "d" || k === "D") { if (route.id) go(route.mode === "d" ? "s" : "d", route.id); }
    else if (k === "o" || k === "O") go("s", "tong-quan");
    else if (k === "n" || k === "N") toggleNotes();
    else if (k === "f" || k === "F") toggleFs();
    else if (k === "Escape" && !notes.hidden) toggleNotes(false);
    else if (/^[1-6]$/.test(k)) go(route.mode === "d" ? "d" : "s", `c${k}`);
    else if (k === "Home" && route.id && onSlide) go("s", SLIDES[0].id);
    else if (k === "End" && route.id && onSlide) go("s", SLIDES[SLIDES.length - 1].id);
  });

  window.addEventListener("hashchange", render);

  probeShots().then(() => {
    renderJourney();
    render();
  });
})();
