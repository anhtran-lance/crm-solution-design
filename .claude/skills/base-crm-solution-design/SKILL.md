---
name: base-crm-solution-design
description: Dựng bản solution design Base CRM (Prospect, Lead, Sales) dạng trang HTML tương tác để trình bày 10 phút cho khách chưa từng dùng CRM — gắn với hành trình mua hàng của khách, có lưu đồ giải pháp "mọi nguồn vào một cửa", ảnh hệ thống thật chụp từ base.vn, điều hướng luôn biết đang ở đâu. Dùng skill này bất cứ khi nào người dùng nói "làm solution design CRM", "thiết kế giải pháp CRM cho khách X", "trình bày Base CRM cho khách", "lưu đồ Prospect Lead Sales", "demo CRM theo customer journey", hoặc đưa link base.vn/platform/crm và cần một tài liệu thuyết phục khách — kể cả khi không nói chữ "solution design".
---

# Base CRM · Solution design

Tạo một trang HTML (một file `index.html` + `style.css` + `app.js` + ảnh) để Solution Engineer trình bày Base CRM cho khách trong khoảng 10 phút. Khách **chưa từng biết CRM**, nên trang phải nhìn là hiểu, ít chữ, ảnh hệ thống thật là nội dung chính.

Bộ khung đã hoàn thiện nằm trong `template/` (tình huống mẫu: công ty phân phối thiết bị văn phòng, 10 sale). **Bắt đầu từ template, đổi nội dung theo khách** — đừng viết lại từ đầu, vì template đã qua nhiều vòng sửa UI/UX với người dùng thật (xem "Bài học" bên dưới).

## Bước 0 — Hỏi trước khi làm

Hỏi gọn trong một lượt (dùng AskUserQuestion nếu có), vì mỗi câu trả lời đổi cả bản thiết kế:

1. **Khách là ai**: ngành, quy mô đội sale, bán B2B hay B2C, khách hiện quản lý bằng gì.
2. **Khách dùng những app nào**: mặc định chỉ Prospect, Lead, Sales. Không đưa app khác (báo giá tự động, kho, hợp đồng, chăm sóc sau bán, Automation…) nếu khách không mua.
3. **Mấy quy trình bán**: mặc định **một quy trình bán**.
4. **Ảnh hệ thống lấy từ đâu**: chụp từ base.vn (cần mở mạng), hay người dùng gửi ảnh.
5. **Nhận diện**: dùng logo, màu Base (mặc định có) hay trung tính.

Nếu môi trường chặn `base.vn` (lỗi 403 / ENOTFOUND), báo người dùng thêm `base.vn` và `*.base.vn` vào Allowed domains của môi trường, rồi chờ — đừng tự vẽ ảnh giả thay ảnh thật.

## Phân vai 3 app — phải đúng, khách sẽ bắt lỗi

| App | Làm gì | Không làm |
|---|---|---|
| **Prospect** | Một **nguồn** của Lead: hộp thư chung Zalo OA, Facebook, chat web; AI trả lời ngoài giờ | Không phải "cửa tiếp nhận" |
| **Lead** | **Cửa tiếp nhận** ở giữa: gộp khách trùng, chuẩn hóa, chấm mức quan tâm, chia người, đồng hồ gọi lại, **gọi lại xác nhận nhu cầu** (vai trò lọc khách, giống SDR) | Không tư vấn, không khảo sát, không báo giá |
| **Sales** | **Đích đến**: khách đủ điều kiện thành cơ hội bán; sale **tư vấn, khảo sát, báo giá, đàm phán, chốt**; ghi nhận cuộc gọi / hotline; doanh số dự kiến | — |

Nguồn của Lead: Prospect, quảng cáo (form Facebook), form website, Excel / Google Sheet (danh thiếp hội chợ). **Hotline không phải nguồn của Lead** — ghi nhận cuộc gọi là việc trong Sales.

Hành trình 4 bước mặc định: **Hỏi giá** (Prospect) → **Được gọi lại, xác nhận nhu cầu** (Lead) → **Được tư vấn** (Sales) → **Báo giá, chốt đơn** (Sales). Quy trình bán trong Sales bắt đầu từ "Đủ điều kiện", không lặp bước liên hệ của Lead.

## Cấu trúc trang — 4 phần, không hơn

1. **Tổng quan** (~1′): phủ kín một màn hình. Một câu "CRM là gì?" bằng ngôn ngữ đời thường ("cuốn sổ khách hàng chung của cả công ty…"), 3 ô app nối mũi tên, ảnh 3 app chồng lên nhau. Hiệu ứng: nền aurora trôi, vòng xoay có chấm sáng, mỗi ~2,6s một app sáng lên kèm thông báo nổi (Tin Zalo mới → Đã chia cho sale → Chuyển sang Sales), ảnh khác tối đi, ảnh dịch nhẹ theo chuột. Bên dưới: thanh 4 phần, mỗi đoạn dài theo thời lượng.
2. **Lưu đồ giải pháp** (~3′) — phần quan trọng nhất:
   - **Khối 1 "Mọi nguồn khách vào một cửa: Lead"**: luồng **trái → phải**: Nguồn → vòng tròn Lead · Tiếp nhận (4 bước: Gộp trùng, Chuẩn hóa, Chấm điểm, Chia sale) → Khách mới + Khách chuẩn hóa (mức quan tâm, sale phụ trách, đồng hồ còn lại để gọi) → Sales · Quy trình bán. Có ô "Đã gộp khách trùng". Mô phỏng từng khách chạy theo đường cong SVG; một lượt là khách trùng (Zalo + Form web → 1 khách). Phong cách mượn từ phần "Kiến trúc Agent" trên base.vn: nền lưới mờ, tâm phát sáng, vòng xoay, đường mảnh, thẻ viền sáng theo lượt — **chỉ mượn thiết kế, không lấy nội dung**.
   - **Khối 2 "4 bước, mỗi bước một ứng dụng"**: các làn Khách đến từ / Khách hàng / Base CRM (khối màu theo app) / Giám đốc thấy; nút **"Hôm nay" / "Với Base CRM"** đổi cả lưu đồ sang trạng thái vướng (cam, nét đứt). Mỗi ô bấm được, nhảy tới bước chi tiết.
3. **Chi tiết từng bước** (~5′): thanh 4 bước dính dưới thanh điều hướng (ghi kèm tên app). Mỗi bước: 1 câu khách làm gì, ô **Hôm nay**, ô **Với Base CRM** (≤ ~30 chữ tổng), bên phải ảnh hệ thống thật (có tab nếu nhiều ảnh), bấm để phóng to.
4. **Góc quản lý** (~1′): một câu hỏi của giám đốc ("Tháng này về bao nhiêu?") + màn hình doanh số dự kiến trong Sales.

**Không thêm** phần triển khai 90 ngày, "bước tiếp theo", hiện trạng riêng — người dùng thấy rối và lạc đề. Hiện trạng đã nằm trong chế độ "Hôm nay".

## Viết chữ

- Ngôn ngữ nghiệp vụ của khách: "khách hỏi giá", "chia khách", "gọi lại", "báo giá", "doanh số dự kiến". Tránh lead, deal, pipeline, SLA, trigger trong lời văn.
- **Không gọi tên người** trong lời văn ("chị Trang"): khách không biết là ai. Dùng vai trò: "khách", "một khách doanh nghiệp chuyển văn phòng mới". Tên chỉ còn trong dữ liệu mẫu trên giao diện.
- Mức quan tâm: **Nóng / Ấm / Lạnh**, không dùng mã A1, B2.
- Tiêu đề ngắn, không để một chữ rơi xuống dòng riêng (template đã bật `text-wrap: balance`).
- Không bịa khách hàng thật, doanh số, trích dẫn. Ghi "dữ liệu minh họa" trên sơ đồ tự vẽ; ghi nguồn ảnh cuối trang.

## Ảnh hệ thống

Ảnh "thật" trên base.vn là giao diện dựng bằng HTML, không phải file ảnh — phải chụp bằng trình duyệt. Dùng `scripts/capture_base.js` (Playwright, Chromium có sẵn):

```bash
node <skill>/scripts/capture_base.js <thư-mục-ra>
```

Script cuộn từ từ (giao diện chỉ hiện khi cuộn tới), bấm đồng ý cookie, ẩn nút Zalo/điện thoại nổi, rồi chụp ở 2×: các màn hình app trên `/platform/crm` (`.ps-pf-moment`), 3 cửa sổ lớn đầu trang (`.pm-win--left/center/right`, chụp riêng từng cái bằng cách ẩn cửa sổ khác), màn AI xếp ưu tiên (`.pm-dk-stage`), bảng quy trình bán và hồ sơ + Copilot trên `/app/sales` (`.sales-heroboard`, `.cread-surface`). Sau khi chụp: **xem lại từng ảnh** — cắt viền nền tối, loại ảnh dính nút nổi; đổi sang `.webp` ≤1800px.

Template đã kèm sẵn bộ ảnh chụp ngày 02/11/2026 trong `template/assets/he-thong/` và icon 3 app trong `template/assets/brand/` — dùng lại nếu không cần ảnh mới.

**Không dùng ảnh workspace của khách thật** (người dùng có thể gửi ảnh cấu hình của khách khác, ví dụ tên công ty trên Lead Service / Automation): vẽ lại cấu trúc bằng dữ liệu minh họa. Ảnh Automation / cấu hình nội bộ cũng không đưa cho khách — quá kỹ thuật.

## Điều hướng — người xem luôn biết mình ở đâu

Template đã có, giữ nguyên khi sửa:
- Thanh tab dính: phần đang xem tô xanh, phần đã qua đánh dấu, góc phải "Phần x/4 › Bước y/4", thanh tiến độ.
- Thanh bước dính chỉ hiện trong Phần 3.
- Địa chỉ trang đổi theo vị trí; `#buoc-3` mở thẳng bước 3; bấm ô lưu đồ → nhảy đúng bước; cuối bước có "↑ Về lưu đồ".
- Phóng to ảnh, Esc quay về đúng chỗ. Phím 1–4 chuyển phần, ←/→ chuyển bước.
- **Chống nhảy trang**: 4 bước và các tab ảnh xếp chồng trong cùng một ô lưới (ẩn bằng `visibility`, không `display:none`), nên đổi bước không làm trang co giãn. Ảnh trong ô ẩn phải dùng `visibility:inherit` khi đang chọn, nếu không sẽ lộ ra.
- Ảnh dọc giới hạn theo chiều cao màn hình để không tràn khung.
- Hiệu ứng dừng khi khuất màn hình; tôn trọng `prefers-reduced-motion`.

## Kiểm tra trước khi giao

Chạy `scripts/qa.js` (Playwright) trên `index.html`:

```bash
node <skill>/scripts/qa.js /đường/dẫn/index.html <thư-mục-ảnh-kết-quả>
```

Script kiểm: không lỗi console; điện thoại 375px không tràn ngang; bấm tab, bấm ô lưu đồ, phím tắt cập nhật đúng "Phần/Bước" và địa chỉ; **đổi bước và đổi tab ảnh không làm đổi chiều cao trang / vị trí cuộn**; chụp màn hình desktop + mobile. Sau đó **tự mở xem các ảnh chụp** — tìm chữ rơi dòng, ảnh tràn, thẻ đè nhau, ảnh bước ẩn bị lộ.

## Giao

Commit + push nếu đang trong repo; đăng thành Artifact (index.html + style.css + app.js + assets) để người dùng có link xem ngay; báo ngắn những gì đổi và những điểm người dùng cần tự xác nhận với khách (các điểm vướng trong "Hôm nay" là giả định).

## Bài học từ người dùng (đừng lặp lại)

- Thiếu lưu đồ tổng quan → khách không thấy "giải pháp". Lưu đồ là trung tâm.
- Quá nhiều chữ, nhiều phần (hiện trạng, triển khai, bước tiếp theo) → rối. Giữ 4 phần.
- Đặt Prospect/Lead/Sales ngang hàng quanh một vòng tròn → sai bản chất. Lead là tâm, Prospect là nguồn, Sales là đích.
- Đặt "tư vấn" vào Lead → sai: tư vấn là việc của sale trong Sales.
- Hotline là nguồn của Lead → sai: ghi nhận cuộc gọi thuộc Sales.
- Gọi tên "chị Trang" trong lời văn → khách không hiểu là ai.
- Phần mở đầu tĩnh, trống → cần hiệu ứng và phủ kín màn hình.
- Chuyển bước làm trang nhảy → xếp chồng các bước.
- Nhãn "Lộ trình 10 phút" thừa → bỏ.
