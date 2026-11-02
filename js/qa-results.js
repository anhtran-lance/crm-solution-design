/* Kết quả kiểm tra thực tế. Cập nhật mỗi lần kiểm tra lại. */
window.QA_RESULTS = {
 "summary": "Kiểm tra ngày 02/11/2026 trên Chromium headless. Điều hướng và tương tác đạt toàn bộ phép thử tự động. Chưa truy cập được base.vn từ môi trường làm việc, nên mọi khả năng của Base CRM vẫn ở trạng thái Cần xác minh và chưa có ảnh giao diện thật.",
 "groups": [
  {
   "h": "A. Kiểm tra nghiệp vụ",
   "items": [
    {
     "t": "Các chặng nối tiếp nhau: chặng 4 dùng điều kiện từ chặng 3, chặng 5 bắt đầu từ chặng 4, chặng 6 đọc dữ liệu chặng 1–5 và chỉ ngược về chặng có điểm nghẽn",
     "st": "pass",
     "how": "Rà soát nội dung thủ công"
    },
    {
     "t": "Mỗi chặng bắt đầu từ vấn đề nghiệp vụ (Hiện trạng, Hệ quả) trước khi nói tới hệ thống",
     "st": "pass",
     "how": "Rà soát nội dung thủ công"
    },
    {
     "t": "Tách bạch Đề xuất quy trình và Khả năng sản phẩm bằng nhãn riêng trên mọi slide và trang chi tiết",
     "st": "pass",
     "how": "Rà soát giao diện và dữ liệu nội dung"
    },
    {
     "t": "Không khẳng định tính năng chưa xác minh",
     "st": "pending",
     "how": "Mọi khả năng của Base CRM được gắn nhãn Cần xác minh vì không truy cập được base.vn (mạng của môi trường làm việc chặn tên miền này). Danh sách đầy đủ ở bên dưới."
    }
   ]
  },
  {
   "h": "B. Kiểm tra nội dung",
   "items": [
    {
     "t": "Ngôn ngữ cho người chưa biết CRM: dùng 'khách hàng tiềm năng', 'cơ hội bán hàng', 'giai đoạn', có trang giải thích thuật ngữ",
     "st": "pass",
     "how": "Rà soát thủ công; thuật ngữ ở trang Chi tiết của slide Mở đầu"
    },
    {
     "t": "Lớp Chi tiết bổ sung (luồng, quy tắc, vai trò, giả định, câu hỏi xác minh), không chép lại câu chữ của slide",
     "st": "pass",
     "how": "Rà soát thủ công"
    },
    {
     "t": "Không có số liệu hiệu quả giả định; cột 'Trước triển khai' để trống",
     "st": "pass",
     "how": "Rà soát thủ công. Các ngưỡng 14 ngày và 21 ngày được ghi là đề xuất để doanh nghiệp chốt."
    },
    {
     "t": "Kịch bản cộng đủ 10 phút",
     "st": "pass",
     "how": "Tổng thời lượng tính tự động trên trang Kịch bản"
    },
    {
     "t": "Trình bày trọn trong 10 phút với người thật",
     "st": "limit",
     "how": "Chưa diễn tập. Cần một buổi chạy thử có bấm giờ."
    }
   ]
  },
  {
   "h": "C. Kiểm tra UI/UX",
   "items": [
    {
     "t": "Mặc định mở slide Mở đầu",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "9 mục trên thanh hành trình mở đúng slide và đánh dấu mục đang chọn",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Nút Tiếp đi đúng thứ tự 9 slide",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (tong-quan,c1,c2,c3,c4,c5,c6,tong-ket)"
    },
    {
     "t": "Nút Tiếp bị vô hiệu ở slide cuối",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Nút Trước quay về slide đầu, bị vô hiệu ở slide đầu",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Phím tắt →, số 1–6, D, O hoạt động",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (true,true,true,true,true,true)"
    },
    {
     "t": "Chuyển Trình bày ↔ Chi tiết giữ nguyên chặng; thanh hành trình trong chế độ Chi tiết mở trang chi tiết",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (true,true,true)"
    },
    {
     "t": "Nút xem chi tiết trên cả 9 slide mở đúng trang chi tiết có nội dung",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Mục lục trong trang chi tiết cuộn tới đúng mục, không đổi route",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (5 mục)"
    },
    {
     "t": "6 thẻ chặng trên sơ đồ hành trình mở đúng chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "6 dòng câu trả lời ở slide Tổng kết mở đúng chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Nút Sơ đồ hành trình về slide Tổng quan",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Nút Back của trình duyệt quay về chặng trước",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Ghi chú người trình bày bật/tắt (nút và phím N), hiển thị đúng chặng, đồng hồ chạy",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (Chặng 1 · Tiếp nhận khách hàng tiềm năng | 00:01)"
    },
    {
     "t": "Trang Kịch bản: 6 phần, tổng 10:00, quay lại đúng slide đang trình bày",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (disabledModeSwitch=true)"
    },
    {
     "t": "Trang Kiểm tra liệt kê khả năng cần xác minh và ảnh cần bổ sung",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Khi có file ảnh: ảnh hiển thị, bấm để phóng to, Esc để đóng; chặng chưa có ảnh vẫn hiện khung cần bổ sung",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Không có cuộn ngang ở 390px (18 trang)",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Không có lỗi JavaScript trong toàn bộ phiên kiểm tra",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Mọi slide hiển thị vừa một màn hình, không cần cuộn, ở 1440×900, 1366×768 và 1280×720",
     "st": "pass",
     "how": "Đo chiều cao trang của 9 slide ở 3 kích thước màn hình bằng Playwright và xem ảnh chụp"
    },
    {
     "t": "Hiển thị trên Safari, Firefox, Edge",
     "st": "limit",
     "how": "Môi trường kiểm tra chỉ có Chromium. Cần mở thử trước buổi trình bày."
    },
    {
     "t": "Hiển thị trên máy chiếu thật và nút bấm của bút trình chiếu (PageUp/PageDown)",
     "st": "limit",
     "how": "Đã kiểm tra phím PageUp/PageDown trong mã, chưa thử trên thiết bị thật."
    },
    {
     "t": "Nút Toàn màn hình",
     "st": "limit",
     "how": "Trình duyệt headless không cho vào chế độ toàn màn hình. Cần bấm thử trên máy thật."
    }
   ]
  },
  {
   "h": "D. Kiểm tra hình ảnh",
   "items": [
    {
     "t": "Không có giao diện tự dựng nào được giới thiệu là giao diện Base CRM",
     "st": "pass",
     "how": "Vị trí chưa có ảnh hiển thị khung gạch chéo, ghi rõ 'Cần bổ sung ảnh'. Bản cũ có màn hình dựng lại đã được chuyển vào thư mục archive và không dùng nữa."
    },
    {
     "t": "Ảnh giao diện Base CRM thật lấy từ base.vn/platform/crm và base.vn",
     "st": "limit",
     "how": "Không tải được: mạng của môi trường làm việc chặn base.vn. Đã liệt kê 8 ảnh cần có ở bảng bên dưới."
    },
    {
     "t": "Nội dung ảnh khớp chú thích, điểm đánh dấu đúng vị trí",
     "st": "limit",
     "how": "Kiểm tra sau khi có ảnh; điền tọa độ điểm chú thích trong js/content.js"
    },
    {
     "t": "Cơ chế hiển thị ảnh, phóng to và điểm chú thích hoạt động khi có file",
     "st": "pass",
     "how": "Kiểm tra bằng ảnh thử nạp qua Playwright, không ghi file ảnh nào vào dự án"
    }
   ]
  }
 ]
};
