/* =====================================================================
   NỘI DUNG SOLUTION DESIGN · CRM CHO ĐỘI SALES B2B SME
   ---------------------------------------------------------------------
   Ba loại nội dung được tách bạch:
   - proc(...) : ĐỀ XUẤT QUY TRÌNH. Cách doanh nghiệp nên tổ chức công việc.
   - sys(...)  : KHẢ NĂNG CỦA BASE CRM, kèm nguồn đã đối chiếu.
                 status "verified" = đã đọc thấy trên trang nguồn (ngày 02/11/2026)
                 status "pending"  = chưa tìm thấy trên trang tham chiếu
   - Ảnh       : chụp từ giao diện minh họa sản phẩm trên base.vn (dữ liệu mẫu
                 của Base). Tọa độ điểm chú thích (x, y theo %) lấy từ vị trí
                 chữ thật trên trang lúc chụp.
   ===================================================================== */

const SRC = {
  crm: "https://base.vn/platform/crm",
  lead: "https://base.vn/app/lead",
  sales: "https://base.vn/app/sales",
  prospect: "https://base.vn/app/prospect"
};
const proc = (t) => ({ kind: "proc", t });
const sys = (t, src, status = "verified") => ({ kind: "sys", t, src, status });

/* ---------------------------------------------------------------------
   ẢNH GIAO DIỆN (từ base.vn)
   --------------------------------------------------------------------- */
const SHOTS = {
  "lead-hero": {
    file: "assets/base/lead-hero.webp", src: SRC.lead,
    title: "Danh sách Lead tập trung",
    marks: [
      { k: "Kênh", t: "Kênh khách đến, ghi tự động" },
      { k: "SLA", t: "Thời gian còn lại để liên hệ lần đầu" },
      { k: "Người phụ trách", t: "Người chịu trách nhiệm chính" },
      { k: "Phân tích điểm số", t: "Điểm ưu tiên và lý do chấm" }
    ]
  },
  "lead-ingest": {
    file: "assets/base/lead-ingest.webp", src: SRC.lead,
    title: "Lead từ quảng cáo đổ thẳng vào hệ thống",
    marks: [
      { k: "Tất cả hệ thống đang nhận dữ liệu", t: "Các kênh đang kết nối" },
      { k: "Đã gộp bản trùng", t: "Hai lượt gửi trùng chỉ tạo một lead" },
      { k: "Lead chuẩn hóa", t: "Lead đã có điểm, người phụ trách và đồng hồ" }
    ]
  },
  "lead-excel": {
    file: "assets/base/lead-excel.webp", src: SRC.lead,
    title: "Nhập danh sách Excel và danh thiếp",
    marks: [
      { k: "conference-list.xlsx", t: "Danh sách hội chợ: tự khớp cột, chặn dòng trùng" },
      { k: "Quét danh thiếp", t: "Chụp danh thiếp, hệ thống đọc thông tin" },
      { k: "Lead chuẩn hóa", t: "Thành lead bình thường, có người phụ trách" }
    ]
  },
  "lead-routing": {
    file: "assets/base/lead-routing.webp", src: SRC.lead,
    title: "Luồng phân bổ theo điều kiện",
    marks: [
      { k: "Quy tắc phân bổ", t: "Điều kiện: nguồn, khu vực, nhóm khách" },
      { k: "Giao & cập nhật quyền", t: "Giao cho nhóm, chia lần lượt" },
      { k: "Service Level Agreement", t: "Thời hạn liên hệ đầu tiên" }
    ]
  },
  "lead-auto": {
    file: "assets/base/lead-auto.webp", src: SRC.lead,
    title: "Chia lần lượt có trọng số và hạn mức",
    marks: [
      { k: "Lượt 3 · Khánh Duy", t: "Người đã đủ hạn mức được bỏ qua, có ghi lý do" },
      { k: "Lượt 4 · Thu Hà", t: "Người kế tiếp nhận lead" }
    ]
  },
  "lead-assign": {
    file: "assets/base/lead-assign.webp", src: SRC.lead,
    title: "Kho nhận lead: ai nhận trước giữ khách",
    marks: [
      { k: "Thu Hà đã nhận", t: "Một người nhận, khách thuộc về người đó" },
      { k: "Hoàng Nam cũng đã bấm", t: "Người đến sau được báo, không nhận trùng" }
    ]
  },
  "sales-perm": {
    file: "assets/base/sales-perm.webp", src: SRC.sales,
    title: "Ma trận phân quyền theo vai trò",
    marks: [
      { k: "Quyền", t: "Mỗi hàng là một thao tác" },
      { k: "Commerce của deal", t: "Mỗi cột là một vai trò trên thương vụ" }
    ]
  },
  "lead-sla": {
    file: "assets/base/lead-sla.webp", src: SRC.lead,
    title: "Đồng hồ liên hệ lần đầu và chuyển cấp",
    marks: [
      { k: "SLA · Phản hồi đầu tiên", t: "Đồng hồ chạy ngay khi giao" },
      { k: "Quá hạn", t: "Hết giờ chưa liên hệ" },
      { k: "Chuyển cấp lên", t: "Quản lý được báo tự động" },
      { k: "Trở lại khâu phân bổ", t: "Khách được giao cho người khác" }
    ]
  },
  "crm-hero-lead": {
    file: "assets/base/crm-hero-lead.webp", src: SRC.crm,
    title: "Hồ sơ Lead và hành trình tương tác",
    marks: [
      { k: "Nguồn", t: "Nguồn của từng khách" },
      { k: "Hành trình tương tác", t: "Biểu mẫu, sự kiện, tin nhắn theo thời gian" },
      { k: "Thời gian phản hồi", t: "Đã liên hệ sau bao lâu" }
    ]
  },
  "lead-nurture": {
    file: "assets/base/lead-nurture.webp", src: SRC.lead,
    title: "Khách chưa sẵn sàng được nuôi dưỡng",
    marks: [
      { k: "việc của tôi", t: "Việc gọi điện được giao thẳng cho Sales" },
      { k: "Lại nóng", t: "Khách có tín hiệu quay lại, Sales được báo" }
    ]
  },
  "sales-account": {
    file: "assets/base/sales-account.webp", src: SRC.sales,
    title: "Lịch sử làm việc trên một khách hàng",
    marks: [
      { k: "Người phụ trách", t: "Ai đang phụ trách" },
      { k: "Hoạt động ·", t: "Email, cuộc gọi, cuộc họp đã ghi nhận" },
      { k: "Hoạt động gần nhất", t: "Lần làm việc gần nhất" }
    ]
  },
  "crm-journey-lead": {
    file: "assets/base/crm-journey-lead.webp", src: SRC.crm,
    title: "Lead được chấm điểm và giao người phụ trách",
    marks: []
  },
  "crm-journey-sales": {
    file: "assets/base/crm-journey-sales.webp", src: SRC.crm,
    title: "Chuyển Lead thành cơ hội bán hàng",
    marks: [
      { k: "Giai đoạn", t: "Cơ hội có giai đoạn, người chủ trì, dự báo chốt" },
      { k: "1 click chuyển đổi", t: "Giữ nguyên lịch sử từ lúc khách để lại thông tin" }
    ]
  },
  "sales-required": {
    file: "assets/base/sales-required.webp", src: SRC.sales,
    title: "Thông tin bắt buộc trước khi chuyển giai đoạn",
    marks: [
      { k: "Điền Người ra quyết định", t: "Thiếu thông tin thì không chuyển tiếp được" },
      { k: "thiếu 2 trường", t: "Mức kiểm soát mềm hoặc nghiêm ngặt" }
    ]
  },
  "sales-hero": {
    file: "assets/base/sales-hero.webp", src: SRC.sales,
    title: "Bảng cơ hội theo giai đoạn (Kanban)",
    marks: [
      { k: "Nghiên cứu khách hàng", t: "Mỗi cột là một giai đoạn" },
      { k: "Dự kiến:", t: "Tổng giá trị và giá trị dự kiến" },
      { k: "11 ngày", t: "Số ngày cơ hội nằm ở giai đoạn hiện tại" },
      { k: "Bộ lọc", t: "Lọc theo nhân viên, nhãn, giá trị" }
    ]
  },
  "sales-stages-cfg": {
    file: "assets/base/sales-stages-cfg.webp", src: SRC.sales,
    title: "Cài đặt riêng cho từng giai đoạn",
    marks: [
      { k: "Xác suất", t: "Xác suất thắng của giai đoạn" },
      { k: "Tồn đọng trong", t: "Số ngày tối đa trước khi cảnh báo" }
    ]
  },
  "sales-stage-sla": {
    file: "assets/base/sales-stage-sla.webp", src: SRC.sales,
    title: "Cơ hội quá hạn giai đoạn được đánh dấu",
    marks: [
      { k: "giới hạn 14 ngày", t: "Giới hạn của giai đoạn" },
      { k: "Chế độ xem SLA", t: "Danh sách mọi cơ hội đã quá giới hạn" }
    ]
  },
  "sales-dashboard": {
    file: "assets/base/sales-dashboard.webp", src: SRC.sales,
    title: "Bảng báo cáo bán hàng",
    marks: [
      { k: "Phễu giai đoạn", t: "Số cơ hội qua từng giai đoạn" },
      { k: "Đề xuất là nơi Q2", t: "Điểm nghẽn được chỉ ra từ dữ liệu" },
      { k: "Deal có rủi ro", t: "Cơ hội không hoạt động 14+ ngày" }
    ]
  },
  "sales-forecast": {
    file: "assets/base/sales-forecast.webp", src: SRC.sales,
    title: "Dự báo doanh số theo từng nhân viên",
    marks: [
      { k: "Nộp dự báo", t: "Nhân viên nộp dự báo, hệ thống lưu lại" },
      { k: "Nhân viên", t: "Xem theo từng người" },
      { k: "Cam kết", t: "Cam kết, đã chốt, so với chỉ tiêu" }
    ]
  },
  "lead-campaign": {
    file: "assets/base/lead-campaign.webp", src: SRC.lead,
    title: "Nguồn khách nào mang lại doanh thu",
    marks: [
      { k: "Chiến dịch", t: "Từng nguồn, chiến dịch" },
      { k: "Leads", t: "Số lead, chi phí, doanh thu" }
    ]
  },
  "crm-360": {
    file: "assets/base/crm-360.webp", src: SRC.crm,
    title: "Hồ sơ khách hàng 360°",
    marks: [
      { k: "Customer 360°", t: "Mọi điểm chạm hội tụ về một hồ sơ" }
    ]
  }
};

/* ---------------------------------------------------------------------
   BỐI CẢNH GIẢ ĐỊNH
   --------------------------------------------------------------------- */
const CONTEXT = {
  team: "Doanh nghiệp B2B SME, 12 nhân viên Sales chia 3 nhóm, 1 quản lý kinh doanh",
  sources: ["Website", "Hotline", "Hội chợ, sự kiện", "Khách giới thiệu", "Zalo, Facebook"]
};

const PROBLEMS = [
  { k: "Không rõ nguồn", t: "Khách đến từ nhiều kênh, mỗi kênh ghi một nơi" },
  { k: "Không rõ ai phụ trách", t: "Hai người cùng gọi một khách, hoặc không ai gọi" },
  { k: "Không rõ tiến độ", t: "Muốn biết khách đang ở đâu phải hỏi từng người" },
  { k: "Mất khi nghỉ việc", t: "Nhân viên nghỉ, lịch sử khách đi theo" }
];

/* ---------------------------------------------------------------------
   6 CHẶNG
   steps: các thao tác trên hệ thống, mỗi bước một ảnh (tab tự chuyển)
   --------------------------------------------------------------------- */
const STAGES = [
  {
    id: "chang-1", n: 1, icon: "lead", app: "Base Lead",
    nav: "Tiếp nhận", name: "Tiếp nhận khách hàng tiềm năng",
    question: "Khách hàng tiềm năng đang nằm ở đâu?",
    message: "Mọi khách, từ mọi kênh, về một danh sách chung. Nguồn được ghi tự động, khách trùng được gộp.",
    org: proc("Mỗi kênh có một đường vào hệ thống. Không còn khách nằm trong sổ tay hay điện thoại cá nhân."),
    steps: [
      {
        h: "Một danh sách chung cho cả đội",
        t: "Mỗi dòng là một khách: kênh đến, điểm ưu tiên, người phụ trách và thời gian còn lại để liên hệ.",
        shot: "lead-hero",
        claim: sys("Hợp nhất dữ liệu khách hàng tiềm năng từ mọi kênh vào một nguồn duy nhất", SRC.lead)
      },
      {
        h: "Khách từ quảng cáo, website tự vào",
        t: "Biểu mẫu từ Meta, Google, TikTok, LinkedIn gửi thẳng vào hệ thống. Hai lượt gửi trùng chỉ tạo một lead.",
        shot: "lead-ingest",
        claim: sys("Đồng bộ biểu mẫu quảng cáo qua webhook, tự khử trùng lặp, nhận diện kênh từ dữ liệu gốc", SRC.lead)
      },
      {
        h: "Danh sách hội chợ, danh thiếp",
        t: "Tải file Excel: hệ thống tự khớp cột, chặn dòng trùng. Chụp danh thiếp: thông tin được đọc tự động.",
        shot: "lead-excel",
        claim: sys("Tạo lead từ tệp CSV/Excel và từ ảnh chụp danh thiếp", SRC.lead)
      }
    ],
    value: {
      sales: "Không mất khách vì ghi nhầm chỗ, không phải nhập lại",
      manager: "Biết mỗi tuần có bao nhiêu khách mới, từ kênh nào"
    },
    notes: [
      "Hỏi khách: một khách gọi hotline thì thông tin đang được ghi ở đâu? Khách ở hội chợ thì sao?",
      "Nguyên tắc: không có khách nào nằm ngoài danh sách chung. Nguồn được ghi tự động để chặng 6 biết kênh nào hiệu quả."
    ],
    detail: {
      problem: {
        now: "Form website gửi về email, hotline ghi sổ, hội chợ giữ danh thiếp, Zalo nằm trong điện thoại từng người.",
        effects: ["Khách để lại thông tin nhưng không ai liên hệ.", "Cùng một khách được nhập nhiều lần ở nhiều file.", "Không đo được kênh nào mang lại khách tốt."]
      },
      flow: [
        { a: "Khách", t: "Để lại thông tin qua một kênh bất kỳ" },
        { a: "Hệ thống", t: "Tạo lead, ghi nguồn, gộp nếu trùng" },
        { a: "Người tiếp nhận", t: "Nhập danh sách sự kiện, danh thiếp trong 1 ngày làm việc" },
        { a: "Hệ thống", t: "Chuyển lead sang bước phân bổ (chặng 2)" }
      ],
      rules: [
        "Thông tin tối thiểu: tên người liên hệ, công ty, số điện thoại hoặc email, nguồn.",
        "Danh sách khách từ sự kiện được nhập trong vòng 1 ngày làm việc.",
        "Doanh nghiệp chốt danh sách nguồn chuẩn (khoảng 5–8 nguồn)."
      ],
      roles: {
        sales: ["Đưa khách tự tìm được vào hệ thống, không giữ riêng."],
        lead: ["Nhập danh sách khách từ sự kiện, kiểm tra nguồn."],
        manager: ["Chốt danh sách nguồn chuẩn và kênh cần kết nối."]
      },
      assumptions: ["Dữ liệu khách cũ được làm sạch trước khi nhập.", "Doanh nghiệp có quyền quản trị tài khoản quảng cáo cần kết nối."],
      verify: ["Hotline/tổng đài: cuộc gọi đến có tự tạo lead không, với nhà cung cấp tổng đài doanh nghiệp đang dùng?", "Zalo OA: tin nhắn vào Base Prospect có tự tạo lead trong Base Lead không, hay cần thao tác?"]
    }
  },
  {
    id: "chang-2", n: 2, icon: "lead", app: "Base Lead · Base Sales",
    nav: "Phân công", name: "Phân công và xác định trách nhiệm",
    question: "Ai phụ trách khách hàng này?",
    message: "Mỗi khách có đúng một người phụ trách, được giao theo quy tắc, và ai cũng thấy lý do vì sao là người đó.",
    org: proc("Chia theo nhóm trước (khu vực, ngành hoặc sản phẩm), rồi chia lần lượt trong nhóm."),
    scenario: ["Khách từ hội chợ, ở Hà Nội", "Thuộc Nhóm Miền Bắc (4 người)", "Đến lượt Sales B", "Đồng hồ liên hệ bắt đầu chạy"],
    steps: [
      {
        h: "Quy tắc phân bổ theo điều kiện",
        t: "Thiết lập một lần: lead thỏa điều kiện nào thì vào nhóm nào, chia ra sao, thời hạn liên hệ bao lâu.",
        shot: "lead-routing",
        claim: sys("Trình dựng luồng phân phối với quy tắc rẽ nhánh, tự khởi chạy đồng hồ SLA", SRC.lead)
      },
      {
        h: "Chia lần lượt, có trọng số và hạn mức",
        t: "Người đã đủ hạn mức hoặc đang tạm nghỉ được bỏ qua. Lý do bỏ qua được ghi lại trên lead.",
        shot: "lead-auto",
        claim: sys("Round robin có trọng số, đọc hạn mức và trạng thái tạm dừng ngay lúc giao", SRC.lead)
      },
      {
        h: "Hoặc để nhóm tự nhận",
        t: "Lead hiện cho cả nhóm, ai nhận trước giữ khách. Người bấm sau được báo, không ai nhận trùng.",
        shot: "lead-assign",
        claim: sys("Kho nhận lead: một lần nhận quyết định chủ sở hữu, không ai nhận kịp thì giao lại", SRC.lead)
      },
      {
        h: "Ai được xem khách nào",
        t: "Phân quyền theo vai trò: Sales xem khách của mình, trưởng nhóm xem cả nhóm, quản lý xem toàn bộ.",
        shot: "sales-perm",
        claim: sys("Phân quyền ai được xem các thương vụ mà họ không sở hữu hoặc theo dõi", SRC.sales)
      }
    ],
    value: {
      sales: "Biết rõ khách nào là của mình, không giành, không bỏ",
      manager: "Hỏi 'khách này ai lo' có câu trả lời ngay, kèm lý do"
    },
    notes: [
      "Quy tắc chia khách là quyết định của doanh nghiệp. Hệ thống thực hiện và ghi lại.",
      "Hỏi khách: hiện chia theo vùng, theo ngành hay ai nhận trước được trước?"
    ],
    detail: {
      problem: {
        now: "Khách được 'ai nhận trước thì của người đó', hoặc trưởng nhóm chia bằng tin nhắn.",
        effects: ["Hai người cùng liên hệ một khách.", "Khách không ai nhận vì ai cũng nghĩ người khác đã gọi.", "Nhân viên nghỉ việc, không biết họ đang giữ khách nào."]
      },
      flow: [
        { a: "Hệ thống", t: "Lead mới khớp quy tắc, vào đúng nhóm" },
        { a: "Hệ thống", t: "Giao lần lượt hoặc mở cho nhóm tự nhận" },
        { a: "Sales", t: "Nhận khách, đồng hồ liên hệ bắt đầu chạy" },
        { a: "Trưởng nhóm", t: "Xử lý bàn giao khi có người nghỉ" }
      ],
      rules: [
        "Bước 1: chia theo nhóm (doanh nghiệp chọn một tiêu chí: vùng, ngành hoặc sản phẩm).",
        "Bước 2: trong nhóm, chia lần lượt; đặt trọng số nếu năng lực khác nhau.",
        "Khách do một Sales giới thiệu thì giao lại cho chính Sales đó.",
        "Khi nhân viên nghỉ: chuyển khách sang người khác trước ngày nghỉ."
      ],
      roles: {
        sales: ["Nhận và liên hệ khách trong thời hạn.", "Báo trưởng nhóm nếu khách không thuộc nhóm mình."],
        lead: ["Theo dõi khách chưa có người nhận.", "Tạm dừng nhận lead cho người đang nghỉ."],
        manager: ["Chốt tiêu chí chia khách và trọng số.", "Xem số khách đang giữ của từng người."]
      },
      assumptions: ["Đội Sales chia nhóm rõ ràng, mỗi nhóm có trưởng nhóm.", "Cả đội chấp nhận một quy tắc chia khách thống nhất."],
      verify: ["Đổi người phụ trách hàng loạt khi bàn giao: chưa thấy mô tả trên trang tham chiếu, cần xác nhận với đội Base."]
    }
  },
  {
    id: "chang-3", n: 3, icon: "prospect", app: "Base Lead · Base Sales",
    nav: "Chăm sóc", name: "Theo dõi và chăm sóc khách hàng",
    question: "Đã làm việc với khách đến đâu? Ai cần được theo dõi tiếp?",
    message: "Mỗi lần làm việc được ghi lại trên hồ sơ khách. Khách quá hạn liên hệ thì quản lý được báo, không cần ai nhắc.",
    org: proc("Sau mỗi lần liên hệ: ghi kết quả và đặt ngay việc tiếp theo có hạn. Khách chưa sẵn sàng thì đưa vào nuôi dưỡng, không bỏ."),
    steps: [
      {
        h: "Đồng hồ liên hệ lần đầu",
        t: "Đồng hồ chạy ngay khi giao, chỉ tính giờ làm việc. Quá hạn: báo quản lý, thu hồi và giao người khác.",
        shot: "lead-sla",
        claim: sys("Đồng hồ SLA theo giờ làm việc, tự cảnh báo quản lý và tái phân bổ khi quá hạn", SRC.lead)
      },
      {
        h: "Hồ sơ và hành trình tương tác",
        t: "Mở một khách là thấy khách đến từ đâu, đã điền gì, tham dự gì, nhắn gì, ai phụ trách.",
        shot: "crm-hero-lead",
        claim: sys("Hồ sơ lead hiển thị hành trình tương tác, người phụ trách, thời gian phản hồi", SRC.crm)
      },
      {
        h: "Khách chưa sẵn sàng được nuôi dưỡng",
        t: "Chuỗi chăm sóc tự động. Việc gọi điện được giao thẳng cho Sales. Khách quay lại thì Sales được báo ngay.",
        shot: "lead-nurture",
        claim: sys("Chuỗi nuôi dưỡng theo điểm ý định mua, giao việc trực tiếp cho nhân sự", SRC.lead)
      },
      {
        h: "Lịch sử làm việc trên khách hàng",
        t: "Email, cuộc gọi, cuộc họp, ghi chú nằm trên hồ sơ khách. Người tiếp nhận sau đọc lại được toàn bộ.",
        shot: "sales-account",
        claim: sys("Gửi email, gọi điện (VOIP), ghi biên bản họp và ghi chú nội bộ trên cùng một màn hình", SRC.sales)
      }
    ],
    value: {
      sales: "Mỗi ngày biết cần gọi ai, không phải tự nhớ",
      manager: "Khách bị bỏ quên lộ ra ngay, không phải đi hỏi"
    },
    notes: [
      "Một quy tắc cần nhớ: không có khách nào không có việc tiếp theo.",
      "Lịch sử nằm trên hồ sơ khách, không nằm trong điện thoại nhân viên. Đây là thứ giữ lại khách khi nhân viên nghỉ."
    ],
    detail: {
      problem: {
        now: "Kết quả cuộc gọi, nội dung trao đổi nằm trong sổ tay, Zalo cá nhân hoặc trí nhớ.",
        effects: ["Hẹn gọi lại nhưng quên.", "Người mới tiếp nhận phải hỏi lại khách từ đầu.", "Quản lý không biết khách đã được chăm sóc mấy lần."]
      },
      flow: [
        { a: "Sales", t: "Liên hệ lần đầu trong thời hạn" },
        { a: "Sales", t: "Ghi kết quả, đặt việc tiếp theo có hạn" },
        { a: "Hệ thống", t: "Quá hạn thì báo quản lý, giao lại" },
        { a: "Sales", t: "Khách chưa sẵn sàng: đưa vào nuôi dưỡng" }
      ],
      rules: [
        "Thời hạn liên hệ lần đầu đề xuất: 15 phút giờ hành chính cho khách nhắn trực tiếp, 4 giờ cho khách từ danh sách sự kiện.",
        "Ghi kết quả trong ngày, 2–3 câu: đã trao đổi gì, khách phản hồi gì.",
        "Khách không có nhu cầu: đóng kèm lý do, không để treo."
      ],
      roles: {
        sales: ["Ghi lịch sử và đặt việc tiếp theo.", "Bắt đầu ngày bằng danh sách việc của mình."],
        lead: ["Xử lý khách quá hạn được chuyển cấp.", "Hỗ trợ khách khó."],
        manager: ["Xem tỷ lệ liên hệ đúng hạn theo nhóm."]
      },
      assumptions: ["Ngưỡng thời gian là gợi ý ban đầu, doanh nghiệp chốt trong buổi khảo sát.", "Quản lý dùng dữ liệu để hỗ trợ, không chỉ để kiểm tra."],
      verify: ["Ghi âm cuộc gọi: cần xác nhận nhà cung cấp tổng đài được hỗ trợ."]
    }
  },
  {
    id: "chang-4", n: 4, icon: "sales", app: "Base Lead → Base Sales",
    nav: "Chuyển đổi", name: "Chuyển đổi thành cơ hội bán hàng",
    question: "Khách nào thật sự có khả năng mua?",
    message: "Khi nhu cầu đã rõ, Lead trở thành cơ hội bán hàng bằng một thao tác, mang theo toàn bộ lịch sử.",
    org: proc("Đủ 4 điều kiện thì chuyển thành cơ hội. Chưa đủ thì tiếp tục chăm sóc ở chặng 3."),
    criteria: [
      { k: "Nhu cầu", t: "Khách nói rõ cần gì" },
      { k: "Người quyết định", t: "Biết ai duyệt mua" },
      { k: "Thời điểm", t: "Có thời gian dự kiến mua" },
      { k: "Giá trị", t: "Ước tính được giá trị đơn hàng" }
    ],
    steps: [
      {
        h: "Điểm ưu tiên hỗ trợ đánh giá",
        t: "Mỗi lead có điểm theo độ phù hợp (Fit) và ý định mua (Intent), kèm lý do. Sales dùng để xếp thứ tự, vẫn tự xác nhận 4 điều kiện.",
        shot: "crm-journey-lead",
        claim: sys("Chấm điểm theo ma trận Fit × Intent, AI phân tích và lưu lý do chấm điểm", SRC.lead)
      },
      {
        h: "Chuyển thành cơ hội bằng một thao tác",
        t: "Cơ hội có giá trị, giai đoạn, người chủ trì và dự báo chốt. Lịch sử từ lúc khách để lại thông tin đi theo.",
        shot: "crm-journey-sales",
        claim: sys("Chuyển Lead thành cơ hội bằng 1 click, kế thừa toàn bộ lịch sử", SRC.crm)
      },
      {
        h: "Thiếu thông tin thì chưa đi tiếp",
        t: "Mỗi giai đoạn có thể yêu cầu trường bắt buộc, ví dụ người ra quyết định. Thiếu thì chưa chuyển được.",
        shot: "sales-required",
        claim: sys("Trường bắt buộc theo giai đoạn, thương vụ không chuyển tiếp khi chưa đủ thông tin", SRC.sales)
      }
    ],
    value: {
      sales: "Dồn thời gian vào khách có khả năng mua",
      manager: "Số cơ hội phản ánh doanh số dự kiến thật, không bị thổi phồng"
    },
    notes: [
      "Có 200 khách không có nghĩa là có 200 cơ hội.",
      "Điểm ưu tiên là công cụ hỗ trợ. Quyết định chuyển thành cơ hội vẫn dựa trên 4 điều kiện cả đội thống nhất."
    ],
    detail: {
      problem: {
        now: "Mọi khách đã gọi đều được coi là 'đang theo', không phân biệt khách hỏi giá và khách sắp mua.",
        effects: ["Danh sách theo dõi quá dài, Sales dàn trải.", "Quản lý không ước tính được doanh số sắp tới.", "Khách có nhu cầu thật bị chăm sóc như khách hỏi thăm."]
      },
      flow: [
        { a: "Sales", t: "Trao đổi để làm rõ 4 điều kiện" },
        { a: "Sales", t: "Đủ điều kiện: chuyển thành cơ hội" },
        { a: "Sales", t: "Điền giá trị, ngày dự kiến chốt, người quyết định" },
        { a: "Trưởng nhóm", t: "Xem cơ hội mới trong tuần" }
      ],
      rules: [
        "Bốn điều kiện: nhu cầu rõ, biết người quyết định, có thời điểm dự kiến, ước tính được giá trị.",
        "Trường bắt buộc trên cơ hội: giá trị dự kiến, ngày dự kiến chốt, người ra quyết định.",
        "Một khách có thể có nhiều cơ hội (mua lần đầu, mua bổ sung)."
      ],
      roles: {
        sales: ["Đánh giá điều kiện và chuyển thành cơ hội."],
        lead: ["Kiểm tra chất lượng cơ hội mới mỗi tuần."],
        manager: ["Chốt bộ điều kiện chung cho toàn đội."]
      },
      assumptions: ["Sales được hướng dẫn cách đánh giá 4 điều kiện.", "Giá trị dự kiến là ước tính, cập nhật khi có báo giá."],
      verify: []
    }
  },
  {
    id: "chang-5", n: 5, icon: "sales", app: "Base Sales",
    nav: "Tiến độ", name: "Quản lý tiến độ bán hàng",
    question: "Cơ hội nào sắp chốt? Cơ hội nào đang đứng yên?",
    message: "Mọi cơ hội trên một bảng theo giai đoạn. Cơ hội nằm quá lâu ở một giai đoạn tự hiện cảnh báo.",
    org: proc("Mỗi giai đoạn có điều kiện chuyển tiếp và số ngày tối đa. Sales tự chuyển khi đủ điều kiện."),
    stages: [
      { k: "Xác nhận nhu cầu", p: "10%", d: "7 ngày" },
      { k: "Khảo sát, tư vấn", p: "30%", d: "14 ngày" },
      { k: "Gửi báo giá", p: "50%", d: "14 ngày" },
      { k: "Đàm phán", p: "70%", d: "14 ngày" },
      { k: "Thắng / Thua", p: "", d: "Ghi lý do thua" }
    ],
    stagesNote: "Giai đoạn, xác suất và số ngày là đề xuất cho B2B SME, sẽ điều chỉnh theo quy trình thực tế.",
    steps: [
      {
        h: "Bảng Kanban theo giai đoạn",
        t: "Mỗi cột một giai đoạn, có tổng giá trị. Mỗi thẻ một cơ hội, có người phụ trách và số ngày ở giai đoạn.",
        shot: "sales-hero",
        claim: sys("Bảng Kanban, bảng tính, dự báo và báo cáo cùng đọc từ một pipeline", SRC.sales)
      },
      {
        h: "Mỗi giai đoạn có xác suất và hạn",
        t: "Đặt xác suất thắng và số ngày tối đa cho từng giai đoạn. Sắp xếp lại thì bảng, dự báo, báo cáo cập nhật theo.",
        shot: "sales-stages-cfg",
        claim: sys("Mỗi giai đoạn lưu xác suất thành công và số ngày tối đa trước khi cảnh báo tồn đọng", SRC.sales)
      },
      {
        h: "Cơ hội đứng yên tự lộ ra",
        t: "Cơ hội vượt giới hạn ngày hiện nhãn cảnh báo. Chế độ xem SLA liệt kê mọi cơ hội đã quá hạn.",
        shot: "sales-stage-sla",
        claim: sys("Thương vụ vượt mốc ngày hiện nhãn cảnh báo, chế độ xem SLA liệt kê deal quá giới hạn", SRC.sales)
      }
    ],
    value: {
      sales: "Cập nhật tiến độ bằng một thao tác kéo thả, không viết báo cáo",
      manager: "Giao ban nhìn chung một bảng, không hỏi từng người"
    },
    notes: [
      "Năm giai đoạn là đề xuất. Hỏi khách: quy trình bán hàng thực tế có những bước nào?",
      "Cơ hội đứng yên là cơ hội ở một giai đoạn quá số ngày tối đa. Doanh nghiệp tự đặt ngưỡng."
    ],
    detail: {
      problem: {
        now: "Tiến độ được báo bằng lời trong họp giao ban hoặc file Excel tổng hợp cuối tuần.",
        effects: ["Họp để cập nhật thay vì để xử lý.", "Cơ hội đứng yên nhiều tuần không ai phát hiện.", "Mỗi người hiểu 'sắp chốt' một kiểu."]
      },
      stageTable: [
        ["Xác nhận nhu cầu", "Đủ 4 điều kiện ở chặng 4", "Hẹn được buổi khảo sát / tư vấn"],
        ["Khảo sát, tư vấn", "Đã gặp hoặc gọi chi tiết", "Hiểu đủ yêu cầu để làm báo giá"],
        ["Gửi báo giá", "Báo giá đã gửi", "Khách phản hồi về báo giá"],
        ["Đàm phán", "Đang trao đổi điều khoản", "Khách đồng ý hoặc từ chối"],
        ["Thắng / Thua", "Có kết quả cuối cùng", "Thua: bắt buộc chọn lý do"]
      ],
      rules: [
        "Chỉ chuyển giai đoạn khi đủ điều kiện ra của giai đoạn hiện tại.",
        "Không cho kéo lùi hoặc nhảy cóc giai đoạn, trừ trưởng nhóm.",
        "Thua phải chọn lý do từ danh mục để phân tích ở chặng 6."
      ],
      roles: {
        sales: ["Chuyển giai đoạn và cập nhật giá trị, ngày dự kiến chốt."],
        lead: ["Rà cơ hội quá hạn mỗi tuần.", "Cùng Sales xử lý cơ hội giá trị lớn."],
        manager: ["Chủ trì giao ban trên bảng chung.", "Duyệt thay đổi giai đoạn của quy trình."]
      },
      claims: [
        sys("Kiểm soát thao tác: tạo deal ngoài giai đoạn đầu, kéo lùi, nhảy cóc, kèm danh sách ngoại lệ", SRC.sales),
        sys("Danh mục lý do đóng deal, bắt buộc chọn khi chốt", SRC.sales),
        sys("Lưu chế độ xem dùng chung, lọc theo nhân viên, doanh thu dự kiến, nhãn", SRC.sales)
      ],
      assumptions: ["Doanh nghiệp có một quy trình bán hàng chung cho phần lớn đơn hàng.", "Sales cập nhật giai đoạn ngay khi có thay đổi."],
      verify: []
    }
  },
  {
    id: "chang-6", n: 6, icon: "sales", app: "Base Sales · Base Lead",
    nav: "Hiệu quả", name: "Theo dõi hiệu quả và ra quyết định",
    question: "Đội Sales đang làm việc thế nào, mà không cần hỏi từng người?",
    message: "Số liệu đến từ chính công việc hằng ngày. Quản lý đọc báo cáo, không phải đi gom file.",
    org: proc("Một bộ chỉ số nhỏ, xem cùng nhịp: hằng tuần với trưởng nhóm, hằng tháng với quản lý."),
    metrics: [
      { g: "Đầu vào", items: ["Khách tiềm năng mới theo nguồn"] },
      { g: "Xử lý", items: ["Liên hệ lần đầu đúng hạn", "Khách quá hạn theo nhân viên"] },
      { g: "Cơ hội", items: ["Số lượng, giá trị theo giai đoạn", "Cơ hội đứng yên"] },
      { g: "Kết quả", items: ["Tỷ lệ thắng", "Doanh số so với chỉ tiêu", "Lý do thua"] }
    ],
    metricsNote: "Chỉ số đề xuất. Số trong ảnh là dữ liệu mẫu của Base; số thật của doanh nghiệp được đo sau khi vận hành.",
    steps: [
      {
        h: "Bảng báo cáo chung",
        t: "Phễu theo giai đoạn, lý do thua, cơ hội không hoạt động 14+ ngày. Hỏi bằng câu thường, biểu đồ vào bảng chung.",
        shot: "sales-dashboard",
        claim: sys("Báo cáo thời gian thực; hỏi bằng ngôn ngữ thường, câu trả lời thành biểu đồ trên bảng chung", SRC.sales)
      },
      {
        h: "Dự báo theo từng nhân viên",
        t: "Mỗi người nộp dự báo, hệ thống lưu lại. Quản lý thấy đã chốt, cam kết, so với chỉ tiêu và thay đổi so với lần nộp trước.",
        shot: "sales-forecast",
        claim: sys("Sổ dự báo giao chỉ tiêu cho từng nhân viên; khi nộp, hệ thống chụp lại dự báo và gửi quản lý", SRC.sales)
      },
      {
        h: "Nguồn nào mang lại doanh thu",
        t: "Từ nguồn, chiến dịch đến số lead, lead đạt chuẩn, hợp đồng thắng. Bấm vào số để xem danh sách khách tương ứng.",
        shot: "lead-campaign",
        claim: sys("Phễu chuyển đổi từ chi phí quảng cáo, số lead, tỷ lệ chuyển đổi đến hợp đồng thành công", SRC.lead)
      }
    ],
    value: {
      sales: "Tự thấy kết quả của mình so với chỉ tiêu",
      manager: "Phát hiện điểm nghẽn sớm, quyết định dựa trên dữ liệu"
    },
    notes: [
      "Không đưa số giả định. Tháng vận hành đầu tiên là mốc so sánh.",
      "Đọc chỉ số theo chuỗi: nhiều khách nhưng ít cơ hội → xem chặng 3–4. Nhiều cơ hội nhưng ít thắng → xem chặng 5.",
      "Dành thời gian cho câu hỏi của quản lý ở đây."
    ],
    detail: {
      problem: {
        now: "Quản lý gom số liệu từ file Excel của từng người, hoặc hỏi trực tiếp trong họp.",
        effects: ["Số liệu đến chậm, đã cũ khi đọc.", "Mỗi người tính một kiểu, không so sánh được.", "Chỉ biết kết quả cuối, không biết nghẽn ở đâu."]
      },
      readGuide: [
        ["Nhiều khách mới nhưng ít được liên hệ đúng hạn", "Nghẽn ở phân công hoặc tải công việc", "Chặng 2–3"],
        ["Liên hệ đủ nhưng ít khách thành cơ hội", "Chất lượng nguồn hoặc kỹ năng tư vấn", "Chặng 1, 4"],
        ["Nhiều cơ hội quá hạn ở một giai đoạn", "Thiếu hỗ trợ ở giai đoạn đó", "Chặng 5"],
        ["Tỷ lệ thắng thấp, lý do thua lặp lại", "Giá, sản phẩm hoặc đối thủ", "Quyết định kinh doanh"]
      ],
      cadence: [
        ["Hằng ngày", "Sales", "Việc của tôi, khách mới được giao"],
        ["Hằng tuần", "Trưởng nhóm", "Khách quá hạn, cơ hội đứng yên, cơ hội mới"],
        ["Hằng tháng", "Quản lý", "Nguồn khách, tỷ lệ chuyển đổi, tỷ lệ thắng, lý do thua, dự báo"]
      ],
      roles: {
        sales: ["Xem số liệu và dự báo của bản thân."],
        lead: ["Xem số liệu nhóm, so sánh để hỗ trợ."],
        manager: ["Xem toàn đội, quyết định về nguồn, nhân sự, quy trình."]
      },
      assumptions: ["Chỉ số chỉ đúng khi dữ liệu ở chặng 1–5 được nhập đầy đủ.", "Tháng đầu là mốc so sánh, chưa dùng để đánh giá nhân viên."],
      verify: []
    }
  }
];

const SUMMARY = {
  answers: [
    { q: "Khách đến từ đâu?", a: "Một danh sách Lead chung, nguồn ghi tự động", n: 1 },
    { q: "Ai phụ trách?", a: "Một người, giao theo quy tắc, có lý do", n: 2 },
    { q: "Có bỏ sót không?", a: "Đồng hồ liên hệ, quá hạn báo quản lý", n: 3 },
    { q: "Khách nào sẽ mua?", a: "Đủ 4 điều kiện, chuyển thành cơ hội", n: 4 },
    { q: "Cơ hội nào sắp chốt?", a: "Bảng Kanban, cảnh báo quá hạn giai đoạn", n: 5 },
    { q: "Đội đang làm thế nào?", a: "Báo cáo và dự báo từ dữ liệu hằng ngày", n: 6 }
  ],
  next: [
    { k: "Khảo sát", t: "Buổi làm việc 90 phút: chốt nguồn khách, quy tắc chia, giai đoạn bán hàng" },
    { k: "Chuẩn bị dữ liệu", t: "Làm sạch danh sách khách hiện có" },
    { k: "Chạy thử", t: "Một nhóm Sales dùng trước 2 tuần, điều chỉnh quy trình" },
    { k: "Mở rộng", t: "Cả đội dùng, đo chỉ số tháng đầu làm mốc" }
  ],
  roleValue: {
    sales: ["Biết rõ khách của mình và việc cần làm mỗi ngày", "Không làm báo cáo riêng", "Nhận khách bàn giao có đủ lịch sử"],
    lead: ["Thấy khách quá hạn và cơ hội đứng yên của nhóm", "Hỗ trợ đúng người, đúng lúc", "Chia khách công bằng, minh bạch"],
    manager: ["Đọc tình hình đội mà không cần hỏi", "Biết nguồn khách nào hiệu quả", "Giữ dữ liệu khách khi nhân sự thay đổi"]
  },
  measure: [
    ["Khách mới được liên hệ đúng hạn", "Chưa đo", "Đo trên hệ thống"],
    ["Cơ hội quá hạn giai đoạn", "Chưa đo", "Đo trên hệ thống"],
    ["Tỷ lệ Lead thành cơ hội", "Chưa đo", "Đo trên hệ thống"],
    ["Thời gian quản lý gom báo cáo mỗi tuần", "Hỏi trong buổi khảo sát", "Đo lại"]
  ],
  conditions: [
    "Quản lý dùng hệ thống trong giao ban, không yêu cầu thêm báo cáo Excel song song.",
    "Quy tắc chia khách, điều kiện tạo cơ hội, giai đoạn bán hàng được chốt và công bố.",
    "Có người phụ trách vận hành CRM phía doanh nghiệp."
  ],
  notes: [
    "Quay lại sáu câu hỏi ở đầu buổi. Mỗi câu giờ có chỗ để xem câu trả lời.",
    "Giá trị nằm ở việc cả đội làm cùng một cách và nhìn cùng một dữ liệu.",
    "Kết thúc bằng đề xuất buổi khảo sát để thay giả định bằng thực tế."
  ]
};

const ROLE_LABEL = { sales: "Nhân viên Sales", lead: "Trưởng nhóm", manager: "Quản lý kinh doanh" };

/* Lịch trình 10 phút: id màn hình trình bày → thời lượng (phút) + lời dẫn */
const SCRIPT = [
  { id: "mo-dau", label: "Mở đầu", min: 1, part: "Bài toán quản lý khách hàng và bán hàng", notes: ["Hỏi: hôm nay có bao nhiêu khách đang được theo đuổi, ai phụ trách từng khách?", "Nhấn mạnh bối cảnh là giả định để thiết kế, sẽ điều chỉnh theo thực tế."] },
  { id: "hanh-trinh", label: "Hành trình", min: 1, part: "Tổng quan hành trình khách hàng", notes: ["Sáu chặng theo đúng thứ tự một khách đi qua doanh nghiệp.", "Chặng 1–3 xử lý Lead. Từ chặng 4, khách có nhu cầu rõ thành cơ hội."] },
  { id: "chang-1", label: "Chặng 1", min: 0.7, part: "Tiếp nhận, phân công, chăm sóc" },
  { id: "chang-2", label: "Chặng 2", min: 0.6, part: "Tiếp nhận, phân công, chăm sóc" },
  { id: "chang-3", label: "Chặng 3", min: 0.7, part: "Tiếp nhận, phân công, chăm sóc" },
  { id: "chang-4", label: "Chặng 4", min: 1, part: "Chuyển đổi và quản lý cơ hội" },
  { id: "chang-5", label: "Chặng 5", min: 1, part: "Chuyển đổi và quản lý cơ hội" },
  { id: "chang-6", label: "Chặng 6", min: 2, part: "Hiệu quả đội Sales và báo cáo quản trị" },
  { id: "tong-ket", label: "Tổng kết", min: 2, part: "Tổng kết giải pháp và giá trị" }
];

window.CRM = { SRC, SHOTS, CONTEXT, PROBLEMS, STAGES, SUMMARY, ROLE_LABEL, SCRIPT };
