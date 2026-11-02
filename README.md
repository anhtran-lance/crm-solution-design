# Giải pháp CRM cho đội Sales B2B: Solution Design tương tác

Website trình bày giải pháp quản lý khách hàng và bán hàng cho doanh nghiệp B2B SME có 10–15 nhân viên Sales, minh họa trên Base CRM. Dùng trực tiếp trên trình duyệt trong buổi trình bày 10 phút.

## Mở website

Website là trang tĩnh, không cần cài đặt hay build. Vì website tự kiểm tra file ảnh trong `assets/base/`, nên mở qua một máy chủ tĩnh bất kỳ thay vì nhấp đúp file:

```bash
python3 -m http.server 8000
```

Sau đó mở `http://localhost:8000`. Có thể đưa nguyên thư mục lên GitHub Pages, Vercel hoặc Netlify.

## Cấu trúc trải nghiệm

| Lớp | Đường dẫn | Mục đích |
|---|---|---|
| Presentation Mode | `#s-<slide>` | 9 slide: Mở đầu, Tổng quan, 6 chặng, Tổng kết. Mỗi màn hình một thông điệp. |
| Solution Detail | `#d-<slide>` | Vấn đề, luồng xử lý, quy tắc, vai trò, thao tác trên hệ thống, giả định và câu hỏi cần xác minh. Giữ nguyên chặng đang xem. |
| Kịch bản | `#script` | Phân bổ 10 phút, mốc thời gian, lời dẫn cho từng slide. |
| Kiểm tra | `#qa` | Kết quả kiểm tra A–D, danh sách khả năng sản phẩm cần xác minh, danh sách ảnh cần bổ sung. |

Phím tắt: `→`/`←` (hoặc PageDown/PageUp của bút trình chiếu), `1`–`6` đi tới chặng, `D` mở/đóng Chi tiết, `O` về sơ đồ hành trình, `N` ghi chú người trình bày kèm đồng hồ, `F` toàn màn hình.

## Ba loại nội dung

Toàn bộ chữ nằm trong `js/content.js` và được tách thành:

- **Đề xuất quy trình**: cách doanh nghiệp nên tổ chức công việc, không phụ thuộc phần mềm.
- **Trên Base CRM**: khả năng của sản phẩm. Mỗi mục có trạng thái `pending` (hiển thị *Cần xác minh*) hoặc `verified` (hiển thị *Đã xác minh*, kèm nguồn).
- **Bối cảnh giả định**: ví dụ minh họa (12 Sales, 3 nhóm…), không phải dữ kiện của khách hàng.

## Việc còn lại trước khi dùng với khách hàng

Trong lúc xây dựng, môi trường làm việc không truy cập được `base.vn` (chính sách mạng chặn tên miền này). Vì vậy:

1. **Chưa có ảnh giao diện Base CRM thật.** Các vị trí ảnh hiển thị khung "Cần bổ sung ảnh" có mô tả ảnh cần chụp. Xem danh sách ở `assets/base/README.md` hoặc trang `#qa`.
2. **Mọi khả năng của Base CRM đang ở trạng thái Cần xác minh.** Đối chiếu từng mục với https://base.vn/platform/crm và https://base.vn/, rồi:
   - đúng: đổi thành `sys("...", "verified", "URL nguồn")`;
   - không đúng hoặc không có: xóa mục đó, hoặc chuyển nội dung thành đề xuất quy trình.
3. Trả lời các câu hỏi trong phần *Cần xác minh với sản phẩm* ở trang Chi tiết của từng chặng.
4. Chạy thử trên trình duyệt sẽ dùng (Safari, Firefox, Edge), trên máy chiếu và với bút trình chiếu.
5. Diễn tập có bấm giờ để chỉnh thời lượng trong `minutes` của từng slide.

## Cấu trúc thư mục

```
index.html          Khung trang
css/style.css       Giao diện
js/content.js       Nội dung, ảnh, trạng thái xác minh
js/app.js           Điều hướng và hiển thị
js/qa-results.js    Kết quả kiểm tra gần nhất
assets/base/        Ảnh giao diện Base CRM (đặt đúng tên file)
archive/            Bản trước (trang cuộn cho công ty thiết bị văn phòng); không dùng nữa vì có màn hình tự dựng mô phỏng giao diện Base
```
