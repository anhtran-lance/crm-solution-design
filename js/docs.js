/* Trang Kịch bản 10 phút và trang Kiểm tra & xác minh */
(() => {
  const { SRC, SHOTS, STAGES, SUMMARY, SCRIPT } = window.CRM;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (u) => u.replace(/^https?:\/\//, "");
  const fmt = (m) => `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, "0")}`;
  const doc = document.getElementById("doc");
  const anchorOf = (id) => (id === "mo-dau" ? "top" : id);

  if (doc.dataset.page === "script") {
    const parts = [];
    SCRIPT.forEach((s) => {
      const last = parts[parts.length - 1];
      if (last && last.part === s.part) last.items.push(s);
      else parts.push({ part: s.part, items: [s] });
    });
    let acc = 0;
    const rows = parts.map((p, i) => {
      const m = p.items.reduce((a, b) => a + b.min, 0), start = acc;
      acc += m;
      return `<tr><th scope="row"><span class="pn">${i + 1}</span>${esc(p.part)}</th><td class="num">${fmt(m)}</td><td class="num">${fmt(start)}–${fmt(acc)}</td>
        <td>${p.items.map((it) => {
          const st = STAGES.find((x) => x.id === it.id);
          const notes = st ? st.notes : it.id === "tong-ket" ? SUMMARY.notes : it.notes;
          return `<div class="sc"><a href="index.html#${anchorOf(it.id)}">${esc(it.label)}${st ? ` · ${esc(st.nav)}` : ""}</a> <span class="fine">${fmt(it.min)}${st ? ` · ${st.steps.length} bước thao tác` : ""}</span>
            <ul>${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>`;
        }).join("")}</td></tr>`;
    }).join("");
    doc.innerHTML = `
      <header class="doc-head"><p class="eyebrow">Tài liệu người trình bày</p><h1>Kịch bản trình bày 10 phút</h1>
        <p class="sub">Thời lượng là phân bổ tham khảo. Khi khách quan tâm một chặng, bấm "Chi tiết giải pháp" ngay trong chặng đó thay vì kéo dài phần trình bày.</p></header>
      <div class="tbl-wrap"><table class="tbl script"><thead><tr><th scope="col">Phần</th><th scope="col">Thời lượng</th><th scope="col">Mốc</th><th scope="col">Màn hình và lời dẫn</th></tr></thead>
        <tbody>${rows}</tbody><tfoot><tr><th scope="row">Tổng</th><td class="num">${fmt(acc)}</td><td></td><td></td></tr></tfoot></table></div>
      <section class="doc-sec"><h2>Cách dùng chế độ trình bày</h2>
        <dl class="keys">
          <div><dt><kbd>P</kbd> hoặc nút Trình bày</dt><dd>Bật / tắt chế độ trình bày. Mỗi phần chiếm một màn hình, phần chi tiết được ẩn.</dd></div>
          <div><dt><kbd>→</kbd> <kbd>PageDown</kbd> <kbd>Space</kbd></dt><dd>Bước tiếp theo: lần lượt từng thao tác trong chặng, rồi phần cách tổ chức và giá trị, rồi sang chặng sau. Dùng được với bút trình chiếu.</dd></div>
          <div><dt><kbd>←</kbd> <kbd>PageUp</kbd></dt><dd>Lùi một bước</dd></div>
          <div><dt><kbd>1</kbd>–<kbd>6</kbd></dt><dd>Đi thẳng tới chặng</dd></div>
          <div><dt><kbd>N</kbd></dt><dd>Ghi chú người trình bày, kèm mốc thời gian</dd></div>
          <div><dt><kbd>F</kbd></dt><dd>Toàn màn hình</dd></div>
          <div><dt><kbd>Esc</kbd></dt><dd>Thoát chế độ trình bày</dd></div>
        </dl></section>`;
    return;
  }

  /* --------------------------- Trang kiểm tra --------------------------- */
  const R = window.QA_RESULTS || { summary: "", groups: [] };
  const lab = { pass: ["ok", "Đạt"], fail: ["bad", "Lỗi"], limit: ["pend", "Chưa kiểm tra được"] };
  const claims = [];
  STAGES.forEach((s) => [...s.steps.map((x) => x.claim), ...(s.detail.claims || [])].forEach((c) => claims.push({ s, c })));
  const open = STAGES.flatMap((s) => s.detail.verify.map((v) => ({ s, v })));
  const used = {};
  STAGES.forEach((s) => s.steps.forEach((st) => (used[st.shot] = (used[st.shot] || []).concat(`Chặng ${s.n}`))));
  used["crm-hero-lead"] = ["Mở đầu", ...(used["crm-hero-lead"] || [])];
  used["crm-journey-lead"] = ["Mở đầu", ...(used["crm-journey-lead"] || [])];
  used["crm-journey-sales"] = ["Mở đầu", ...(used["crm-journey-sales"] || [])];
  used["crm-360"] = ["Tổng kết"];
  doc.innerHTML = `
    <header class="doc-head"><p class="eyebrow">Tài liệu nội bộ</p><h1>Kiểm tra và xác minh</h1><p class="sub">${esc(R.summary)}</p></header>
    ${R.groups.map((g) => `<section class="doc-sec"><h2>${esc(g.h)}</h2><ul class="qa">${g.items.map((it) => {
      const [c, l] = lab[it.st] || lab.limit;
      return `<li><span class="st ${c}">${l}</span><div><b>${esc(it.t)}</b>${it.how ? `<p class="fine">${esc(it.how)}</p>` : ""}</div></li>`;
    }).join("")}</ul></section>`).join("")}
    <section class="doc-sec"><h2>Khả năng sản phẩm được nhắc tới (${claims.length})</h2>
      <p class="fine">Mỗi khả năng đã được đọc thấy trên trang nguồn ngày 02/11/2026. Trang sản phẩm có thể thay đổi; nên kiểm tra lại trước buổi gặp khách.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Chặng</th><th scope="col">Khả năng</th><th scope="col">Nguồn</th></tr></thead><tbody>
      ${claims.map(({ s, c }) => `<tr><th scope="row">Chặng ${s.n}</th><td>${esc(c.t)}</td><td>${c.status === "verified" ? `<a href="${esc(c.src)}" target="_blank" rel="noopener">${esc(host(c.src))}</a>` : `<span class="st pend">Cần xác minh</span>`}</td></tr>`).join("")}
      </tbody></table></div></section>
    <section class="doc-sec"><h2>Nội dung còn cần xác nhận với Base (${open.length})</h2>
      <p class="fine">Những điểm này chưa thấy mô tả trên trang tham chiếu, nên website không khẳng định chúng.</p>
      <ul class="qa">${open.map(({ s, v }) => `<li><span class="st pend">Chặng ${s.n}</span><div><b>${esc(v)}</b></div></li>`).join("")}</ul></section>
    <section class="doc-sec"><h2>Ảnh giao diện (${Object.keys(SHOTS).length})</h2>
      <p class="fine">Chụp từ giao diện minh họa sản phẩm trên base.vn ngày 02/11/2026, độ phân giải gấp đôi màn hình. Không chỉnh sửa nội dung; chỉ cắt bỏ phần tiêu đề và mô tả của thẻ ở 4 ảnh (cảnh báo SLA, phân quyền, cài đặt giai đoạn, trường bắt buộc) và phần thẻ nổi đè ở cuối ảnh Kanban. Dữ liệu trong ảnh là dữ liệu mẫu của Base.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Ảnh</th><th scope="col">Nội dung</th><th scope="col">Dùng ở</th><th scope="col">Nguồn</th></tr></thead><tbody>
      ${Object.entries(SHOTS).map(([id, s]) => `<tr><th scope="row"><img class="thumb" src="${s.file}" alt="" loading="lazy"></th><td>${esc(s.title)}</td><td>${esc((used[id] || []).join(", "))}</td><td><a href="${s.src}" target="_blank" rel="noopener">${esc(host(s.src))}</a></td></tr>`).join("")}
      </tbody></table></div></section>`;
})();
