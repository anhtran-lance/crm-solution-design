# Mẫu thiết kế và hiệu ứng trên base.vn

Rút ra từ 36 trang sản phẩm (474 ảnh khung nhìn, 538 trạng thái sau khi bấm nút, 587 hiệu ứng đang chạy), quét ngày 03/11/2026. Ảnh tham chiếu cho từng mẫu ở `assets/patterns/`. Lớp CSS / hàm JS dựng sẵn ở `assets/base.css` và `assets/effects.js` — xem `assets/demo.html` để thấy tất cả chạy cùng nhau.

Nguyên tắc chung của site: **giao diện sản phẩm là nhân vật chính**. Gần như mọi section đều có một màn hình app được dựng bằng HTML (không phải ảnh chụp), và màn hình đó *tự chạy*: dữ liệu xuất hiện lần lượt, thẻ được "bấm", thông báo bật lên, đường dẫn sáng dần. Chữ ngắn, tiêu đề hai dòng, một cụm từ được tô màu.

## Mục lục mẫu bố cục

| # | Mẫu | Ảnh | Dùng khi |
|---|---|---|---|
| 1 | Hero chia đôi: chữ trái, cửa sổ sản phẩm phải + thẻ nổi | `01-hero-chia-doi-cua-so-san-pham.jpg` | mở đầu trang một app |
| 2 | Hero chữ gradient trên nền pastel | `02-hero-chu-gradient.jpg` | mở đầu, nhấn một lời hứa |
| 3 | Hero tối căn giữa, cửa sổ sản phẩm tràn đáy | `03-hero-toi-can-giua.jpg` | mở đầu bộ giải pháp (Work/HRM/CRM) |
| 4 | Bảng Kanban + chú thích nổi nối bằng đường chấm | `04-hero-bang-kanban-chu-thich-noi.jpg` | giải thích từng phần của một màn hình |
| 5 | Lưới icon app trên nền navy, một ô đang "sáng" | `05-luoi-icon-app-nen-navy.jpg` | cho thấy độ rộng hệ sinh thái |
| 6 | Khung chat AI + bảng dữ liệu bên cạnh | `06-ai-cung-mot-ngon-ngu.jpg` | AI / Copilot trả lời trên dữ liệu thật |
| 7 | Kiến trúc vòng tròn: tâm phát sáng, vòng xoay, thẻ đánh số 01–05 quanh tâm, dải chip chạy | `07-kien-truc-agent-vong-tron.jpg` | mô tả kiến trúc / một trung tâm điều phối |
| 8 | Hành trình: chữ trái dính, các thẻ bước nối tiếp bên phải theo dòng thời gian | `08-hanh-trinh-the-noi-tiep.jpg` | customer journey, quy trình nhiều bước |
| 9 | Nền tối: danh sách accordion trái (mục mở có thanh tiến độ), màn hình phải đổi theo mục | `09-accordion-trai-man-hinh-phai-nen-toi.jpg` | 3–5 năng lực của một app |
| 10 | Sơ đồ luồng trên nền tối: các thẻ màn hình nối bằng mũi tên | `10-so-do-luong-nen-toi.jpg` | dữ liệu chảy giữa các app |
| 11 | Quạt thẻ app: một thẻ giữa to, các thẻ hai bên nhỏ dần | `11-quat-the-app.jpg` | giới thiệu các app trong một bộ |
| 12 | Hàng tính năng xen kẽ: chữ + link "Khám phá →" một bên, màn hình mini một bên | `12-hang-tinh-nang-xen-ke.jpg` | liệt kê tính năng có minh họa |
| 13 | Dải CTA gradient xanh → tím, icon mờ trôi | `13-dai-cta-gradient.jpg` | kết trang |

Các mẫu phụ thường gặp: bento grid thẻ có màn hình mini; hàng logo khách hàng chạy ngang; carousel cảm nhận khách hàng (ảnh + trích dẫn + nút trước/sau); dải huy hiệu chứng nhận chạy ngang; FAQ dạng accordion; khối tích hợp (logo đối tác xếp lưới, có chấm kết nối "MCP"); bảng giá có tab theo bộ.

## Thành phần lặp lại

- **Nhãn trên tiêu đề (eyebrow)**: chữ in hoa nhỏ, giãn chữ, có chấm màu hoặc viên thuốc nền nhạt — `BASE CRM · GIẢI PHÁP VẬN HÀNH KINH DOANH TOÀN DIỆN`. → `.bds-eyebrow`
- **Tiêu đề có cụm tô màu**: một cụm xanh Base hoặc gradient. → `.bds-hl`, `.bds-grad-text`
- **Cửa sổ sản phẩm**: bo 14–16px, viền mảnh, bóng xanh nhẹ, thanh trên có 3 chấm + ô URL (`sale.base.vn /pipeline/…`). → `.bds-window`
- **Thẻ nổi / thông báo**: thẻ trắng nhỏ đè lên góc cửa sổ, có icon app, tiêu đề đậm + dòng phụ. → `.bds-toast`
- **Chip trạng thái**: viên thuốc màu nhạt (xanh lá = xong, cam = cảnh báo, đỏ = trễ, tím = AI). → `.bds-chip.is-ok|warn|err|ai`
- **Nhãn kỹ thuật kiểu terminal**: `[ ĐÃ ĐỊNH TUYẾN ] IT-1044 → Duke`, chữ mono, màu xám. → `.bds-mono`
- **Chấm "trực tiếp"**: chấm xanh lá có vòng lan (`ping`). → `.bds-live`
- **Thẻ đánh số**: khung bo, tiêu đề in hoa có ô số `01`, danh sách chấm màu. → `.bds-ncard`
- **Thanh tiến độ trong mục đang mở** (mẫu 9): thanh mảnh chạy từ trái sang phải rồi tự chuyển mục. → `.bds-acc` + `BDS.accordionStage()`

## Hiệu ứng — họ và cách dựng

Tên `@keyframes` trên site có tiền tố theo trang (`adm-*`, `lead-*`, `bpm-*`…) nhưng chỉ thuộc vài họ:

| Họ | Ví dụ tên trên site | Cảm giác | Dựng lại bằng |
|---|---|---|---|
| Xuất hiện | `*-in`, `rise`, `pop`, `grow`, `rowin`, `fade-in` | phần tử trồi lên 8–16px + hiện dần, lần lượt cách nhau ~90ms | `.bds-reveal` + `BDS.reveal()` (IntersectionObserver) |
| Mô phỏng thao tác | `toast-cycle`, `press-cycle`, `cursor-cycle`, `accept-ring-cycle` | con trỏ "bấm" nút, nút lún, thông báo bật lên, vòng lặp vài giây | `BDS.cycle(els, ms)` bật lớp `.on` lần lượt; `.bds-press` |
| Gõ chữ | `typewriter`, `type`, `typing`, `blink`, `hero-cursor-blink` | câu hỏi AI tự gõ, con trỏ nhấp nháy, ba chấm "đang nghĩ" | `BDS.typewriter(el, text)`; `.bds-typing` |
| Đường nối, dữ liệu chảy | `dash`, `draw`, `trace`, `travel`, `beam-down`, `cudDataFlow`, `mcpFlowDown` | nét đứt chạy, chấm sáng đi theo đường cong giữa các khối | SVG `stroke-dashoffset` (`.bds-flow`) + `BDS.travel(path)` |
| Tín hiệu sống | `ping`, `pulse`, `glow`, `breathe`, `live`, `mcpPulse` | chấm lan vòng, tâm phát sáng thở | `.bds-live`, `.bds-glow` |
| Dải chạy | `marquee`, `cert-marquee`, `belt`, `reaiFlow`, `stream` | logo / chip trôi ngang vô tận, mép mờ | `.bds-marquee` + `BDS.marquee()` (nhân đôi nội dung) |
| Quét sáng | `sheen`, `shimmer`, `glint`, `scan`, `reaiSweep` | vệt sáng lướt qua thẻ / nút | `.bds-sheen` |
| Trang trí nền | `spin`, `orbit`, `float`, `drift`, `spotFloat`, `grid-wave` | vòng xoay chậm 60–140s, mảng màu trôi, lưới mờ | `.bds-rings`, `.bds-aurora`, `.bds-gridbg`, `.bds-float` |
| Số liệu | `bar-rise`, `fill`, `meter`, `prog`, `count` | cột biểu đồ mọc, thanh đầy dần, số đếm lên | `.bds-bar` + `BDS.countUp()` |
| Theo chuột | (JS) | lớp ảnh dịch nhẹ theo con trỏ | `BDS.parallax(root)` |

Thông số chuyển động: hover `.18s`, đổi trạng thái `.36s`, chấm chạy `1.15s`, trễ lần lượt `90ms`, ease `cubic-bezier(.22,1,.36,1)`; vòng lặp mô phỏng 2,5–4s mỗi nhịp.

## Quy tắc khi mượn

- **Mượn thiết kế và hiệu ứng, không mượn câu chữ.** Nội dung phải là của khách / của tài liệu đang làm.
- Hiệu ứng phải kể chuyện (khách đi qua luồng, việc được giao, số đếm lên) — không thêm chuyển động chỉ để trang trí.
- Mọi vòng lặp dừng khi khuất màn hình và khi người xem bật giảm chuyển động (`effects.js` đã xử lý).
- Màn hình sản phẩm: ưu tiên **ảnh chụp thật** (`scripts/capture_app.js`); chỉ dựng lại bằng HTML khi cần chuyển động hoặc khi phải thay dữ liệu bằng dữ liệu của khách — khi đó ghi rõ "minh họa".
