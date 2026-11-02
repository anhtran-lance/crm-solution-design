/* Kết quả kiểm tra thực tế, cập nhật mỗi lần kiểm tra lại */
window.QA_RESULTS = {
 "summary": "Kiểm tra ngày 02/11/2026 trên Chromium (Playwright). Nội dung sản phẩm và ảnh giao diện được đối chiếu trực tiếp với base.vn/platform/crm, base.vn/app/lead và base.vn/app/sales cùng ngày.",
 "groups": [
  {
   "h": "A. Kiểm tra nghiệp vụ",
   "items": [
    {
     "t": "Các chặng nối tiếp nhau: lead đã nhập (1) được phân bổ (2), có đồng hồ liên hệ và nuôi dưỡng (3), đủ điều kiện thì thành cơ hội (4), đi qua các giai đoạn (5), số liệu của 1–5 thành báo cáo (6)",
     "st": "pass",
     "how": "Rà soát nội dung thủ công"
    },
    {
     "t": "Mỗi chặng bắt đầu từ câu hỏi nghiệp vụ; phần Chi tiết giải pháp nêu hiện trạng và hệ quả trước khi nói tới hệ thống",
     "st": "pass",
     "how": "Rà soát nội dung thủ công"
    },
    {
     "t": "Tách bạch đề xuất quy trình (nhãn xanh dương) và khả năng Base CRM (dòng cam 'Trên Base CRM')",
     "st": "pass",
     "how": "Rà soát giao diện"
    },
    {
     "t": "Không giới thiệu tính năng chưa xác minh",
     "st": "pass",
     "how": "23 khả năng được nhắc tới đều đọc thấy trên 3 trang base.vn; 4 điểm chưa thấy mô tả được đưa vào mục 'Cần xác nhận thêm' và không được khẳng định"
    }
   ]
  },
  {
   "h": "B. Kiểm tra nội dung",
   "items": [
    {
     "t": "Ngôn ngữ cho người chưa biết CRM, thuật ngữ Lead / cơ hội được giải thích bằng câu hỏi quản lý",
     "st": "pass",
     "how": "Rà soát thủ công"
    },
    {
     "t": "Lớp chi tiết bổ sung luồng xử lý, quy tắc, vai trò, giả định; không chép lại câu chữ của phần trình bày",
     "st": "pass",
     "how": "Rà soát thủ công"
    },
    {
     "t": "Không có số liệu hiệu quả giả định; số trong ảnh được ghi rõ là dữ liệu mẫu của Base",
     "st": "pass",
     "how": "Rà soát thủ công. Ngưỡng 15 phút, 14 ngày, xác suất giai đoạn được ghi là đề xuất."
    },
    {
     "t": "Kịch bản cộng đủ 10 phút",
     "st": "pass",
     "how": "Tính tự động trên trang Kịch bản"
    },
    {
     "t": "Trình bày trọn 10 phút với người thật",
     "st": "limit",
     "how": "Chưa diễn tập có bấm giờ."
    }
   ]
  },
  {
   "h": "C. Kiểm tra UI/UX",
   "items": [
    {
     "t": "Tất cả 20 ảnh thao tác ở 6 chặng tải được",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (20 ảnh)"
    },
    {
     "t": "Mọi ảnh có chú thích đều có điểm đánh dấu tương ứng trên ảnh",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Ảnh ở phần mở đầu và tổng kết tải được",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "9 mục trên thanh điều hướng cuộn tới đúng phần và đánh dấu mục đang xem",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "6 thẻ trên sơ đồ hành trình dẫn tới đúng chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "6 dòng trả lời ở phần Tổng kết dẫn về đúng chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "4 liên kết \"Giải ở chặng\" trong phần Bài toán dẫn đúng chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Bấm và phím mũi tên chọn đúng thao tác, ảnh đổi theo",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (false,false,true,false | 3 | 0)"
    },
    {
     "t": "Sau khi người xem tự chọn, thao tác không tự chuyển nữa",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (0)"
    },
    {
     "t": "Thao tác tự chuyển sau 7 giây khi chặng đang hiện trên màn hình",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (0→1)"
    },
    {
     "t": "Trang không bị xô lệch khi ảnh tự chuyển",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (8918 / 8918)"
    },
    {
     "t": "Nút Chi tiết giải pháp mở/đóng đúng ở 6 chặng và phần Bước tiếp theo, giữ nguyên vị trí chặng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Bấm ảnh để phóng to, Esc để đóng",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Liên kết nguồn chỉ trỏ tới 3 trang tham chiếu của base.vn",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (35 liên kết)"
    },
    {
     "t": "Chế độ trình bày: phím → đi qua 11 màn hình, 20 thao tác và 6 phần giá trị theo đúng thứ tự",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Chế độ trình bày: phím ← lùi đúng từng bước, đối xứng với chiều tiến",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (9/11 · Chặng 6 · Hiệu quả · bước 3/3)"
    },
    {
     "t": "Phím số tới đúng chặng; ghi chú, đồng hồ hoạt động; Esc thoát; phần chi tiết ẩn khi trình bày",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (6/11 · Chặng 3 · Chăm sóc · bước 1/4 | 00:01)"
    },
    {
     "t": "Trang script.html hiển thị",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (1 bảng)"
    },
    {
     "t": "Kịch bản cộng đủ 10:00 và 6 phần",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (Tổng10:00)"
    },
    {
     "t": "Mọi liên kết trong kịch bản trỏ tới phần có thật trên website",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (9 liên kết)"
    },
    {
     "t": "Trang qa.html hiển thị",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright (2 bảng)"
    },
    {
     "t": "Không cuộn ngang ở 1440, 1280, 1024, 768 và 390px (cả 3 trang)",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Không có lỗi JavaScript hay tài nguyên lỗi",
     "st": "pass",
     "how": "Kiểm tra tự động bằng Playwright"
    },
    {
     "t": "Chế độ trình bày vừa màn hình 1440×900, 1366×768 và 1280×720",
     "st": "pass",
     "how": "Đo bằng Playwright: mỗi chặng hiện tiêu đề, các thao tác và ảnh trong một màn hình; phần cách tổ chức và giá trị hiện ở bước bấm riêng"
    },
    {
     "t": "Hiển thị trên Safari, Firefox, Edge",
     "st": "limit",
     "how": "Môi trường kiểm tra chỉ có Chromium. Cần mở thử trước buổi trình bày."
    },
    {
     "t": "Máy chiếu thật và bút trình chiếu",
     "st": "limit",
     "how": "Đã thử phím PageUp/PageDown trong trình duyệt, chưa thử trên thiết bị thật."
    },
    {
     "t": "Nút toàn màn hình (phím F)",
     "st": "limit",
     "how": "Trình duyệt headless không vào được chế độ toàn màn hình; cần bấm thử trên máy thật."
    }
   ]
  },
  {
   "h": "D. Kiểm tra hình ảnh",
   "items": [
    {
     "t": "Ảnh lấy từ trang tham chiếu base.vn, mỗi ảnh ghi nguồn ngay dưới ảnh",
     "st": "pass",
     "how": "21 ảnh chụp từ /platform/crm, /app/lead, /app/sales"
    },
    {
     "t": "Không dựng giao diện giả; không chỉnh sửa nội dung ảnh",
     "st": "pass",
     "how": "Chỉ cắt khung; danh sách phần cắt ghi ở bảng ảnh bên dưới"
    },
    {
     "t": "Điểm chú thích đặt đúng vị trí trên ảnh",
     "st": "pass",
     "how": "Tọa độ lấy từ vị trí chữ thật trên trang lúc chụp; 5 điểm ở ảnh đã cắt được đặt tay và kiểm tra bằng mắt"
    },
    {
     "t": "Ảnh trên base.vn là giao diện minh họa của Base với dữ liệu mẫu, không phải ảnh chụp từ tài khoản đang vận hành",
     "st": "limit",
     "how": "Nếu cần ảnh từ tài khoản thật, chụp thêm trên tài khoản demo của doanh nghiệp."
    }
   ]
  }
 ]
};
