# Bộ thiết kế base.vn — token

Trích từ CSS chung của base.vn (`/assets/index-*.css`, ~2,7MB) ngày 03/11/2026. Các trang sản phẩm dùng nhiều tiền tố biến riêng (`--ex-*`, `--fw-*`, `--bpm-*`…) nhưng **cùng một hệ màu**; bảng dưới là phần chung. Chạy lại `scripts/scan_site.js --tokens` để cập nhật khi web đổi.

## Màu

| Vai trò | Giá trị | Ghi chú |
|---|---|---|
| Xanh Base (chính) | `#1F62E8` | màu dùng nhiều nhất toàn site (218 lần) |
| Xanh Base hover | `#0F4FD6` / `#1352D0` | |
| Xanh nhạt nền | `#EAF1FC` · `#CFE3FF` | thẻ, nhãn, ô đang chọn |
| Thang brand | 50 `#F1F5FE` · 100 `#DDE8FD` · 200 `#B7CEFA` · 300 `#88AAEC` · 400 `#3976EF` · 500 `#1352D0` · 600 `#0F47B8` · 700 `#0F3B95` · 800 `#0E2F71` | Tailwind `brand-*` |
| Chữ đậm (ink) | `#0A0F1E` · `#15171D` · `#1C1F27` | tiêu đề |
| Chữ thường | `#475569` | thân bài |
| Chữ phụ | `#94A3B8` · `#64748B` | chú thích, nhãn |
| Viền | `#E2E8F0` · mạnh `#CBD5E1` | |
| Nền phụ | `#F7F9FC` · `#EEF2F8` · `surface-tinted` `#F4F2FF` / `#F6F5F1` | dải section xen kẽ |
| Nền tối (navy) | `#0A0F1E` · `#0E1630` · night `#050D1F` `#0A1730` `#12244A` | section tối, sơ đồ |
| Thành công | `#3BA55D` · nền `#D9F5DD` · chữ `#25803F` | |
| Cảnh báo | `#B7791F` · nền `#FEF3D7` | |
| Lỗi | `#E5484D` · nền `#FDE1E1` | |
| Tím AI | `#7C3AED` · `#8B5CF6` · `#7152DB` · nền `#ECE7FB` | mọi thứ liên quan AI / Copilot |

**Dải gradient thương hiệu** (dùng cho chữ nhấn, viền, thanh):
- `--ex-grad`: `linear-gradient(90deg,#14B8A6,#3B82F6 38%,#8B5CF6 70%,#EC4899)` — ngọc → xanh → tím → hồng
- `--fw-grad`: `linear-gradient(120deg,#10B981,#06B6D4 34%,#3B82F6 67%,#6366F1)` — xanh lá → xanh lam
- `--bpm-grad`: `linear-gradient(113deg,#245BFF,#00B8D9 48%,#7C3AED)`
- bản sáng trên nền tối: `linear-gradient(90deg,#5EEAD4,#93C5FD 38%,#C4B5FD 70%,#F9A8D4)`

**Màu theo app** (icon gradient của từng app, dùng đúng màu này khi tô khối app): lấy từ `https://static-ai.stdfiles.com/fav/<app>?color=...` — xem `references/products.md`. Ví dụ Prospect `#3B82F6→#8B5CF6→#06B6D4`, Lead `#A855F7→#F97316→#3B82F6`, Sales `#22C55E→#0D9488→#22D3EE→#2563EB`.

## Chữ

- **Inter** cho toàn site (400/500/600/700). Google Fonts tự có bộ ký tự tiếng Việt.
- **Rubik** chỉ dùng trong *giao diện mô phỏng sản phẩm* (để giống app thật) — `--d-display: Rubik, Inter`.
- **PT Serif** cho vài trang biên tập; **Caveat** cho chữ viết tay trang trí.
- Monospace `ui-monospace, SFMono-Regular, Menlo` cho nhãn kỹ thuật kiểu `[ ĐÃ ĐỊNH TUYẾN ]`, mã phiếu.
- Nhãn nhỏ trên tiêu đề (eyebrow): chữ in hoa, `font-size:11–12px`, `letter-spacing:.12–.16em`, màu chữ phụ, thường có chấm màu đứng trước.
- Tiêu đề lớn: 700–800, `letter-spacing:-.02em → -.03em`, thường có một cụm chữ tô gradient.

## Hình khối

- Bo góc: nút / chip `999px`; thẻ `12–16px`; khung lớn `20–24px`; ô nhỏ `6–10px`.
- Bóng xanh nhẹ (đặc trưng Base): `0 1px 2px rgba(31,98,232,.05), 0 16px 40px -18px rgba(31,98,232,.22)`; nhỏ `0 6px 18px -10px rgba(31,98,232,.18)`.
- Bóng trung tính nhiều lớp: `0 1px 2px rgba(12,20,46,.05), 0 12px 28px -16px rgba(12,20,46,.3)`; nổi cao `0 40px 90px -50px rgba(12,20,46,.62)`.
- Ánh bóng trên nền tối: `inset 0 1px 0 rgba(255,255,255,.28)`.

## Chuyển động

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--mo-micro` | `.18s` | hover, nhấn |
| `--mo-state` | `.36s` | đổi trạng thái, tab |
| `--mo-travel` | `1.15s` | chấm chạy theo đường, thẻ bay |
| `--mo-step` | `90ms` | trễ giữa các phần tử xuất hiện lần lượt |
| ease-out chính | `cubic-bezier(.22,1,.36,1)` | dùng nhiều nhất (107 lần) |
| ease-move | `cubic-bezier(.4,0,.2,1)` | |
| spring | `cubic-bezier(.34,1.56,.64,1)` | bật nảy nhẹ khi xuất hiện |

Site có ~1.077 `@keyframes`, đặt tên theo tiền tố từng trang (`adm-*` Ads manager, `bpm-*`, `lead-*`, `payroll-*`…). Các họ hiệu ứng lặp lại: `in / rise / pop / grow / fill / bar` (xuất hiện), `toast / cycle / press / cursor` (mô phỏng thao tác), `type / blink / typing` (gõ chữ), `dash / draw / line / trace / travel / beam` (đường nối, luồng dữ liệu), `ring / ping / pulse / glow / breathe / live` (tín hiệu sống), `marquee / stream / belt` (dải chạy), `scan / sheen / shimmer / glint` (quét sáng), `spin / orbit / float / drift` (trang trí nền). Chi tiết cách dựng lại: `references/effects.md`.

## Bố cục

- Khung nội dung `max-width:1200px` (màn rộng 1300px), lề 24px (mobile 16px).
- Section cách nhau `py-24 → py-32` (96–128px); xen kẽ trắng / `surface-tinted` / navy.
- Header nổi dạng viên thuốc bo tròn, nền trắng mờ, cách mép trên.
- Web chỉ dùng **chế độ sáng** (script tự bỏ class `dark`) — tài liệu cho khách có thể có section tối nhưng nền trang sáng.
