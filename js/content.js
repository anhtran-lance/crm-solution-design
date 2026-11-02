/* =====================================================================
   NỘI DUNG SOLUTION DESIGN
   ---------------------------------------------------------------------
   Toàn bộ chữ, ảnh và trạng thái xác minh nằm trong file này để người
   trình bày có thể sửa mà không cần đụng vào giao diện.

   Ba loại nội dung được tách bạch:
   - proc(...)  : ĐỀ XUẤT QUY TRÌNH. Cách doanh nghiệp nên tổ chức công việc.
                  Không phụ thuộc phần mềm.
   - sys(...)   : KHẢ NĂNG SẢN PHẨM. Điều Base CRM làm được. Mặc định
                  status = "pending" (chưa xác minh) cho tới khi đối chiếu
                  với https://base.vn/platform/crm hoặc tài liệu chính thức.
                  Khi đã xác minh, đổi thành sys("...", "verified", "nguồn").
   - Ảnh (SHOTS): ảnh chụp giao diện thật. Đặt file đúng tên vào
                  assets/base/. Nếu chưa có file, website hiển thị khung
                  "Cần bổ sung ảnh" kèm mô tả ảnh cần chụp.
   ===================================================================== */

const proc = (t) => ({ kind: "proc", t });
const sys = (t, status = "pending", src = "") => ({ kind: "sys", t, status, src });

/* ---------------------------------------------------------------------
   ẢNH GIAO DIỆN BASE CRM
   file      : đường dẫn file ảnh. Chưa có file => hiển thị khung cần bổ sung.
   need      : mô tả cụ thể ảnh cần có (dùng cho danh sách bổ sung ảnh).
   source    : nơi lấy ảnh (URL trang tham chiếu hoặc "Ảnh do khách cung cấp").
   callouts  : điểm chú thích. x, y tính theo % chiều rộng / cao của ảnh.
               Để null khi chưa có ảnh; điền sau khi đặt ảnh vào.
   --------------------------------------------------------------------- */
const SHOTS = {
  "s1-danh-sach-khach-hang": {
    file: "assets/base/s1-danh-sach-khach-hang.png",
    title: "Danh sách khách hàng tiềm năng tập trung",
    need: "Màn hình danh sách khách hàng / khách hàng tiềm năng trong Base CRM, thấy rõ cột Nguồn, cột Người phụ trách và ô lọc/tìm kiếm. Dữ liệu mẫu, không chứa thông tin khách thật.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Một danh sách chung cho cả đội, thay cho nhiều file Excel riêng" },
      { x: null, y: null, t: "Cột Nguồn cho biết khách đến từ kênh nào" },
      { x: null, y: null, t: "Bộ lọc để tìm khách chưa có người phụ trách hoặc chưa được liên hệ" }
    ]
  },
  "s1b-thu-thap": {
    file: "assets/base/s1b-thu-thap.png",
    title: "Đưa khách hàng tiềm năng vào hệ thống",
    need: "Màn hình hoặc cấu hình cho thấy cách khách hàng tiềm năng được đưa vào Base CRM: biểu mẫu web, nhập từ file, hoặc kết nối kênh (nếu có). Chỉ dùng ảnh của cách đã được xác minh.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Kênh hoặc cách nhập dữ liệu vào hệ thống" },
      { x: null, y: null, t: "Trường thông tin bắt buộc khi tạo mới" }
    ]
  },
  "s2-nguoi-phu-trach": {
    file: "assets/base/s2-nguoi-phu-trach.png",
    title: "Người phụ trách trên hồ sơ khách hàng",
    need: "Hồ sơ một khách hàng trong Base CRM, thấy rõ trường Người phụ trách (owner) và thao tác đổi người phụ trách. Nếu có cấu hình phân bổ tự động, chụp thêm màn hình cấu hình đó.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Mỗi khách hàng có đúng một người phụ trách chính" },
      { x: null, y: null, t: "Đổi người phụ trách khi bàn giao, lịch sử khách hàng vẫn giữ nguyên" }
    ]
  },
  "s3-lich-su-tuong-tac": {
    file: "assets/base/s3-lich-su-tuong-tac.png",
    title: "Lịch sử làm việc với khách hàng",
    need: "Phần lịch sử / hoạt động / ghi chú trên hồ sơ khách hàng trong Base CRM: cuộc gọi, ghi chú, email hoặc lịch hẹn đã ghi nhận theo thời gian.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Mỗi lần gọi, gặp, gửi báo giá được ghi lại theo thời gian" },
      { x: null, y: null, t: "Người mới tiếp nhận khách đọc lại được toàn bộ quá trình" }
    ]
  },
  "s3b-viec-can-lam": {
    file: "assets/base/s3b-viec-can-lam.png",
    title: "Việc cần làm tiếp theo",
    need: "Màn hình công việc / lịch hẹn / nhắc việc gắn với khách hàng trong Base CRM, có hạn xử lý và người thực hiện. Nếu sản phẩm không có, ghi rõ và bỏ ảnh này.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Việc tiếp theo có hạn và người thực hiện" },
      { x: null, y: null, t: "Việc quá hạn được tách riêng để không bị bỏ sót" }
    ]
  },
  "s4-tao-co-hoi": {
    file: "assets/base/s4-tao-co-hoi.png",
    title: "Tạo cơ hội bán hàng từ khách hàng",
    need: "Thao tác tạo cơ hội bán hàng (deal/opportunity) gắn với một khách hàng trong Base CRM, thấy các trường: giá trị dự kiến, ngày dự kiến chốt, giai đoạn, người phụ trách.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Cơ hội gắn với hồ sơ khách hàng đã có" },
      { x: null, y: null, t: "Giá trị và ngày dự kiến chốt: hai thông tin quản lý cần nhất" },
      { x: null, y: null, t: "Giai đoạn ban đầu của cơ hội" }
    ]
  },
  "s5-pipeline": {
    file: "assets/base/s5-pipeline.png",
    title: "Bảng theo dõi cơ hội theo giai đoạn",
    need: "Màn hình cơ hội bán hàng dạng bảng cột theo giai đoạn (kanban/pipeline) trong Base CRM, mỗi cột là một giai đoạn, có tổng giá trị theo cột nếu sản phẩm hiển thị.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Mỗi cột là một giai đoạn bán hàng" },
      { x: null, y: null, t: "Mỗi thẻ là một cơ hội, có giá trị và người phụ trách" },
      { x: null, y: null, t: "Tổng giá trị theo giai đoạn (nếu sản phẩm hiển thị)" }
    ]
  },
  "s6-bao-cao": {
    file: "assets/base/s6-bao-cao.png",
    title: "Báo cáo hoạt động và kết quả đội Sales",
    need: "Màn hình báo cáo / dashboard trong Base CRM: số khách hàng mới theo nguồn, cơ hội theo giai đoạn, kết quả theo nhân viên. Dữ liệu mẫu.",
    source: "",
    callouts: [
      { x: null, y: null, t: "Số liệu tổng hợp từ dữ liệu Sales nhập hằng ngày" },
      { x: null, y: null, t: "Xem theo nhân viên hoặc theo giai đoạn" }
    ]
  }
};

/* ---------------------------------------------------------------------
   BỐI CẢNH GIẢ ĐỊNH (dùng chung cho mọi chặng)
   --------------------------------------------------------------------- */
const CONTEXT = {
  label: "Bối cảnh giả định để thiết kế giải pháp, không phải dữ kiện của một khách hàng cụ thể",
  team: "Doanh nghiệp B2B SME, 12 nhân viên Sales chia 3 nhóm, 1 quản lý kinh doanh",
  sources: ["Website", "Hotline", "Hội chợ, sự kiện", "Khách giới thiệu", "Zalo, Facebook"],
  cycle: "Mỗi khách cần nhiều lần gặp, gọi, gửi báo giá trước khi ra quyết định"
};

/* ---------------------------------------------------------------------
   SLIDES
   kind: intro | overview | stage | summary
   minutes: thời lượng tham khảo khi trình bày
   notes: lời dẫn cho người trình bày (bật bằng phím N)
   detail: nội dung lớp Solution Detail
   --------------------------------------------------------------------- */
const SLIDES = [
  /* ------------------------------ MỞ ĐẦU ------------------------------ */
  {
    id: "mo-dau",
    kind: "intro",
    nav: "Mở đầu",
    minutes: 1,
    title: "Khách hàng là tài sản lớn nhất, nhưng đang nằm rải rác",
    lead: "Thông tin khách nằm trong Excel, Zalo và trí nhớ của từng người. Quản lý không nhìn thấy, nên không quản lý được.",
    symptoms: [
      { k: "Không rõ nguồn", t: "Khách đến từ nhiều kênh, mỗi kênh ghi một nơi" },
      { k: "Không rõ ai phụ trách", t: "Hai người cùng gọi một khách, hoặc không ai gọi" },
      { k: "Không rõ tiến độ", t: "Muốn biết khách đang ở đâu phải hỏi từng người" },
      { k: "Mất khi nghỉ việc", t: "Nhân viên nghỉ, lịch sử khách đi theo" }
    ],
    notes: [
      "Mở bằng câu hỏi: hôm nay anh chị có bao nhiêu khách đang được theo đuổi, và ai đang phụ trách từng khách?",
      "Nếu câu trả lời cần hỏi lại đội Sales, đó chính là vấn đề chúng ta giải quyết hôm nay.",
      "Nhấn mạnh: đây là bối cảnh giả định để thiết kế, sẽ điều chỉnh theo thực tế của doanh nghiệp."
    ],
    detail: {
      intro: "Phạm vi, giả định và cách đọc tài liệu này.",
      sections: [
        {
          h: "Bối cảnh nghiệp vụ giả định",
          list: [
            "Doanh nghiệp B2B SME, khoảng 10–15 nhân viên Sales. Tài liệu dùng ví dụ 12 Sales chia 3 nhóm.",
            "Khách hàng tiềm năng đến từ nhiều kênh: website, hotline, hội chợ và sự kiện, khách giới thiệu, mạng xã hội.",
            "Mỗi khách cần nhiều lần tương tác (gọi, gặp, gửi báo giá) trước khi mua.",
            "Quản lý cần theo dõi hiệu quả của từng nhân viên và của toàn đội."
          ],
          note: "Đây là giả định để thiết kế giải pháp, không phải dữ kiện đã xác nhận về một doanh nghiệp cụ thể. Buổi khảo sát sẽ thay bằng số liệu thật."
        },
        {
          h: "Cách đọc nhãn trong tài liệu",
          legend: true
        },
        {
          h: "Thuật ngữ dùng trong tài liệu",
          terms: [
            ["CRM", "Phần mềm lưu toàn bộ thông tin khách hàng và quá trình bán hàng ở một nơi chung cho cả đội."],
            ["Khách hàng tiềm năng", "Người hoặc doanh nghiệp đã để lại thông tin, có thể có nhu cầu nhưng chưa xác nhận."],
            ["Cơ hội bán hàng", "Một nhu cầu mua cụ thể đã được xác nhận, có giá trị dự kiến và thời điểm dự kiến chốt."],
            ["Giai đoạn bán hàng", "Các bước một cơ hội đi qua, từ lúc xác nhận nhu cầu đến lúc thắng hoặc thua."],
            ["Người phụ trách", "Nhân viên chịu trách nhiệm chính với một khách hàng hoặc một cơ hội."]
          ]
        },
        {
          h: "Ngoài phạm vi buổi trình bày",
          list: [
            "Giá phần mềm, gói dịch vụ và hợp đồng.",
            "Tích hợp kỹ thuật chi tiết (tổng đài, kế toán, website) — sẽ khảo sát riêng nếu doanh nghiệp cần.",
            "Chuyển đổi dữ liệu cũ: chỉ nêu nguyên tắc, kế hoạch cụ thể sau khi xem dữ liệu thật."
          ]
        }
      ]
    }
  },

  /* ----------------------------- TỔNG QUAN ---------------------------- */
  {
    id: "tong-quan",
    kind: "overview",
    nav: "Tổng quan",
    minutes: 1,
    title: "Một hành trình, sáu câu hỏi quản lý",
    lead: "Từ lúc khách để lại thông tin đến lúc quản lý đọc được kết quả. Chọn một chặng để đi vào.",
    split: { before: "Khách hàng tiềm năng", after: "Cơ hội bán hàng", at: 4 },
    notes: [
      "Đây là bản đồ của cả buổi. Sáu chặng đi theo đúng thứ tự một khách hàng đi qua doanh nghiệp.",
      "Chặng 1 đến 3 xử lý khách hàng tiềm năng. Từ chặng 4, khách có nhu cầu rõ trở thành cơ hội bán hàng.",
      "Mỗi chặng trả lời một câu hỏi mà quản lý hay phải hỏi đội Sales."
    ],
    detail: {
      intro: "Mỗi chặng được trình bày theo cùng một cấu trúc để dễ so sánh.",
      sections: [
        {
          h: "Cấu trúc của mỗi chặng",
          flow: [
            { a: "Vấn đề", t: "Điều đang xảy ra khi chưa có quy trình và hệ thống chung" },
            { a: "Cách tổ chức", t: "Quy trình đề xuất, không phụ thuộc phần mềm" },
            { a: "Trên hệ thống", t: "Thao tác tương ứng trên Base CRM, kèm ảnh giao diện" },
            { a: "Giá trị", t: "Thay đổi với nhân viên Sales và với quản lý" }
          ]
        },
        {
          h: "Ai tham gia ở chặng nào",
          roleMatrix: true
        },
        {
          h: "Vì sao tách khách hàng tiềm năng và cơ hội bán hàng",
          list: [
            "Khách hàng tiềm năng nhiều nhưng chưa chắc có nhu cầu. Cần xử lý nhanh, số lượng lớn.",
            "Cơ hội bán hàng ít hơn nhưng có giá trị cụ thể. Cần theo dõi kỹ từng giai đoạn.",
            "Tách hai lớp giúp quản lý không nhầm giữa 'nhiều khách' và 'nhiều doanh số dự kiến'."
          ]
        }
      ]
    }
  },

  /* ------------------------------ CHẶNG 1 ----------------------------- */
  {
    id: "c1",
    kind: "stage",
    stage: 1,
    nav: "Tiếp nhận",
    navLong: "Tiếp nhận khách hàng tiềm năng",
    minutes: 0.7,
    question: "Khách hàng tiềm năng đang nằm ở đâu?",
    message: "Mọi khách, từ mọi kênh, về một danh sách chung, có ghi nguồn.",
    org: proc("Mỗi kênh có một cách đưa khách vào hệ thống. Nguồn là thông tin bắt buộc."),
    system: [
      sys("Danh sách khách hàng chung cho cả đội, tìm và lọc theo nguồn"),
      sys("Đưa khách vào bằng biểu mẫu, nhập file hoặc kết nối kênh")
    ],
    value: {
      sales: "Không mất khách vì ghi nhầm chỗ",
      manager: "Biết mỗi tuần có bao nhiêu khách mới, từ kênh nào"
    },
    shot: "s1-danh-sach-khach-hang",
    notes: [
      "Hỏi khách: hiện tại một khách gọi hotline thì thông tin được ghi ở đâu? Khách ở hội chợ thì sao?",
      "Nguyên tắc: không có khách nào nằm ngoài danh sách chung. Nguồn là trường bắt buộc vì chặng 6 sẽ dùng nó để biết kênh nào hiệu quả."
    ],
    detail: {
      problem: {
        now: "Mỗi kênh ghi khách ở một nơi: form website gửi về email, hotline ghi sổ, hội chợ giữ danh thiếp, Zalo nằm trong điện thoại từng người.",
        effects: [
          "Khách để lại thông tin nhưng không ai liên hệ.",
          "Cùng một khách được nhập nhiều lần ở nhiều file.",
          "Không đo được kênh nào mang lại khách tốt."
        ]
      },
      flow: [
        { a: "Khách", t: "Để lại thông tin qua một kênh bất kỳ" },
        { a: "Người tiếp nhận", t: "Đưa vào danh sách chung trong ngày, ghi rõ nguồn" },
        { a: "Hệ thống", t: "Lưu thành một hồ sơ khách hàng tiềm năng" },
        { a: "Trưởng nhóm", t: "Kiểm tra trùng và chuyển sang chặng phân công" }
      ],
      rules: [
        "Thông tin tối thiểu khi tạo mới: tên người liên hệ, công ty, số điện thoại hoặc email, nguồn.",
        "Khách từ sự kiện được nhập trong vòng 1 ngày làm việc sau sự kiện.",
        "Trước khi tạo mới, tìm theo số điện thoại hoặc tên công ty để tránh trùng."
      ],
      roles: {
        sales: ["Nhập khách tự tìm được vào danh sách chung, không giữ riêng."],
        lead: ["Đảm bảo khách từ kênh chung (website, hotline, sự kiện) được nhập đầy đủ."],
        manager: ["Quyết định danh sách nguồn chuẩn để mọi người chọn giống nhau."]
      },
      system: [
        { s: sys("Xem toàn bộ khách hàng tiềm năng trong một danh sách, lọc theo nguồn, theo người phụ trách"), shot: "s1-danh-sach-khach-hang" },
        { s: sys("Tạo khách hàng thủ công, nhập từ file Excel hoặc qua biểu mẫu web"), shot: "s1b-thu-thap" },
        { s: sys("Cảnh báo hoặc gộp khi trùng số điện thoại, email") }
      ],
      assumptions: [
        "Doanh nghiệp thống nhất được danh sách nguồn khách (khoảng 5–8 nguồn).",
        "Dữ liệu khách cũ được làm sạch trước khi đưa vào."
      ],
      verify: [
        "Base CRM hỗ trợ những kênh đưa khách vào nào (biểu mẫu web, nhập file, Zalo, Facebook, tổng đài)?",
        "Có tách riêng đối tượng 'khách hàng tiềm năng' hay dùng chung đối tượng 'khách hàng' với trạng thái?",
        "Có cơ chế kiểm tra trùng không, theo trường nào?"
      ]
    }
  },

  /* ------------------------------ CHẶNG 2 ----------------------------- */
  {
    id: "c2",
    kind: "stage",
    stage: 2,
    nav: "Phân công",
    navLong: "Phân công và xác định trách nhiệm",
    minutes: 0.6,
    question: "Ai phụ trách khách hàng này?",
    message: "Mỗi khách có đúng một người phụ trách. Ai cũng nhìn thấy đó là ai.",
    org: proc("Chia khách theo quy tắc rõ ràng: theo nhóm, rồi chia lần lượt trong nhóm."),
    system: [
      sys("Trường người phụ trách trên mỗi hồ sơ khách hàng"),
      sys("Đổi người phụ trách khi bàn giao, giữ nguyên lịch sử")
    ],
    scenario: {
      h: "Ví dụ trong đội 12 Sales",
      steps: [
        "Khách từ hội chợ, ở Hà Nội",
        "Thuộc Nhóm Miền Bắc (4 người)",
        "Đến lượt Sales B nhận",
        "Sales B thấy khách trong danh sách của mình"
      ]
    },
    value: {
      sales: "Biết rõ khách nào là của mình, không giành, không bỏ",
      manager: "Hỏi 'khách này ai lo' có câu trả lời ngay"
    },
    shot: "s2-nguoi-phu-trach",
    notes: [
      "Quy tắc chia khách là quyết định của doanh nghiệp, không phải của phần mềm. Phần mềm chỉ giúp thực hiện và ghi lại.",
      "Hỏi khách: hiện tại chia khách theo vùng, theo ngành hay ai nhận trước được trước?",
      "Nếu hệ thống có phân bổ tự động thì đề cập; nếu chưa xác minh, nói rõ có thể chia thủ công theo quy tắc."
    ],
    detail: {
      problem: {
        now: "Khách được 'ai nhận trước thì của người đó', hoặc trưởng nhóm chia bằng tin nhắn.",
        effects: [
          "Hai người cùng liên hệ một khách, khách thấy thiếu chuyên nghiệp.",
          "Khách không được ai nhận vì mỗi người nghĩ người khác đã gọi.",
          "Nhân viên nghỉ việc, không ai biết họ đang giữ những khách nào."
        ]
      },
      flow: [
        { a: "Hệ thống", t: "Khách mới xuất hiện trong danh sách chưa có người phụ trách" },
        { a: "Trưởng nhóm", t: "Gán người phụ trách theo quy tắc (hoặc hệ thống tự gán nếu có)" },
        { a: "Sales", t: "Nhận khách, liên hệ lần đầu trong thời hạn đã thống nhất" },
        { a: "Trưởng nhóm", t: "Xem danh sách khách chưa có người phụ trách mỗi sáng" }
      ],
      rules: [
        "Bước 1: chia theo nhóm (vùng, ngành hoặc sản phẩm — doanh nghiệp chọn một tiêu chí).",
        "Bước 2: trong nhóm, chia lần lượt để công bằng.",
        "Khách giới thiệu bởi một Sales thì giao lại cho chính Sales đó.",
        "Liên hệ lần đầu trong thời hạn đề xuất: 1 ngày làm việc (doanh nghiệp tự chốt).",
        "Khi nhân viên nghỉ: trưởng nhóm chuyển toàn bộ khách sang người khác trước ngày nghỉ."
      ],
      roles: {
        sales: ["Nhận và liên hệ khách được giao trong thời hạn.", "Báo trưởng nhóm nếu khách không thuộc nhóm mình."],
        lead: ["Gán hoặc kiểm tra việc gán người phụ trách hằng ngày.", "Xử lý bàn giao khi có người nghỉ."],
        manager: ["Chốt tiêu chí chia khách.", "Xem số khách đang giữ của từng người để cân tải."]
      },
      system: [
        { s: sys("Mỗi hồ sơ khách hàng có trường người phụ trách, lọc được 'khách của tôi'"), shot: "s2-nguoi-phu-trach" },
        { s: sys("Đổi người phụ trách hàng loạt khi bàn giao") },
        { s: sys("Phân bổ khách tự động theo quy tắc (nếu có)") },
        { s: sys("Phân quyền: Sales chỉ xem khách của mình, trưởng nhóm xem cả nhóm") }
      ],
      assumptions: [
        "Đội Sales được chia nhóm rõ ràng và có trưởng nhóm.",
        "Doanh nghiệp chấp nhận một quy tắc chia khách thống nhất."
      ],
      verify: [
        "Base CRM có phân bổ khách tự động không? Theo những tiêu chí nào?",
        "Có hỗ trợ người theo dõi / người liên quan bên cạnh người phụ trách chính không?",
        "Phân quyền xem dữ liệu theo người, theo nhóm được cấu hình thế nào?",
        "Đổi người phụ trách hàng loạt có được không?"
      ]
    }
  },

  /* ------------------------------ CHẶNG 3 ----------------------------- */
  {
    id: "c3",
    kind: "stage",
    stage: 3,
    nav: "Chăm sóc",
    navLong: "Theo dõi và chăm sóc khách hàng",
    minutes: 0.7,
    question: "Đã làm việc với khách đến đâu? Ai cần được theo dõi tiếp?",
    message: "Mỗi lần làm việc được ghi lại. Mỗi khách luôn có một việc tiếp theo.",
    org: proc("Sau mỗi lần liên hệ: ghi lại kết quả và đặt ngay việc tiếp theo có hạn."),
    system: [
      sys("Lịch sử tương tác trên hồ sơ khách hàng"),
      sys("Công việc, lịch hẹn có hạn và người thực hiện")
    ],
    value: {
      sales: "Mỗi sáng biết hôm nay cần gọi ai",
      manager: "Thấy khách nào đang bị bỏ quên mà không phải hỏi"
    },
    shot: "s3-lich-su-tuong-tac",
    notes: [
      "Một quy tắc duy nhất cần nhớ: không có khách nào không có việc tiếp theo.",
      "Lịch sử nằm trên hồ sơ khách, không nằm trong điện thoại nhân viên. Đây là thứ giữ lại khách khi nhân viên nghỉ."
    ],
    detail: {
      problem: {
        now: "Kết quả cuộc gọi, nội dung trao đổi nằm trong sổ tay, Zalo cá nhân hoặc trí nhớ.",
        effects: [
          "Hẹn gọi lại nhưng quên.",
          "Người mới tiếp nhận khách phải hỏi lại khách từ đầu.",
          "Quản lý không biết một khách đã được chăm sóc mấy lần."
        ]
      },
      flow: [
        { a: "Sales", t: "Liên hệ khách (gọi, gặp, gửi tài liệu)" },
        { a: "Sales", t: "Ghi kết quả ngắn gọn ngay sau khi liên hệ" },
        { a: "Sales", t: "Đặt việc tiếp theo kèm hạn (gọi lại, gửi báo giá, hẹn gặp)" },
        { a: "Trưởng nhóm", t: "Xem danh sách việc quá hạn và khách lâu không được liên hệ" }
      ],
      rules: [
        "Ghi kết quả trong ngày, tối đa 2–3 câu: đã trao đổi gì, khách phản hồi gì.",
        "Mỗi khách đang theo đuổi phải có ít nhất một việc tiếp theo có hạn.",
        "Đề xuất: khách không có tương tác trong 14 ngày được đưa vào danh sách cần xem lại.",
        "Khách không có nhu cầu: đóng kèm lý do, không để treo."
      ],
      roles: {
        sales: ["Ghi lịch sử và đặt việc tiếp theo.", "Bắt đầu ngày bằng danh sách việc đến hạn."],
        lead: ["Xem việc quá hạn của nhóm mỗi sáng.", "Hỗ trợ khách khó, nhắc nhân viên chậm."],
        manager: ["Xem tổng số khách bị bỏ quên theo nhóm."]
      },
      system: [
        { s: sys("Ghi chú, cuộc gọi, email, lịch hẹn hiển thị theo thời gian trên hồ sơ khách"), shot: "s3-lich-su-tuong-tac" },
        { s: sys("Tạo công việc có hạn, người thực hiện, gắn với khách hàng"), shot: "s3b-viec-can-lam" },
        { s: sys("Nhắc việc đến hạn, quá hạn") },
        { s: sys("Ghi nhận cuộc gọi và ghi âm khi kết nối tổng đài") }
      ],
      assumptions: [
        "Sales dành khoảng 5 phút cuối ngày để cập nhật nếu chưa ghi ngay.",
        "Quản lý dùng dữ liệu này để hỗ trợ, không chỉ để kiểm tra."
      ],
      verify: [
        "Base CRM ghi nhận những loại tương tác nào (ghi chú, cuộc gọi, email, lịch hẹn)?",
        "Có module công việc / nhắc việc riêng hay dùng ứng dụng khác trong hệ sinh thái Base?",
        "Có lọc được 'khách không có tương tác sau N ngày' không?",
        "Tích hợp tổng đài: những nhà cung cấp nào, có ghi âm không?"
      ]
    }
  },

  /* ------------------------------ CHẶNG 4 ----------------------------- */
  {
    id: "c4",
    kind: "stage",
    stage: 4,
    nav: "Chuyển đổi",
    navLong: "Chuyển đổi thành cơ hội bán hàng",
    minutes: 1,
    question: "Khách nào thật sự có khả năng mua?",
    message: "Chỉ khi nhu cầu đã rõ, khách mới trở thành cơ hội bán hàng.",
    org: proc("Đủ 4 điều kiện thì tạo cơ hội. Thiếu điều kiện thì tiếp tục chăm sóc."),
    criteria: [
      { k: "Nhu cầu", t: "Khách nói rõ cần gì" },
      { k: "Người quyết định", t: "Biết ai duyệt mua" },
      { k: "Thời điểm", t: "Có thời gian dự kiến mua" },
      { k: "Giá trị", t: "Ước tính được giá trị đơn hàng" }
    ],
    system: [
      sys("Tạo cơ hội gắn với hồ sơ khách hàng"),
      sys("Cơ hội có giá trị, ngày dự kiến chốt, giai đoạn")
    ],
    value: {
      sales: "Tập trung thời gian vào khách có khả năng mua",
      manager: "Số cơ hội phản ánh doanh số dự kiến thật, không bị thổi phồng"
    },
    shot: "s4-tao-co-hoi",
    notes: [
      "Đây là chỗ nhiều đội Sales nhầm: có 200 khách không có nghĩa là có 200 cơ hội.",
      "Bốn điều kiện là đề xuất. Doanh nghiệp có thể bớt hoặc thêm, quan trọng là cả đội dùng chung.",
      "Chỉ mô tả cách tạo cơ hội trên hệ thống đúng với những gì đã xác minh."
    ],
    detail: {
      problem: {
        now: "Mọi khách đã gọi đều được coi là 'đang theo', không phân biệt khách hỏi giá và khách sắp mua.",
        effects: [
          "Danh sách theo dõi quá dài, Sales dàn trải.",
          "Quản lý không ước tính được doanh số sắp tới.",
          "Khách có nhu cầu thật bị chăm sóc giống khách chỉ hỏi thăm."
        ]
      },
      flow: [
        { a: "Sales", t: "Trao đổi để làm rõ 4 điều kiện" },
        { a: "Sales", t: "Đủ điều kiện: tạo cơ hội, ghi giá trị và ngày dự kiến chốt" },
        { a: "Hệ thống", t: "Cơ hội gắn với hồ sơ khách, giữ toàn bộ lịch sử trước đó" },
        { a: "Trưởng nhóm", t: "Xem cơ hội mới trong tuần, hỏi lại nếu thông tin thiếu" }
      ],
      rules: [
        "Bốn điều kiện tạo cơ hội: nhu cầu rõ, biết người quyết định, có thời điểm dự kiến, ước tính được giá trị.",
        "Thông tin bắt buộc trên cơ hội: giá trị dự kiến, ngày dự kiến chốt, người phụ trách, giai đoạn.",
        "Một khách có thể có nhiều cơ hội (ví dụ: mua lần đầu, mua bổ sung).",
        "Khách chưa đủ điều kiện vẫn ở lại chặng 3, tiếp tục được chăm sóc."
      ],
      roles: {
        sales: ["Đánh giá điều kiện và tạo cơ hội.", "Ghi giá trị, ngày chốt sát thực tế."],
        lead: ["Kiểm tra chất lượng cơ hội mới mỗi tuần."],
        manager: ["Chốt bộ điều kiện chung cho toàn đội."]
      },
      system: [
        { s: sys("Tạo cơ hội bán hàng gắn với một khách hàng"), shot: "s4-tao-co-hoi" },
        { s: sys("Trường giá trị, ngày dự kiến chốt, giai đoạn, người phụ trách trên cơ hội") },
        { s: sys("Đặt trường bắt buộc khi tạo cơ hội") },
        { s: sys("Một khách hàng gắn được nhiều cơ hội") }
      ],
      assumptions: [
        "Sales được hướng dẫn và thống nhất cách đánh giá 4 điều kiện.",
        "Giá trị dự kiến là ước tính, được cập nhật khi có báo giá."
      ],
      verify: [
        "Base CRM chuyển khách hàng tiềm năng thành cơ hội bằng thao tác 'chuyển đổi' hay tạo cơ hội mới gắn với khách hàng?",
        "Có thêm được trường tùy chỉnh (ví dụ: 4 điều kiện) và đặt bắt buộc không?",
        "Lịch sử trên khách hàng có hiển thị cùng cơ hội không?"
      ]
    }
  },

  /* ------------------------------ CHẶNG 5 ----------------------------- */
  {
    id: "c5",
    kind: "stage",
    stage: 5,
    nav: "Tiến độ",
    navLong: "Quản lý tiến độ bán hàng",
    minutes: 1,
    question: "Cơ hội nào sắp chốt? Cơ hội nào đang đứng yên?",
    message: "Mọi cơ hội trên một bảng, theo giai đoạn. Nhìn là biết.",
    org: proc("Mỗi giai đoạn có điều kiện chuyển tiếp rõ. Sales tự chuyển khi đủ điều kiện."),
    stages: [
      { k: "Xác nhận nhu cầu", t: "Đủ 4 điều kiện ở chặng 4" },
      { k: "Khảo sát, tư vấn", t: "Đã gặp, hiểu yêu cầu chi tiết" },
      { k: "Gửi báo giá", t: "Khách đã nhận báo giá" },
      { k: "Đàm phán", t: "Đang trao đổi giá, điều khoản" },
      { k: "Thắng / Thua", t: "Ghi lý do nếu thua" }
    ],
    stagesNote: "Giai đoạn là đề xuất cho B2B SME, sẽ điều chỉnh theo quy trình thực tế của doanh nghiệp.",
    system: [
      sys("Bảng cơ hội theo cột giai đoạn, kéo thả để chuyển"),
      sys("Tùy chỉnh tên và số lượng giai đoạn")
    ],
    value: {
      sales: "Cập nhật tiến độ bằng một thao tác, không phải viết báo cáo",
      manager: "Họp giao ban nhìn chung một bảng, không hỏi từng người"
    },
    shot: "s5-pipeline",
    notes: [
      "Năm giai đoạn này là đề xuất. Hỏi khách: quy trình bán hàng thực tế của anh chị có những bước nào?",
      "Cơ hội 'đứng yên' là cơ hội ở một giai đoạn quá lâu. Doanh nghiệp đặt ngưỡng, ví dụ 21 ngày, để biết cần hỗ trợ."
    ],
    detail: {
      problem: {
        now: "Tiến độ được báo bằng lời trong họp giao ban hoặc file Excel tổng hợp cuối tuần.",
        effects: [
          "Mất thời gian họp để cập nhật thay vì để xử lý.",
          "Cơ hội đứng yên nhiều tuần không ai phát hiện.",
          "Mỗi người hiểu 'sắp chốt' một kiểu."
        ]
      },
      flow: [
        { a: "Sales", t: "Chuyển cơ hội sang giai đoạn mới khi đủ điều kiện" },
        { a: "Sales", t: "Cập nhật giá trị, ngày dự kiến chốt nếu thay đổi" },
        { a: "Trưởng nhóm", t: "Xem bảng nhóm hằng tuần, lọc cơ hội đứng yên" },
        { a: "Quản lý", t: "Họp giao ban trên cùng một bảng của toàn đội" }
      ],
      stageTable: [
        ["Xác nhận nhu cầu", "Đủ 4 điều kiện", "Hẹn được buổi khảo sát / tư vấn"],
        ["Khảo sát, tư vấn", "Đã gặp hoặc gọi chi tiết", "Hiểu đủ yêu cầu để làm báo giá"],
        ["Gửi báo giá", "Báo giá đã gửi", "Khách phản hồi về báo giá"],
        ["Đàm phán", "Đang trao đổi điều khoản", "Khách đồng ý hoặc từ chối"],
        ["Thắng / Thua", "Có kết quả cuối cùng", "Thua: bắt buộc ghi lý do"]
      ],
      rules: [
        "Chỉ chuyển giai đoạn khi đủ điều kiện ra của giai đoạn hiện tại.",
        "Đề xuất ngưỡng đứng yên: quá 21 ngày ở cùng một giai đoạn (doanh nghiệp tự chốt).",
        "Cơ hội quá ngày dự kiến chốt phải được cập nhật ngày mới hoặc đóng.",
        "Thua phải ghi lý do để phân tích ở chặng 6."
      ],
      roles: {
        sales: ["Chuyển giai đoạn và cập nhật thông tin cơ hội."],
        lead: ["Rà cơ hội đứng yên và quá hạn mỗi tuần.", "Cùng Sales xử lý cơ hội giá trị lớn."],
        manager: ["Chủ trì giao ban trên bảng chung.", "Duyệt thay đổi giai đoạn của quy trình."]
      },
      system: [
        { s: sys("Bảng cơ hội dạng cột theo giai đoạn, kéo thả để chuyển giai đoạn"), shot: "s5-pipeline" },
        { s: sys("Tùy chỉnh danh sách giai đoạn") },
        { s: sys("Lọc cơ hội theo người phụ trách, nhóm, ngày dự kiến chốt") },
        { s: sys("Bắt buộc ghi lý do khi chuyển sang Thua") }
      ],
      assumptions: [
        "Doanh nghiệp có một quy trình bán hàng chung cho phần lớn đơn hàng.",
        "Sales cập nhật giai đoạn ngay khi có thay đổi."
      ],
      verify: [
        "Base CRM có hiển thị cơ hội dạng bảng cột (kanban) không? Có tổng giá trị theo cột không?",
        "Tùy chỉnh giai đoạn được tới mức nào (tên, số lượng, nhiều quy trình)?",
        "Có lọc hoặc cảnh báo cơ hội ở một giai đoạn quá lâu không?",
        "Có đặt trường bắt buộc khi chuyển giai đoạn (ví dụ lý do thua) không?"
      ]
    }
  },

  /* ------------------------------ CHẶNG 6 ----------------------------- */
  {
    id: "c6",
    kind: "stage",
    stage: 6,
    nav: "Hiệu quả",
    navLong: "Theo dõi hiệu quả và ra quyết định",
    minutes: 2,
    question: "Đội Sales đang làm việc thế nào, mà không cần hỏi từng người?",
    message: "Số liệu đến từ chính công việc hằng ngày. Quản lý đọc, không phải đi gom.",
    org: proc("Một bộ chỉ số nhỏ, xem cùng nhịp: hằng tuần với trưởng nhóm, hằng tháng với quản lý."),
    metrics: [
      { g: "Đầu vào", items: ["Khách hàng tiềm năng mới theo nguồn"] },
      { g: "Xử lý", items: ["Khách được liên hệ trong hạn", "Việc quá hạn theo nhân viên"] },
      { g: "Cơ hội", items: ["Số lượng, giá trị theo giai đoạn", "Cơ hội đứng yên"] },
      { g: "Kết quả", items: ["Tỷ lệ thắng", "Doanh số theo nhân viên", "Lý do thua"] }
    ],
    metricsNote: "Chỉ số đề xuất. Chưa có số liệu: giá trị thật được đo sau khi vận hành.",
    system: [
      sys("Báo cáo khách hàng, cơ hội theo nhân viên, giai đoạn"),
      sys("Lọc báo cáo theo thời gian, nhóm")
    ],
    value: {
      sales: "Tự thấy kết quả của mình, biết cần cải thiện ở đâu",
      manager: "Phát hiện điểm nghẽn sớm và quyết định dựa trên dữ liệu"
    },
    shot: "s6-bao-cao",
    notes: [
      "Không đưa số giả định. Nói rõ: các con số sẽ có sau khi đội vận hành, và tháng đầu chính là mốc so sánh.",
      "Đọc chỉ số theo chuỗi: nhiều khách nhưng ít cơ hội → vấn đề ở chặng 3–4. Nhiều cơ hội nhưng ít thắng → vấn đề ở chặng 5.",
      "Dành thời gian cho câu hỏi của quản lý ở đây."
    ],
    detail: {
      problem: {
        now: "Quản lý gom số liệu từ file Excel của từng người, hoặc hỏi trực tiếp trong họp.",
        effects: [
          "Số liệu đến chậm, đã lỗi thời khi đọc.",
          "Mỗi người tính một kiểu, không so sánh được.",
          "Chỉ biết kết quả cuối, không biết nghẽn ở bước nào."
        ]
      },
      readGuide: [
        ["Nhiều khách mới nhưng ít được liên hệ trong hạn", "Nghẽn ở phân công hoặc tải công việc", "Chặng 2"],
        ["Liên hệ đủ nhưng ít khách thành cơ hội", "Chất lượng nguồn hoặc kỹ năng tư vấn", "Chặng 1, 3"],
        ["Nhiều cơ hội đứng yên ở một giai đoạn", "Thiếu hỗ trợ ở giai đoạn đó", "Chặng 5"],
        ["Tỷ lệ thắng thấp, lý do thua lặp lại", "Giá, sản phẩm hoặc đối thủ", "Quyết định kinh doanh"]
      ],
      cadence: [
        ["Hằng ngày", "Sales", "Việc đến hạn, khách mới được giao"],
        ["Hằng tuần", "Trưởng nhóm", "Việc quá hạn, cơ hội đứng yên, cơ hội mới"],
        ["Hằng tháng", "Quản lý", "Nguồn khách, tỷ lệ chuyển đổi, tỷ lệ thắng, lý do thua"]
      ],
      roles: {
        sales: ["Xem số liệu của bản thân."],
        lead: ["Xem số liệu của nhóm, so sánh giữa các thành viên để hỗ trợ."],
        manager: ["Xem toàn đội, ra quyết định về nguồn, nhân sự, quy trình."]
      },
      system: [
        { s: sys("Báo cáo số khách hàng mới theo nguồn, theo thời gian"), shot: "s6-bao-cao" },
        { s: sys("Báo cáo cơ hội theo giai đoạn và theo nhân viên") },
        { s: sys("Báo cáo hoạt động (cuộc gọi, công việc) theo nhân viên") },
        { s: sys("Tự tạo báo cáo hoặc xuất dữ liệu ra Excel") }
      ],
      assumptions: [
        "Chỉ số chỉ đúng khi dữ liệu được nhập đầy đủ ở chặng 1–5.",
        "Tháng vận hành đầu tiên là mốc so sánh, chưa dùng để đánh giá nhân viên."
      ],
      verify: [
        "Base CRM có sẵn những báo cáo nào? Có dashboard tùy chỉnh không?",
        "Báo cáo theo nhân viên, theo nhóm, theo giai đoạn có sẵn hay cần tự dựng?",
        "Có báo cáo hoạt động (số cuộc gọi, số việc hoàn thành) không?",
        "Có xuất dữ liệu ra Excel không?"
      ]
    }
  },

  /* ------------------------------ TỔNG KẾT ---------------------------- */
  {
    id: "tong-ket",
    kind: "summary",
    nav: "Tổng kết",
    minutes: 2,
    title: "Sáu câu hỏi, giờ đã có chỗ để xem câu trả lời",
    answers: [
      { q: "Khách đến từ đâu?", a: "Danh sách chung, có nguồn", s: 1 },
      { q: "Ai phụ trách?", a: "Một người phụ trách trên mỗi khách", s: 2 },
      { q: "Có bỏ sót không?", a: "Mỗi khách có việc tiếp theo có hạn", s: 3 },
      { q: "Khách nào sẽ mua?", a: "Cơ hội tạo khi đủ 4 điều kiện", s: 4 },
      { q: "Cơ hội nào sắp chốt?", a: "Bảng cơ hội theo giai đoạn", s: 5 },
      { q: "Đội đang làm thế nào?", a: "Báo cáo từ dữ liệu hằng ngày", s: 6 }
    ],
    next: [
      { k: "Khảo sát", t: "Buổi làm việc 90 phút: chốt nguồn khách, quy tắc chia, giai đoạn bán hàng" },
      { k: "Chuẩn bị dữ liệu", t: "Làm sạch danh sách khách hiện có" },
      { k: "Chạy thử", t: "Một nhóm Sales dùng trước, điều chỉnh quy trình" },
      { k: "Mở rộng", t: "Cả đội dùng, đo chỉ số tháng đầu làm mốc" }
    ],
    notes: [
      "Quay lại sáu câu hỏi ở đầu buổi. Mỗi câu giờ có chỗ để xem câu trả lời.",
      "Giá trị không nằm ở phần mềm mà ở việc cả đội làm cùng một cách và nhìn cùng một dữ liệu.",
      "Kết thúc bằng đề xuất buổi khảo sát để thay giả định bằng thực tế."
    ],
    detail: {
      intro: "Giá trị kỳ vọng, điều kiện để đạt được và kế hoạch triển khai đề xuất.",
      sections: [
        {
          h: "Giá trị kỳ vọng theo vai trò",
          roleValue: true
        },
        {
          h: "Đo giá trị như thế nào",
          table: {
            head: ["Chỉ số", "Trước triển khai", "Sau 3 tháng"],
            rows: [
              ["Khách mới được liên hệ trong hạn", "Chưa đo", "Đo trên hệ thống"],
              ["Khách không có việc tiếp theo", "Chưa đo", "Đo trên hệ thống"],
              ["Tỷ lệ khách thành cơ hội", "Chưa đo", "Đo trên hệ thống"],
              ["Thời gian quản lý gom báo cáo mỗi tuần", "Hỏi quản lý trong buổi khảo sát", "Đo lại"]
            ]
          },
          note: "Cột 'Trước triển khai' để trống cho tới khi đo. Không dùng số giả định để hứa hẹn kết quả."
        },
        {
          h: "Điều kiện để giải pháp hiệu quả",
          list: [
            "Quản lý dùng hệ thống trong giao ban, không yêu cầu thêm báo cáo Excel song song.",
            "Quy tắc chia khách, điều kiện tạo cơ hội, giai đoạn bán hàng được chốt và công bố.",
            "Sales được hướng dẫn và có thời gian làm quen (đề xuất 2 tuần chạy thử).",
            "Có người phụ trách vận hành CRM phía doanh nghiệp."
          ]
        },
        {
          h: "Kế hoạch triển khai đề xuất",
          flow: [
            { a: "Tuần 1", t: "Khảo sát, chốt quy trình và quy tắc" },
            { a: "Tuần 2", t: "Cấu hình hệ thống, nhập dữ liệu sạch" },
            { a: "Tuần 3–4", t: "Một nhóm chạy thử, điều chỉnh" },
            { a: "Tháng 2–3", t: "Toàn đội vận hành, đo chỉ số mốc" }
          ],
          note: "Mốc thời gian là đề xuất ban đầu, sẽ điều chỉnh sau khảo sát."
        }
      ]
    }
  }
];

/* Giá trị theo vai trò dùng trong lớp chi tiết của slide Tổng kết */
const ROLE_VALUE = {
  sales: {
    h: "Nhân viên Sales",
    t: ["Biết rõ khách của mình và việc cần làm mỗi ngày", "Không mất công làm báo cáo riêng", "Nhận khách bàn giao có đủ lịch sử"]
  },
  lead: {
    h: "Trưởng nhóm",
    t: ["Thấy việc quá hạn và cơ hội đứng yên của nhóm", "Hỗ trợ đúng người, đúng lúc", "Chia khách công bằng, minh bạch"]
  },
  manager: {
    h: "Quản lý kinh doanh",
    t: ["Đọc tình hình đội mà không cần hỏi", "Biết nguồn khách nào hiệu quả", "Giữ dữ liệu khách khi nhân sự thay đổi"]
  }
};

const ROLE_LABEL = { sales: "Sales", lead: "Trưởng nhóm", manager: "Quản lý" };

/* Kết quả kiểm tra — cập nhật sau mỗi lần kiểm tra thực tế */
const QA = {
  date: "2026-11-02",
  env: "Chromium headless (Playwright) trong môi trường cloud, khung 1440×900, 1280×720 và 390×844",
  checks: [] // được điền bởi file js/qa-results.js
};

window.CRM = { SHOTS, CONTEXT, SLIDES, ROLE_VALUE, ROLE_LABEL, QA };
