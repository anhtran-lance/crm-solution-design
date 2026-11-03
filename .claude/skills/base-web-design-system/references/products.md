# Danh mục sản phẩm Base (base.vn/app)

Quét ngày 03/11/2026: **69 ứng dụng, 10 nhóm**; 33 app có nút "Chi tiết" (29 trang riêng `/app/*`; Docs, Output → /platform/work, Review → /platform/hrm, Booking → /app/meeting), còn lại "Coming soon". Chạy lại `scripts/scan_site.js` để cập nhật.

Cột "Trang" là đường dẫn trên base.vn. Cột "Các phần trên trang" là tiêu đề chính từng section, theo thứ tự — dùng để hiểu app làm gì và chọn ảnh minh họa (chụp bằng `scripts/capture_app.js`). **Chỉ dùng để hiểu sản phẩm, không chép nguyên câu chữ marketing vào tài liệu cho khách.**

## Ba nền tảng (bộ giải pháp)

### Base Work — /platform/work
_Approvals, stages, documents and phase gates raise one kind of task in one inbox. One approval engine, one signing service, one queue for every owner._

- Vận hành toàn bộ công việc của doanh nghiệp tại một nơi duy nhất
- Một nơi cho mọi công việc. Một mạch vận hành xuyên suốt.
- Làm chủ 4 năng lực vận hành cốt lõi Một hệ sinh thái giải pháp toàn diện
- Tích hợp AI Agent vào quy trình, tối ưu từng bước vận hành
- Đưa công việc rời rạc về một mô hình vận hành chung
- Kết nối dễ dàng với các công cụ doanh nghiệp đang sử dụng
- Vận hành doanh nghiệp trên một nền tảng thống nhất

### Base HRM — /platform/hrm
_Base HRM quản trị trọn vòng đời nhân sự: tuyển dụng, hồ sơ, chấm công, tính lương, thuế và bảo hiểm trên một nền tảng dữ liệu thống nhất, có AI hỗ trợ._

- Quản trị trọn vòng đời nhân sự Tự động hóa tuyển dụng Phân ca linh hoạt, tính lương tự động
- Dữ liệu nhân sự phân tán Thông tin thiếu nhất quán, vận hành đứt gãy
- Chuyên sâu từng nghiệp vụ Toàn diện trong quản trị con người
- Quản trị nhân sự toàn diện. Dữ liệu xuyên suốt, AI tăng tốc vận hành.
- Câu hỏi thường gặp
- Kết nối linh hoạt với hệ thống hiện có. Dữ liệu vận hành thông suốt.
- Quản trị nhân sự toàn diện. Phát triển đội ngũ cùng Base HRM

### Base CRM — /platform/crm
_Kết nối Marketing, Sales và Chăm sóc khách hàng trên cùng một nền tảng. Dữ liệu thống nhất, quy trình liên thông và AI hỗ trợ vận hành, giúp doanh nghiệp quản lý xuyên suốt từ thu hút khách hàng đến bán hàng và chăm sóc sau bán._

- Vận hành toàn bộ hoạt động kinh doanh của doanh nghiệp tại một nơi duy nhất
- Nhiều điểm chạm khác nhau. Một hành trình khách hàng liền mạch.
- Mỗi ứng dụng một thế mạnh. Kết nối tạo nên sức mạnh tổng thể.
- Kết nối dễ dàng với các công cụ doanh nghiệp đang sử dụng
- Câu hỏi thường gặp về Base CRM
- Kết nối toàn bộ hoạt động kinh doanh trên một nền tảng

## Ứng dụng theo nhóm


### AI & Agentic systems

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Agent** | AI FOUNDATION | Nền tảng hạ tầng cốt lõi phát triển các tác tử AI chuyên sâu cho doanh nghiệp | Coming soon |
| **Studio** | AI BUILDER | Môi trường kiến tạo và tùy biến các ứng dụng AI chuyên dụng không cần lập trình | Coming soon |
| **Agents** | AGENT HUB | Thư viện và trung tâm điều phối trợ lý AI thông minh kết nối liên phòng ban | Coming soon |
| **AI Workspace** | PERSONALIZED AI | Không gian làm việc cá nhân hóa được hỗ trợ tối đa bởi trợ lý AI thông minh | Coming soon |
| **Atlas** | AGENTIC BI | Kho dữ liệu tập trung và hệ thống Business Intelligence tự động phân tích qua AI | Coming soon |
| **Architecture** | AI ARCHITECTURE | Kiến trúc vận hành thông minh kết hợp giữa con người, quy trình và các tác tử AI | Coming soon |
| **Knowledge** | KNOWLEDGE AI | Hệ thống tri thức số hóa và tra cứu thông tin thông minh dựa trên vector search | Coming soon |
| **AI** | AI COPILOT | Bộ công cụ trợ lý đắc lực đồng hành trong từng tác vụ và luồng công việc hàng ngày | Coming soon |

### Sales & Customer Operation

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Sales** | SALES & CRM | Quản lý cơ hội bán hàng, phễu doanh thu và hiệu suất đội ngũ kinh doanh trực quan | /app/sales |
| **Commerce** | COMMERCE SUITE | Quản lý đơn hàng, bán hàng đa kênh, chính sách giá và vận hành phân phối bán lẻ | /app/commerce |
| **Contract** | CONTRACT OPS | Quản lý vòng đời hợp đồng, phụ lục, tiến độ nghiệm thu và thanh toán tự động | /app/contract |
| **Inventory** | INVENTORY OPS | Quản lý xuất nhập tồn kho, định mức nguyên vật liệu và điều chuyển kho chính xác | /app/inventory |
| **Foundry** | PRODUCT OPS | Quản lý danh mục sản phẩm, cấu hình bảng giá và thông số kỹ thuật tập trung | Coming soon |
| **Success** | CUSTOMER SUCCESS | Theo dõi sức khỏe khách hàng, hỗ trợ dịch vụ sau bán và tối ưu tỷ lệ tái ký | /app/success |

### Marketing Operation

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Lead** | LEAD MANAGEMENT | Thu thập, chấm điểm và phân phối khách hàng tiềm năng tự động cho sales | /app/lead |
| **Ads manager** | DIGITAL ADS | Đo lường hiệu quả quảng cáo đa nền tảng Facebook, Google tập trung về một dashboard | /app/admanager |
| **Prospect** | CUSTOMER MESSAGING | Hệ thống nhắn tin chăm sóc khách hàng đa kênh và tiếp cận tệp tiềm năng diện rộng | /app/prospect |
| **Partner** | PARTNERS & AFFILIATES | Quản lý mạng lưới đối tác, đại lý và chính sách hoa hồng giới thiệu khách hàng | Coming soon |
| **Event** | EVENT OPS | Tổ chức sự kiện doanh nghiệp, quản lý vé mời, check-in và chăm sóc người tham dự | Coming soon |
| **Live** | LIVE EXPERIENCE | Nền tảng tương tác trực tuyến thời gian thực cho hội thảo, hội nghị và workshop | Coming soon |

### Work Operation

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Request** | APPROVAL OPS | Số hóa mọi biểu mẫu đề xuất và phê duyệt đa cấp không giấy tờ tức thì | /app/request |
| **Workflow** | CROSS-TEAM OPS | Thiết kế và tự động hóa quy trình nghiệp vụ liền mạch giữa các phòng ban | /app/workflow |
| **Project** | PROJECT MANAGEMENT | Quản lý dự án chuyên sâu theo chuẩn Agile, Scrum, Kanban và Gantt chart trực quan | /app/project |
| **BPM** | BUSINESS PROCESS | Quản trị quy trình doanh nghiệp theo chuẩn quốc tế, kiểm soát SLA và nút thắt cổ chai | /app/bpm |
| **Task** | WORK PLANNING | Giao việc, phối hợp nhiệm vụ và theo dõi tiến độ công việc hàng ngày của từng nhân sự | /app/task |
| **Expense** | EXPENSE OPS | Quản lý chi phí công tác, tạm ứng và thanh toán hoàn ứng minh bạch nhanh chóng | /app/expenses |
| **E-Office** | OFFICE DOCUMENTS | Quản lý công văn đi đến, hồ sơ lưu trữ và số hóa văn phòng điện tử thông minh | /app/eoffice |
| **Fieldwork** | FIELD SERVICE | Quản lý và giám sát đội ngũ thị trường, bảo trì thiết bị và kiểm tra điểm bán ngoài hiện trường | /app/fieldwork |
| **Docs** | COLLABORATIVE DOCS | Soạn thảo tài liệu cộng tác thời gian thực, lưu trữ quy chuẩn nội bộ an toàn | /platform/work |
| **E-Sign** | ELECTRONIC SIGNATURE | Ký số văn bản từ xa có giá trị pháp lý, xác thực OTP và bảo mật đa tầng | /app/esign |

### Workforce Intelligence

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Workforce** | WORKFORCE PLANNING | Hoạch định cơ cấu tổ chức, định biên nhân sự và dự báo nhu cầu nhân tài doanh nghiệp | /app/workforce |
| **Work rules** | WORK RULES | Số hóa nội quy lao động, chính sách công ty và hướng dẫn vận hành chuẩn xác | Coming soon |
| **Output** | OUTPUT INTELLIGENCE | Đo lường năng suất thực tế và đầu ra công việc dựa trên số liệu định lượng khách quan | /platform/work |
| **Goal** | GOALS & OKRS | Thiết lập và bám sát mục tiêu OKR, KPI từ cấp ban lãnh đạo đến từng cá nhân | /app/goal |
| **Review** | PERFORMANCE REVIEWS | Đánh giá năng lực 360 độ định kỳ, ghi nhận đóng góp và phát triển năng lực nhân sự | /platform/hrm |

### People Operation

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **HRIS** | HR INFORMATION SYSTEM | Hồ sơ nhân sự số hóa toàn diện, quản lý hợp đồng lao động, bảo hiểm và quá trình công tác | /app/hris |
| **E-Hiring** | ATS RECRUITMENT | Quản lý tuyển dụng thông minh, thu hút ứng viên đa kênh và chuẩn hóa quy trình phỏng vấn | /app/hiring |
| **Career** | CAREER PLANNING | Hoạch định lộ trình thăng tiến, khung năng lực và kế hoạch kế nhiệm nhân sự cốt cán | /app/career |
| **ESOPs** | ESOP OPS | Quản lý kế hoạch cổ phần thưởng cho nhân viên, quyền mua cổ phiếu và lộ trình vesting | /app/esop |
| **Timesheet** | TIME & ATTENDANCE | Chấm công thông minh qua GPS/Wifi, phân ca làm việc linh hoạt và tính ngày phép chuẩn xác | /app/timesheet |
| **Payroll** | AUTOMATED PAYROLL | Tự động tính lương theo công thức linh hoạt, xuất phiếu lương bảo mật và khấu trừ thuế tự động | /app/payroll |

### Finance Operation

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Finance** | FINANCE OPS | Báo cáo tổng quan sức khỏe tài chính, dòng tiền và chỉ số lợi nhuận kinh doanh thời gian thực | Coming soon |
| **Accounting** | ACCOUNTING | Quản trị sổ sách kế toán, hạch toán định khoản và hệ thống báo cáo tài chính pháp định | Coming soon |
| **Income** | INCOME OPS | Quản lý nguồn thu, đối soát doanh thu đa kênh và dòng tiền về ngân hàng tự động | Coming soon |
| **Bankfeed** | BANKFEED OPS | Đồng bộ sao kê ngân hàng tự động, đối chiếu giao dịch thu chi ngân hàng tức thì | Coming soon |
| **Invoice** | INVOICE OPS | Phát hành và quản lý hóa đơn điện tử, đồng bộ thuế và theo dõi hạn thanh toán | Coming soon |
| **Asset** | ASSET MANAGEMENT | Quản lý vòng đời tài sản, khấu hao tự động, cấp phát và thu hồi tài sản doanh nghiệp | Coming soon |
| **Finsight** | FINANCE INSIGHT | Phân tích dự báo tài chính chuyên sâu và cảnh báo rủi ro thanh khoản qua trí tuệ nhân tạo | Coming soon |

### Unified Communications

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Chat** | WORK CHAT | Trò chuyện công việc nội bộ an toàn, phân luồng theo dự án và tích hợp thông báo tác vụ | /app/chat |
| **Townhall** | COMPANY COMMS | Mạng truyền thông nội bộ, bảng tin toàn công ty và gắn kết nhân viên qua sự kiện | /app/townhall |
| **Square** | KNOWLEDGE Q&A | Diễn đàn hỏi đáp, chia sẻ tri thức nghiệp vụ và thảo luận chuyên môn nội bộ | Coming soon |
| **Meeting** | MEETING INTELLIGENCE | Tổ chức cuộc họp hiệu quả, ghi chép biên bản thông minh và tự động giao việc sau họp | /app/meeting |
| **Booking** | ROOM BOOKING | Đặt phòng họp, xe công vụ và trang thiết bị chung không lo trùng lịch | /app/meeting |
| **Mail** | INTEGRATED MAIL | Hộp thư điện tử tích hợp luồng phê duyệt và quản lý trao đổi công việc bảo mật | Coming soon |
| **Call** | VOICE CALL | Tổng đài ảo tích hợp CRM ghi âm cuộc gọi và quản lý lịch sử chăm sóc khách hàng | Coming soon |

### Automations & Integrations

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Automation** | AUTOMATIONS | Bộ kích hoạt tự động hóa các hành động lặp đi lặp lại giữa các phần mềm liên kết | Coming soon |
| **Express** | DISPATCH SERVICE | Dịch vụ gửi thông báo, email và tin nhắn SMS tự động theo kịch bản vận hành | Coming soon |
| **Form** | PUBLIC WEBFORMS | Tạo form khảo sát, biểu mẫu thu thập dữ liệu khách hàng nhúng trực tiếp lên website | Coming soon |
| **Datasets** | DATASETS | Quản lý cơ sở dữ liệu danh mục dùng chung toàn hệ thống (sản phẩm, kho, đối tác...) | Coming soon |
| **Content** | HEADLESS CMS | Quản trị nội dung tập trung, phân phối nội dung đa kênh qua API linh hoạt | Coming soon |
| **Radar** | PROSPECT DISCOVERY | Quét và làm giàu dữ liệu khách hàng tiềm năng tự động từ các nguồn số công khai | Coming soon |

### Platform & Core services

| App | Nhãn | Mô tả | Trạng thái / Trang |
|---|---|---|---|
| **Home** | PERSONAL HOMEPAGE | Trang chủ cá nhân tổng hợp lịch trình, việc cần làm và thông báo quan trọng trong ngày | /app/home |
| **Drive** | DOCUMENT MANAGEMENT | Kho lưu trữ và chia sẻ tệp tin doanh nghiệp an toàn, phân quyền truy cập chặt chẽ | Coming soon |
| **Account** | ACCOUNT MANAGEMENT | Quản lý thông tin tài khoản người dùng, hồ sơ cá nhân và cấu hình bảo mật cá nhân | Coming soon |
| **Settings** | CENTRALIZED SETTINGS | Cài đặt hệ thống toàn doanh nghiệp, phân quyền phòng ban và cấu hình các trường dữ liệu | Coming soon |
| **Platform** | CORE PLATFORM | Kiến trúc nền tảng hợp nhất một cơ sở dữ liệu duy nhất cho toàn bộ doanh nghiệp | Coming soon |
| **Sysadmin** | SYSTEM ADMINISTRATOR | Công cụ dành cho quản trị viên IT theo dõi nhật ký hoạt động, bảo mật và sao lưu | Coming soon |
| **Media** | MEDIA STORAGE | Trung tâm quản lý hình ảnh, video và tài nguyên đa phương tiện dùng chung của tổ chức | Coming soon |
| **Test Center** | TEST CENTER | Môi trường kiểm thử năng lực nhân sự, khảo sát nghiệp vụ và chứng chỉ chuyên môn | Coming soon |

## Các phần trên trang từng app

### Sales — /app/sales
_Quy trình trực quan, dự báo chính xác. Trợ lý AI thực chiến trong từng tác vụ - Giải phóng sức lao động thủ công, biến mọi cơ hội tiềm năng thành kết quả kinh doanh đột phá._

- Quy trình trực quan Dự báo chính xác
- Giải quyết triệt để hai "nỗi đau" lớn nhất của đội ngũ bán hàng
- Thấu hiểu khách hàng dễ dàng hơn
- Trợ lực AI giữ cho mọi thương vụ luôn chuyển động
- Phân tích Dữ liệu Thời gian thực & Dự báo Doanh số
- Dữ liệu đồng nhất, vận hành liền mạch
- Tối ưu vận hành đội ngũ bán hàng
- Tốt hơn thôi chưa đủ. Chúng tôi chọn khác biệt.
- Chuẩn hóa đội ngũ bán hàng với Base Sales
- Câu hỏi thường gặp

### Commerce — /app/commerce
_Xác nhận đơn hàng và mọi khâu tự động vận hành: nhận tiền cọc, giữ chỗ tồn kho từng dòng, điều phối giao vận và xuất hóa đơn — tất cả trên cùng một bản ghi duy nhất._

- Một đơn hàng. Vận hành liền mạch.
- Hoàn thiện chuẩn mực những nghiệp vụ cốt lõi.
- Không ai phải nhập giá thủ công.
- Báo giá chuẩn mực, khởi đầu cho mọi đơn hàng.
- Không bao giờ tự bịa ra con số.
- Khách hàng đồng ý và chốt đơn ngay tại đây.
- Chỉ cam kết những gì thực sự có trong kho.
- Khảo giá mọi nhà vận chuyển. Chọn phương án tối ưu nhất.
- Xuất hóa đơn theo lượng hàng thực giao, không theo ước tính.
- Đa dạng phương thức thanh toán linh hoạt.
- Nắm chắc dòng tiền đang ở đâu theo thời gian thực.
- Doanh thu định kỳ trên cùng một bản ghi.
- Tại sao hệ thống vận hành theo cách này.
- Một đơn hàng, kết nối toàn diện hệ thống.
- Định giá một lần. Tin tưởng số liệu xuyên suốt.
- Câu hỏi thường gặp

### Contract — /app/contract
_Viết quan điểm của bạn một lần, rồi rà soát từng bản nháp nhận được theo từng điều khoản: cái gì thiếu, bị cấm hay lệch, kèm sẵn cách diễn đạt dự phòng của bạn._

- Hợp đồng nào cũng đến trên giấy của người khác. Hãy đọc nó theo lập trường của bạn.
- Hệ thống hợp đồng nằm bên dưới — đã hoàn tất, trước phần thông minh.
- Quan điểm của bạn, viết một lần.
- Từng điều khoản, được đánh giá theo quan điểm bạn đã viết.
- Họ đổi một con số. Bạn không phải đi tìm nó.
- Và cả những hợp đồng bạn đã ký từ nhiều năm trước.
- Hợp đồng chưa xong khi bước rà soát xong.
- Điều một chữ ký được phép chốt.
- Những chi tiết quyết định bạn có tin câu trả lời hay không.
- Sáu quyết định chúng tôi sẵn sàng bảo vệ trong một cuộc họp.
- Một hợp đồng chạm đến nửa công ty. Nên nó sống ở nơi họ sống.
- Viết ra những gì bạn đã biết, và đừng là người duy nhất biết nó nữa.
- Câu hỏi thường gặp

### Inventory — /app/inventory
_Nắm chắc số lượng tồn, sẵn sàng cam kết bán. Base Inventory tách biệt tồn thực tế và tồn khả dụng, giúp mọi con số đều có thể xuất bán ngay từ bất kỳ kho hàng nào._

- Kiểm soát hàng hóa Tối ưu kho vận
- Mọi nghiệp vụ kho bãi, sẵn sàng vận hành.
- Tự động hóa quy trình vận hành
- AI phát hiện nguy cơ thiếu hụt, dự báo nhu cầu nhập hàng chính xác
- Từ cảnh báo sắp hết hàng đến sẵn sàng xuất bán.
- Định vị bất kỳ sản phẩm nào trong 10 giây.
- Tại sao hệ thống vận hành như vậy.
- Một ứng dụng kho bãi, kết nối toàn diện.
- Kiểm kê một lần. Tin cậy trên mọi kênh.
- Câu hỏi thường gặp

### Success — /app/success
_Trung tâm trợ giúp, hộp thư chat, ticket, khảo sát khách hàng, đánh giá ứng dụng, trang trạng thái và tài liệu nhà phát triển: bảy ứng dụng cho mọi khoảnh khắc sau khi bán hàng._

- Mọi điều diễn ra sau khi bán hàng.
- Giành được khách hàng chỉ mất một khoảnh khắc. Giữ chân họ cần mọi khoảnh khắc sau đó.
- Bảy ứng dụng. Một mạch xuyên suốt.
- Điều đã thay đổi trong quý đầu tiên
- Bảy ứng dụng. Một bộ dữ liệu thống nhất bên dưới.
- Toàn bộ mối quan hệ, trong một workspace.

### Lead — /app/lead
_AI chấm điểm mọi lead kèm lý do, giao cho người phụ trách và bắt đầu tính giờ. Truy vết mọi deal đã chốt về đúng quảng cáo đã tạo ra nó._

- Hợp nhất Dữ liệu Khách hàng Tối ưu Hiệu quả Chuyển đổi
- Hợp Nhất Toàn Bộ Công Cụ Quản Trị & Nuôi Dưỡng Khách Hàng Tiềm Năng
- Cơ Chế Lọc Trùng & Bảo Toàn Phân Bổ Chi Phí Tiếp Thị
- Thu thập Đa nguồn &Khử trùng lặp Dữ liệu
- Bộ Định tuyến Phân phối SLA tự động
- Nó thuộc về ai?
- Ai thực sự có thể nhận?
- Giao đi bằng cách nào?
- Dù theo cách nào, ba điều giống nhau đều xảy ra.
- Giám Sát Thời Gian Cam Kết & Cơ Chế Thu Hồi Lead
- Nuôi Dưỡng Lead Tự Động
- Ba Chuẩn Mực Dữ Liệu Tạo Lợi Thế Vận Hành Lũy Tiến
- Đo Lường Doanh Thu Theo Chiến Dịch
- Mỗi đồng đều truy được đến doanh thu — và ngược lại.
- AI Agents Chủ Động Tìm Kiếm Khách Hàng Mục Tiêu
- Tốt hơn thôi chưa đủ. Chúng tôi chọn khác biệt.
- Ba cỗ máy, một vòng đời.
- Cỗ máy tạo nhu cầu cần cả phần còn lại của nền tảng.
- Sẵn sàng tối ưu chuyển đổi khách hàng tiềm năng cùng Base?
- Câu hỏi thường gặp

### Ads manager — /app/admanager
_Xem chi tiêu quảng cáo của từng kênh cạnh những deal nó thực sự chốt được. Câu trả lời bằng doanh thu, không phải lượt hiển thị, trên bảng điều khiển đội bạn vẫn dùng._

- Bạn chi rất nhiều cho quảng cáo. Hãy thấy rõ nó mang về bao nhiêu.
- Mọi thứ bạn mong đợi, ở một nơi.
- Chúng tôi báo cáo kết quả, không phải lượt hiển thị.
- Lead đến bằng cách nào, cũng về một nơi.
- Lead là một sự kiện chi phí, không phải kết quả.
- Lỗi tracking không nên khiến bạn mất cả tháng.
- Agent trên tài khoản — trong giới hạn bạn đặt
- Sáu điều nhỏ bạn sẽ dùng mỗi ngày.
- Không chỉ tốt hơn. Khác biệt có chủ đích.
- Cửa ngõ của cỗ máy doanh thu.
- Kết nối một tài khoản. Có bức tranh toàn cảnh ngay ngày mai.
- Trả lời thẳng thắn

### Prospect — /app/prospect
_Messenger, WhatsApp, Instagram, TikTok, Telegram, LINE, Zalo và website trong một hàng đợi duy nhất. Tích hợp AI phản hồi, tự động hóa quy trình, cam kết SLA và quản lý khách hàng 360°._

- Mọi hội thoại khách hàng. Một hộp thư duy nhất. Tư vấn thông minh với AI.
- Công cụ quản lý hội thoại với khách hàng toàn diện
- Mỗi AI Agent một chuyên môn. Tự động phối hợp trong từng hội thoại.
- AI tự xử lý khi có thể. Chuyển cho nhân viên khi cần.
- Khách đến từ quảng cáo nào? Nắm rõ ngay trong từng hội thoại.
- Thiết kế luồng xử lý. Tự động điều phối công việc.
- Phản hồi đúng hạn. Phân bổ đúng người.
- Một khách hàng. Nhiều kênh liên hệ. Một hồ sơ duy nhất.
- Nơi nào phản hồi chậm, và ở đâu AI cần hỗ trợ?
- Những nguyên tắc vững chắc khi vận hành thực tế ở quy mô lớn.
- Mọi kênh liên lạc về một nơi. Giữ trọn vẹn kết nối với khách hàng.
- Câu hỏi thường gặp

### Request — /app/request
_Base Request số hóa quy trình tiếp nhận, phê duyệt và theo dõi đề xuất nội bộ: biểu mẫu theo nghiệp vụ, luồng duyệt rõ ràng, trạng thái minh bạch và dữ liệu phục vụ quản lý._

- Chuẩn hóa phê duyệt Tăng tốc vận hành
- Mọi yêu cầu được xử lý theo một quy trình rõ ràng
- Cao su Chư Sê – Kampong Thom
- Tùy chỉnh linh hoạt, phê duyệt hiệu quả
- Phối hợp liền mạch, phê duyệt đúng người
- Tập trung xử lý đề xuất, chủ động kiểm soát công việc
- Từ từng đề xuất đến toàn cảnh vận hành
- Thao tác đơn giản, vận hành hiệu quả
- Không chỉ số hóa đề xuất, tối ưu toàn bộ quy trình
- Một nền tảng, kết nối mọi hoạt động
- Một đề xuất, kết nối mọi quy trình
- Đưa quy trình đề xuất của doanh nghiệp lên Base Request.
- Câu hỏi thường gặp

### Workflow — /app/workflow
_Base Workflow kết nối quy trình liên phòng ban trong một luồng xuyên suốt: mỗi bước có người phụ trách, thời hạn xử lý và lịch sử thực hiện rõ ràng, từ tiếp nhận đến hoàn tất._

- Quy trình rõ ràng Phối hợp liền mạch
- Tùy chỉnh linh hoạt, vận hành xuyên suốt
- Một công việc, toàn bộ thông tin trên một màn hình
- Mỗi bước một cách xử lý, mọi quy trình đều thông suốt
- Phối hợp đa phòng ban, không gián đoạn quy trình
- Linh hoạt thiết lập quy tắc, chuẩn hóa mọi quy trình
- Tích hợp AI Agent, tự động hóa từng bước quy trình
- Mọi quy trình kết nối, toàn doanh nghiệp vận hành liền mạch
- Quy trình linh hoạt, vận hành ổn định theo thời gian
- Một mảnh ghép của hệ sinh thái, trên cùng một nền tảng.
- Bắt đầu số hóa quy trình doanh nghiệp ngay hôm nay
- Những điều bạn cần biết về Base Workflow

### Project — /app/project
_Base Project quản lý toàn bộ vòng đời dự án, từ lập kế hoạch đến triển khai và hoàn thành: phân cấp công việc, 5 góc nhìn, điểm sức khỏe dự án và AI cảnh báo rủi ro kịp thời._

- Quản lý dự án toàn diện Thực thi công việc liền mạch
- Tiện ích thiết thực, tối ưu từng thao tác
- Phân cấp công việc rõ ràng, kiểm soát tiến độ xuyên suốt
- Linh hoạt góc nhìn, thống nhất dữ liệu
- Không chỉ theo dõi tiến độ, còn nhận diện rủi ro
- Không chỉ quản lý dự án, tối ưu cách đội ngũ vận hành
- Kết nối mục tiêu, con người và công việc trên một nền tảng
- Phân công đúng người, linh hoạt theo cơ cấu tổ chức
- Sẵn sàng quản lý dự án hiệu quả hơn cùng Base?
- Câu hỏi thường gặp

### BPM — /app/bpm
_Đưa vào quy trình trên giấy, nhận lại quy trình chạy thật. Chỉ cần tải lên SOP sẵn có, dạng PDF, bảng tính hay ảnh chụp bảng trắng._

- Biến quy trình trên giấy thành luồng vận hành thực tế
- Quy trình đã được vẽ ra trên giấy.
- Biến tài liệu quy trình trên giấy thành luồng vận hành thực tế
- Cả ngày làm việc, gói gọn trong 2 màn hình.
- Quy trình không chỉ có những quyết định cần đưa ra.
- Mọi quy trình chạy trên cùng một nền tảng.
- Hợp tác với người bên ngoài tổ chức Trên cùng một quy trình.
- Giao việc cho AI Agent ngay trên quy trình.
- Trợ lý AI trực tiếp xử lý công việc.
- BPM là một phần trong bộ giải pháp toàn diện.
- Bắt đầu từ chính quy trình bạn đang có.

### Task — /app/task
_Định hình từng loại công việc thành một service, giao việc xuyên phòng ban và theo dõi tất cả trên một kế hoạch gắn liền thực thi._

- Xây dựng mô hình. Vận hành công việc. Hoạch định triển khai.
- Đầy đủ tính năng cần thiết, nhưng khác biệt nằm ở cách mọi thứ kết nối với nhau.
- Service giúp bạn thiết kế quy trình theo cách doanh nghiệp thực sự vận hành.
- Dễ dàng phối hợp, trao đổi công việc giữa các nhóm mà không mất dấu tiến độ.
- Mọi việc trong ngày, gói gọn trên một màn hình.
- Theo sát công việc thực tế, nắm đúng tiến độ kế hoạch.
- Sáu tính năng nhỏ giúp công việc thuận tiện hơn mỗi ngày.
- Tốt hơn là chưa đủ. Chúng tôi chọn khác biệt.
- Trung tâm triển khai & lập kế hoạch của Base Work.
- Câu hỏi thường gặp
- Chọn một việc. Bắt đầu với Task.

### Expense — /app/expenses


### E-Office — /app/eoffice
_Base E-Office số hóa công tác văn thư: tiếp nhận và vào sổ văn bản, AI tóm tắt, bút phê tay thành việc, giao việc và lưu hồ sơ trên một luồng duy nhất._

- Số hoá văn bản Điều hành thông suốt
- Mọi văn bản được xử lý theo một luồng thống nhất
- AI đọc hiểu công văn, đề xuất đúng luồng trình duyệt
- Bút phê trực tiếp, tự động giao việc với AI
- Minh bạch. Nhanh chóng. Tiện lợi.
- Tủ hồ sơ điện tử, không giới hạn số cấp
- Công tác văn thư nhẹ nhàng hơn mỗi ngày
- Không chỉ số hóa văn bản, vận hành cùng AI Agent
- Một văn bản, nối tiếp mọi hoạt động
- Một văn bản, kết nối mọi quy trình

### Fieldwork — /app/fieldwork
_Base Fieldwork quản lý công việc thực địa từ lập kế hoạch, điều phối kỹ thuật viên, check-in tại hiện trường đến nghiệm thu, với minh chứng và kết quả trên cùng một hồ sơ._

- Ghi nhận từng hoạt động Minh bạch mọi kết quả
- Kết nối đội ngũ văn phòng và nhân sự thực địa trên một nền tảng
- Linh hoạt triển khai, quản lý xuyên suốt
- Toàn bộ thông tin và tiến độ công việc trên một hồ sơ thống nhất
- Khách hàng chủ động đặt lịch, doanh nghiệp linh hoạt điều phối
- Tối ưu lịch trình, phân bổ nguồn lực hiệu quả
- Toàn bộ lịch trình và công việc, ngay trên một màn hình
- Chuẩn hóa điều kiện hoàn thành, đảm bảo chất lượng thực hiện
- Nắm bắt vị trí thực tế, điều phối công việc kịp thời
- Minh bạch tiến độ, nâng cao chất lượng dịch vụ
- Quản lý tập trung, thực hiện công việc dễ dàng
- Linh hoạt trong triển khai, chặt chẽ trong quản lý
- Toàn bộ quy trình vận hành, trong một nền tảng duy nhất

### E-Sign — /app/esign
_Đặt các trường, chọn thứ tự ký và gửi. Nhận lại PDF đã ký cùng bản ghi về những gì mỗi người ký đã thấy và thời điểm họ ký._

- Hợp đồng cung cấp
- Nửa mà không ai viết thành tiêu đề — và ai cũng cần ngay từ ngày đầu.
- Mỗi trường thuộc về đúng một người.
- Ai hành động, theo thứ tự nào — và ai không bao giờ làm chậm tiến độ.
- Nửa mà đối tác của bạn thực sự nhìn thấy.
- “Đang chờ” không phải là trạng thái. “Đang chờ Brian” mới là.
- Ai cũng có thể dán hình chữ ký lên PDF.
- Không bao giờ dựng cùng một gói ký hai lần.
- Mang theo tổ chức chứng thực mà bạn bắt buộc phải dùng.
- Bốn chi tiết bạn sẽ nhận ra trong tuần đầu.
- Tốt hơn thôi là chưa đủ. Chúng tôi làm cho nó khác.
- Chữ ký bắt đầu từ nơi bản ghi đang nằm.
- Hãy gửi hợp đồng khiến bạn lo nhất.
- Câu hỏi thường gặp

### Workforce — /app/workforce
_Quản trị tập trung cơ cấu tổ chức, nhân sự, vị trí biên chế và danh mục service: kế hoạch, thang lương, chi phí nhân sự và phê duyệt trên một hồ sơ cho mỗi vị trí._

- Quản trị tập trung cơ cấu tổ chức, nhân sự, vị trí biên chế và danh mục service
- Vị trí
- Đầy đủ năng lực hoạch định nhân sự và ngân sách, không cần một bộ phần mềm riêng
- Một vị trí - Sáu chiều dữ liệu - Quản trị xuyên suốt vòng đời
- Từ phê duyệt kế hoạch đến tuyển dụng - Trên một quy trình xuyên suốt
- Một ma trận thống nhất - Quản lý linh hoạt theo bậc lương, địa điểm và chính sách đãi ngộ
- Lương thưởng NĂM 2026
- Kết nối cơ cấu tổ chức với toàn bộ dữ liệu và quy trình vận hành
- Vì sao cần tuyển thêm, tạo ra kết quả gì, ai đảm nhiệm - Tất cả trong một mô hình quản trị thống nhất
- Không chỉ cải tiến tính năng. Khác biệt từ cách thiết kế hệ thống
- Một vị trí. Một nguồn dữ liệu. Xuyên suốt mọi nghiệp vụ nhân sự
- Sẵn sàng hoạch định nguồn lực nhân sự trên một nền tảng thống nhất

### Goal — /app/goal
_Base Goal | giúp doanh nghiệp Quản trị mục tiêu, trải nghiệm ngay giải pháp Base HRM+ từ Base.vn với hơn 10.000 doanh nghiệpsử dụng._

- Quản trị mục tiêu nhất quán trong doanh nghiệp
- Duy trì tính thống nhất, minh bạch của các mục tiêu chiến lược trong nội bộ doanh nghiệp
- Đo lường và đánh giá hiệu suất quá trình đạt được mục tiêu
- Lựa chọn gói phù hợp với nhu cầu doanh nghiệp
- Bạn cần giải đáp thắc mắc cụ thể hơn?

### HRIS — /app/hris
_Một hồ sơ nhân viên từ lúc nhận việc đến lúc nghỉ việc: hợp đồng ký bằng chữ ký điện tử, lộ trình nghề nghiệp theo dõi từng bước, tài liệu được xác nhận đã đọc, và dashboard nhân sự do chính bạn dựng._

- Không còn Excel rời rạc, không còn thu thập và nhập lại thông tin nhân sự
- Dữ liệu tập trung, luôn cập nhật và nhất quán trên mọi ứng dụng
- Một đội ngũ AI Agent am hiểu nhân sự, đọc hiểu tài liệu và chủ động chuẩn bị công việc
- Một hồ sơ nhân sự duy nhất. Dữ liệu thống nhất trên mọi ứng dụng, AI tự động hóa công việc
- Thiết kế hành trình nhân sự một lần, hệ thống tự vận hành.
- Linh hoạt cho người sử dụng. Chặt chẽ trong từng dữ liệu và quyền kiểm soát.
- Bắt đầu quản lý toàn bộ dữ liệu nhân sự trên một hồ sơ duy nhất.
- Câu hỏi thường gặp

### E-Hiring — /app/hiring
_Pipelines per business unit, one candidate record with tests, interviews and panel scores, hiring campaigns, reports and a Hiring Copilot._

- Một hành trình tuyển dụng xuyên suốt cho mọi ứng viên
- Đầy đủ mọi chức năng cần thiết để vận hành toàn bộ quy trình tuyển dụng
- Mỗi đội ngũ một quy trình tuyển dụng, mọi ứng viên được quản lý tập trung
- Một hồ sơ đầy đủ cho mọi quyết định tuyển dụng
- Tuyển nhanh cho mùa cao điểm, hồ sơ tự về đúng quy trình
- Nhìn rõ điểm nghẽn, biết đâu là nguồn tuyển hiệu quả
- Copilot nắm rõ quy trình, đồng hành trong toàn bộ quy trình tuyển dụng
- Những tiện ích nhỏ giúp đội ngũ tuyển dụng tiết kiệm hàng giờ mỗi tuần
- Được thiết kế cho những người trực tiếp tuyển chọn nhân sự mỗi ngày
- Nơi hành trình ứng viên tiếp nối thành hành trình nhân sự
- Tuyển đúng người, đúng lúc cho từng đội ngũ doanh nghiệp
- Câu hỏi thường gặp

### Career — /app/career
_Bản đồ sự nghiệp sống động, trang sự nghiệp cho mỗi nhân viên, thăng chức và tăng lương có dấu vết đầy đủ, và offer tự biến thành nhân viên đã onboard._

- Mọi thay đổi trong hành trình sự nghiệp được ghi nhận trên một hồ sơ duy nhất
- Đầy đủ mọi chức năng cần thiết để vận hành hệ thống phát triển sự nghiệp
- Được ký trực tuyến và mang thương hiệu doanh nghiệp
- Trải nghiệm onboarding theo cách doanh nghiệp thiết kế
- Lộ trình sự nghiệp rõ ràng, tiến trình được theo dõi xuyên suốt
- Thăng tiến theo lộ trình và năng lực đã được đánh giá
- Career Agent đồng hành cùng nhân sự, quản lý và HR
- Những tiện ích nhỏ giúp HR tiết kiệm hàng giờ mỗi tháng
- Được thiết kế dành cho những người trực tiếp đưa ra quyết định phát triển sự nghiệp
- Nơi các quyết định sự nghiệp kết nối với toàn bộ hệ thống HR
- Biến kỳ thăng tiến tiếp theo trở nên công bằng hơn bao giờ hết
- Câu hỏi thường gặp

### ESOPs — /app/esop


### Timesheet — /app/timesheet
_Xếp ca, tính lương và để AI làm lượt đầu: bảng chấm công soạn nháp lịch phủ ca, áp dụng quy tắc lương của bạn và đánh dấu những ngày đáng xem lại._

- Phân ca linh hoạt Chốt công chính xác AI hỗ trợ trong mọi tác vụ
- Đầy đủ mọi chức năng cần thiết để vận hành bảng chấm công
- Đúng người, đúng ca, đảm bảo đủ nhân sự vận hành mỗi ngày
- Mỗi ngày công đều được giải thích rõ ràng, AI Agent giải đáp 24/7
- Từ một lượt chấm công trên máy đến ngày công được chốt
- Xử lý hàng nghìn bảng công trong một lúc. Mọi vấn đề được xử lý chỉ trong vài phút
- AI Copilot am hiểu chính sách doanh nghiệp, luôn đồng hành cùng bạn
- Những tiện ích nhỏ tạo khác biệt lớn trong vận hành
- Công bằng, minh bạch và toàn quyền kiểm soát
- Một phần của hệ sinh thái People, hiểu rõ đội ngũ của bạn
- Chốt kỳ công tiếp theo trong một ngày, thay vì ba ngày như trước
- CÂU HỎI THƯỜNG GẶP

### Payroll — /app/payroll
_Chạy tính lương trên một công cụ công thức giải thích được mọi con số, đọc lương từ đúng chủ sở hữu của nó, và trả lương cho hai quốc gia theo tỷ giá khóa theo từng kỳ lương._

- Tự động xử lý bảng lương, không còn vật lộn với các bảng tính
- Rút ngắn kỳ tính lương chỉ vài ngày, với tiến độ và ngày chi trả minh bạch
- Kết nối một lần, tự động tổng hợp dữ liệu từ mọi nguồn cho mỗi kỳ lương.
- Truy vấn mọi dữ liệu kỳ lương. Phát hiện và xử lý sai lệch trước khi chi trả
- Trọn vẹn nghiệp vụ lương, từ tính toán đến phiếu lương
- Thiết kế cho những người chịu trách nhiệm về tính chính xác của từng kỳ lương.
- Tạm biệt bảng tính thủ công. Làm chủ mọi kỳ lương cùng Payroll.
- Câu hỏi thường gặp

### Chat — /app/chat
_Base Chat đưa giao tiếp và công việc vào cùng một không gian: kênh, chủ đề, tin nhắn và cập nhật từ các ứng dụng Base, để mọi trao đổi thúc đẩy hành động._

- Trò chuyện liền mạch. Công việc thông suốt.
- Giao tiếp liền mạch, phối hợp hiệu quả
- Trò chuyện theo cách quen thuộc, làm việc hiệu quả hơn mỗi ngày
- Linh hoạt theo cách đội ngũ phối hợp và làm việc
- Một kênh trò chuyện, nhiều không gian làm việc
- Một nền tảng, mọi cách đội ngũ phối hợp
- Mọi cập nhật công việc, ngay trong Base Chat
- Chi tiết nhỏ, khác biệt lớn mỗi ngày
- Nơi mọi ứng dụng kết nối, mọi công việc liền mạch
- Kết nối đội ngũ hôm nay, cộng tác hiệu quả mỗi ngày
- Giải đáp về Base Chat

### Townhall — /app/townhall
_Base Townhall là kênh truyền thông nội bộ chính thức: thư lãnh đạo, bản tin, biên niên công ty, sự kiện và những dấu mốc đáng nhớ, để thông tin nhất quán và cả doanh nghiệp gắn kết._

- Chia sẻ thông điệp Lan tỏa văn hóa
- Thông tin quan trọng cần một kênh truyền thông chính thức
- Mỗi câu chuyện một cách thể hiện Tất cả trên cùng một bản tin
- Phong cách riêng cho từng loại nội dung
- Thông điệp từ ban lãnh đạo, được truyền tải chỉn chu và nổi bật
- Chúc mừng Thảo tròn 3 năm đồng hành!
- Từ ý tưởng đến xuất bản, có AI đồng hành
- Những tiện ích nhỏ, tạo nên trải nghiệm khác biệt
- Một nền tảng thống nhất, kết nối mọi hoạt động giao tiếp
- Đăng bản tin tiếp theo ngay trên Townhall.
- Câu hỏi thường gặp

### Meeting — /app/meeting
_Base Meeting gom lên lịch, họp trực tuyến, ghi âm và chuyển giọng nói thành văn bản vào một nền tảng; AI tóm tắt, ghi nhận quyết định và tạo công việc ngay sau cuộc họp._

- Cuộc họp tinh gọn AI kết nối liền mạch
- Cuộc họp chỉ có giá trị khi kết luận thành hành động
- Một nền tảng, xuyên suốt mọi giai đoạn cuộc họp
- Lên lịch nhanh chóng, chuẩn bị cuộc họp hiệu quả
- Họp mọi lúc, mọi nơi – AI tự động ghi chép
- Ghi âm dễ dàng, AI chuyển lời nói thành văn bản
- AI biến cuộc họp thành hành động
- Thông báo, email và nhắc nhở tự động
- Đủ công cụ cho mọi cuộc họp
- Cuộc họp nối liền với trao đổi và công việc
- Đưa mọi cuộc họp của doanh nghiệp lên Base Meeting.
- Bạn hỏi, Base trả lời

### Home — /app/home
_Base Home gom lịch, việc cần làm, phê duyệt, nhân sự và trợ lý AI về một màn hình cho CEO, C-level và trợ lý điều hành — dùng chung tài khoản Base.vn._

- Một màn hình cho toàn bộ công việc
- Một ngày của lãnh đạo đang bị chia nhỏ qua hàng chục tab
- Tùy biến không gian cho từng vị trí
- Từ thông tin đến hành động, trọn vẹn trên một giao diện
- Một thanh điều hướng kết nối trọn vẹn bộ công cụ cá nhân
- Trợ lý nhìn cùng một bức tranh với sếp
- Home là điểm chạm đến toàn bộ Base.vn
- AI gợi ý, bạn quyết định
- Câu hỏi thường gặp
- Bắt đầu mỗi ngày làm việc từ Base Home

## Trang khác đã quét

- `/` trang chủ: Base Agentic OS — nền tảng vận hành; lưới 60+ app trên nền navy; kiến trúc Service; Con người và AI cùng một ngôn ngữ; kiến trúc Agent đa tầng; MCP; khách hàng; chứng nhận.
- `/kien-truc-nen-tang`: kiến trúc nền tảng.
- `/bang-gia`: bảng giá (có tab theo bộ CRM / HRM / Work).
- Bỏ qua theo yêu cầu: `/industry/*` (giải pháp theo ngành), customers.base.vn, blog.