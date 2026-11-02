# Giải pháp CRM cho đội Sales B2B: website Solution Design

Website trình bày giải pháp quản lý khách hàng và bán hàng cho doanh nghiệp B2B SME có 10–15 nhân viên Sales, minh họa bằng giao diện Base CRM. Dùng trực tiếp trên trình duyệt: vừa đọc như một trang web, vừa trình chiếu trong buổi gặp khách 10 phút.

## Mở website

Trang tĩnh, không cần cài đặt:

```bash
python3 -m http.server 8000
```

Mở `http://localhost:8000`. Có thể đưa nguyên thư mục lên GitHub Pages, Vercel hoặc Netlify.

## Trang có gì

| Trang | Nội dung |
|---|---|
| `index.html` | Website chính, một trang cuộn: Mở đầu → Bài toán → Hành trình 6 chặng → 6 chặng → Tổng kết → Bước tiếp theo |
| `script.html` | Kịch bản 10 phút, mốc thời gian và lời dẫn từng màn hình |
| `qa.html` | Kết quả kiểm tra A–D, danh sách khả năng sản phẩm kèm nguồn, các điểm còn cần xác nhận, danh sách ảnh |

Mỗi chặng gồm: câu hỏi quản lý, thông điệp chính, các thao tác trên hệ thống (tự chuyển như trên base.vn, bấm để chọn), ảnh giao diện có điểm chú thích đánh số, cách tổ chức (đề xuất quy trình), giá trị cho Sales và Quản lý. Nút **Chi tiết giải pháp** mở ngay trong chặng: vấn đề, luồng xử lý, quy tắc, vai trò, khả năng sản phẩm kèm nguồn, giả định.

**Chế độ trình bày** (nút Trình bày hoặc phím `P`): mỗi phần một màn hình, phím `→` / `PageDown` đi lần lượt qua từng thao tác rồi sang chặng sau, `N` mở ghi chú và mốc giờ, `1`–`6` tới thẳng chặng, `Esc` thoát.

## Nguồn và cách xác minh

- Khả năng sản phẩm: đối chiếu với https://base.vn/platform/crm, https://base.vn/app/lead, https://base.vn/app/sales ngày 02/11/2026. Mỗi khả năng trong `js/content.js` mang nguồn của nó (`sys("...", SRC.lead)`).
- Ảnh trong `assets/base/`: chụp từ giao diện minh họa sản phẩm trên các trang trên (độ phân giải gấp đôi), dữ liệu trong ảnh là dữ liệu mẫu của Base. Tọa độ điểm chú thích trong `js/marks.js` lấy từ vị trí chữ trên trang lúc chụp.
- Biểu tượng ứng dụng trong `assets/icons/`: lấy từ cùng trang base.vn/platform/crm.
- Bối cảnh doanh nghiệp (12 Sales, 3 nhóm), quy tắc, ngưỡng thời gian, giai đoạn bán hàng và chỉ số: đề xuất để thiết kế, ghi nhãn "Đề xuất quy trình".

Còn 4 điểm chưa thấy trên trang tham chiếu (tổng đài tạo lead, Zalo OA tạo lead, đổi người phụ trách hàng loạt, ghi âm cuộc gọi). Website không khẳng định các điểm này; xem trang `qa.html`.

## Cấu trúc thư mục

```
index.html, script.html, qa.html
css/site.css        Giao diện (kế thừa ngôn ngữ thiết kế base.vn: Inter, nền xanh lá đậm, nút viên thuốc xanh dương)
js/content.js       Toàn bộ nội dung, nguồn, ảnh
js/marks.js         Tọa độ điểm chú thích trên ảnh
js/site.js          Dựng trang, tab thao tác, chế độ trình bày
js/docs.js          Trang kịch bản và trang kiểm tra
js/qa-results.js    Kết quả kiểm tra gần nhất
assets/base/        Ảnh giao diện Base CRM (WebP)
assets/icons/       Biểu tượng ứng dụng Base
archive/            Bản đầu tiên, không dùng nữa
```
