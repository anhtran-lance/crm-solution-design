---
name: base-web-design-system
description: Hệ thiết kế và danh mục sản phẩm của base.vn — màu, chữ, bóng, chuyển động, 13 mẫu bố cục, các họ hiệu ứng, icon chính thức của 39 app, danh mục 69 ứng dụng (Base Work, HRM, CRM, AI, Finance…), cùng script quét lại web và chụp giao diện sản phẩm thật. Dùng skill này bất cứ khi nào làm tài liệu, trang HTML, slide, solution design, techmap, báo cáo hoặc demo **mang nhận diện Base** hoặc **giới thiệu một app Base** cho khách — kể cả khi người dùng chỉ nói "làm theo phong cách base.vn", "lấy thiết kế / hiệu ứng / ảnh từ web Base", "app X của Base làm gì", "icon app Base", hay gửi link base.vn/app/… hoặc base.vn/platform/…. Các skill dựng tài liệu khác (vd. base-crm-solution-design) nên đọc skill này trước để lấy thiết kế và ảnh mới nhất.
---

# Hệ thiết kế base.vn

Skill này giữ **cách base.vn trông và chuyển động** cùng **danh mục sản phẩm Base**, để mọi tài liệu làm cho khách mang đúng nhận diện mà không phải dò lại web mỗi lần. Dữ liệu quét ngày 03/11/2026 từ 36 trang sản phẩm (bỏ qua giải pháp theo ngành, khách hàng, blog).

## Có gì trong skill

| Đường dẫn | Nội dung | Khi nào đọc |
|---|---|---|
| `references/tokens.md` | Màu (xanh Base `#1F62E8`, thang brand, navy, trạng thái, tím AI), gradient, chữ (Inter; Rubik cho giao diện app), bo góc, bóng, thông số chuyển động | Luôn đọc trước khi dựng giao diện |
| `references/effects.md` | 13 mẫu bố cục lặp lại trên web (kèm ảnh), thành phần chung, 9 họ hiệu ứng và cách dựng lại, quy tắc mượn | Khi chọn bố cục / hiệu ứng |
| `references/products.md` | 69 app theo 10 nhóm (nhãn, mô tả, trạng thái, trang), 3 bộ Work / HRM / CRM, các phần nội dung trên trang từng app | Khi cần hiểu app làm gì, chọn app cho giải pháp, tìm trang để chụp ảnh |
| `assets/base.css` | Token + thành phần + hiệu ứng dựng sẵn, tiền tố `.bds-*` | Nhúng vào trang HTML |
| `assets/effects.js` | `BDS.reveal / cycle / marquee / typewriter / countUp / parallax / connect / travel / accordionStage` — tự dừng khi khuất màn hình, tôn trọng giảm chuyển động | Nhúng khi cần chuyển động |
| `assets/demo.html` | Trang mẫu chạy đủ: hero chia đôi + thông báo nổi, lưới app navy + dải chạy, kiến trúc vòng tròn có đường nối, accordion + màn hình, dải CTA | Mở để xem, chép đoạn cần dùng |
| `assets/patterns/*.jpg` | 13 ảnh chụp mẫu bố cục từ base.vn | Nhìn trước khi dựng một mẫu |
| `assets/app-icons/*.svg` | Icon chính thức 39 app (prospect, lead, sales, commerce, hris, payroll, workflow…) | Dùng đúng icon khi nhắc tới app |
| `scripts/capture_app.js` | Chụp giao diện sản phẩm thật từ bất kỳ trang nào, tự dò khung giao diện | Cần ảnh hệ thống thật |
| `scripts/scan_site.js` | Quét lại cả web: danh mục, token, icon, từng trang (cuộn, chụp, bấm mọi nút) | Dữ liệu cũ hơn ~1 tháng, hoặc web vừa đổi |

## Cách làm

1. **Kiểm tra độ mới.** Dữ liệu trong skill có ngày quét. Nếu tài liệu quan trọng hoặc đã quá ~1 tháng, chạy nhanh `node scripts/scan_site.js <ra> --catalog --tokens --icons` (~2 phút) và so với `references/`. Báo người dùng nếu có app mới, app vừa ra mắt, hoặc màu đổi. Quét đủ từng trang (`--pages`) mất ~10–15 phút — chỉ chạy khi cần.
   - Nếu môi trường chặn `base.vn` hoặc `static-ai.stdfiles.com`: báo người dùng thêm vào Allowed domains; trong lúc chờ dùng dữ liệu có sẵn trong skill, nói rõ ngày quét.
2. **Hiểu sản phẩm từ `products.md`**, không đoán. Phân biệt app đã có trang ("live") và "Coming soon" — không giới thiệu app Coming soon như đã dùng được.
3. **Chọn mẫu bố cục** trong `effects.md`, mở ảnh tương ứng trong `assets/patterns/` để nhìn.
4. **Dựng bằng `base.css` + `effects.js`**: chép hai file cạnh trang, thêm class `bds` cho `<body>` (hoặc khối bao), dùng các lớp `.bds-*`. Muốn đổi màu theo khách thì ghi đè biến `--bds-*`, đừng sửa thư viện.
5. **Ảnh hệ thống thật**: `node scripts/capture_app.js <ra> /app/lead /app/sales …`. Mỗi trang ra ảnh 2× từng khung + `index.json` (tiêu đề section, chữ đầu khung) để biết ảnh nói gì. **Mở xem từng ảnh** trước khi dùng — bỏ khung trang trí, khung bị cắt; đổi sang `.webp` ≤1800px.
6. **Icon app**: lấy từ `assets/app-icons/<app>.svg`. App chưa có icon trong thư mục thì icon có dạng `https://static-ai.stdfiles.com/fav/<app>?color=…` — xem `_sources.json`.
7. **Kiểm tra** trên máy tính và điện thoại 375px: không tràn ngang, không lỗi console, hiệu ứng dừng khi khuất màn hình.

## Nguyên tắc

- **Mượn thiết kế và hiệu ứng, không mượn câu chữ.** Câu chữ marketing trên web chỉ để hiểu sản phẩm; nội dung tài liệu phải là của khách. (Người dùng đã dặn rõ khi mượn phần "Kiến trúc Agent": lấy thiết kế, không lấy nội dung.)
- **Giao diện sản phẩm là nhân vật chính**, và nó nên tự chạy để kể chuyện (khách đi qua luồng, thẻ sáng lần lượt, thông báo bật lên) — giống web Base. Không thêm chuyển động chỉ để trang trí.
- **Ảnh và dữ liệu trên web là dữ liệu mẫu của Base** (tên khách, số tiền). Khi dùng, ghi nguồn và ngày chụp; khi tự dựng lại giao diện bằng dữ liệu khác, ghi "minh họa".
- **Không dùng ảnh workspace của khách thật** (ảnh người dùng gửi từ hệ thống của một khách khác): vẽ lại cấu trúc bằng dữ liệu minh họa.
- Web chỉ dùng chế độ sáng; section tối (navy) dùng xen kẽ để nhấn.
