/* Đa ngôn ngữ: vi (gốc) · en.
   - Chuỗi giao diện nằm ở UI bên dưới.
   - Nội dung bài học/thuật ngữ/hình MT5 của en nằm trong js/lang/*.js (nạp theo ngôn ngữ đang chọn).
   - Thiếu bản dịch thì tự rơi về tiếng Việt. */
(function () {
  'use strict';
  var LANGS = [
    { id: 'vi', label: 'Tiếng Việt', html: 'vi', locale: 'vi-VN' },
    { id: 'en', label: 'English', html: 'en', locale: 'en-US' }
  ];
  var lang = 'vi';
  try { var s = localStorage.getItem('fx-lang'); if (s && LANGS.some(function (l) { return l.id === s; })) lang = s; } catch (e) { }
  var cur = LANGS.filter(function (l) { return l.id === lang; })[0];

  var UI = {
    vi: {
      'doc.title': 'Forex Academy VN – Học Forex từ cơ bản đến nâng cao',
      'doc.desc': 'Lộ trình tự học Forex bằng tiếng Việt: kiến thức nền tảng, chỉ báo kỹ thuật, chiến thuật, quản lý vốn và kinh nghiệm thực chiến. Miễn phí, có bài kiểm tra và công cụ tính toán.',
      'skip': 'Bỏ qua, đến nội dung chính', 'brand.aria': 'Forex Academy VN – Trang chủ',
      'nav.aria': 'Điều hướng chính', 'nav.home': 'Trang chủ', 'nav.path': 'Lộ trình', 'nav.ind': 'Chỉ báo', 'nav.clock': 'Giờ giao dịch', 'nav.certs': 'Chứng nhận', 'nav.tools': 'Công cụ', 'nav.gloss': 'Thuật ngữ',
      'search.label': 'Tìm bài học', 'search.ph': 'Tìm bài học…', 'theme.aria': 'Đổi giao diện sáng/tối', 'menu.aria': 'Mở menu', 'lang.label': 'Ngôn ngữ',
      'risk.strong': 'Cảnh báo rủi ro:', 'risk.text': 'Giao dịch Forex và CFD có đòn bẩy, rủi ro cao và có thể mất toàn bộ vốn. Nội dung trên website chỉ nhằm mục đích giáo dục, không phải lời khuyên đầu tư.',
      'foot.tag': 'Học có lộ trình – giao dịch có kỷ luật.', 'foot.path': 'Lộ trình học', 'foot.tools': 'Công cụ', 'foot.gloss': 'Thuật ngữ', 'foot.copy': 'Forex Academy VN. Nội dung mang tính tham khảo.',
      'brand': 'Forex Academy VN',
      'nav.cal': 'Lịch kinh tế',
      'cal.h1': 'Lịch kinh tế thời gian thực', 'cal.sub': 'Theo dõi các tin tức kinh tế có thể làm thị trường biến động mạnh. Giờ hiển thị theo giờ Việt Nam (GMT+7).',
      'cal.view': 'Khoảng thời gian', 'cal.day': 'Hôm nay', 'cal.week': 'Cả tuần', 'cal.imp': 'Mức độ quan trọng', 'cal.all': 'Tất cả tin', 'cal.high': 'Chỉ tin quan trọng cao',
      'cal.open': 'Mở trên Investing.com', 'cal.full': 'Xem lịch đầy đủ', 'cal.credit': 'Lịch kinh tế thời gian thực do', 'cal.provided': ' cung cấp.', 'cal.frame': 'Lịch kinh tế thời gian thực từ Investing.com',
      'cal.note.t': 'Lưu ý', 'cal.note.p': 'Dữ liệu do Investing.com cung cấp, không phải của Forex Academy VN, có thể có độ trễ và có thể thay đổi. Khi mở trang này, trình duyệt của bạn tải nội dung trực tiếp từ Investing.com. Chỉ dùng để tham khảo, không phải lời khuyên đầu tư.',
      'cal.tip': 'Tin quan trọng cao (lãi suất, CPI, NFP…) thường gây biến động mạnh và spread giãn rộng. Hãy giảm khối lượng hoặc đứng ngoài trước và sau các tin này.', 'cal.link': 'Xem lịch kinh tế thời gian thực', 'title.cal': 'Lịch kinh tế',
      'home.eyebrow': 'Miễn phí · Tiếng Việt · Tự học theo lộ trình',
      'home.h1': 'Học Forex từ {a}con số 0{/a} đến giao dịch có kỷ luật',
      'home.lead': 'Lộ trình {n} cấp độ: kiến thức nền, chỉ báo kỹ thuật, chiến thuật, quản lý vốn và tâm lý. Mỗi bài ngắn gọn, có câu hỏi kiểm tra và công cụ tính toán đi kèm.',
      'cta.start': 'Bắt đầu bài đầu tiên', 'cta.continue': 'Học tiếp: {title}', 'cta.path': 'Xem toàn bộ lộ trình',
      'chart.aria': 'Biểu đồ nến minh hoạ xu hướng tăng: đỉnh và đáy cùng cao dần, giá bám theo đường EMA', 'chart.caption': 'Minh hoạ: trong xu hướng tăng, đỉnh và đáy cùng cao dần, giá bám theo đường trung bình động (EMA). Dữ liệu giả lập, chỉ mang tính giáo dục.', 'chart.hh': 'Đỉnh cao hơn', 'chart.hl': 'Đáy cao hơn', 'chart.buy': 'Mua thuận xu hướng', 'chart.ema': 'EMA', 'chart.vol': 'Khối lượng',
      'stat.levels': 'cấp độ học', 'stat.lessons': 'bài học', 'stat.hours': 'tổng thời lượng', 'stat.done': 'bài đã hoàn thành',
      'path.h2': 'Lộ trình học', 'path.sub': 'Học tuần tự từ trên xuống, hoặc chọn cấp độ phù hợp với bạn.',
      'why.h2': 'Vì sao học tại đây?',
      'feat.1.t': 'Rủi ro đặt lên hàng đầu', 'feat.1.d': 'Mỗi cấp độ đều nhắc đến quản lý vốn. Có riêng một cấp về rủi ro và cách nhận diện lừa đảo.',
      'feat.2.t': 'Học xong là kiểm tra', 'feat.2.d': 'Mỗi bài có câu hỏi trắc nghiệm kèm giải thích để bạn chắc kiến thức trước khi sang bài mới.',
      'feat.3.t': 'Công cụ thực hành', 'feat.3.d': 'Tính khối lượng lệnh, ký quỹ, kỳ vọng lợi nhuận – những phép tính bạn sẽ dùng mỗi ngày.',
      'feat.4.t': 'Thuật ngữ tiếng Việt', 'feat.4.d': 'Bảng thuật ngữ Forex tra cứu nhanh, giải thích ngắn gọn bằng ngôn ngữ dễ hiểu.',
      'real.t': 'Hãy thực tế về lợi nhuận', 'real.d': 'Phần lớn nhà giao dịch bán lẻ thua lỗ, nhất là khi dùng đòn bẩy cao và không có kế hoạch. Không có chỉ báo thần kỳ hay “tín hiệu chắc thắng”. Hãy học, tập trên tài khoản demo và chỉ dùng số tiền bạn sẵn sàng mất.',
      'card.level': 'Cấp {n}', 'card.cert': ' · Đã có chứng nhận', 'card.prog': 'Tiến độ cấp {n}', 'card.learned': '{d}/{n} bài đã học',
      'path.h1': 'Lộ trình học Forex', 'path.meta': '{lv} cấp độ · {ls} bài học · Đã hoàn thành {d}/{ls}',
      'crumb.path': 'Lộ trình', 'crumb.level': 'Cấp {n}', 'crumb.lesson': 'Bài {id}', 'crumb.cert': 'Chứng nhận', 'crumb.tools': 'Công cụ',
      'min': '{n} phút', 'min.read': '{n} phút đọc',
      'level.cert.view': 'Xem chứng nhận hoàn thành cấp {n}', 'level.cert.hint': 'Hoàn thành cả {n} bài để nhận chứng nhận cấp {id} (còn {left} bài).',
      'level.prev': 'Cấp trước', 'level.next': 'Cấp tiếp theo',
      'side.aria': 'Các bài trong cấp {n}', 'side.h': 'Cấp {n}: {title}',
      'quiz.h': 'Kiểm tra nhanh', 'quiz.check': 'Kiểm tra đáp án', 'quiz.none': 'Bạn chưa chọn đáp án.', 'quiz.ok': 'Chính xác. ', 'quiz.bad': 'Chưa đúng – đáp án đúng được tô xanh. ',
      'quiz.all': 'Hãy trả lời hết các câu hỏi.', 'quiz.res': 'Kết quả: {ok}/{n}', 'quiz.great': ' – tuyệt vời!',
      'take.h': 'Ghi nhớ', 'done.mark': 'Đánh dấu hoàn thành', 'done.done': 'Đã hoàn thành',
      'pager.aria': 'Chuyển bài', 'pager.prev': '← Bài trước', 'pager.next': 'Bài tiếp theo →',
      'banner.t': 'Chúc mừng! Bạn đã hoàn thành Cấp {n}', 'banner.p': 'Chứng nhận hoàn thành đã sẵn sàng.', 'banner.a': 'Nhận chứng nhận',
      'cert.h1': 'Chứng nhận của tôi', 'cert.sub': 'Đã nhận {got}/{n} chứng nhận. Hoàn thành tất cả bài của một cấp để nhận chứng nhận cấp đó.',
      'cert.name.label': 'Họ và tên in trên chứng nhận', 'cert.name.ph': 'Ví dụ: Nguyễn Văn A', 'cert.name.l2': 'Họ và tên',
      'cert.view.aria': 'Xem chứng nhận Cấp {n}', 'cert.date': 'Cấp ngày {d}/{m}/{y}', 'cert.btn': 'Xem · Tải · In', 'cert.locked': 'Chưa đạt', 'cert.continue': 'Tiếp tục học Cấp {n}',
      'cert.no.h': 'Chưa đủ điều kiện nhận chứng nhận', 'cert.no.p': 'Bạn cần hoàn thành cả {n} bài của Cấp {id} (đã học {d}/{n}).',
      'cert.cong': 'Chúc mừng bạn đã hoàn thành Cấp {n}!', 'cert.hint': 'Nhập họ tên để in lên chứng nhận. Tên chỉ được lưu trên trình duyệt của bạn.',
      'cert.png': 'Tải ảnh PNG', 'cert.print': 'In / Lưu PDF', 'cert.next': 'Học tiếp Cấp {n}', 'cert.png.ok': 'Đã tạo ảnh chứng nhận.', 'cert.png.fail': 'Không tạo được ảnh. Hãy dùng "In / Lưu PDF".',
      'cert.file': 'chung-nhan-cap-{n}',
      'svg.title': 'CHỨNG NHẬN HOÀN THÀNH', 'svg.certify': 'Chứng nhận rằng', 'svg.ph': 'Họ và tên của bạn', 'svg.done': 'đã hoàn thành toàn bộ {n} bài học của',
      'svg.level': 'Cấp {n}: {title}', 'svg.date': 'Ngày {d} tháng {m} năm {y}', 'svg.code': 'Mã chứng nhận: {c}',
      'svg.disc': 'Chứng nhận hoàn thành khoá học tự học nội bộ, không phải chứng chỉ hành nghề tài chính.', 'svg.aria': 'Chứng nhận hoàn thành Cấp {n} của {name}',
      'tools.h1': 'Công cụ tính toán', 'tools.sub': 'Các phép tính cơ bản mà mọi nhà giao dịch cần. Kết quả mang tính ước tính – hãy đối chiếu với nền tảng của sàn.',
      'tools.lot.h': 'Tính khối lượng lệnh (lot)', 'tools.bal': 'Số dư tài khoản (USD)', 'tools.risk': 'Rủi ro mỗi lệnh (%)', 'tools.risk.h': 'Khuyến nghị 0,5–2%', 'tools.sl': 'Dừng lỗ (số pip)',
      'tools.pair': 'Loại cặp tiền', 'tools.pair.usd': 'Tiền định giá là USD (EUR/USD, GBP/USD, AUD/USD…)', 'tools.pair.jpy': 'Cặp có JPY (USD/JPY…)', 'tools.jpy.px': 'Giá hiện tại của USD/JPY',
      'tools.enter': 'Nhập đủ các giá trị lớn hơn 0.', 'tools.r.risk': 'Số tiền rủi ro', 'tools.r.pipval': 'Giá trị 1 pip / 1 lot', 'tools.r.lots': 'Khối lượng nên vào', 'tools.r.warn': 'Rủi ro trên 3% mỗi lệnh là rất cao.',
      'tools.margin.h': 'Tính ký quỹ', 'tools.lot': 'Khối lượng (lot)', 'tools.mpx': 'Giá cặp tiền (ví dụ EUR/USD)', 'tools.mpx.h': 'Với cặp có USD đứng sau (EUR/USD, GBP/USD…)', 'tools.lev': 'Đòn bẩy (1:x)',
      'tools.r.notional': 'Giá trị vị thế', 'tools.r.margin': 'Ký quỹ cần thiết',
      'tools.exp.h': 'Kỳ vọng lợi nhuận (Expectancy)', 'tools.win': 'Tỷ lệ thắng (%)', 'tools.rr': 'Tỷ lệ R:R trung bình (lãi : lỗ)', 'tools.rr.h': 'Ví dụ 2 nghĩa là lãi gấp 2 lần lỗ',
      'tools.exp.bad': 'Tỷ lệ thắng 0–100 và R:R lớn hơn 0.', 'tools.r.exp': 'Kỳ vọng mỗi lệnh', 'tools.r.be': 'Tỷ lệ thắng hoà vốn', 'tools.exp.pos': 'Hệ thống có kỳ vọng dương (trên giấy).', 'tools.exp.neg': 'Kỳ vọng âm: về lâu dài sẽ thua lỗ.',
      'tools.pip.h': 'Giá trị 1 pip', 'tools.pip.note': 'Cặp có USD đứng sau: 1 pip = 10 USD cho 1 lot chuẩn (100.000 đơn vị).', 'tools.pip.bad': 'Nhập khối lượng lớn hơn 0.', 'tools.pip.1': '1 pip', 'tools.pip.10': '10 pip', 'tools.pip.50': '50 pip',
      'gloss.h1': 'Thuật ngữ Forex', 'gloss.sub': '{n} thuật ngữ thường gặp.', 'gloss.label': 'Lọc thuật ngữ', 'gloss.ph': 'Lọc thuật ngữ, ví dụ: pip, spread…', 'gloss.none': 'Không tìm thấy thuật ngữ phù hợp.', 'gloss.count': 'Hiển thị {n} thuật ngữ',
      'search.h1': 'Kết quả cho “{q}”', 'search.meta': '{a} bài học · {b} thuật ngữ', 'search.none': 'Không có bài học phù hợp. Thử từ khoá khác như “RSI”, “pip”, “quản lý vốn”.', 'search.gloss': 'Thuật ngữ',
      'nf.h': 'Không tìm thấy trang', 'nf.back': 'Về trang chủ',
      'sess.lab': 'Giờ Việt Nam (UTC+7)', 'sess.open': 'Đang mở', 'sess.closed': 'Đóng',
      'sess.group': 'Phiên {n}, {s} đến {e}, hiện đang {st}', 'sess.st.open': 'mở', 'sess.st.closed': 'đóng',
      'sess.heat': 'Mức sôi động', 'sess.heat.s': 'số phiên cùng mở', 'sess.heat.aria': 'Mức sôi động theo số phiên cùng mở',
      'sess.foot': 'Nhiều phiên cùng mở nhất lúc {r} giờ Việt Nam.',
      'sess.wk.t': 'Thị trường đang nghỉ cuối tuần', 'sess.wk.p': 'Forex nghỉ khoảng từ 05:00 thứ Bảy đến 04:00 thứ Hai (giờ Việt Nam).',
      'sess.on': 'Đang diễn ra', 'sess.off': 'Đang đóng cửa', 'sess.h2': 'Phiên giao dịch hôm nay', 'sess.full': 'Mở đồng hồ đầy đủ',
      'sess.cd.close': 'Đóng sau {x}', 'sess.cd.open': 'Mở sau {x}', 'sess.cd.wk': 'Thị trường nghỉ cuối tuần', 'sess.cd.h': '{h} giờ ', 'sess.cd.m': '{m} phút', 'sess.pairs': 'Cặp thường theo dõi:',
      'clock.h1': 'Đồng hồ phiên giao dịch', 'clock.sub': 'Theo dõi phiên nào đang mở theo giờ Việt Nam và thời điểm thanh khoản cao nhất.',
      'clock.note.t': 'Lưu ý', 'clock.note.p': 'Khung giờ mang tính tham khảo. Khi Mỹ và châu Âu đổi giờ mùa hè, các phiên London và New York lệch khoảng 1 giờ so với bảng này. Hãy đối chiếu với giờ mở cửa của sàn bạn dùng.',
      'sess.d.Sydney': 'Biến động thấp, thanh khoản mỏng; mở đầu tuần giao dịch.', 'sess.d.Tokyo': 'Cặp JPY và đồng tiền châu Đại Dương hoạt động mạnh; thường đi ngang hơn.',
      'sess.d.London': 'Thanh khoản lớn nhất, xu hướng thường rõ; nhiều tin châu Âu.', 'sess.d.New York': 'Nhiều tin USD, biến động mạnh nhất khi chồng giờ với London.',
      'title.path': 'Lộ trình học', 'title.level': 'Cấp {n}: {t}', 'title.certs': 'Chứng nhận của tôi', 'title.cert': 'Chứng nhận Cấp {n}', 'title.tools': 'Công cụ', 'title.gloss': 'Thuật ngữ', 'title.search': 'Tìm kiếm', 'title.clock': 'Đồng hồ phiên giao dịch', 'title.nf': 'Không tìm thấy',
      'mt5.title': 'MT5 trên điện thoại', 'mt5.note': 'Hình mô phỏng giao diện MT5, dữ liệu giả lập, không phải ảnh chụp thật', 'mt5.real': 'Ảnh chụp thực tế từ MetaTrader 5 trên điện thoại.', 'mt5.real.alt': 'Ảnh chụp thực tế MT5: {t}',
      'bk.h': 'Muốn áp dụng những gì đã học?', 'bk.p': 'Mở tài khoản qua liên kết bên dưới ngay hôm nay, bắt đầu hành trình chinh phục thị trường tài chính toàn cầu và từng bước xây dựng kiến thức, kỹ năng giao dịch của riêng bạn.',
      'bk.btn': 'Đăng ký tài khoản Forex',
      'bk.risk': 'Giao dịch Forex/CFD có rủi ro cao và có thể mất toàn bộ vốn. Hãy tự kiểm tra giấy phép của sàn trước khi nạp tiền (xem bài “Sàn môi giới và các loại lệnh”).', 'bk.lesson': 'Xem bài về cách chọn sàn', 'bk.aria': 'Mở tài khoản giao dịch Forex (liên kết giới thiệu, mở trong tab mới)'
    },
    en: {
      'doc.title': 'Forex Academy VN – Learn Forex from basics to advanced',
      'doc.desc': 'A free self-study Forex path: fundamentals, technical indicators, strategies, money management and real-world experience. With quizzes and calculators.',
      'skip': 'Skip to main content', 'brand.aria': 'Forex Academy VN – Home',
      'nav.aria': 'Main navigation', 'nav.home': 'Home', 'nav.path': 'Curriculum', 'nav.ind': 'Indicators', 'nav.clock': 'Trading hours', 'nav.certs': 'Certificates', 'nav.tools': 'Tools', 'nav.gloss': 'Glossary',
      'search.label': 'Search lessons', 'search.ph': 'Search lessons…', 'theme.aria': 'Toggle light/dark theme', 'menu.aria': 'Open menu', 'lang.label': 'Language',
      'risk.strong': 'Risk warning:', 'risk.text': 'Trading Forex and CFDs is leveraged, high risk, and you can lose all of your capital. The content on this website is for education only and is not investment advice.',
      'foot.tag': 'Structured learning – disciplined trading.', 'foot.path': 'Curriculum', 'foot.tools': 'Tools', 'foot.gloss': 'Glossary', 'foot.copy': 'Forex Academy VN. Content is for reference only.',
      'brand': 'Forex Academy VN',
      'nav.cal': 'Economic calendar',
      'cal.h1': 'Real-time economic calendar', 'cal.sub': 'Follow the economic releases that can move the market sharply. Times are shown in Vietnam time (GMT+7).',
      'cal.view': 'Period', 'cal.day': 'Today', 'cal.week': 'This week', 'cal.imp': 'Importance', 'cal.all': 'All releases', 'cal.high': 'High-impact only',
      'cal.open': 'Open on Investing.com', 'cal.full': 'Open the full calendar', 'cal.credit': 'Real-time economic calendar provided by', 'cal.provided': '.', 'cal.frame': 'Real-time economic calendar from Investing.com',
      'cal.note.t': 'Note', 'cal.note.p': 'The data is provided by Investing.com, not by Forex Academy VN, and may be delayed or change. When you open this page your browser loads content directly from Investing.com. For reference only, not investment advice.',
      'cal.tip': 'High-impact releases (interest rates, CPI, NFP…) usually cause sharp moves and wide spreads. Reduce size or stay out before and after them.', 'cal.link': 'See the real-time economic calendar', 'title.cal': 'Economic calendar',
      'home.eyebrow': 'Free · Self-paced · Structured curriculum',
      'home.h1': 'Learn Forex from {a}zero{/a} to disciplined trading',
      'home.lead': 'A {n}-level path: fundamentals, technical indicators, strategies, money management and psychology. Each lesson is short, with a quiz and calculators to practise.',
      'cta.start': 'Start the first lesson', 'cta.continue': 'Continue: {title}', 'cta.path': 'View the full curriculum',
      'chart.aria': 'Illustrative candlestick chart of an uptrend: higher highs and higher lows with price riding the EMA', 'chart.caption': 'Illustration: in an uptrend, highs and lows both keep rising and price rides the moving average (EMA). Simulated data, for education only.', 'chart.hh': 'Higher highs', 'chart.hl': 'Higher lows', 'chart.buy': 'Buy with the trend', 'chart.ema': 'EMA', 'chart.vol': 'Volume',
      'stat.levels': 'levels', 'stat.lessons': 'lessons', 'stat.hours': 'total study time', 'stat.done': 'lessons completed',
      'path.h2': 'Curriculum', 'path.sub': 'Follow the levels in order, or jump to the one that suits you.',
      'why.h2': 'Why learn here?',
      'feat.1.t': 'Risk comes first', 'feat.1.d': 'Every level reminds you about money management. One whole level is about risk and spotting scams.',
      'feat.2.t': 'Quiz after every lesson', 'feat.2.d': 'Each lesson has multiple-choice questions with explanations so you are sure before moving on.',
      'feat.3.t': 'Practical tools', 'feat.3.d': 'Position size, margin, expectancy – the calculations you will use every day.',
      'feat.4.t': 'Plain-language glossary', 'feat.4.d': 'A quick-lookup Forex glossary with short, easy explanations.',
      'real.t': 'Be realistic about profits', 'real.d': 'Most retail traders lose money, especially with high leverage and no plan. There is no magic indicator or “sure-win signal”. Learn, practise on a demo account and only risk money you can afford to lose.',
      'card.level': 'Level {n}', 'card.cert': ' · Certificate earned', 'card.prog': 'Progress of level {n}', 'card.learned': '{d}/{n} lessons done',
      'path.h1': 'Forex curriculum', 'path.meta': '{lv} levels · {ls} lessons · {d}/{ls} completed',
      'crumb.path': 'Curriculum', 'crumb.level': 'Level {n}', 'crumb.lesson': 'Lesson {id}', 'crumb.cert': 'Certificate', 'crumb.tools': 'Tools',
      'min': '{n} min', 'min.read': '{n} min read',
      'level.cert.view': 'View the Level {n} certificate', 'level.cert.hint': 'Complete all {n} lessons to earn the Level {id} certificate ({left} left).',
      'level.prev': 'Previous level', 'level.next': 'Next level',
      'side.aria': 'Lessons in level {n}', 'side.h': 'Level {n}: {title}',
      'quiz.h': 'Quick check', 'quiz.check': 'Check answers', 'quiz.none': 'You have not chosen an answer.', 'quiz.ok': 'Correct. ', 'quiz.bad': 'Not quite – the right answer is highlighted in green. ',
      'quiz.all': 'Please answer every question.', 'quiz.res': 'Score: {ok}/{n}', 'quiz.great': ' – well done!',
      'take.h': 'Key takeaways', 'done.mark': 'Mark as complete', 'done.done': 'Completed',
      'pager.aria': 'Lesson navigation', 'pager.prev': '← Previous lesson', 'pager.next': 'Next lesson →',
      'banner.t': 'Congratulations! You completed Level {n}', 'banner.p': 'Your certificate is ready.', 'banner.a': 'Get certificate',
      'cert.h1': 'My certificates', 'cert.sub': '{got}/{n} certificates earned. Complete every lesson of a level to earn its certificate.',
      'cert.name.label': 'Name printed on the certificate', 'cert.name.ph': 'e.g. Jane Smith', 'cert.name.l2': 'Full name',
      'cert.view.aria': 'View Level {n} certificate', 'cert.date': 'Issued {m}/{d}/{y}', 'cert.btn': 'View · Download · Print', 'cert.locked': 'Not earned yet', 'cert.continue': 'Continue Level {n}',
      'cert.no.h': 'Not eligible for the certificate yet', 'cert.no.p': 'You need to complete all {n} lessons of Level {id} ({d}/{n} done).',
      'cert.cong': 'Congratulations on completing Level {n}!', 'cert.hint': 'Enter your name to print it on the certificate. It is stored only in your browser.',
      'cert.png': 'Download PNG', 'cert.print': 'Print / Save PDF', 'cert.next': 'Continue to Level {n}', 'cert.png.ok': 'Certificate image created.', 'cert.png.fail': 'Could not create the image. Please use "Print / Save PDF".',
      'cert.file': 'certificate-level-{n}',
      'svg.title': 'CERTIFICATE OF COMPLETION', 'svg.certify': 'This is to certify that', 'svg.ph': 'Your full name', 'svg.done': 'has completed all {n} lessons of',
      'svg.level': 'Level {n}: {title}', 'svg.date': '{mn} {d}, {y}', 'svg.code': 'Certificate ID: {c}',
      'svg.disc': 'A self-study course completion certificate, not a professional financial qualification.', 'svg.aria': 'Certificate of completion, Level {n}, {name}',
      'tools.h1': 'Calculators', 'tools.sub': 'The basic calculations every trader needs. Results are estimates – check them against your broker platform.',
      'tools.lot.h': 'Position size (lots)', 'tools.bal': 'Account balance (USD)', 'tools.risk': 'Risk per trade (%)', 'tools.risk.h': 'Recommended 0.5–2%', 'tools.sl': 'Stop loss (pips)',
      'tools.pair': 'Pair type', 'tools.pair.usd': 'USD is the quote currency (EUR/USD, GBP/USD, AUD/USD…)', 'tools.pair.jpy': 'JPY pairs (USD/JPY…)', 'tools.jpy.px': 'Current USD/JPY price',
      'tools.enter': 'Enter values greater than 0.', 'tools.r.risk': 'Amount at risk', 'tools.r.pipval': 'Value of 1 pip / 1 lot', 'tools.r.lots': 'Suggested size', 'tools.r.warn': 'Risking more than 3% per trade is very high.',
      'tools.margin.h': 'Margin', 'tools.lot': 'Volume (lots)', 'tools.mpx': 'Pair price (e.g. EUR/USD)', 'tools.mpx.h': 'For pairs quoted in USD (EUR/USD, GBP/USD…)', 'tools.lev': 'Leverage (1:x)',
      'tools.r.notional': 'Position value', 'tools.r.margin': 'Required margin',
      'tools.exp.h': 'Expectancy', 'tools.win': 'Win rate (%)', 'tools.rr': 'Average R:R (reward : risk)', 'tools.rr.h': 'e.g. 2 means winners are twice the size of losers',
      'tools.exp.bad': 'Win rate must be 0–100 and R:R above 0.', 'tools.r.exp': 'Expectancy per trade', 'tools.r.be': 'Break-even win rate', 'tools.exp.pos': 'Positive expectancy (on paper).', 'tools.exp.neg': 'Negative expectancy: it loses money in the long run.',
      'tools.pip.h': 'Pip value', 'tools.pip.note': 'USD-quoted pairs: 1 pip = 10 USD per standard lot (100,000 units).', 'tools.pip.bad': 'Enter a volume greater than 0.', 'tools.pip.1': '1 pip', 'tools.pip.10': '10 pips', 'tools.pip.50': '50 pips',
      'gloss.h1': 'Forex glossary', 'gloss.sub': '{n} common terms.', 'gloss.label': 'Filter terms', 'gloss.ph': 'Filter terms, e.g. pip, spread…', 'gloss.none': 'No matching terms found.', 'gloss.count': 'Showing {n} terms',
      'search.h1': 'Results for “{q}”', 'search.meta': '{a} lessons · {b} terms', 'search.none': 'No matching lessons. Try another keyword such as “RSI”, “pip” or “risk”.', 'search.gloss': 'Glossary',
      'nf.h': 'Page not found', 'nf.back': 'Back to home',
      'sess.lab': 'Vietnam time (UTC+7)', 'sess.open': 'Open', 'sess.closed': 'Closed',
      'sess.group': '{n} session, {s} to {e}, currently {st}', 'sess.st.open': 'open', 'sess.st.closed': 'closed',
      'sess.heat': 'Activity level', 'sess.heat.s': 'number of open sessions', 'sess.heat.aria': 'Activity level by number of open sessions',
      'sess.foot': 'Most sessions overlap at {r} Vietnam time.',
      'sess.wk.t': 'The market is closed for the weekend', 'sess.wk.p': 'Forex is closed from about 05:00 Saturday to 04:00 Monday (Vietnam time).',
      'sess.on': 'Live now', 'sess.off': 'Market closed', 'sess.h2': "Today's trading sessions", 'sess.full': 'Open full clock',
      'sess.cd.close': 'Closes in {x}', 'sess.cd.open': 'Opens in {x}', 'sess.cd.wk': 'Closed for the weekend', 'sess.cd.h': '{h} h ', 'sess.cd.m': '{m} min', 'sess.pairs': 'Pairs to watch:',
      'clock.h1': 'Trading session clock', 'clock.sub': 'See which sessions are open in Vietnam time and when liquidity peaks.',
      'clock.note.t': 'Note', 'clock.note.p': 'Hours are approximate. When the US and Europe switch to daylight saving time, the London and New York sessions shift by about 1 hour from this table. Check your broker’s own opening hours.',
      'sess.d.Sydney': 'Low volatility and thin liquidity; opens the trading week.', 'sess.d.Tokyo': 'JPY pairs and Oceania currencies are active; often more range-bound.',
      'sess.d.London': 'The deepest liquidity, trends are often clear; lots of European news.', 'sess.d.New York': 'Heavy USD news; the most volatile when it overlaps with London.',
      'title.path': 'Curriculum', 'title.level': 'Level {n}: {t}', 'title.certs': 'My certificates', 'title.cert': 'Level {n} certificate', 'title.tools': 'Tools', 'title.gloss': 'Glossary', 'title.search': 'Search', 'title.clock': 'Trading session clock', 'title.nf': 'Not found',
      'mt5.title': 'MT5 on mobile', 'mt5.note': 'A simulated MT5 interface with sample data – not a real screenshot', 'mt5.real': 'A real screenshot from MetaTrader 5 on mobile.', 'mt5.real.alt': 'Real MT5 screenshot: {t}',
      'bk.h': 'Ready to put it into practice?', 'bk.p': 'Open an account through the link below today, begin your journey into the global financial markets and build your own trading knowledge and skills step by step.',
      'bk.btn': 'Open a Forex account',
      'bk.risk': 'Trading Forex/CFDs carries a high risk and you can lose all of your capital. Check the broker’s licence yourself before depositing (see the lesson “Brokers and order types”).', 'bk.lesson': 'Read how to choose a broker', 'bk.aria': 'Open a Forex trading account (referral link, opens in a new tab)'
    }
  };
  var MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  var packs = {};
  function fill(s, v) {
    if (!v) return s;
    return s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; });
  }
  function t(key, v) {
    var s = (UI[lang] && UI[lang][key]);
    if (s == null) s = UI.vi[key];
    if (s == null) s = key;
    return fill(s, v);
  }
  function rich(s) { return s.replace('{a}', '<span class="accent">').replace('{/a}', '</span>'); }
  function months(m) { return MONTHS[lang] ? MONTHS[lang][m - 1] : String(m); }

  /* ----- trình dựng HTML dùng chung cho bài dịch ----- */
  var ICO = {
    info: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/></svg>',
    warn: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h0"/></svg>',
    bulb: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0012 3z"/></svg>'
  };
  function box(cls, icon, title, html) { return '<div class="callout ' + cls + '"><span>' + ICO[icon] + '</span><div><b class="title">' + title + '</b><p>' + html + '</p></div></div>'; }
  var H = {
    tip: function (a, b) { return box('tip', 'bulb', a, b); },
    warn: function (a, b) { return box('warn', 'warn', a, b); },
    bad: function (a, b) { return box('danger', 'warn', a, b); },
    note: function (a, b) { return box('', 'info', a, b); },
    /* L: {aria, up, down, high, close, open, low, mopen, mclose, cap} */
    candle: function (L) {
      return '<figure class="diagram"><svg viewBox="0 0 440 220" role="img" aria-label="' + L.aria + '">' +
        '<line class="grid-line" x1="10" x2="430" y1="40" y2="40"/><line class="grid-line" x1="10" x2="430" y1="180" y2="180"/>' +
        '<line class="up" stroke-width="3" x1="110" x2="110" y1="30" y2="190"/><rect class="up" x="85" y="70" width="50" height="90" rx="3"/>' +
        '<line class="down" stroke-width="3" x1="330" x2="330" y1="30" y2="190"/><rect class="down" x="305" y="70" width="50" height="90" rx="3"/>' +
        '<text class="svg-text" x="110" y="18" text-anchor="middle">' + L.up + '</text><text class="svg-text" x="330" y="18" text-anchor="middle">' + L.down + '</text>' +
        '<text class="svg-muted" x="150" y="44">' + L.high + '</text><text class="svg-muted" x="150" y="76">' + L.close + '</text><text class="svg-muted" x="150" y="158">' + L.open + '</text><text class="svg-muted" x="150" y="190">' + L.low + '</text>' +
        '<text class="svg-muted" x="370" y="76">' + L.mopen + '</text><text class="svg-muted" x="370" y="158">' + L.mclose + '</text></svg>' +
        '<figcaption>' + L.cap + '</figcaption></figure>';
    },
    /* L: {aria, profit, risk, entry, tp, sl, cap} */
    rr: function (L) {
      return '<figure class="diagram"><svg viewBox="0 0 440 200" role="img" aria-label="' + L.aria + '">' +
        '<rect x="150" y="30" width="140" height="60" fill="var(--accent-soft)" stroke="var(--accent)"/><rect x="150" y="90" width="140" height="30" fill="var(--danger-soft)" stroke="var(--danger)"/>' +
        '<line x1="120" x2="320" y1="90" y2="90" stroke="var(--text)" stroke-width="2"/>' +
        '<text class="svg-text" x="300" y="94">' + L.entry + '</text><text class="svg-text" x="300" y="64" fill="var(--accent)">' + L.tp + '</text><text class="svg-text" x="300" y="114">' + L.sl + '</text>' +
        '<text class="svg-muted" x="20" y="64">' + L.profit + '</text><text class="svg-muted" x="20" y="108">' + L.risk + '</text></svg>' +
        '<figcaption>' + L.cap + '</figcaption></figure>';
    }
  };

  /* ----- hình minh hoạ cho bài KYC/AML (SVG, theo màu giao diện) ----- */
  function esc2(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function tx(x, y, lines, cls, anchor) {
    lines = [].concat(lines);
    return lines.map(function (l, i) { return '<text class="' + cls + '" x="' + x + '" y="' + (y + i * 17) + '" text-anchor="' + (anchor || 'middle') + '">' + esc2(l) + '</text>'; }).join('');
  }
  function node(x, y, w, h, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1.5" ' + (extra || '') + '/>'; }
  function arrow(x1, y1, x2, y2, col, dash) {
    var dir = x2 >= x1 ? 1 : -1;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + (x2 - dir * 8) + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="2.5"' + (dash ? ' stroke-dasharray="6 4"' : '') + '/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + (x2 - dir * 10) + ',' + (y2 - 6) + ' ' + (x2 - dir * 10) + ',' + (y2 + 6) + '" fill="' + col + '"/>';
  }
  var STK = 'fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var FIG = {
    /* L: {aria, you, broker, reg, a1, a2, cap} */
    overview: function (L) {
      var s = '<figure class="diagram"><svg viewBox="0 0 700 200" role="img" aria-label="' + esc2(L.aria) + '">';
      s += node(10, 40, 150, 120) + node(275, 40, 150, 120) + node(540, 40, 150, 120);
      /* người */
      s += '<g ' + STK + '><circle cx="85" cy="78" r="10"/><path d="M63 112q0-18 22-18t22 18"/></g>';
      /* toà nhà (sàn) */
      s += '<g ' + STK + '><path d="M385 108v-30l25-14 25 14v30z" transform="translate(-23,0)"/><path d="M372 108v-22M386 108v-22M400 108v-22"/><path d="M356 108h62"/></g>';
      /* khiên (cơ quan quản lý) */
      s += '<g ' + STK + '><path d="M615 64l24 8v18q0 18-24 28-24-10-24-28V72z"/><path d="M604 90l8 8 14-16"/></g>';
      s += tx(85, 138, L.you, 'svg-text') + tx(350, 138, L.broker, 'svg-text') + tx(615, 138, L.reg, 'svg-text');
      s += arrow(160, 100, 275, 100, 'var(--accent)') + arrow(425, 100, 540, 100, 'var(--info)');
      s += tx(217, 86, L.a1, 'svg-muted') + tx(482, 86, L.a2, 'svg-muted');
      return s + '</svg><figcaption>' + L.cap + '</figcaption></figure>';
    },
    /* L: {aria, s1,s2,s3,s4 (mảng dòng), ok, cap} */
    process: function (L) {
      var s = '<figure class="diagram"><svg viewBox="0 0 700 240" role="img" aria-label="' + esc2(L.aria) + '">';
      var titles = [L.s1, L.s2, L.s3, L.s4];
      for (var i = 0; i < 4; i++) {
        var x = 10 + i * 172, cx = x + 75;
        s += node(x, 14, 150, 156);
        s += '<circle cx="' + (x + 20) + '" cy="34" r="12" fill="var(--accent)"/><text x="' + (x + 20) + '" y="39" text-anchor="middle" font-size="13" font-weight="800" fill="var(--on-accent)">' + (i + 1) + '</text>';
        s += '<g ' + STK + '>';
        if (i === 0) s += '<rect x="' + (cx - 30) + '" y="58" width="60" height="42" rx="5"/><circle cx="' + (cx - 14) + '" cy="74" r="7"/><path d="M' + (cx - 2) + ' 70h22M' + (cx - 2) + ' 80h22M' + (cx - 22) + ' 91h44"/>';
        if (i === 1) s += '<circle cx="' + cx + '" cy="76" r="15"/><path d="M' + (cx - 28) + ' 104q0-18 28-18t28 18"/><path d="M' + (cx - 34) + ' 62v-10h10M' + (cx + 34) + ' 62v-10h-10M' + (cx - 34) + ' 98v10h10M' + (cx + 34) + ' 98v10h-10"/>';
        if (i === 2) s += '<rect x="' + (cx - 22) + '" y="52" width="44" height="56" rx="4"/><path d="M' + (cx - 12) + ' 68h24M' + (cx - 12) + ' 80h24M' + (cx - 12) + ' 92h14"/>';
        if (i === 3) s += '<ellipse cx="' + (cx - 8) + '" cy="96" rx="22" ry="8"/><path d="M' + (cx - 30) + ' 96v-12"/><ellipse cx="' + (cx - 8) + '" cy="84" rx="22" ry="8"/><path d="M' + (cx - 30) + ' 84v-12"/><ellipse cx="' + (cx + 4) + '" cy="68" rx="22" ry="8"/>';
        s += '</g>';
        s += tx(cx, 134, titles[i], 'svg-text');
      }
      s += '<rect x="10" y="190" width="680" height="38" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>' +
        '<path d="M300 209l7 7 13-14" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text class="svg-text" x="332" y="214" text-anchor="start">' + esc2(L.ok) + '</text>';
      return s + '</svg><figcaption>' + L.cap + '</figcaption></figure>';
    },
    /* L: {aria, own, broker, dep, wd, third, rej, cap} */
    flow: function (L) {
      var s = '<figure class="diagram"><svg viewBox="0 0 700 270" role="img" aria-label="' + esc2(L.aria) + '">';
      s += node(10, 20, 200, 84) + node(490, 20, 200, 84) + node(10, 168, 200, 84, 'stroke-dasharray="6 4"');
      s += tx(110, 56, L.own, 'svg-text') + tx(590, 62, L.broker, 'svg-text') + tx(110, 204, L.third, 'svg-text');
      s += arrow(212, 46, 488, 46, 'var(--accent)') + arrow(488, 80, 212, 80, 'var(--accent)');
      s += tx(350, 38, L.dep, 'svg-muted') + tx(350, 102, L.wd, 'svg-muted');
      s += arrow(212, 210, 488, 100, 'var(--danger)', true).replace(/<polygon[^>]*>/, '');
      s += '<g stroke="var(--danger)" stroke-width="4" stroke-linecap="round"><path d="M336 176l20 20M356 176l-20 20"/></g>';
      s += tx(350, 232, L.rej, 'svg-muted');
      return s + '</svg><figcaption>' + L.cap + '</figcaption></figure>';
    }
  };

  /* ----- cờ quốc gia/vùng lãnh thổ (SVG đơn giản, trang trí) ----- */
  var JACK = '<rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="8"/>';
  var STAR = 'M0-3.2L.76-1.05L3.04-.99L1.24.4L1.88 2.59L0 1.3L-1.88 2.59L-1.24.4L-3.04-.99L-.76-1.05Z';
  function flag(inner) { return '<span class="flag" aria-hidden="true"><svg viewBox="0 0 60 40" width="24" height="16" focusable="false">' + inner + '</svg></span>'; }
  var FLAGS = {
    uk: flag(JACK),
    au: flag('<rect width="60" height="40" fill="#012169"/><svg width="30" height="20" viewBox="0 0 60 40">' + JACK + '</svg>' +
      [[15, 31, 1.15], [45, 7, .85], [38, 19, .85], [52, 17, .85], [45, 33, .85]].map(function (s) { return '<path transform="translate(' + s[0] + ',' + s[1] + ') scale(' + s[2] + ')" d="' + STAR + '" fill="#fff"/>'; }).join('')),
    ky: flag('<rect width="60" height="40" fill="#012169"/><svg width="30" height="20" viewBox="0 0 60 40">' + JACK + '</svg>' +
      '<path d="M37 9h16v11c0 7-8 11-8 11s-8-4-8-11z" fill="#fff" stroke="#C8102E" stroke-width="1.2"/><path d="M37.6 9.6h14.8v6H37.6z" fill="#C8102E"/><path d="M41 21h8" stroke="#012169" stroke-width="2"/>'),
    za: flag('<rect width="60" height="20" fill="#E03C31"/><rect y="20" width="60" height="20" fill="#001489"/>' +
      '<path d="M0 0L22 20L0 40M22 20H60" fill="none" stroke="#fff" stroke-width="14"/><path d="M0 0L22 20L0 40M22 20H60" fill="none" stroke="#007749" stroke-width="9"/>' +
      '<path d="M-2 -1L17 20L-2 41z" fill="#000" stroke="#FFB81C" stroke-width="3"/>')
  };

  /* ----- gói ngôn ngữ ----- */
  function addPack(code, part) {
    var p = packs[code] || (packs[code] = { levels: {}, lessons: {}, glossary: null, mt5: {} });
    ['levels', 'lessons', 'mt5'].forEach(function (k) { if (part[k]) for (var id in part[k]) p[k][id] = part[k][id]; });
    if (part.glossary) p.glossary = part.glossary;
  }
  /* Áp bản dịch lên dữ liệu gốc (tiếng Việt) – gọi một lần khi khởi động */
  function localize(D) {
    var p = packs[lang];
    if (!p || lang === 'vi') return;
    D.levels.forEach(function (lv) {
      var pl = p.levels[lv.id];
      if (pl) { lv.title = pl.title || lv.title; lv.desc = pl.desc || lv.desc; }
      lv.lessons.forEach(function (l) {
        var q = p.lessons[l.id];
        if (!q) return;
        if (q.title) l.title = q.title;
        if (q.body) l.body = q.body;
        if (q.key) l.key = q.key;
        if (q.quiz) l.quiz = l.quiz.map(function (o, i) {
          var tq = q.quiz[i]; return tq ? { q: tq.q, o: tq.o, a: o.a, w: tq.w } : o;
        });
      });
    });
    if (p.glossary && p.glossary.length) D.glossary = p.glossary;
  }

  /* ----- áp dụng cho phần tĩnh của trang ----- */
  function apply(root) {
    root = root || document;
    document.documentElement.lang = cur.html;
    root.querySelectorAll('[data-i18n]').forEach(function (e) { e.textContent = t(e.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-ph]').forEach(function (e) { e.setAttribute('placeholder', t(e.getAttribute('data-i18n-ph'))); });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (e) { e.setAttribute('aria-label', t(e.getAttribute('data-i18n-aria'))); });
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', t('doc.desc'));
    document.title = t('doc.title');
  }
  function set(id) {
    try { localStorage.setItem('fx-lang', id); } catch (e) { }
    location.reload();
  }

  window.I18N = {
    lang: lang, locale: cur.locale, langs: LANGS, t: t, rich: rich, months: months, h: H, flags: FLAGS, fig: FIG,
    addPack: addPack, localize: localize, apply: apply, set: set,
    pack: function () { return packs[lang] || { levels: {}, lessons: {}, mt5: {} }; }
  };

  /* nạp (đồng bộ, theo thứ tự): bộ vẽ hình → gói nội dung của ngôn ngữ đang chọn → (data.js do index.html nạp) */
  document.write('<script src="js/figs.js?v=7"><\/script>');
  if (lang !== 'vi') {
    ['meta', 'l1', 'l2', 'l3'].forEach(function (f) {
      document.write('<script src="js/lang/' + lang + '-' + f + '.js?v=14"><\/script>');
    });
  }
})();
