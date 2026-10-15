/* Nội dung giáo dục – Forex Academy VN. Mọi nội dung chỉ mang tính tham khảo, không phải lời khuyên đầu tư. */
(function () {
  var I = {
    info: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/></svg>',
    warn: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h0"/></svg>',
    bulb: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.700 1-2.500A6 6 0 0012 3z"/></svg>'
  };
  function box(cls, icon, title, html) { return '<div class="callout ' + cls + '"><span>' + I[icon] + '</span><div><b class="title">' + title + '</b>' + html + '</div></div>'; }
  function tip(t, h) { return box('tip', 'bulb', t, '<p>' + h + '</p>'); }
  function warn(t, h) { return box('warn', 'warn', t, '<p>' + h + '</p>'); }
  function bad(t, h) { return box('danger', 'warn', t, '<p>' + h + '</p>'); }
  function note(t, h) { return box('', 'info', t, '<p>' + h + '</p>'); }

  var candleSvg = '<figure class="diagram"><svg viewBox="0 0 440 220" role="img" aria-label="Cấu tạo nến tăng và nến giảm">' +
    '<line class="grid-line" x1="10" x2="430" y1="40" y2="40"/><line class="grid-line" x1="10" x2="430" y1="180" y2="180"/>' +
    '<line class="up" stroke-width="3" x1="110" x2="110" y1="30" y2="190"/><rect class="up" x="85" y="70" width="50" height="90" rx="3"/>' +
    '<line class="down" stroke-width="3" x1="330" x2="330" y1="30" y2="190"/><rect class="down" x="305" y="70" width="50" height="90" rx="3"/>' +
    '<text class="svg-text" x="110" y="18" text-anchor="middle">Nến tăng</text><text class="svg-text" x="330" y="18" text-anchor="middle">Nến giảm</text>' +
    '<text class="svg-muted" x="150" y="44">Giá cao nhất (High)</text><text class="svg-muted" x="150" y="76">Giá đóng cửa (Close)</text><text class="svg-muted" x="150" y="158">Giá mở cửa (Open)</text><text class="svg-muted" x="150" y="190">Giá thấp nhất (Low)</text>' +
    '<text class="svg-muted" x="370" y="76">Giá mở cửa</text><text class="svg-muted" x="370" y="158">Giá đóng cửa</text></svg>' +
    '<figcaption>Thân nến thể hiện chênh lệch giữa giá mở và đóng cửa; bóng nến (râu) thể hiện vùng giá cao nhất/thấp nhất trong phiên.</figcaption></figure>';

  var rrSvg = '<figure class="diagram"><svg viewBox="0 0 440 200" role="img" aria-label="Sơ đồ tỷ lệ lợi nhuận trên rủi ro 1:2">' +
    '<rect x="150" y="30" width="140" height="60" fill="var(--accent-soft)" stroke="var(--accent)"/><rect x="150" y="90" width="140" height="30" fill="var(--danger-soft)" stroke="var(--danger)"/>' +
    '<line x1="120" x2="320" y1="90" y2="90" stroke="var(--text)" stroke-width="2"/>' +
    '<text class="svg-text" x="300" y="94">Điểm vào lệnh</text><text class="svg-text" x="300" y="64" fill="var(--accent)">Chốt lời (+2R)</text><text class="svg-text" x="300" y="114">Dừng lỗ (-1R)</text>' +
    '<text class="svg-muted" x="20" y="64">Lợi nhuận</text><text class="svg-muted" x="20" y="108">Rủi ro</text></svg>' +
    '<figcaption>R:R = 1:2 nghĩa là dám chấp nhận lỗ 1 phần để kỳ vọng lãi 2 phần.</figcaption></figure>';

  var levels = [
  /* ===================== CẤP 1 ===================== */
  { id: 1, title: 'Nhập môn Forex', icon: 'seed', desc: 'Forex là gì, thị trường vận hành thế nào, các khái niệm nền tảng: cặp tiền, pip, lot, đòn bẩy, ký quỹ.', lessons: [
    { id: '1-1', title: 'Forex là gì?', min: 6, body:
      '<p><strong>Forex</strong> (Foreign Exchange) là thị trường ngoại hối, nơi các đồng tiền được trao đổi với nhau, tạo cơ hội cho cá nhân và doanh nghiệp quản lý rủi ro tỷ giá, bảo vệ giá trị tài sản trước những biến động của tiền tệ và tìm kiếm cơ hội gia tăng tài sản. Khi được sử dụng đúng cách, kết hợp với kiến thức tài chính và quản lý rủi ro chặt chẽ, Forex có thể trở thành một công cụ hỗ trợ quản lý tài sản trong bối cảnh kinh tế và tỷ giá liên tục thay đổi.</p>' +
      '<p>Khi bạn đổi VND sang USD để đi du lịch, bạn đã tham gia một giao dịch ngoại hối nhỏ. Thị trường Forex toàn cầu là thị trường tài chính lớn nhất thế giới với khối lượng giao dịch hàng nghìn tỷ USD mỗi ngày.</p>' +
      '<h2>Ai tham gia thị trường?</h2><ul><li><strong>Ngân hàng trung ương</strong>: điều hành chính sách tiền tệ, can thiệp tỷ giá.</li><li><strong>Ngân hàng thương mại, quỹ đầu tư</strong>: các “cá mập” tạo ra phần lớn thanh khoản.</li><li><strong>Doanh nghiệp</strong>: đổi tiền để thanh toán xuất nhập khẩu.</li><li><strong>Nhà giao dịch bán lẻ</strong>: cá nhân đầu cơ chênh lệch tỷ giá, chiếm tỷ trọng nhỏ.</li></ul>' +
      I18N.fig.hub({"aria":"Sơ đồ những bên tham gia thị trường Forex","center":["Thị trường","Forex"],"items":[["Ngân hàng","trung ương"],["Ngân hàng và","quỹ đầu tư"],["Doanh nghiệp","xuất nhập khẩu"],["Nhà giao dịch","bán lẻ (nhỏ)"]],"cap":"Ngân hàng và tổ chức lớn tạo ra phần lớn thanh khoản; nhà giao dịch bán lẻ chỉ là một phần rất nhỏ."}) + '<h2>Vì sao nhiều người quan tâm?</h2><p>Thị trường mở 24 giờ từ thứ Hai đến thứ Sáu, thanh khoản cao, chi phí giao dịch thấp và có thể kiếm lời cả khi giá tăng lẫn giảm. Nhưng những ưu điểm này cũng đi kèm đòn bẩy – con dao hai lưỡi.</p>' +
      note('Cơ hội bắt đầu từ kiến thức', 'Forex là thị trường tài chính toàn cầu mang đến cơ hội tìm hiểu về tiền tệ, phân tích thị trường và phát triển tư duy quản lý tài sản. Trang bị kiến thức bài bản, xây dựng chiến lược phù hợp và rèn luyện tính kỷ luật là những nền tảng quan trọng giúp bạn đưa ra quyết định giao dịch có cơ sở và hướng đến mục tiêu tài chính dài hạn.') +
      tip('Học đúng thứ tự', 'Hiểu thị trường → thực hành trên demo → quản lý rủi ro → mới tính đến tiền thật.'),
      key: ['Forex là thị trường trao đổi tiền tệ lớn nhất thế giới.', 'Nhà giao dịch bán lẻ chỉ là phần rất nhỏ của thị trường.', 'Thành công trên thị trường Forex bắt đầu từ kiến thức bài bản, tư duy đúng đắn và khả năng quản lý rủi ro hiệu quả.'],
      quiz: [{ q: 'Ai tạo ra phần lớn thanh khoản của thị trường Forex?', o: ['Nhà giao dịch bán lẻ', 'Ngân hàng và các tổ chức tài chính lớn', 'Các sàn môi giới nhỏ'], a: 1, w: 'Ngân hàng, quỹ và định chế tài chính chiếm tỷ trọng lớn nhất.' },
             { q: 'Thị trường Forex hoạt động khi nào?', o: ['24 giờ, 7 ngày/tuần', '24 giờ, từ thứ Hai đến thứ Sáu', 'Chỉ trong giờ hành chính'], a: 1, w: 'Thị trường nghỉ cuối tuần, mở xuyên suốt các phiên Á – Âu – Mỹ trong tuần.' }] },

    { id: '1-2', title: 'Cặp tiền tệ và cách đọc báo giá', min: 7, body:
      '<p>Forex luôn giao dịch theo <strong>cặp</strong>: bạn mua đồng tiền này bằng đồng tiền kia. Ví dụ <code>EUR/USD = 1,0800</code> nghĩa là 1 Euro đổi được 1,08 USD.</p>' +
      '<h2>Tiền cơ sở và tiền định giá</h2><ul><li><strong>Tiền cơ sở</strong> (đứng trước): đồng tiền được định giá, luôn bằng 1 đơn vị.</li><li><strong>Tiền định giá</strong> (đứng sau): số đơn vị tiền này cần để mua 1 đơn vị tiền cơ sở.</li></ul>' +
      '<p><strong>Mua</strong> EUR/USD = mua Euro, bán USD (kỳ vọng EUR mạnh lên). <strong>Bán</strong> EUR/USD = bán Euro, mua USD.</p>' +
      '<h2>Các nhóm sản phẩm giao dịch</h2><p>Bên cạnh các cặp tiền tệ, nhiều sàn còn cung cấp thêm các nhóm sản phẩm khác ngay trên cùng một nền tảng giao dịch:</p><table><thead><tr><th>Nhóm</th><th>Ví dụ</th><th>Đặc điểm</th></tr></thead><tbody><tr><td><strong>Forex</strong></td><td>Major: EUR/USD, GBP/USD, USD/JPY<br>Cross: EUR/GBP, EUR/JPY<br>Exotic: USD/TRY, USD/ZAR</td><td>Cặp tiền tệ; thanh khoản cao nhất, giao dịch gần như 24/5. Major có spread thấp, exotic spread rộng và rủi ro cao</td></tr><tr><td><strong>Commodities</strong> (hàng hoá)</td><td>XAU/USD (vàng), XAG/USD (bạc), WTI và Brent (dầu)</td><td>Giá chịu ảnh hưởng của cung – cầu, địa chính trị và USD; vàng thường được xem là kênh trú ẩn</td></tr><tr><td><strong>Indices</strong> (chỉ số)</td><td>US30, US500, NAS100, GER40, JP225</td><td>Đại diện cho một rổ cổ phiếu của cả nền kinh tế hoặc ngành; phản ứng mạnh với tin kinh tế và tâm lý thị trường</td></tr><tr><td><strong>Stocks</strong> (cổ phiếu)</td><td>AAPL, MSFT, TSLA, AMZN</td><td>Giá theo từng doanh nghiệp, chịu tác động của báo cáo lợi nhuận và tin tức riêng; thường giao dịch theo giờ của sàn chứng khoán</td></tr><tr><td><strong>ETFs</strong> (quỹ hoán đổi danh mục)</td><td>SPY, QQQ, GLD</td><td>Một sản phẩm đại diện cho cả rổ tài sản (chỉ số, vàng, ngành); đa dạng hoá hơn một cổ phiếu đơn lẻ</td></tr></tbody></table><p class="muted">Các sản phẩm ngoài Forex thường được giao dịch dưới dạng hợp đồng chênh lệch (CFD) và có đòn bẩy, nên rủi ro tương tự. Danh sách sản phẩm cụ thể phụ thuộc vào từng sàn.</p>' +
      '<h2>Giá mua (Ask) và giá bán (Bid)</h2><p>Sàn luôn báo hai giá: <strong>Bid</strong> là giá bạn bán, <strong>Ask</strong> là giá bạn mua. Chênh lệch giữa hai giá là <strong>spread</strong> – chi phí giao dịch cơ bản của bạn.</p>[[mt5:quotes]]' +
      tip('Mẹo cho người mới', 'Hãy bắt đầu với 1–2 cặp major như EUR/USD hoặc GBP/USD để hiểu “tính cách” của chúng thay vì nhảy qua lại nhiều cặp.'),
      key: ['Tiền cơ sở đứng trước, tiền định giá đứng sau.', 'Mua cặp = mua tiền cơ sở, bán tiền định giá.', 'Ask luôn cao hơn Bid; chênh lệch là spread.'],
      quiz: [{ q: 'Nếu bạn dự đoán Euro mạnh lên so với USD, bạn nên làm gì với EUR/USD?', o: ['Mua (Buy)', 'Bán (Sell)', 'Đứng ngoài'], a: 0, w: 'Mua EUR/USD là mua Euro và bán USD.' },
             { q: 'Spread là gì?', o: ['Chênh lệch giữa giá Bid và Ask', 'Lợi nhuận của sàn mỗi tháng', 'Mức đòn bẩy tối đa'], a: 0, w: 'Spread là chi phí giao dịch bạn trả cho mỗi lệnh.' }] },

    { id: '1-3', title: 'Pip, lot và giá trị mỗi pip', min: 8, body:
      '<h2>Pip là gì?</h2><p><strong>Pip</strong> (point in percentage) là đơn vị đo biến động giá nhỏ nhất thường dùng. Với hầu hết cặp tiền, 1 pip = 0,0001 (chữ số thập phân thứ tư). Với cặp có JPY, 1 pip = 0,01.</p><p>Ví dụ EUR/USD tăng từ 1,0800 lên 1,0825 là tăng <strong>25 pip</strong>. Chữ số thập phân thứ năm (1,08<em>255</em>) là <strong>pipette</strong> – 1/10 pip.</p>[[mt5:pip]]' +
      '<h2>Lot là gì?</h2><table><thead><tr><th>Loại lot</th><th>Số đơn vị tiền cơ sở</th><th>Giá trị 1 pip (cặp XXX/USD)</th></tr></thead><tbody><tr><td>Standard (1.0)</td><td>100.000</td><td>≈ 10 USD</td></tr><tr><td>Mini (0.1)</td><td>10.000</td><td>≈ 1 USD</td></tr><tr><td>Micro (0.01)</td><td>1.000</td><td>≈ 0,10 USD</td></tr></tbody></table>' +
      '<h2>Ví dụ tính lãi/lỗ</h2><p>Bạn mua EUR/USD 0,5 lot, giá chạy 40 pip có lợi: <code>40 × 5 USD = 200 USD</code> (vì 0,5 lot ≈ 5 USD/pip). Nếu giá đi ngược 40 pip, bạn lỗ đúng 200 USD.</p>' +
      tip('Dùng công cụ', 'Vào mục <a href="#/cong-cu">Công cụ</a> để tính giá trị pip và khối lượng lệnh theo số tiền bạn chấp nhận rủi ro.'),
      key: ['1 pip = 0,0001 (0,01 với cặp JPY).', '1 lot chuẩn = 100.000 đơn vị; 1 pip ≈ 10 USD với cặp XXX/USD.', 'Khối lượng lớn nhân đôi cả lãi lẫn lỗ.'],
      quiz: [{ q: 'EUR/USD đi từ 1,0850 lên 1,0890. Giá chạy bao nhiêu pip?', o: ['4 pip', '40 pip', '400 pip'], a: 1, w: '0,0040 ÷ 0,0001 = 40 pip.' },
             { q: 'Mua 0,1 lot EUR/USD, giá đi ngược 30 pip. Bạn lỗ khoảng bao nhiêu?', o: ['3 USD', '30 USD', '300 USD'],a: 1, w: '0,1 lot ≈ 1 USD/pip, nên 30 pip tương ứng khoảng 30 USD.' }] },

    { id: '1-4', title: 'Đòn bẩy và ký quỹ', min: 8, body:
      '<p><strong>Đòn bẩy</strong> cho phép bạn kiểm soát một vị thế lớn hơn vốn thật. Với đòn bẩy 1:100, 1.000 USD ký quỹ có thể mở vị thế trị giá 100.000 USD.</p>' +
      '<h2>Ký quỹ (Margin)</h2><p><code>Ký quỹ = Giá trị vị thế ÷ Đòn bẩy</code>. Ví dụ 0,1 lot EUR/USD ở giá 1,08 có giá trị 10.800 USD; đòn bẩy 1:100 cần ký quỹ khoảng 108 USD.</p>[[mt5:account]]' +
      '<h2>Các khái niệm cần biết</h2><ul><li><strong>Equity</strong>: vốn thực = số dư + lãi/lỗ đang chạy.</li><li><strong>Free margin</strong>: ký quỹ còn trống để mở lệnh mới.</li><li><strong>Margin level</strong> = Equity ÷ Margin đã dùng × 100%.</li><li><strong>Margin call / Stop out</strong>: khi margin level xuống thấp, sàn cảnh báo rồi tự động đóng lệnh lỗ.</li></ul>' +
      bad('Đòn bẩy không làm bạn giàu hơn', 'Đòn bẩy chỉ khuếch đại kết quả. Dùng đòn bẩy cao với lệnh lớn là con đường nhanh nhất đến “cháy tài khoản”. Điều quan trọng là <em>khối lượng lệnh thực tế</em> so với vốn, không phải mức đòn bẩy sàn cho phép.') +
      tip('Cách nghĩ đúng', 'Hãy bỏ qua “đòn bẩy tối đa” và hỏi: nếu lệnh này chạm dừng lỗ, tôi mất bao nhiêu % vốn?'),
      key: ['Ký quỹ = giá trị vị thế ÷ đòn bẩy.', 'Đòn bẩy khuếch đại cả lãi và lỗ.', 'Kiểm soát rủi ro bằng khối lượng lệnh và dừng lỗ, không phải bằng đòn bẩy.'],
      quiz: [{ q: 'Vị thế trị giá 50.000 USD, đòn bẩy 1:100. Ký quỹ cần là?', o: ['50 USD', '500 USD', '5.000 USD'], a: 1, w: '50.000 ÷ 100 = 500 USD.' },
             { q: 'Điều gì xảy ra khi margin level xuống quá thấp?', o: ['Sàn tặng thêm vốn', 'Sàn có thể tự động đóng lệnh (stop out)', 'Đòn bẩy tự tăng'], a: 1, w: 'Stop out bảo vệ sàn và có thể khiến bạn mất phần lớn vốn.' }] },

    { id: '1-5', title: 'Các phiên giao dịch và giờ vàng', min: 6, body:
      '<p>Thị trường chạy liên tục nhưng không phải lúc nào cũng sôi động. Mỗi phiên có đặc điểm riêng (giờ Việt Nam, UTC+7, có thể lệch 1 giờ khi châu Âu/Mỹ đổi giờ mùa hè):</p>' +
      '<table><thead><tr><th>Phiên</th><th>Giờ VN (tham khảo)</th><th>Đặc điểm</th></tr></thead><tbody><tr><td>Sydney</td><td>04:00 – 13:00</td><td>Nhẹ, biến động thấp</td></tr><tr><td>Tokyo</td><td>07:00 – 16:00</td><td>Cặp JPY, AUD hoạt động mạnh</td></tr><tr><td>London</td><td>14:00 – 23:00</td><td>Thanh khoản cao, xu hướng rõ</td></tr><tr><td>New York</td><td>19:00 – 04:00</td><td>Nhiều tin tức USD, biến động mạnh</td></tr></tbody></table><h2>Xem phiên đang mở ngay bây giờ</h2><p>Thanh dưới đây tự cập nhật theo giờ Việt Nam. Ô có viền là giờ hiện tại; hàng “Mức sôi động” càng đậm thì càng nhiều phiên cùng mở.</p>[[sessions]]<p><a href="#/dong-ho">Mở đồng hồ đầy đủ</a> để xem thời gian còn lại của từng phiên.</p>' +
      '<h2>Thời điểm biến động mạnh nhất</h2><p>Khi hai phiên chồng nhau, đặc biệt <strong>London – New York</strong> (khoảng 19:00–23:00 giờ VN), khối lượng và biến động thường cao nhất. Đây là lúc nhiều chiến thuật theo xu hướng và phá vỡ phát huy hiệu quả.</p>' +
      warn('Cẩn thận khi giao dịch quá khuya', 'Thanh khoản mỏng cuối phiên Mỹ khiến spread giãn rộng và giá giật bất thường. Giao dịch lúc buồn ngủ cũng làm bạn mắc sai lầm tâm lý.') +
      tip('Chọn khung giờ của bạn', 'Bạn không cần canh cả ngày. Hãy chọn 1–2 giờ cố định phù hợp lịch sinh hoạt và giao dịch đều đặn trong khung đó.'),
      key: ['Bốn phiên chính: Sydney, Tokyo, London, New York.', 'Biến động cao nhất khi London và New York chồng nhau.', 'Chọn khung giờ cố định thay vì giao dịch cả ngày.'],
      quiz: [{ q: 'Giai đoạn nào thường có thanh khoản và biến động cao nhất?', o: ['Tokyo – Sydney chồng nhau', 'London – New York chồng nhau', 'Cuối tuần'], a: 1, w: 'Hai trung tâm tài chính lớn nhất cùng hoạt động.' },
             { q: 'Vì sao nên tránh giao dịch lúc thanh khoản mỏng?', o: ['Vì spread giãn và giá dễ giật', 'Vì sàn đóng cửa', 'Vì không có biến động'], a: 0, w: 'Thanh khoản mỏng làm spread rộng và trượt giá nhiều hơn.' }] },

    { id: '1-6', title: 'Tại sao KYC và AML lại quan trọng', min: 6, body:
      '<h2>KYC và AML là gì?</h2><p><strong>KYC</strong> (Know Your Customer – “biết khách hàng của bạn”) là quy trình sàn xác minh danh tính của bạn. <strong>AML</strong> (Anti-Money Laundering – chống rửa tiền) là bộ quy định và quy trình nhằm ngăn dòng tiền bất hợp pháp đi qua hệ thống tài chính. Sàn được cấp phép thường bắt buộc phải thực hiện cả hai.</p>' + I18N.fig.overview({ aria: 'Sơ đồ KYC và AML: khách hàng gửi giấy tờ cho sàn, sàn tuân thủ quy định chống rửa tiền với cơ quan quản lý', you: ['Bạn', '(khách hàng)'], broker: ['Sàn môi giới', 'xác minh danh tính'], reg: ['Cơ quan quản lý', 'và ngân hàng'], a1: 'Giấy tờ (KYC)', a2: 'Tuân thủ (AML)', cap: 'KYC là bước sàn xác minh bạn là ai; AML là nghĩa vụ giám sát dòng tiền mà sàn phải báo cáo và tuân thủ.' }) +
      '<h2>Vì sao điều này quan trọng với bạn?</h2><ul><li><strong>Bảo vệ tài khoản</strong>: danh tính đã xác minh giúp hạn chế việc người khác mạo danh, chiếm quyền hoặc rút tiền của bạn.</li><li><strong>Rút tiền thuận lợi hơn</strong>: hầu hết các sàn chỉ xử lý rút tiền sau khi tài khoản đã hoàn tất KYC.</li><li><strong>Một tín hiệu về sự nghiêm túc của sàn</strong>: sàn chịu sự quản lý thường có quy trình KYC/AML rõ ràng. Đây chỉ là một tín hiệu để xem xét, không phải bằng chứng sàn an toàn.</li><li><strong>Tránh rủi ro pháp lý</strong>: dùng tài khoản của người khác hoặc nạp tiền không rõ nguồn gốc có thể khiến tài khoản bị hạn chế hoặc đóng băng.</li></ul>' +
      '<h2>Quy trình KYC thường gồm những gì?</h2><ol><li><strong>Giấy tờ tùy thân</strong>: CCCD hoặc hộ chiếu còn hiệu lực.</li><li><strong>Xác minh khuôn mặt</strong>: ảnh selfie hoặc video để đối chiếu với giấy tờ.</li><li><strong>Chứng minh địa chỉ</strong>: hóa đơn hoặc sao kê gần đây (thường trong vòng 3 tháng).</li><li><strong>Nguồn tiền</strong>: với khoản nạp lớn, sàn có thể hỏi về nguồn gốc số tiền.</li></ol><p>Thời gian xét duyệt khác nhau giữa các sàn, từ vài phút đến vài ngày làm việc.</p>' + I18N.fig.process({ aria: 'Bốn bước KYC: giấy tờ tùy thân, xác minh khuôn mặt, chứng minh địa chỉ, nguồn tiền', s1: ['Giấy tờ', 'tùy thân'], s2: ['Xác minh', 'khuôn mặt'], s3: ['Chứng minh', 'địa chỉ'], s4: ['Nguồn', 'tiền'], ok: 'Tài khoản đã được xác minh', cap: 'Quy trình KYC thường gồm bốn bước; tuỳ sàn và số tiền nạp, một số bước có thể không bắt buộc.' }) +
      '<h2>Quy tắc AML cần nhớ khi nạp và rút tiền</h2><ul><li>Dùng tài khoản ngân hàng hoặc ví <strong>mang đúng tên bạn</strong>; sàn thường từ chối tiền từ bên thứ ba.</li><li>Tiền rút thường được trả về <strong>cùng phương thức</strong> đã dùng để nạp.</li><li>Giao dịch bất thường (nạp rồi rút ngay mà không giao dịch, số tiền lớn bất thường) có thể bị sàn xem xét hoặc tạm giữ để kiểm tra.</li><li>Không cho người khác mượn hoặc thuê tài khoản của bạn.</li></ul>' + I18N.fig.flow({ aria: 'Dòng tiền hợp lệ: nạp từ tài khoản đúng tên và rút về cùng phương thức; tiền từ bên thứ ba thường bị từ chối', own: ['Tài khoản / ví', 'mang đúng tên bạn'], broker: 'Sàn môi giới', dep: 'Nạp tiền', wd: 'Rút về cùng phương thức', third: ['Tài khoản người khác', '(bên thứ ba)'], rej: 'Thường bị từ chối', cap: 'Nạp và rút qua tài khoản mang đúng tên bạn, cùng một phương thức, giúp quá trình rút tiền thuận lợi và tránh bị kiểm tra AML.' }) +
      warn('Bảo vệ giấy tờ của bạn', 'Chỉ tải giấy tờ lên cổng chính thức của sàn và kiểm tra kỹ tên miền. Không gửi ảnh CCCD, selfie hay sao kê cho cá nhân qua Zalo, Telegram hoặc email. Kẻ lừa đảo có thể dùng chúng để mạo danh bạn.') +
      bad('Dấu hiệu đáng ngờ', 'Sàn quảng cáo “không cần KYC” để nạp rút nhanh, hoặc chỉ yêu cầu KYC sau khi bạn đã nạp tiền rồi viện lý do để từ chối rút. Hãy dừng lại và kiểm tra giấy phép của sàn.') +
      tip('Hoàn tất KYC sớm', 'Hãy hoàn tất xác minh ngay sau khi mở tài khoản và trước khi nạp số tiền lớn, để biết trước quy trình rút tiền hoạt động thế nào.'),
      key: ['KYC là xác minh danh tính khách hàng; AML là các quy định chống rửa tiền.', 'Hoàn tất KYC giúp bảo vệ tài khoản và là điều kiện để rút tiền ở hầu hết các sàn.', 'Nạp và rút bằng tài khoản mang đúng tên bạn, cùng phương thức.', 'Chỉ gửi giấy tờ qua cổng chính thức của sàn, không gửi cho cá nhân.'],
      quiz: [{ q: 'KYC là viết tắt của gì và dùng để làm gì?', o: ['Know Your Customer – xác minh danh tính khách hàng', 'Keep Your Cash – giữ tiền cho khách hàng', 'Key Yield Control – kiểm soát lợi suất'], a: 0, w: 'KYC giúp sàn xác minh bạn là ai, đồng thời hỗ trợ việc chống gian lận và rửa tiền.' },
             { q: 'Bạn nên gửi giấy tờ tùy thân để làm KYC bằng cách nào?', o: ['Gửi cho người tự nhận là nhân viên sàn qua Zalo hoặc Telegram', 'Tải lên cổng chính thức của sàn sau khi đã kiểm tra tên miền', 'Đăng lên nhóm để được hỗ trợ nhanh'], a: 1, w: 'Giấy tờ của bạn có thể bị dùng để mạo danh, nên chỉ gửi qua kênh chính thức của sàn.' }] },

    { id: '1-7', title: 'Sàn môi giới và các loại lệnh', min: 8, body:
      '<h2>Cách chọn sàn môi giới Forex</h2><p>Sàn môi giới là nơi bạn thực hiện giao dịch và quản lý tiền nạp, rút. Hãy đánh giá sàn dựa trên giấy phép, mức độ bảo vệ tiền, tính minh bạch và chất lượng dịch vụ.</p>' +
      '<h2>1. Kiểm tra giấy phép</h2><p>Ưu tiên xác minh giấy phép trực tiếp trên website của cơ quan quản lý:</p><ul class="flag-list"><li>' + I18N.flags.uk + '<strong>FCA (Anh)</strong>: Financial Conduct Authority.</li><li>' + I18N.flags.au + '<strong>ASIC (Úc)</strong>: Australian Securities and Investments Commission.</li><li>' + I18N.flags.ky + '<strong>CIMA (Quần đảo Cayman)</strong>: Cayman Islands Monetary Authority.</li><li>' + I18N.flags.za + '<strong>FSCA (Nam Phi)</strong>: Financial Sector Conduct Authority.</li><li>Và một số loại giấy phép khác.</li></ul><p>Kiểm tra tên pháp nhân, số giấy phép, tình trạng hoạt động và phạm vi dịch vụ. Giấy phép của một pháp nhân không tự động áp dụng cho toàn bộ tập đoàn.</p>' +
      '<h2>2. Kiểm tra ngân hàng và bảo vệ tiền</h2><ul><li>Tiền khách hàng có được tách biệt với tiền hoạt động của công ty không?</li><li>Sàn sử dụng ngân hàng đối tác nào để lưu giữ hoặc xử lý tiền?</li><li>Có cơ chế bồi thường hoặc bảo vệ khách hàng khi sàn mất khả năng thanh toán không?</li><li>Quy trình nạp, rút tiền, phí và thời gian xử lý có rõ ràng không?</li></ul>' +
      warn('Lưu ý', 'Ngân hàng đối tác không đồng nghĩa với việc ngân hàng bảo lãnh tiền giao dịch của bạn.') +
      '<h2>3. Đánh giá tính minh bạch</h2><ul><li><strong>Chi phí</strong>: spread, commission, swap và các khoản phí phát sinh.</li><li><strong>Khớp lệnh</strong>: slippage, requote và cách xử lý khi thị trường biến động.</li><li><strong>Điều kiện giao dịch</strong>: đòn bẩy, margin, stop-out và các điều khoản liên quan.</li><li><strong>Thông tin pháp lý</strong>: thỏa thuận khách hàng, công bố rủi ro và quy trình khiếu nại.</li></ul><p>Hãy so sánh tổng chi phí thực tế, không chỉ dựa vào mức spread quảng cáo.</p>' +
      '<h2>4. Kiểm tra dịch vụ và rút tiền</h2><p>Ưu tiên sàn có đội ngũ hỗ trợ rõ ràng, quy trình KYC minh bạch, chính sách rút tiền cụ thể và lịch sử hoạt động có thể kiểm chứng.</p>' +
      '<h2>Checklist trước khi mở tài khoản</h2><ul><li>Đã xác minh giấy phép và đúng pháp nhân.</li><li>Đã hiểu cơ chế bảo vệ tiền khách hàng.</li><li>Đã kiểm tra ngân hàng đối tác.</li><li>Đã nắm rõ chi phí và điều kiện giao dịch.</li><li>Đã hiểu quy trình nạp, rút tiền và khiếu nại.</li></ul>' +
      tip('Nguyên tắc', 'Đừng chọn sàn chỉ vì bonus hoặc đòn bẩy cao. Hãy ưu tiên tính pháp lý, sự minh bạch và khả năng bảo vệ quyền lợi của chính bạn.') +
      '<h2>Các loại lệnh cơ bản</h2><table><thead><tr><th>Lệnh</th><th>Ý nghĩa</th></tr></thead><tbody><tr><td>Market</td><td>Khớp ngay theo giá thị trường</td></tr><tr><td>Buy/Sell Limit</td><td>Chờ giá hồi về mức tốt hơn rồi mới vào</td></tr><tr><td>Buy/Sell Stop</td><td>Chờ giá vượt một mức rồi mới vào (đuổi theo đà)</td></tr><tr><td>Stop Loss (SL)</td><td>Tự đóng lệnh khi lỗ đến mức đã định</td></tr><tr><td>Take Profit (TP)</td><td>Tự đóng lệnh khi đạt mục tiêu lời</td></tr></tbody></table>' +
      '[[mt5:order]]' +
      bad('Không đặt dừng lỗ = đánh bạc', 'Mọi lệnh nên có mức dừng lỗ đặt ngay từ đầu, dựa trên phân tích kỹ thuật chứ không phải theo cảm xúc.') +
      tip('Luôn bắt đầu bằng tài khoản demo', 'Dùng demo ít nhất 1–3 tháng để làm quen nền tảng, đặt lệnh và thử chiến thuật trước khi dùng tiền thật.'),
      key: ['Xác minh giấy phép trực tiếp trên website cơ quan quản lý, đúng pháp nhân.', 'Kiểm tra cơ chế bảo vệ tiền, ngân hàng đối tác và quy trình nạp/rút.', 'So sánh tổng chi phí thực tế, không chỉ spread quảng cáo.', 'Hiểu lệnh Market, Limit, Stop, SL, TP và luôn đặt dừng lỗ.'],
      quiz: [{ q: 'Lệnh Buy Limit dùng khi nào?', o: ['Muốn mua ngay lập tức', 'Muốn mua khi giá hồi về mức thấp hơn giá hiện tại', 'Muốn mua khi giá vượt đỉnh'], a: 1, w: 'Buy Limit đặt dưới giá hiện tại; Buy Stop đặt trên giá hiện tại.' },
             { q: 'Điều quan trọng nhất khi chọn sàn là gì?', o: ['Quảng cáo nhiều và bonus lớn', 'Giấy phép, bảo vệ tiền và tính minh bạch', 'Đòn bẩy càng cao càng tốt'], a: 1, w: 'Đừng chọn sàn chỉ vì bonus hoặc đòn bẩy cao; hãy ưu tiên tính pháp lý, sự minh bạch và khả năng bảo vệ quyền lợi của chính bạn.' }] }
  ]},

  /* ===================== CẤP 2 ===================== */
  { id: 2, title: 'Phân tích kỹ thuật căn bản', icon: 'candle', desc: 'Đọc biểu đồ nến, hỗ trợ – kháng cự, xu hướng, khung thời gian và nền tảng của phân tích cơ bản.', lessons: [
    { id: '2-1', title: 'Biểu đồ nến Nhật', min: 8, body:
      '<p>Nến Nhật là cách trực quan nhất để xem 4 mức giá của một khoảng thời gian: mở cửa, cao nhất, thấp nhất, đóng cửa.</p>' + candleSvg +
      '<h2>Đọc nến nhanh</h2><ul><li><strong>Thân dài</strong>: phe mua hoặc bán áp đảo.</li><li><strong>Thân ngắn, bóng dài</strong>: giá bị đẩy đi nhưng bị từ chối quay lại – dấu hiệu do dự.</li><li><strong>Doji</strong> (mở ≈ đóng): thị trường lưỡng lự.</li></ul>[[mt5:candleRead]]' +
      note('Màu nến', 'Nhiều nền tảng mặc định xanh = tăng, đỏ = giảm; một số nơi (như châu Á) dùng ngược lại. Hãy kiểm tra cài đặt màu của bạn.') +
      tip('Nến chỉ có ý nghĩa khi đặt trong bối cảnh', 'Một cây nến đảo chiều tại vùng kháng cự mạnh có ý nghĩa hơn nhiều so với cùng cây nến đó giữa vùng không có gì.'),
      key: ['Mỗi cây nến thể hiện Open, High, Low, Close.', 'Thân nến cho thấy sức mạnh, bóng nến cho thấy sự từ chối.', 'Luôn đọc nến trong bối cảnh xu hướng và vùng giá quan trọng.'],
      quiz: [{ q: 'Nến có thân rất nhỏ và hai bóng dài thường cho thấy điều gì?', o: ['Phe mua áp đảo', 'Thị trường do dự', 'Giá sắp tăng chắc chắn'], a: 1, w: 'Đó là nến lưỡng lự (dạng Doji/spinning top), chưa nói lên hướng đi.' },
             { q: 'Bóng nến dài phía trên thân thường nghĩa là gì?', o: ['Giá bị đẩy lên rồi bị từ chối', 'Giá đóng cửa ở mức cao nhất', 'Không có ý nghĩa'], a: 0, w: 'Phe mua đẩy giá lên nhưng phe bán đã kéo ngược xuống.' }] },

    { id: '2-2', title: 'Khung thời gian (Timeframe)', min: 6, body:
      '<p>Mỗi cây nến đại diện một khoảng thời gian: M5 (5 phút), M15, H1 (1 giờ), H4, D1 (ngày), W1 (tuần). Cùng một thị trường nhưng ở mỗi khung thời gian có thể cho “bức tranh” khác nhau.</p>' +
      '<table><thead><tr><th>Phong cách</th><th>Khung thường dùng</th><th>Thời gian giữ lệnh</th></tr></thead><tbody><tr><td>Scalping</td><td>M1 – M5</td><td>Vài phút</td></tr><tr><td>Day trading</td><td>M15 – H1</td><td>Trong ngày</td></tr><tr><td>Swing trading</td><td>H4 – D1</td><td>Vài ngày – vài tuần</td></tr><tr><td>Position</td><td>D1 – W1</td><td>Vài tuần – tháng</td></tr></tbody></table>' +
      '[[mt5:tfmenu]]<h2>Phân tích đa khung thời gian</h2><p>Quy tắc “ba màn hình”: dùng khung lớn để xác định <strong>xu hướng chính</strong>, khung trung để tìm <strong>vùng giá quan trọng</strong>, khung nhỏ để chọn <strong>điểm vào lệnh</strong>. Ví dụ: D1 → H4 → H1.</p>' +
      tip('Khung nhỏ nhiều nhiễu', 'Khung càng nhỏ thì tín hiệu giả càng nhiều và chi phí spread càng ăn nhiều vào lợi nhuận. Người mới thường hợp với H1–H4.'),
      key: ['Khung lớn xác định xu hướng, khung nhỏ chọn điểm vào.', 'Khung nhỏ nhiều nhiễu và chịu chi phí spread lớn hơn.', 'Chọn khung thời gian phù hợp lịch sinh hoạt của bạn.'],
      quiz: [{ q: 'Khung thời gian nào thường dùng để xác định xu hướng chính?', o: ['M1', 'M5', 'D1'], a: 2, w: 'Khung lớn lọc nhiễu tốt hơn.' },
             { q: 'Vì sao scalping khó với người mới?', o: ['Nhiều nhiễu, spread ăn nhiều lợi nhuận và cần phản xạ nhanh', 'Vì sàn cấm', 'Vì không có biểu đồ'], a: 0, w: 'Khung nhỏ đòi hỏi kỷ luật và tốc độ cao.' }] },

    { id: '2-3', title: 'Xu hướng: tăng, giảm, đi ngang', min: 7, body:
      '<p>Câu ngạn ngữ giao dịch kinh điển: <em>“Xu hướng là bạn của bạn”</em>. Trước khi vào lệnh, hãy xác định thị trường đang ở trạng thái nào.</p>' +
      '<ul><li><strong>Xu hướng tăng</strong>: chuỗi đỉnh cao hơn – đáy cao hơn (HH – HL).</li><li><strong>Xu hướng giảm</strong>: chuỗi đỉnh thấp hơn – đáy thấp hơn (LH – LL).</li><li><strong>Đi ngang (sideway)</strong>: giá dao động trong biên độ, không tạo đỉnh/đáy mới rõ ràng.</li></ul>' +
      '[[mt5:trendUp]]<h2>Đường xu hướng và kênh giá</h2><p>Nối các đáy trong xu hướng tăng (hoặc các đỉnh trong xu hướng giảm) để tạo <strong>đường xu hướng</strong>. Cần tối thiểu 2 điểm chạm để vẽ, 3 điểm chạm để xác nhận. Đường song song với nó tạo thành <strong>kênh giá</strong>.</p>' +
      '<h2>Khi nào xu hướng kết thúc?</h2><p>Dấu hiệu sớm: giá phá vỡ đường xu hướng, tạo đáy thấp hơn trong xu hướng tăng (hoặc đỉnh cao hơn trong xu hướng giảm), động lượng suy yếu.</p>' +
      warn('Đừng đoán đỉnh đáy', 'Rất nhiều người thua lỗ vì liên tục “bắt đáy/bắt đỉnh” ngược xu hướng. Giá có thể “rẻ” và còn rẻ hơn nữa.'),
      key: ['Tăng: đỉnh và đáy cùng cao dần; giảm: cùng thấp dần.', 'Đường xu hướng cần ít nhất 2–3 điểm chạm.', 'Ưu tiên giao dịch thuận xu hướng chính.'],
      quiz: [{ q: 'Cấu trúc nào biểu thị xu hướng tăng?', o: ['Đỉnh thấp dần, đáy thấp dần', 'Đỉnh cao dần, đáy cao dần', 'Giá dao động trong biên độ hẹp'], a: 1, w: 'Higher High – Higher Low là đặc trưng xu hướng tăng.' },
             { q: 'Sai lầm phổ biến nào được nhắc tới?', o: ['Giao dịch thuận xu hướng', 'Liên tục bắt đáy/đỉnh ngược xu hướng', 'Đặt dừng lỗ'], a: 1, w: 'Giao dịch ngược xu hướng có tỷ lệ thành công thấp hơn với đa số người mới.' }] },

    { id: '2-4', title: 'Hỗ trợ và kháng cự', min: 8, body:
      '<p><strong>Hỗ trợ</strong> là vùng giá mà lực mua thường đủ mạnh để chặn đà giảm. <strong>Kháng cự</strong> là vùng giá lực bán chặn đà tăng. Chúng hình thành vì ký ức của thị trường: nơi giá từng đảo chiều sẽ được nhiều người chú ý.</p>' +
      '<h2>Cách xác định</h2><ul><li>Các đỉnh/đáy cũ rõ ràng trên khung lớn.</li><li>Các mức tròn (1,0800; 150,00).</li><li>Vùng giá được chạm nhiều lần.</li></ul>' +
      '<p>Hãy vẽ <strong>vùng</strong> (zone) thay vì một đường duy nhất – thị trường hiếm khi đảo chiều chính xác đến từng pip.</p>' +
      '[[mt5:sr]]<h2>Đổi vai trò</h2><p>Khi kháng cự bị phá vỡ thực sự, nó thường trở thành hỗ trợ và ngược lại. Giá hồi về vùng cũ rồi bật lại gọi là <strong>retest</strong> – điểm vào lệnh phổ biến.</p>' +
      '<h2>Phá vỡ giả (False breakout)</h2><p>Giá chọc qua vùng rồi đóng cửa quay lại trong vùng – bẫy các lệnh vào theo phá vỡ. Chờ nến <strong>đóng cửa</strong> xác nhận thay vì vào ngay khi vừa chọc qua.</p>' +
      tip('Càng nhiều lần chạm, càng yếu?', 'Mỗi lần giá chạm vùng, một phần lệnh chờ bị tiêu hao. Vùng bị kiểm tra liên tục có khả năng bị phá vỡ cao hơn.'),
      key: ['Vùng hỗ trợ/kháng cự là vùng giá, không phải một đường cứng.', 'Kháng cự bị phá thường biến thành hỗ trợ (và ngược lại).', 'Chờ nến đóng cửa xác nhận để tránh phá vỡ giả.'],
      quiz: [{ q: 'Khi kháng cự bị phá vỡ thật sự, điều gì thường xảy ra?', o: ['Nó biến mất', 'Nó thường trở thành hỗ trợ', 'Giá luôn đảo chiều'], a: 1, w: 'Đây là hiện tượng đổi vai trò (role reversal).' },
             { q: 'Cách tốt để tránh phá vỡ giả là gì?', o: ['Vào lệnh ngay khi giá vừa chọc qua', 'Chờ nến đóng cửa xác nhận', 'Tăng khối lượng lệnh'], a: 1, w: 'Nến đóng cửa vượt vùng cho thấy cam kết thật sự.' }] },

    { id: '2-5', title: 'Phân tích cơ bản và tin tức kinh tế', min: 9, body:
      '<p>Phân tích cơ bản xem xét các yếu tố kinh tế vĩ mô khiến sức mạnh của một đồng tiền thay đổi. Dù bạn giao dịch kỹ thuật, bạn vẫn phải biết khi nào có tin lớn.</p>' +
      '<h2>Những yếu tố chính</h2><ul><li><strong>Lãi suất</strong> và quyết định của ngân hàng trung ương (Fed, ECB, BOE, BOJ): lãi suất cao thường hỗ trợ đồng tiền.</li><li><strong>Lạm phát (CPI)</strong>: lạm phát cao thường khiến ngân hàng trung ương muốn tăng lãi suất.</li><li><strong>Việc làm</strong> (NFP của Mỹ công bố thứ Sáu đầu tháng).</li><li><strong>GDP, PMI, bán lẻ</strong>: sức khoẻ nền kinh tế.</li><li><strong>Địa chính trị</strong> và tâm lý “trú ẩn an toàn” (USD, JPY, CHF).</li></ul>' +
      '<h2>Lịch kinh tế</h2><p>Các trang lịch kinh tế phân loại tin theo mức tác động (thấp – trung bình – cao). Tin <strong>cao</strong> như quyết định lãi suất, CPI, NFP thường gây biến động mạnh và spread giãn rộng.</p><p><a href="#/lich-kinh-te">Xem lịch kinh tế thời gian thực</a> để biết tin nào sắp ra.</p><h3>Lịch kinh tế ngay trong bài</h3><p>Bảng dưới đây là lịch kinh tế thời gian thực theo giờ Việt Nam. Hãy thử lọc “Chỉ tin quan trọng cao” để xem những tin có thể làm thị trường biến động mạnh nhất trong ngày hoặc trong tuần.</p>[[calendar]]' +
      I18N.fig.compare({"aria":"So sánh số liệu thực tế với dự báo và phản ứng của giá","a":"Dự báo","b":"Thực tế","ta":"3,0%","tb":"3,4%","va":60,"vb":80,"diff":"+0,4","react":["Thực tế khác dự báo","→ thị trường bị bất ngờ","→ giá thường biến động mạnh"],"cap":"Ví dụ số liệu lạm phát: giá phản ứng với chênh lệch giữa thực tế và dự báo, không chỉ với con số tốt hay xấu."}) + '<h2>Giao dịch quanh tin tức</h2><ul><li>Biết trước lịch tin mỗi ngày.</li><li>Giảm khối lượng hoặc đứng ngoài vài phút trước và sau tin lớn.</li><li>Không đặt lệnh chờ sát giá ngay trước tin (dễ trượt giá).</li></ul>' +
      warn('Giá phản ứng với kỳ vọng', 'Thị trường phản ứng với sự <em>chênh lệch giữa số liệu thực tế và dự báo</em>, không chỉ với bản thân con số tốt hay xấu.'),
      key: ['Lãi suất, lạm phát, việc làm là nhóm tin tác động mạnh nhất.', 'Luôn xem lịch kinh tế trước khi giao dịch.', 'Thị trường phản ứng với chênh lệch giữa thực tế và dự báo.'],
      quiz: [{ q: 'Điều gì quyết định phản ứng giá khi có số liệu kinh tế?', o: ['Chỉ con số tuyệt đối', 'Chênh lệch giữa thực tế và dự báo', 'Giờ công bố'], a: 1, w: 'Giá đã phản ánh kỳ vọng; bất ngờ mới tạo biến động.' },
             { q: 'Khi tin có tác động cao sắp ra, bạn nên?', o: ['Đặt lệnh khối lượng lớn sát giá', 'Giảm rủi ro hoặc đứng ngoài', 'Tắt dừng lỗ'], a: 1, w: 'Biến động mạnh và trượt giá làm rủi ro tăng cao.' }] }
  ]},

  /* ===================== CẤP 3 ===================== */
  { id: 3, title: 'Chỉ báo kỹ thuật', icon: 'indicator', desc: 'MA, EMA, RSI, MACD, Bollinger Bands, Stochastic, ATR, Fibonacci: cách đọc, cách dùng và cạm bẫy.', lessons: [
    { id: '3-1', title: 'Chỉ báo là gì? Dùng sao cho đúng', min: 6, body:
      '<p>Chỉ báo kỹ thuật là các công thức toán học áp dụng trên giá (và đôi khi khối lượng) để làm nổi bật xu hướng, động lượng, biến động. Chúng <strong>không dự đoán tương lai</strong>; chúng chỉ tóm tắt quá khứ theo một cách nhất định.</p>' +
      '<h2>Hai nhóm chính</h2><ul><li><strong>Chỉ báo bám theo (lagging)</strong> như MA, MACD: xác nhận xu hướng nhưng trễ.</li><li><strong>Chỉ báo dẫn dắt (leading)</strong> như RSI, Stochastic: đo động lượng, cố gắng cảnh báo sớm nhưng nhiều tín hiệu giả.</li></ul>' +
      '[[mt5:addInd]]<h2>Nguyên tắc sử dụng</h2><ol><li>Chọn <strong>2–3 chỉ báo</strong> thuộc các nhóm khác nhau (xu hướng + động lượng + biến động).</li><li>Tránh dùng nhiều chỉ báo cùng loại – chúng cho cùng một tín hiệu.</li><li>Giá và cấu trúc thị trường luôn là ưu tiên số một.</li><li>Kiểm tra lại (backtest) trước khi dùng thật.</li></ol>' +
      bad('Hội chứng “chén thánh”', 'Gắn 10 chỉ báo lên biểu đồ không làm bạn chính xác hơn, chỉ làm bạn rối hơn và chậm hơn. Không tồn tại chỉ báo luôn đúng.'),
      key: ['Chỉ báo mô tả quá khứ, không đoán tương lai.', 'Chọn 2–3 chỉ báo khác nhóm, không chồng chéo.', 'Giá và cấu trúc là quan trọng hơn chỉ báo.'],
      quiz: [{ q: 'Cách dùng chỉ báo nào hợp lý hơn?', o: ['Dùng 10 chỉ báo cùng lúc', 'Dùng 2–3 chỉ báo khác loại', 'Chỉ nhìn chỉ báo, bỏ qua giá'], a: 1, w: 'Các chỉ báo cùng loại cho tín hiệu trùng lặp.' },
             { q: 'MA thuộc nhóm nào?', o: ['Bám theo (lagging)', 'Dẫn dắt (leading)', 'Chỉ báo khối lượng'], a: 0, w: 'MA là trung bình của quá khứ nên luôn trễ.' }] },

    { id: '3-2', title: 'Đường trung bình động: SMA và EMA', min: 8, body:
      '<p><strong>SMA</strong> (Simple Moving Average) là trung bình giá đóng cửa của N phiên gần nhất. <strong>EMA</strong> (Exponential MA) cũng tương tự nhưng cho trọng số cao hơn vào giá gần đây nên nhạy hơn.</p>' +
      '<h2>Các chu kỳ phổ biến</h2><ul><li><strong>EMA 20/21</strong>: xu hướng ngắn hạn, thường là “động” của xu hướng.</li><li><strong>EMA/SMA 50</strong>: xu hướng trung hạn.</li><li><strong>SMA 200</strong>: ranh giới xu hướng dài hạn mà rất nhiều người quan sát.</li></ul>' +
      '[[mt5:ma]]<h2>Cách dùng</h2><ul><li><strong>Lọc xu hướng</strong>: giá trên MA200 → ưu tiên mua; dưới MA200 → ưu tiên bán.</li><li><strong>Vùng động hỗ trợ/kháng cự</strong>: trong xu hướng mạnh, giá thường hồi về EMA20/50 rồi tiếp tục.</li><li><strong>Giao cắt (cross)</strong>: EMA nhanh cắt lên EMA chậm = tín hiệu tăng (Golden Cross với 50/200); cắt xuống = tín hiệu giảm (Death Cross).</li></ul>' +
      warn('MA tệ trong thị trường đi ngang', 'Khi giá đi ngang, các đường MA bị cắt qua lại liên tục tạo nhiều tín hiệu giả. Hãy xác định bối cảnh xu hướng trước.') +
      tip('Độ dốc cũng là thông tin', 'MA dốc mạnh = xu hướng mạnh; MA phẳng và giá cắt qua lại = thị trường không xu hướng.'),
      key: ['EMA nhạy hơn SMA vì ưu tiên giá gần đây.', 'MA200 là bộ lọc xu hướng dài hạn phổ biến.', 'MA hoạt động kém khi thị trường đi ngang.'],
      quiz: [{ q: 'Khác biệt chính giữa EMA và SMA?', o: ['EMA cho trọng số lớn hơn giá gần đây', 'EMA luôn chính xác hơn', 'SMA chỉ dùng cho vàng'], a: 0, w: 'Vì vậy EMA phản ứng nhanh hơn SMA.' },
             { q: 'MA thường gây nhiều tín hiệu giả khi nào?', o: ['Xu hướng mạnh', 'Thị trường đi ngang', 'Có tin tức'], a: 1, w: 'Giá cắt qua lại MA liên tục khi không có xu hướng.' }] },

    { id: '3-3', title: 'RSI – Chỉ số sức mạnh tương đối', min: 8, body:
      '<p><strong>RSI</strong> (Relative Strength Index, chu kỳ chuẩn 14) dao động từ 0 đến 100, đo tốc độ và mức độ thay đổi của giá gần đây.</p>' +
      '<h2>Cách đọc cơ bản</h2><ul><li><strong>RSI &gt; 70</strong>: vùng “quá mua”, đà tăng có thể mệt mỏi.</li><li><strong>RSI &lt; 30</strong>: vùng “quá bán”, đà giảm có thể mệt mỏi.</li><li><strong>Đường 50</strong>: phân tách phe mua và phe bán.</li></ul>' +
      warn('Quá mua ≠ phải bán', 'Trong xu hướng mạnh RSI có thể ở trên 70 rất lâu. Bán chỉ vì RSI &gt; 70 là sai lầm kinh điển. Hãy dùng RSI kết hợp với bối cảnh xu hướng.') +
      '[[mt5:rsi]]<h2>Phân kỳ (Divergence)</h2><p>Khi giá tạo đỉnh mới cao hơn nhưng RSI tạo đỉnh thấp hơn là <strong>phân kỳ giảm</strong> – động lượng đang yếu dần, cảnh báo khả năng đảo chiều hoặc điều chỉnh. Ngược lại là phân kỳ tăng. Phân kỳ là tín hiệu cảnh báo, không phải lệnh vào.</p>' +
      '<h2>Cách dùng thực tế</h2><ul><li>Trong xu hướng tăng, RSI thường dao động 40–80; vùng 40–50 là nơi hồi về để mua.</li><li>Trong xu hướng giảm, RSI thường dao động 20–60.</li><li>Trong thị trường đi ngang, 30/70 hoạt động tốt hơn.</li></ul>',
      key: ['RSI dao động 0–100, chu kỳ chuẩn 14.', 'Quá mua/quá bán không đồng nghĩa với đảo chiều.', 'Phân kỳ là cảnh báo suy yếu động lượng, cần thêm xác nhận.'],
      quiz: [{ q: 'RSI trên 70 trong xu hướng tăng mạnh nghĩa là gì?', o: ['Phải bán ngay', 'Có thể tiếp tục ở vùng cao một thời gian', 'Giá chắc chắn giảm'], a: 1, w: 'RSI có thể “dính” vùng quá mua rất lâu khi xu hướng mạnh.' },
             { q: 'Phân kỳ giảm xảy ra khi?', o: ['Giá tạo đỉnh cao hơn, RSI tạo đỉnh thấp hơn', 'Giá và RSI cùng tăng', 'RSI = 50'], a: 0, w: 'Động lượng yếu đi dù giá còn lên.' }] },

    { id: '3-4', title: 'MACD', min: 8, body:
      '<p><strong>MACD</strong> (Moving Average Convergence Divergence) gồm 3 phần với thiết lập chuẩn (12, 26, 9):</p>' +
      '<ul><li><strong>Đường MACD</strong> = EMA12 – EMA26.</li><li><strong>Đường Signal</strong> = EMA9 của đường MACD.</li><li><strong>Histogram</strong> = MACD – Signal, thể hiện động lượng.</li></ul>' +
      '<h2>Cách đọc</h2><ul><li><strong>MACD cắt lên Signal</strong>: động lượng tăng; <strong>cắt xuống</strong>: động lượng giảm.</li><li><strong>Cắt đường 0</strong>: xác nhận xu hướng (trên 0 thiên tăng, dưới 0 thiên giảm).</li><li><strong>Histogram thu hẹp</strong>: đà đang yếu dần, dù giá chưa đổi chiều.</li><li><strong>Phân kỳ</strong> giữa MACD và giá tương tự RSI.</li></ul>[[mt5:macd]]' +
      warn('MACD trễ', 'MACD dựa trên đường trung bình nên tín hiệu cắt thường đến muộn và nhiễu trong thị trường đi ngang. Dùng nó để xác nhận xu hướng, không dùng để đoán đỉnh đáy.') +
      tip('Kết hợp hợp lý', 'EMA 200 lọc xu hướng + MACD tìm thời điểm vào theo hướng đó là cách kết hợp đơn giản, ít chồng chéo.'),
      key: ['MACD = EMA12 – EMA26, Signal = EMA9 của MACD.', 'Cắt Signal và đường 0 là hai tín hiệu quan trọng.', 'Chỉ báo trễ, hợp để xác nhận xu hướng.'],
      quiz: [{ q: 'Histogram MACD thu hẹp dần cho thấy gì?', o: ['Động lượng đang yếu đi', 'Xu hướng đang mạnh lên', 'Sàn lỗi'], a: 0, w: 'Khoảng cách giữa MACD và Signal đang nhỏ lại.' },
             { q: 'MACD hoạt động kém nhất khi nào?', o: ['Xu hướng rõ ràng', 'Thị trường đi ngang', 'Khung D1'], a: 1, w: 'Các đường cắt nhau liên tục tạo tín hiệu giả.' }] },

    { id: '3-5', title: 'Bollinger Bands', min: 7, body:
      '<p><strong>Bollinger Bands</strong> gồm 3 đường: đường giữa là SMA 20, hai dải trên/dưới cách đường giữa 2 độ lệch chuẩn. Dải mở rộng khi biến động tăng và thu hẹp khi biến động giảm.</p>' +
      '<h2>Các cách dùng</h2><ul><li><strong>Squeeze (thắt chặt)</strong>: dải co hẹp báo hiệu thị trường tích luỹ, thường đi trước một nhịp bùng nổ (chưa biết hướng).</li><li><strong>Quay về trung bình</strong>: trong thị trường đi ngang, giá chạm dải ngoài thường quay về đường giữa.</li><li><strong>Đi dọc dải (band walk)</strong>: trong xu hướng mạnh giá bám dải trên/dưới – đây không phải tín hiệu đảo chiều.</li></ul>[[mt5:bb]]' +
      bad('Sai lầm phổ biến', 'Bán chỉ vì giá chạm dải trên. Trong xu hướng mạnh giá có thể bám dải trên nhiều nến liền và gây thua lỗ cho người bán ngược xu hướng.') +
      tip('Kết hợp', 'Squeeze + phá vỡ có khối lượng/nến mạnh theo hướng của xu hướng khung lớn là một thiết lập được nhiều người sử dụng.'),
      key: ['Dải = SMA 20 ± 2 độ lệch chuẩn.', 'Squeeze báo hiệu biến động thấp trước biến động mạnh.', 'Chạm dải không phải tín hiệu đảo chiều khi xu hướng mạnh.'],
      quiz: [{ q: 'Dải Bollinger thu hẹp (squeeze) thường báo hiệu điều gì?', o: ['Biến động thấp, có thể sắp có biến động mạnh', 'Giá chắc chắn tăng', 'Thị trường đóng cửa'], a: 0, w: 'Squeeze cho biết biến động thấp, nhưng chưa cho biết hướng.' },
             { q: 'Giá bám dải trên nhiều nến liền cho thấy gì?', o: ['Xu hướng tăng mạnh', 'Chắc chắn sắp đảo chiều', 'Chỉ báo hỏng'], a: 0, w: 'Đó là hiện tượng band walk trong xu hướng mạnh.' }] },

    { id: '3-6', title: 'Stochastic và ATR', min: 8, body:
      '<h2>Stochastic Oscillator</h2><p>Stochastic so sánh giá đóng cửa với vùng giá cao – thấp trong N phiên (thường 14). Gồm đường %K (nhanh) và %D (chậm), dao động 0–100 với vùng 80 (quá mua) và 20 (quá bán).</p>' +
      '<ul><li>Hiệu quả hơn trong thị trường đi ngang.</li><li>Giao cắt %K/%D trong vùng quá mua/quá bán là tín hiệu đảo chiều ngắn hạn.</li><li>Cũng như RSI, có thể ở vùng cực trị rất lâu khi xu hướng mạnh.</li></ul>' +
      '[[mt5:stoch]]<h2>ATR – Average True Range</h2><p>ATR đo <strong>mức biến động trung bình</strong> của giá (không cho biết hướng). ATR(14) trên H1 EUR/USD bằng 12 pip nghĩa là trung bình mỗi nến H1 dao động khoảng 12 pip.</p>' +
      '[[mt5:atr]]<h3>ATR dùng để làm gì?</h3><ul><li><strong>Đặt dừng lỗ theo biến động</strong>: ví dụ SL = 1,5 × ATR dưới điểm vào, thay vì số pip cố định.</li><li><strong>Tính khối lượng lệnh</strong>: SL rộng hơn thì khối lượng nhỏ lại để giữ rủi ro không đổi.</li><li>Nhận biết thị trường đang “nóng” hay “nguội”.</li></ul>' +
      tip('Công thức quen thuộc', 'Khối lượng = Số tiền chấp nhận rủi ro ÷ (SL tính theo pip × giá trị pip). Dùng <a href="#/cong-cu">công cụ tính lot</a> để thao tác nhanh.'),
      key: ['Stochastic hợp thị trường đi ngang, quá mua/quá bán 80/20.', 'ATR đo biến động, không đo hướng.', 'Dùng ATR để đặt SL và quy đổi khối lượng lệnh hợp lý.'],
      quiz: [{ q: 'ATR cho bạn biết điều gì?', o: ['Hướng đi sắp tới của giá', 'Mức biến động trung bình', 'Khối lượng giao dịch'], a: 1, w: 'ATR chỉ đo độ lớn của biến động.' },
             { q: 'Dùng ATR đặt dừng lỗ có ưu điểm gì?', o: ['SL thích ứng theo biến động thị trường', 'Luôn không bị quét', 'Không cần phân tích'], a: 0, w: 'Thị trường biến động mạnh cần SL rộng hơn, và ngược lại.' }] },

    { id: '3-7', title: 'Fibonacci thoái lui', min: 7, body:
      '<p>Công cụ <strong>Fibonacci retracement</strong> chia một nhịp chạy giá thành các mức tỷ lệ để ước lượng vùng giá hồi về trước khi xu hướng tiếp diễn. Các mức phổ biến: <strong>38,2% – 50% – 61,8%</strong> (cùng 78,6%).</p>' +
      '<h2>Cách vẽ</h2><ul><li>Xu hướng tăng: kéo từ <strong>đáy</strong> của nhịp tăng lên <strong>đỉnh</strong>.</li><li>Xu hướng giảm: kéo từ <strong>đỉnh</strong> xuống <strong>đáy</strong>.</li></ul>' +
      '[[mt5:fib]]<h2>Cách dùng hợp lý</h2><ol><li>Xác định xu hướng chính và nhịp chạy rõ ràng.</li><li>Chờ giá hồi về vùng 38,2–61,8%.</li><li>Tìm sự <strong>hội tụ</strong> (confluence) với hỗ trợ/kháng cự, EMA hoặc đường xu hướng.</li><li>Vào lệnh khi có nến xác nhận; đặt SL bên kia vùng Fibonacci hoặc đỉnh/đáy của nhịp hồi.</li></ol>' +
      warn('Fibonacci không phải phép màu', 'Có rất nhiều mức Fibonacci nên giá luôn “chạm” một mức nào đó. Giá trị thật sự nằm ở sự hội tụ với những yếu tố khác, không phải ở riêng các con số.'),
      key: ['Các mức thoái lui chính: 38,2%, 50%, 61,8%.', 'Vẽ từ đáy lên đỉnh (tăng) hoặc từ đỉnh xuống đáy (giảm).', 'Chỉ có giá trị khi hội tụ với yếu tố kỹ thuật khác.'],
      quiz: [{ q: 'Xu hướng tăng, cách vẽ Fibonacci retracement nào đúng?', o: ['Từ đỉnh xuống đáy', 'Từ đáy lên đỉnh', 'Bất kỳ chiều nào'], a: 1, w: 'Kéo từ đáy nhịp tăng lên đỉnh của nó.' },
             { q: 'Vì sao nên tìm hội tụ (confluence)?', o: ['Tăng độ tin cậy khi nhiều yếu tố cùng chỉ một vùng', 'Giúp giảm spread', 'Không có lý do'], a: 0, w: 'Một mức Fibonacci đơn lẻ không đủ mạnh.' }] }
  ]},

  /* ===================== CẤP 4 ===================== */
  { id: 4, title: 'Mô hình giá & chiến thuật', icon: 'target', desc: 'Mô hình nến, mô hình giá, price action và các chiến thuật theo xu hướng, phá vỡ, đi ngang – kèm quy trình vào lệnh.', lessons: [
    { id: '4-1', title: 'Mô hình nến đảo chiều', min: 8, body:
      '<p>Mô hình nến là tập hợp 1–3 cây nến phản ánh cuộc chiến giữa phe mua và bán. Chúng chỉ đáng tin khi xuất hiện <strong>tại vùng quan trọng</strong> (hỗ trợ/kháng cự, EMA, Fibonacci).</p>' +
      '<h2>Các loại nến cần nhận biết</h2>' + I18N.fig.patterns({"aria":"Các loại nến đơn thường gặp","cols":2,"items":[{"k":"marubozuUp","n":"Marubozu tăng","s":"Phe mua áp đảo"},{"k":"marubozuDown","n":"Marubozu giảm","s":"Phe bán áp đảo"},{"k":"spinning","n":"Spinning top","s":"Thân nhỏ, do dự"},{"k":"doji","n":"Doji","s":"Mở ≈ đóng, lưỡng lự"},{"k":"hammer","n":"Hammer (pin bar tăng)","s":"Từ chối giá thấp"},{"k":"shooting","n":"Shooting star (pin bar giảm)","s":"Từ chối giá cao"}],"cap":"Hình dạng nến cho biết ai đang kiểm soát: thân dài là một phe áp đảo, bóng dài là giá bị từ chối. Nến xanh là nến tăng, nến đỏ là nến giảm."}) +
      '<h2>Các mô hình nến đảo chiều</h2>' + I18N.fig.patterns({"aria":"Các mô hình nến đảo chiều phổ biến","cols":2,"items":[{"k":"bullEng","n":"Bullish Engulfing","s":"Đảo chiều tăng"},{"k":"bearEng","n":"Bearish Engulfing","s":"Đảo chiều giảm"},{"k":"inside","n":"Inside bar","s":"Nén biên độ, chờ phá vỡ"},{"k":"morning","n":"Morning Star","s":"Đảo chiều tăng (3 nến)"},{"k":"evening","n":"Evening Star","s":"Đảo chiều giảm (3 nến)"},{"k":"tweezer","n":"Tweezer Bottom","s":"Hai đáy bằng nhau, đảo chiều tăng"}],"cap":"Nến mờ là xu hướng trước đó; nến rõ nét là các nến tạo nên mô hình. Chỉ có giá trị khi xuất hiện tại vùng hỗ trợ/kháng cự quan trọng."}) +
      '<table><thead><tr><th>Mô hình</th><th>Mô tả</th><th>Ý nghĩa</th></tr></thead><tbody><tr><td>Pin bar / Hammer</td><td>Thân nhỏ, bóng dài một phía (≥ 2 lần thân)</td><td>Giá bị từ chối mạnh tại một vùng</td></tr><tr><td>Bullish/Bearish Engulfing</td><td>Thân nến sau “nuốt” hoàn toàn thân nến trước</td><td>Lực đối lập đảo ngược cục diện</td></tr><tr><td>Doji</td><td>Mở ≈ đóng</td><td>Lưỡng lự, chờ xác nhận</td></tr><tr><td>Morning/Evening Star</td><td>3 nến: giảm – nến nhỏ – tăng (và ngược lại)</td><td>Đảo chiều sau xu hướng</td></tr><tr><td>Inside bar</td><td>Nến nằm trọn trong nến trước</td><td>Nén biên độ, chờ phá vỡ</td></tr></tbody></table>' +
      '[[mt5:pin]]<h2>Quy trình “vào lệnh với mô hình nến”</h2><ol><li>Xác định xu hướng và vùng quan trọng ở khung lớn.</li><li>Chờ mô hình xuất hiện <em>tại vùng đó</em>.</li><li>Vào lệnh sau khi nến mô hình đóng cửa.</li><li>SL ngoài bóng nến; TP tại vùng đối diện hoặc theo R:R ≥ 1:2.</li></ol>' +
      bad('Đừng vào lệnh chỉ vì thấy mô hình', 'Pin bar giữa khoảng trống không có ý nghĩa. Bối cảnh quyết định giá trị của mô hình.'),
      key: ['Mô hình nến chỉ có ý nghĩa tại vùng giá quan trọng.', 'Pin bar và Engulfing là hai mô hình phổ biến nhất.', 'Vào lệnh sau khi nến mô hình đóng cửa.'],
      quiz: [{ q: 'Mô hình nến đáng tin nhất khi nào?', o: ['Xuất hiện bất kỳ đâu', 'Xuất hiện tại vùng hỗ trợ/kháng cự quan trọng', 'Chỉ trên khung M1'], a: 1, w: 'Bối cảnh quyết định ý nghĩa của mô hình.' },
             { q: 'Bullish Engulfing là gì?', o: ['Nến tăng có thân nuốt trọn thân nến giảm trước', 'Nến Doji', 'Hai nến tăng liên tiếp'], a: 0, w: 'Cho thấy phe mua giành lại quyền kiểm soát.' }] },

    { id: '4-2', title: 'Mô hình giá kinh điển', min: 9, body:
      '<p>Mô hình giá hình thành từ nhiều cây nến, phản ánh sự tích luỹ hoặc phân phối trước một nhịp di chuyển. Chúng chia thành hai nhóm:</p>' +
      '<h2>Mô hình đảo chiều</h2><ul><li><strong>Hai đỉnh (Double Top) / Hai đáy (Double Bottom)</strong>: giá hai lần thất bại khi vượt vùng; vào lệnh khi phá vỡ “đường cổ”.</li><li><strong>Vai – Đầu – Vai</strong>: ba đỉnh với đỉnh giữa cao nhất; phá đường cổ xác nhận đảo chiều giảm. Phiên bản lộn ngược (Vai – Đầu – Vai ngược) là mô hình đảo chiều tăng.</li></ul>' +
      '<h2>Mô hình tiếp diễn</h2><ul><li><strong>Cờ (Flag) và cờ đuôi nheo (Pennant)</strong>: nhịp hồi ngắn sau cú chạy mạnh, kỳ vọng tiếp tục xu hướng.</li><li><strong>Tam giác (Triangle)</strong>: biên độ thu hẹp dần, phá vỡ thường theo hướng xu hướng trước đó.</li><li><strong>Hình chữ nhật</strong>: giá đi ngang trong biên rồi tiếp tục.</li></ul>' +
      '[[mt5:doubleTop]]<h2>Mục tiêu giá (đo biên độ)</h2><p>Với phần lớn mô hình, mục tiêu tối thiểu thường đo bằng chiều cao của mô hình và đặt từ điểm phá vỡ. Ví dụ Hai đỉnh cao 100 pip → mục tiêu khoảng 100 pip dưới đường cổ.</p>' +
      warn('Mô hình có thể thất bại', 'Chờ giá <strong>đóng cửa phá vỡ</strong> rồi mới vào, và luôn có SL. Mô hình chưa hoàn thành thì chưa phải mô hình.'),
      key: ['Hai đỉnh/hai đáy và Vai-Đầu-Vai là mô hình đảo chiều.', 'Cờ, tam giác là mô hình tiếp diễn.', 'Chờ nến đóng cửa phá vỡ và đặt SL cho mọi lệnh.'],
      quiz: [{ q: 'Mô hình nào thường là mô hình tiếp diễn xu hướng?', o: ['Hai đỉnh', 'Cờ (Flag)', 'Vai – Đầu – Vai'], a: 1, w: 'Cờ là nhịp nghỉ ngắn trước khi xu hướng tiếp tục.' },
             { q: 'Mục tiêu giá của mô hình thường được đo thế nào?', o: ['Bằng chiều cao mô hình đặt từ điểm phá vỡ', 'Luôn 10 pip', 'Không thể đo'], a: 0, w: 'Đó là phương pháp đo biên độ phổ biến.' }] },

    { id: '4-3', title: 'Price Action thuần', min: 8, body:
      '<p><strong>Price Action</strong> là cách giao dịch dựa chủ yếu vào hành vi giá thô: nến, cấu trúc, hỗ trợ – kháng cự, mà gần như không dùng chỉ báo. Ưu điểm là sạch sẽ và không bị trễ.</p>' +
      '<h2>Các yếu tố cốt lõi</h2><ol><li><strong>Cấu trúc thị trường</strong>: HH–HL hay LH–LL.</li><li><strong>Vùng giá quan trọng</strong> ở khung lớn.</li><li><strong>Tín hiệu nến</strong> tại vùng (pin bar, engulfing, inside bar).</li><li><strong>Quản lý lệnh</strong>: SL, TP, R:R.</li></ol>' +
      I18N.fig.equation({"aria":"Một thiết lập price action tốt gồm xu hướng, vùng giá và tín hiệu nến","items":[["Xu hướng","khung lớn"],["Vùng giá","quan trọng"],["Tín hiệu nến","xác nhận"]],"result":["Thiết lập","chất lượng"],"cap":"Thiếu một trong ba yếu tố thì đừng vội vào lệnh."}) + '<h2>Ví dụ thiết lập thuận xu hướng</h2><ul><li>D1: xu hướng tăng rõ (HH–HL).</li><li>H4: giá hồi về vùng kháng cự cũ đã thành hỗ trợ.</li><li>H1: xuất hiện pin bar tăng tại vùng đó.</li><li>Vào mua sau khi nến đóng cửa, SL dưới bóng nến, TP tại đỉnh gần nhất hoặc R:R ≥ 1:2.</li></ul>' +
      tip('Ít nhưng chất', 'Giao dịch Price Action tốt thường chỉ có 1–3 thiết lập mỗi ngày. Chờ đợi là một phần của kỹ năng.'),
      key: ['Price Action dựa vào nến, cấu trúc và vùng giá.', 'Thiết lập tốt cần xu hướng + vùng + tín hiệu nến.', 'Kiên nhẫn chờ thiết lập chất lượng.'],
      quiz: [{ q: 'Ba yếu tố cốt lõi của một thiết lập Price Action thuận xu hướng là?', o: ['Xu hướng, vùng giá, tín hiệu nến', 'Tin đồn, cảm xúc, khối lượng lớn', 'Chỉ báo 1, 2, 3'], a: 0, w: 'Kết hợp bối cảnh – vùng – kích hoạt.' },
             { q: 'Giao dịch Price Action tốt thường có bao nhiêu thiết lập mỗi ngày?', o: ['Rất nhiều, 20+', 'Ít, chọn lọc', 'Luôn đúng 10'], a: 1, w: 'Chờ thiết lập chất lượng tốt hơn vào lệnh liên tục.' }] },

    { id: '4-4', title: 'Chiến thuật theo xu hướng (Trend Following)', min: 8, body:
      '<p>Chiến thuật quen thuộc nhất: tìm xu hướng và vào lệnh theo hướng đó khi giá hồi về điều chỉnh.</p>' +
      '<h2>Ví dụ: EMA 50 + hồi về</h2><ol><li><strong>Bộ lọc</strong>: giá trên EMA 200 (khung H4) → chỉ tìm lệnh mua.</li><li><strong>Vùng vào</strong>: giá hồi về EMA 50 hoặc vùng hỗ trợ hội tụ.</li><li><strong>Kích hoạt</strong>: nến tăng đảo chiều (pin bar/engulfing) tại vùng đó.</li><li><strong>SL</strong>: dưới đáy nhịp hồi (hoặc 1,5 × ATR).</li><li><strong>TP</strong>: đỉnh gần nhất hoặc bám theo xu hướng bằng EMA.</li></ol>' +
      '[[mt5:tradeSetup]]<h2>Quản lý lệnh trong xu hướng</h2><ul><li>Chốt một phần lợi nhuận tại 1R, dời SL về hoà vốn.</li><li>Dời SL dần theo đáy mới (trailing).</li><li>Chấp nhận nhiều lệnh nhỏ thua để có vài lệnh thắng lớn.</li></ul>' +
      note('Đặc điểm tâm lý', 'Trend following thường có tỷ lệ thắng 35–45% nhưng R:R cao. Bạn cần chịu được chuỗi thua liên tiếp.') + rrSvg,
      key: ['Lọc xu hướng, chờ hồi về, vào theo tín hiệu nến.', 'Tỷ lệ thắng thấp nhưng R:R cao là bình thường.', 'Chốt từng phần và dời SL để bảo vệ lợi nhuận.'],
      quiz: [{ q: 'Chiến thuật theo xu hướng thường có đặc điểm gì?', o: ['Tỷ lệ thắng thấp–vừa nhưng R:R cao', 'Luôn thắng 90%', 'Không cần SL'], a: 0, w: 'Lợi nhuận đến từ vài lệnh thắng lớn.' },
             { q: 'Dời SL về hoà vốn có mục đích gì?', o: ['Loại bỏ rủi ro của lệnh đang có lãi', 'Tăng khối lượng', 'Tránh trả spread'], a: 0, w: 'Bảo vệ lệnh đang lãi khỏi biến thành lỗ.' }] },

    { id: '4-5', title: 'Chiến thuật phá vỡ và giao dịch biên độ', min: 8, body:
      '<h2>Giao dịch phá vỡ (Breakout)</h2><p>Khi giá đi ngang một thời gian rồi vượt khỏi biên, nó thường tạo ra nhịp chạy mạnh. Quy trình:</p><ol><li>Xác định vùng tích luỹ rõ ràng (ít nhất 2 lần chạm mỗi bên).</li><li>Chờ nến <strong>đóng cửa</strong> ngoài vùng, ưu tiên nến thân dài.</li><li>Vào lệnh theo hướng phá vỡ hoặc chờ <strong>retest</strong>.</li><li>SL trong vùng tích luỹ; mục tiêu bằng chiều cao biên độ.</li></ol>' +
      warn('Phá vỡ giả', 'Phần lớn phá vỡ trong thị trường thanh khoản mỏng là giả. Ưu tiên phá vỡ trong phiên London/New York, thuận xu hướng khung lớn.') +
      '[[mt5:breakout]]<h2>Giao dịch biên độ (Range)</h2><p>Khi giá dao động giữa hỗ trợ và kháng cự rõ ràng, mua gần hỗ trợ và bán gần kháng cự.</p><ul><li>Mua tại hỗ trợ khi có tín hiệu nến đảo chiều; SL dưới hỗ trợ.</li><li>Bán tại kháng cự; SL trên kháng cự.</li><li>Mục tiêu: nửa biên hoặc vùng đối diện.</li></ul>' +
      bad('Chiến lược biên độ sẽ thất bại khi biên bị phá', 'Luôn đặt SL ngoài biên, và dừng giao dịch biên độ khi thị trường chuyển sang xu hướng.'),
      key: ['Breakout: chờ nến đóng cửa ngoài vùng, ưu tiên retest.', 'Range: mua hỗ trợ, bán kháng cự và SL ngoài biên.', 'Nhận biết sớm khi thị trường đổi trạng thái.'],
      quiz: [{ q: 'Cách giảm rủi ro phá vỡ giả?', o: ['Vào ngay khi giá vừa chạm', 'Chờ nến đóng cửa xác nhận hoặc retest', 'Bỏ SL'], a: 1, w: 'Xác nhận làm giảm xác suất rơi vào bẫy.' },
             { q: 'Giao dịch biên độ cần dừng khi nào?', o: ['Khi giá phá vỡ biên và thành xu hướng', 'Khi có nến Doji', 'Không bao giờ'], a: 0, w: 'Biên bị phá nghĩa là chiến lược không còn đúng bối cảnh.' }] },

    { id: '4-6', title: 'Xây dựng kế hoạch giao dịch (Trading Plan)', min: 8, body:
      '<p>Kế hoạch giao dịch là bộ quy tắc viết sẵn giúp bạn hành động theo logic thay vì cảm xúc. Nó là sự khác biệt giữa đánh bạc và giao dịch có hệ thống.</p>' +
      I18N.fig.hub({"aria":"Sáu thành phần của một kế hoạch giao dịch","center":["Kế hoạch","giao dịch"],"items":[["Mục tiêu","và thời gian"],["Cặp tiền","và khung giờ"],["Điều kiện","vào lệnh"],["Quy tắc","thoát lệnh"],["Quản lý vốn,","giới hạn lỗ"],["Nhật ký","sau mỗi lệnh"]],"cap":"Viết sáu phần này ra giấy và dùng làm checklist trước mỗi lệnh."}) + '<h2>Một kế hoạch cần có</h2><ul><li><strong>Mục tiêu và thời gian</strong> thực tế (ví dụ: ưu tiên bảo toàn vốn năm đầu).</li><li><strong>Cặp tiền và khung giờ</strong> giao dịch.</li><li><strong>Điều kiện vào lệnh</strong> rõ ràng (xu hướng + vùng + tín hiệu).</li><li><strong>Quy tắc thoát</strong>: SL, TP, trailing.</li><li><strong>Quản lý vốn</strong>: % rủi ro mỗi lệnh, số lệnh tối đa, giới hạn lỗ ngày/tuần.</li><li><strong>Quy trình sau lệnh</strong>: ghi nhật ký.</li></ul>' +
      '<h2>Checklist trước khi vào lệnh</h2><ol><li>Xu hướng khung lớn?</li><li>Có vùng giá quan trọng không?</li><li>Có tín hiệu xác nhận không?</li><li>R:R tối thiểu 1:2?</li><li>Rủi ro ≤ 1% vốn?</li><li>Có tin lớn sắp ra không?</li></ol>' +
      tip('Viết ra giấy', 'Kế hoạch không viết ra thì chỉ là ý định. In checklist và đặt cạnh màn hình.'),
      key: ['Kế hoạch giao dịch giúp loại bỏ quyết định cảm tính.', 'Gồm vào lệnh, thoát lệnh, quản lý vốn và nhật ký.', 'Dùng checklist trước mọi lệnh.'],
      quiz: [{ q: 'Mục đích chính của kế hoạch giao dịch?', o: ['Giúp hành động theo quy tắc thay vì cảm xúc', 'Để quảng cáo', 'Để tăng đòn bẩy'], a: 0, w: 'Kỷ luật đến từ quy tắc được định sẵn.' },
             { q: 'Thành phần nào bắt buộc phải có?', o: ['Quy tắc quản lý vốn', 'Màu biểu đồ', 'Tên sàn'], a: 0, w: 'Quản lý vốn quyết định sự sống còn lâu dài.' }] }
  ]},

  /* ===================== CẤP 5 ===================== */
  { id: 5, title: 'Quản lý vốn & rủi ro', icon: 'shield', desc: 'Yếu tố quyết định bạn tồn tại lâu dài: quy tắc 1–2%, R:R, tính khối lượng lệnh, drawdown.', lessons: [
    { id: '5-1', title: 'Quy tắc 1–2% và tại sao nó cứu bạn', min: 7, body:
      '<p>Đa số nhà giao dịch thất bại không phải vì phân tích sai mà vì <strong>rủi ro quá lớn trên mỗi lệnh</strong>. Quy tắc 1–2%: chỉ chấp nhận mất tối đa 1–2% vốn cho mỗi lệnh.</p>' +
      '<h2>Sức mạnh của quy tắc này</h2><table><thead><tr><th>Rủi ro/lệnh</th><th>Thua 10 lệnh liên tiếp</th><th>Vốn còn lại</th></tr></thead><tbody><tr><td>1%</td><td>-9,6%</td><td>90,4%</td></tr><tr><td>2%</td><td>-18,3%</td><td>81,7%</td></tr><tr><td>5%</td><td>-40,1%</td><td>59,9%</td></tr><tr><td>10%</td><td>-65,1%</td><td>34,9%</td></tr></tbody></table>' +
      I18N.fig.bars({"aria":"Vốn còn lại sau 10 lệnh thua liên tiếp theo mức rủi ro mỗi lệnh","items":[{"label":"Rủi ro 1% mỗi lệnh","value":90.4,"text":"còn 90,4%","c":"ok"},{"label":"Rủi ro 2% mỗi lệnh","value":81.7,"text":"còn 81,7%","c":"ok"},{"label":"Rủi ro 5% mỗi lệnh","value":59.9,"text":"còn 59,9%","c":"warn"},{"label":"Rủi ro 10% mỗi lệnh","value":34.9,"text":"còn 34,9%","c":"bad"}],"cap":"Vốn còn lại sau 10 lệnh thua liên tiếp (vốn ban đầu = 100%). Rủi ro mỗi lệnh càng lớn thì càng khó hồi phục."}) + '<h2>Toán học của việc hồi phục</h2><p>Lỗ 50% cần lãi 100% mới hoà vốn; lỗ 80% cần lãi 400%. Mất vốn càng nhiều thì quay lại càng khó.</p>' +
      '<h2>Giới hạn thêm</h2><ul><li><strong>Giới hạn lỗ trong ngày</strong> (ví dụ 3%): chạm là dừng.</li><li><strong>Giới hạn lỗ trong tuần</strong> (ví dụ 6%).</li><li><strong>Tổng rủi ro các lệnh đang mở</strong> không quá 3–5%.</li></ul>' +
      bad('Cháy tài khoản đến từ đâu?', 'Hầu hết từ: đòn bẩy cao, không có SL, gấp thếp (martingale), và “gỡ gạc” sau chuỗi thua.'),
      key: ['Rủi ro mỗi lệnh tối đa 1–2% vốn.', 'Lỗ càng sâu thì càng khó hồi phục.', 'Đặt giới hạn lỗ theo ngày và theo tuần.'],
      quiz: [{ q: 'Mất 50% vốn cần lãi bao nhiêu để hoà vốn?', o: ['50%', '100%', '25%'], a: 1, w: '50 → 100 là tăng 100%.' },
             { q: 'Vì sao nên có giới hạn lỗ trong ngày?', o: ['Ngăn chuỗi quyết định cảm tính khi đang thua', 'Để tăng khối lượng', 'Để sàn hài lòng'], a: 0, w: 'Giúp dừng trước khi “tilt”.' }] },

    { id: '5-2', title: 'Tính khối lượng lệnh (Position Sizing)', min: 8, body:
      '<p>Khối lượng lệnh phải được tính từ <strong>mức rủi ro</strong> chứ không phải cảm tính. Công thức:</p>' +
      '<p><code>Lot = (Vốn × % rủi ro) ÷ (SL pip × giá trị 1 pip/lot)</code></p>' +
      '<h2>Ví dụ</h2><p>Vốn 2.000 USD, rủi ro 1% = 20 USD. Giao dịch EUR/USD, SL 25 pip, 1 pip/lot = 10 USD:</p><p><code>Lot = 20 ÷ (25 × 10) = 0,08 lot</code></p>' +
      '[[mt5:order2]]<h2>Điều gì xảy ra khi SL thay đổi?</h2><p>SL rộng gấp đôi (50 pip) thì khối lượng giảm còn một nửa (0,04 lot) để rủi ro vẫn là 20 USD. Đây là lý do SL phải được đặt theo cấu trúc thị trường, rồi mới tính khối lượng – không phải ngược lại.</p>' +
      tip('Dùng công cụ trên website', 'Mở <a href="#/cong-cu">Công cụ</a> để tính tự động. Với cặp có JPY, giá trị pip khác – công cụ đã xử lý giúp bạn.') +
      warn('Không “tăng lot để gỡ”', 'Sau chuỗi thua, tăng khối lượng gấp đôi để gỡ lại là con đường dẫn đến cháy tài khoản.'),
      key: ['Lot = rủi ro tiền ÷ (SL pip × giá trị pip).', 'SL đặt theo thị trường, khối lượng tính theo SL.', 'Không tăng lot để gỡ lỗ.'],
      quiz: [{ q: 'Vốn 1.000 USD, rủi ro 1%, SL 20 pip, 10 USD/pip/lot. Khối lượng là?', o: ['0,05 lot', '0,5 lot', '5 lot'], a: 0, w: '10 ÷ (20×10) = 0,05 lot.' },
             { q: 'Khi SL rộng gấp đôi và muốn giữ nguyên rủi ro tiền, khối lượng nên?', o: ['Tăng gấp đôi', 'Giảm một nửa', 'Giữ nguyên'], a: 1, w: 'Rủi ro = lot × SL × giá trị pip, nên lot tỷ lệ nghịch với SL.' }] },

    { id: '5-3', title: 'Tỷ lệ R:R và kỳ vọng lợi nhuận', min: 8, body:
      '<p><strong>R:R</strong> (Risk:Reward) so sánh phần có thể lỗ với phần có thể lãi. Nếu SL = 20 pip và TP = 60 pip thì R:R = 1:3.</p>' + rrSvg +
      '<h2>Tỷ lệ thắng hoà vốn</h2><table><thead><tr><th>R:R</th><th>Tỷ lệ thắng cần để hoà vốn</th></tr></thead><tbody><tr><td>1:1</td><td>50%</td></tr><tr><td>1:2</td><td>33,3%</td></tr><tr><td>1:3</td><td>25%</td></tr></tbody></table>' +
      '<h2>Kỳ vọng (Expectancy)</h2><p><code>Kỳ vọng = (Tỷ lệ thắng × R:R) – Tỷ lệ thua</code> (đơn vị R). Ví dụ thắng 40%, R:R = 2: <code>0,4×2 – 0,6 = +0,2R</code> mỗi lệnh. Dài hạn, chỉ hệ thống có kỳ vọng dương mới sinh lời.</p>' +
      tip('Thử ngay', 'Dùng công cụ “Kỳ vọng lợi nhuận” trong mục <a href="#/cong-cu">Công cụ</a> để thử các tổ hợp.') +
      warn('Đừng tối ưu hoá thái quá', 'R:R cao nhưng TP quá xa sẽ làm tỷ lệ thắng giảm. Hãy kiểm chứng bằng dữ liệu của chính bạn.'),
      key: ['R:R = số lãi tiềm năng ÷ số lỗ tiềm năng.', 'R:R càng cao, tỷ lệ thắng cần để hoà vốn càng thấp.', 'Kỳ vọng dương là điều kiện cần để sinh lời dài hạn.'],
      quiz: [{ q: 'R:R = 1:2, tỷ lệ thắng cần để hoà vốn xấp xỉ?', o: ['33%', '50%', '75%'], a: 0, w: '1 ÷ (1+2) = 33,3%.' },
             { q: 'Thắng 40%, R:R = 1:2: kỳ vọng mỗi lệnh?', o: ['+0,2R', '-0,2R', '0'], a: 0, w: '0,4×2 – 0,6 = +0,2.' }] },

    { id: '5-4', title: 'Drawdown, chuỗi thua và đa dạng hoá rủi ro', min: 7, body:
      '<p><strong>Drawdown</strong> là mức sụt giảm của vốn từ đỉnh đến đáy. Mọi hệ thống đều có drawdown – điều quan trọng là bạn chịu đựng được nó.</p>' +
      I18N.fig.drawdown({"aria":"Đường vốn có đỉnh, đáy và mức drawdown","peak":"Đỉnh vốn","trough":"Đáy vốn","dd":"Drawdown","rec":"Hồi phục","cap":"Drawdown là mức sụt giảm từ đỉnh vốn xuống đáy. Mọi hệ thống đều có drawdown; điều quan trọng là bạn chịu đựng được nó."}) + '<h2>Chuỗi thua là bình thường</h2><p>Với hệ thống thắng 50%, xác suất thua 5 lệnh liên tiếp trong một chuỗi 100 lệnh rất đáng kể. Với thắng 40%, chuỗi thua 7–8 lệnh không hiếm. Nếu bạn rủi ro 1%/lệnh, chuỗi thua 8 lệnh chỉ mất khoảng 8%.</p>' +
      '<h2>Tương quan giữa các cặp tiền</h2><p>EUR/USD và GBP/USD thường đi cùng chiều; EUR/USD và USD/CHF thường ngược chiều. Mở 3 lệnh mua các cặp đồng chiều thực chất là <strong>một lệnh rủi ro gấp ba</strong>.</p>' +
      '<h2>Biện pháp</h2><ul><li>Giới hạn số lệnh đồng thời (ví dụ tối đa 3).</li><li>Tổng rủi ro mở ≤ 3–5% vốn.</li><li>Giảm khối lượng khi drawdown vượt 5–10%, nghỉ giao dịch khi vượt ngưỡng đã định.</li></ul>' +
      tip('Rút lợi nhuận', 'Rút một phần lợi nhuận định kỳ giúp biến con số trên màn hình thành thực tế và giảm áp lực tâm lý.'),
      key: ['Drawdown và chuỗi thua là điều bình thường.', 'Các cặp tiền tương quan làm rủi ro cộng dồn.', 'Giới hạn số lệnh mở và tổng rủi ro.'],
      quiz: [{ q: 'Mở đồng thời mua EUR/USD và GBP/USD với rủi ro 1% mỗi lệnh, thực chất rủi ro là?', o: ['Khoảng 1%', 'Có thể gần 2% do tương quan', 'Bằng 0'], a: 1, w: 'Hai cặp thường đi cùng chiều nên thua cùng lúc.' },
             { q: 'Drawdown là gì?', o: ['Mức sụt giảm vốn từ đỉnh đến đáy', 'Lợi nhuận hàng tháng', 'Loại lệnh'], a: 0, w: 'Nó đo mức đau tối đa của tài khoản.' }] }
  ]},

  /* ===================== CẤP 6 ===================== */
  { id: 6, title: 'Tâm lý & kinh nghiệm thực chiến', icon: 'brain', desc: 'Kiểm soát cảm xúc, nhật ký giao dịch, các sai lầm kinh điển, lộ trình từ demo sang live và cách tránh lừa đảo.', lessons: [
    { id: '6-1', title: 'Tâm lý giao dịch: FOMO, trả thù thị trường, tham lam', min: 8, body:
      '<p>Phân tích có thể đúng nhưng cảm xúc vẫn phá hỏng kết quả. Hãy nhận diện các “con quỷ” quen thuộc:</p>' +
      '<ul><li><strong>FOMO</strong> (sợ bỏ lỡ): vào lệnh muộn khi giá đã chạy xa.</li><li><strong>Revenge trading</strong>: vào lệnh lớn để “gỡ” sau khi thua.</li><li><strong>Tham lam</strong>: bỏ TP, tăng lot khi đang thắng.</li><li><strong>Sợ hãi</strong>: chốt non, không dám vào dù có tín hiệu đúng.</li><li><strong>Quá tự tin</strong> sau chuỗi thắng.</li></ul>' +
      I18N.fig.cycle({"aria":"Vòng luẩn quẩn của giao dịch trả thù thị trường","nodes":[["Thua một lệnh"],["Tức giận,","muốn gỡ lại ngay"],["Vào lệnh lớn,","bỏ kế hoạch"],["Thua lớn hơn"]],"center":["Vòng luẩn quẩn","trả thù thị trường"],"cap":"Cách phá vòng: quy tắc viết sẵn, giới hạn lỗ trong ngày và nghỉ sau 3 lệnh thua liên tiếp."}) + '<h2>Cách đối phó</h2><ol><li><strong>Quy tắc bằng văn bản</strong> + checklist trước lệnh.</li><li><strong>Giới hạn lỗ ngày</strong>: chạm là dừng.</li><li>Sau chuỗi thua 3 lệnh: nghỉ, không vào lệnh mới trong ít nhất 1 giờ.</li><li>Giảm khối lượng để giảm áp lực – bạn sẽ ra quyết định tốt hơn.</li><li>Ngủ đủ, tập thể dục – tâm lý bắt đầu từ thể chất.</li></ol>' +
      tip('Tập trung vào quy trình', 'Đánh giá bản thân bằng việc “tôi có làm đúng kế hoạch không” thay vì “lệnh này thắng hay thua”. Một lệnh thua đúng kế hoạch là lệnh tốt.'),
      key: ['FOMO, trả thù thị trường, tham lam là sai lầm tâm lý phổ biến nhất.', 'Quy tắc viết sẵn và giới hạn lỗ ngày giúp chặn cảm xúc.', 'Đánh giá theo quy trình, không theo kết quả từng lệnh.'],
      quiz: [{ q: 'Revenge trading là gì?', o: ['Vào lệnh lớn để gỡ ngay sau khi thua', 'Giao dịch theo kế hoạch', 'Dùng demo'], a: 0, w: 'Đây là hành vi cảm xúc, thường làm lỗ nhiều hơn.' },
             { q: 'Làm gì sau chuỗi thua liên tiếp?', o: ['Tăng lot để gỡ', 'Nghỉ ngơi và xem lại quy trình', 'Bỏ SL'], a: 1, w: 'Dừng lại để không quyết định theo cảm xúc.' }] },

    { id: '6-2', title: 'Nhật ký giao dịch', min: 6, body:
      '<p>Nhật ký giao dịch là công cụ cải thiện mạnh nhất mà gần như không tốn tiền. Nó biến kinh nghiệm thành dữ liệu.</p>' +
      '<h2>Cần ghi gì?</h2><table><thead><tr><th>Trường</th><th>Ví dụ</th></tr></thead><tbody><tr><td>Ngày giờ, cặp, hướng</td><td>12/03 20:15, EUR/USD, Mua</td></tr><tr><td>Lý do vào lệnh + ảnh chụp biểu đồ</td><td>Pin bar tại hỗ trợ H4</td></tr><tr><td>Điểm vào, SL, TP, khối lượng</td><td>1,0800 / 1,0775 / 1,0850 / 0,08</td></tr><tr><td>Kết quả (R)</td><td>+2R</td></tr><tr><td>Cảm xúc trước/sau lệnh</td><td>Hơi vội, vào sớm</td></tr><tr><td>Có làm đúng kế hoạch?</td><td>Có / Không</td></tr></tbody></table>' +
      '[[mt5:history]]<h2>Xem lại hàng tuần</h2><ul><li>Thiết lập nào có kỳ vọng tốt nhất?</li><li>Khung giờ/cặp nào làm bạn thua nhiều?</li><li>Bao nhiêu % lệnh sai kế hoạch? Chúng thua bao nhiêu?</li></ul>' +
      tip('Công cụ đơn giản', 'Một file bảng tính là đủ. Quan trọng nhất là ghi đều đặn và trung thực.'),
      key: ['Nhật ký biến trải nghiệm thành dữ liệu để cải thiện.', 'Ghi lý do, kết quả theo R và cảm xúc.', 'Xem lại hàng tuần để tìm điểm yếu.'],
      quiz: [{ q: 'Vì sao nên ghi lại cảm xúc trong nhật ký?', o: ['Để nhận ra mô hình sai lầm cảm tính', 'Chỉ để trang trí', 'Không cần'], a: 0, w: 'Nhiều khoản lỗ lặp lại xuất phát từ cùng một trạng thái cảm xúc.' },
             { q: 'Nên đo kết quả lệnh bằng đơn vị nào để dễ so sánh?', o: ['Số tiền', 'Bội số rủi ro (R)', 'Số nến'], a: 1, w: 'R chuẩn hoá giữa các lệnh có khối lượng khác nhau.' }] },

    { id: '6-3', title: '10 sai lầm kinh điển của người mới', min: 7, body:
      '<ol><li><strong>Dùng đòn bẩy và khối lượng quá lớn</strong> so với vốn.</li><li><strong>Không có hoặc xoá dừng lỗ</strong>.</li><li><strong>Giao dịch quá nhiều</strong> (overtrading).</li><li><strong>Gấp thếp (martingale)</strong> để gỡ lỗ.</li><li><strong>Thay đổi chiến lược liên tục</strong> sau vài lệnh thua.</li><li><strong>Dùng quá nhiều chỉ báo</strong>.</li><li><strong>Giao dịch ngược xu hướng</strong>, cố bắt đỉnh/đáy.</li><li><strong>Giao dịch trước tin lớn</strong> mà không chuẩn bị.</li><li><strong>Không có nhật ký</strong> và không xem lại.</li><li><strong>Kỳ vọng làm giàu nhanh</strong>: nạp ít vốn, đòi lợi nhuận khổng lồ.</li></ol>' +
      I18N.fig.hub({"aria":"Mười sai lầm của người mới chia thành bốn nhóm","center":["10 sai lầm","kinh điển"],"items":[["Rủi ro quá lớn","(sai lầm 1, 2, 4)"],["Thiếu kỷ luật","(sai lầm 3, 5, 9)"],["Phân tích sai","(sai lầm 6, 7, 8)"],["Kỳ vọng sai","(sai lầm 10)"]],"cap":"Nhóm lại để dễ nhớ: phần lớn sai lầm đến từ rủi ro quá lớn và thiếu kỷ luật."}) + bad('Đừng tin vào lời hứa thu nhập', 'Các quảng cáo “lãi 10%/ngày”, “bao lãi”, “tín hiệu 99%” hầu hết là lừa đảo hoặc cherry-picking kết quả.') +
      tip('Cách sống sót năm đầu tiên', 'Mục tiêu năm đầu tiên là <em>không cháy tài khoản</em> và học được quy trình. Lợi nhuận là sản phẩm phụ.'),
      key: ['Phần lớn sai lầm đến từ rủi ro quá lớn và thiếu kỷ luật.', 'Đừng chạy theo chiến lược “thần kỳ”.', 'Mục tiêu năm đầu: tồn tại và học.'],
      quiz: [{ q: 'Sai lầm nào được xem là nghiêm trọng nhất?', o: ['Dùng khối lượng quá lớn và không dừng lỗ', 'Dùng sai màu biểu đồ', 'Giao dịch buổi sáng'], a: 0, w: 'Đây là nguyên nhân hàng đầu khiến tài khoản cháy.' },
             { q: 'Mục tiêu hợp lý của năm đầu tiên là gì?', o: ['Nhân đôi vốn mỗi tháng', 'Không cháy tài khoản và học quy trình', 'Dùng đòn bẩy tối đa'], a: 1, w: 'Sống sót để tích luỹ kinh nghiệm.' }] },

    { id: '6-4', title: 'Lộ trình từ demo đến giao dịch thật', min: 7, body:
      I18N.fig.steps({"aria":"Ba giai đoạn từ demo đến giao dịch thật","items":[["Học và demo","1–3 tháng"],["Tài khoản thật nhỏ","3–6 tháng"],["Mở rộng","có kiểm soát"]],"cap":"Chỉ chuyển giai đoạn khi đã có kế hoạch và tuân thủ nó ít nhất 90% số lệnh."}) + '<h2>Giai đoạn 1: Học và demo (1–3 tháng)</h2><ul><li>Hoàn thành các cấp độ lý thuyết cơ bản.</li><li>Chọn 1 chiến lược đơn giản, 1–2 cặp tiền.</li><li>Giao dịch demo như thật: đúng khối lượng, đúng SL.</li><li>Ghi nhật ký ít nhất 50–100 lệnh.</li></ul>' +
      '<h2>Giai đoạn 2: Tài khoản thật nhỏ (3–6 tháng)</h2><ul><li>Nạp số tiền bạn <strong>có thể mất hoàn toàn</strong>.</li><li>Dùng khối lượng rất nhỏ (micro lot) để làm quen với cảm xúc tiền thật.</li><li>Rủi ro 0,5–1% mỗi lệnh.</li></ul>' +
      '<h2>Giai đoạn 3: Mở rộng có kiểm soát</h2><ul><li>Chỉ tăng vốn/khối lượng khi có lợi nhuận ổn định nhiều tháng.</li><li>Tăng từ từ, không tăng đột ngột sau chuỗi thắng.</li></ul>' +
      '<h2>Tiêu chí “sẵn sàng”</h2><ol><li>Có kế hoạch giao dịch bằng văn bản.</li><li>Có kỳ vọng dương trên mẫu đủ lớn trên demo.</li><li>Tuân thủ kế hoạch ≥ 90% số lệnh.</li><li>Hiểu rõ mức lỗ tối đa chấp nhận được.</li></ol>' +
      warn('Demo không phản ánh hết thực tế', 'Trên tài khoản thật có trượt giá, cảm xúc tiền thật và áp lực khác hẳn. Hãy chuẩn bị tinh thần cho điều đó.'),
      key: ['Demo → tài khoản thật nhỏ → mở rộng có kiểm soát.', 'Chỉ dùng số tiền có thể mất hoàn toàn.', 'Có kế hoạch và tuân thủ ≥ 90% trước khi tăng vốn.'],
      quiz: [{ q: 'Số tiền nạp vào tài khoản thật nên như thế nào?', o: ['Tiền vay mượn để gỡ nhanh', 'Số tiền có thể mất hoàn toàn mà không ảnh hưởng cuộc sống', 'Toàn bộ tiết kiệm'], a: 1, w: 'Giao dịch bằng tiền không thể mất làm tâm lý méo mó.' },
             { q: 'Khi nào nên tăng khối lượng?', o: ['Ngay sau 2 lệnh thắng', 'Khi có kết quả ổn định trong nhiều tháng', 'Khi tâm trạng tốt'], a: 1, w: 'Tăng dần dựa trên bằng chứng, không dựa trên cảm xúc.' }] },

    { id: '6-5', title: 'Nhận diện và tránh lừa đảo Forex', min: 8, body:
      '<p>Forex là lĩnh vực có nhiều lừa đảo, đặc biệt qua mạng xã hội. Hãy trang bị khả năng nhận diện:</p>' +
      '<h2>Dấu hiệu cảnh báo</h2><ul><li><strong>Cam kết lợi nhuận</strong> cố định hoặc “bao lãi, bao thắng”.</li><li><strong>Nhóm tín hiệu/VIP</strong> thu phí cao hứa “vào lệnh theo là có tiền”.</li><li><strong>Nhờ “chuyên gia” quản lý tài khoản</strong> và yêu cầu đưa mật khẩu hoặc chuyển tiền vào ví/tài khoản cá nhân.</li><li><strong>Sàn không có giấy phép</strong> hoặc giả mạo giấy phép của cơ quan uy tín.</li><li><strong>Áp lực nạp thêm</strong> để “mở khoá rút tiền” hoặc “nộp phí/thuế”.</li><li><strong>Tình cảm giả</strong> trên mạng (romance scam) dụ đầu tư.</li></ul>' +
      I18N.fig.steps({"aria":"Bốn bước tự bảo vệ trước lừa đảo Forex","items":[["Dừng lại,","không vội quyết định"],["Kiểm tra giấy phép","trên website cơ quan"],["Thử rút","một khoản nhỏ"],["Lưu bằng chứng,","báo cơ quan chức năng"]],"cap":"Bất kỳ ai gây áp lực phải quyết định nhanh hoặc nạp thêm tiền đều là dấu hiệu cần dừng lại."}) + '<h2>Cách tự bảo vệ</h2><ol><li>Kiểm tra giấy phép trực tiếp trên website cơ quan quản lý, không qua đường link người lạ gửi.</li><li>Thử rút một khoản nhỏ trước khi nạp nhiều.</li><li>Không bao giờ chia sẻ mật khẩu giao dịch.</li><li>Không chuyển tiền cho cá nhân để “giao dịch hộ”.</li><li>Nếu cảm thấy bị gây áp lực phải quyết định nhanh – hãy dừng lại.</li></ol>' +
      bad('Nếu bạn đã bị lừa', 'Lưu bằng chứng (tin nhắn, giao dịch), báo ngân hàng để phong toả nếu còn kịp và trình báo cơ quan công an. Cẩn thận với các dịch vụ “lấy lại tiền” – thường là lừa đảo lần hai.'),
      key: ['Không có lợi nhuận được đảm bảo trong Forex.', 'Kiểm tra giấy phép trực tiếp với cơ quan quản lý.', 'Không chuyển tiền hay chia sẻ mật khẩu cho người khác.'],
      quiz: [{ q: 'Dấu hiệu nào cho thấy khả năng lừa đảo cao?', o: ['Cam kết lợi nhuận cố định hằng tháng', 'Sàn công khai spread', 'Khuyến cáo rủi ro rõ ràng'], a: 0, w: 'Không ai có thể đảm bảo lợi nhuận trong thị trường tài chính.' },
             { q: 'Khi bị yêu cầu nộp “phí” để rút tiền, bạn nên?', o: ['Nộp để rút nhanh', 'Dừng lại, coi chừng bị lừa', 'Nạp thêm gấp đôi'], a: 1, w: 'Đây là chiêu trò phổ biến để chiếm thêm tiền.' }] }
  ]},

  /* ===================== CẤP 7 ===================== */
  { id: 7, title: 'Nâng cao', icon: 'rocket', desc: 'Cấu trúc thị trường, đa khung thời gian, tương quan, tâm lý thị trường (COT), backtest và xây dựng hệ thống.', lessons: [
    { id: '7-1', title: 'Cấu trúc thị trường và vùng thanh khoản', min: 9, body:
      '<p>Nhà giao dịch nâng cao nhìn thị trường như một cuộc cạnh tranh về <strong>thanh khoản</strong>: lệnh dừng lỗ của số đông thường nằm ngay trên đỉnh/dưới đáy rõ ràng, đó là nơi các tổ chức lớn có thể khớp lệnh khối lượng lớn.</p>' +
      '<h2>Cấu trúc thị trường</h2><ul><li><strong>BOS</strong> (Break of Structure): phá cấu trúc theo hướng xu hướng – xác nhận tiếp diễn.</li><li><strong>CHoCH</strong> (Change of Character): phá cấu trúc ngược hướng – dấu hiệu sớm của đảo chiều.</li></ul>' +
      '<h2>Quét thanh khoản (Liquidity Sweep)</h2><p>Giá chọc qua đỉnh/đáy cũ để kích hoạt các lệnh dừng lỗ rồi đảo chiều mạnh. Đây chính là cơ chế đằng sau nhiều “phá vỡ giả”.</p>' +
      '[[mt5:sweep]]<h2>Ứng dụng</h2><ol><li>Xác định xu hướng và các đỉnh/đáy quan trọng khung lớn.</li><li>Chờ giá quét thanh khoản vào vùng quan tâm.</li><li>Tìm dấu hiệu từ chối (nến từ chối, CHoCH ở khung nhỏ).</li><li>Vào lệnh và đặt SL ngoài điểm quét.</li></ol>' +
      note('Lưu ý', 'Các khái niệm này là khung tư duy được nhiều người dùng, không phải quy luật tuyệt đối. Hãy kiểm chứng bằng dữ liệu của bạn.'),
      key: ['Thanh khoản tập trung ở đỉnh/đáy rõ ràng.', 'BOS xác nhận tiếp diễn; CHoCH cảnh báo đảo chiều.', 'Quét thanh khoản giải thích nhiều phá vỡ giả.'],
      quiz: [{ q: 'CHoCH (Change of Character) cảnh báo điều gì?', o: ['Xu hướng có thể đảo chiều', 'Xu hướng chắc chắn tiếp diễn', 'Spread giãn'], a: 0, w: 'Phá cấu trúc ngược hướng là dấu hiệu sớm.' },
             { q: 'Quét thanh khoản là gì?', o: ['Giá chọc qua đỉnh/đáy cũ để kích hoạt lệnh dừng lỗ rồi đảo chiều', 'Sàn hết tiền', 'Giá đi ngang'], a: 0, w: 'Nó giải thích nhiều cú phá vỡ giả.' }] },

    { id: '7-2', title: 'Tương quan tiền tệ và sức mạnh đồng tiền', min: 7, body:
      '<p>Mỗi cặp là hai đồng tiền. Muốn giao dịch tốt hơn, hãy hiểu đồng nào đang mạnh, đồng nào đang yếu.</p>' +
      '<h2>Tìm cặp tốt nhất</h2><p>Mua đồng tiền mạnh nhất, bán đồng tiền yếu nhất. Ví dụ: USD mạnh, JPY yếu → ưu tiên mua USD/JPY thay vì một cặp mà cả hai đồng đều trung tính.</p>' +
      I18N.fig.corr({"aria":"Tương quan của một số cặp tiền so với EUR/USD","head":["Cặp tiền","Khi EUR/USD tăng","Xu hướng thường gặp"],"rows":[{"pair":"GBP/USD","dir":"up","text":"Thường cùng chiều"},{"pair":"AUD/USD","dir":"up","text":"Cùng chiều (tâm lý rủi ro)"},{"pair":"USD/CHF","dir":"down","text":"Thường ngược chiều"}],"cap":"Tương quan không cố định; hãy kiểm tra định kỳ và tránh mở nhiều lệnh cùng chiều chỉ vì cặp tiền “trông khác nhau”."}) + '<h2>Chỉ số DXY</h2><p>DXY đo sức mạnh USD so với rổ tiền tệ chính (chủ yếu là EUR). DXY tăng thường kéo EUR/USD, GBP/USD, AUD/USD giảm và ngược lại.</p>' +
      '<h2>Tương quan hàng hoá</h2><ul><li>AUD, NZD, CAD thường nhạy với giá hàng hoá và tâm lý rủi ro.</li><li>JPY, CHF thường là tài sản trú ẩn an toàn.</li><li>USD/CAD thường ngược chiều với giá dầu.</li></ul>' +
      warn('Tương quan thay đổi', 'Tương quan không cố định; hãy kiểm tra lại định kỳ và tránh mở nhiều vị thế cùng chiều chỉ vì chúng “trông khác nhau”.'),
      key: ['Giao dịch cặp có đồng mạnh đối đồng yếu.', 'DXY phản ánh sức mạnh USD.', 'Tương quan thay đổi, cần kiểm tra thường xuyên.'],
      quiz: [{ q: 'Khi DXY tăng mạnh, EUR/USD thường?', o: ['Giảm', 'Tăng', 'Không liên quan'], a: 0, w: 'USD mạnh lên thì EUR/USD thường giảm.' },
             { q: 'Đồng nào thường được coi là tài sản trú ẩn an toàn?', o: ['AUD', 'JPY', 'NZD'], a: 1, w: 'JPY và CHF thường mạnh lên khi thị trường lo ngại rủi ro.' }] },

    { id: '7-3', title: 'Backtest và đánh giá chiến lược', min: 8, body:
      '<p>Trước khi dùng tiền thật, hãy chứng minh chiến lược có lợi thế bằng dữ liệu.</p>' +
      '<h2>Các bước backtest thủ công</h2><ol><li>Viết quy tắc chiến lược rõ ràng, không mơ hồ.</li><li>Lùi biểu đồ về quá khứ và tiến từng nến, chỉ nhìn dữ liệu đã có.</li><li>Ghi từng lệnh vào bảng tính (vào, SL, TP, kết quả theo R).</li><li>Thu thập tối thiểu <strong>100 lệnh</strong> trên nhiều giai đoạn thị trường.</li></ol>' +
      I18N.fig.steps({"aria":"Năm bước backtest một chiến lược","items":[["Viết quy tắc","rõ ràng"],["Lùi biểu đồ,","tiến từng nến"],["Ghi từng lệnh","theo R"],["Tính chỉ số,","tối thiểu 100 lệnh"],["Kiểm chứng trên","dữ liệu mới / demo"]],"cap":"Bước cuối giúp tránh overfitting: chiến lược phải đúng cả trên dữ liệu chưa từng dùng."}) + '<h2>Chỉ số cần xem</h2><table><thead><tr><th>Chỉ số</th><th>Ý nghĩa</th></tr></thead><tbody><tr><td>Tỷ lệ thắng</td><td>% lệnh có lãi</td></tr><tr><td>Kỳ vọng (R)</td><td>Lãi trung bình mỗi lệnh theo R</td></tr><tr><td>Profit factor</td><td>Tổng lãi ÷ tổng lỗ (&gt;1,5 là khá)</td></tr><tr><td>Max drawdown</td><td>Sụt giảm tối đa</td></tr><tr><td>Chuỗi thua dài nhất</td><td>Mức chịu đựng tâm lý cần thiết</td></tr></tbody></table>' +
      bad('Cạm bẫy', '<strong>Overfitting</strong> (tối ưu hoá quá khớp dữ liệu quá khứ) và <strong>thiên kiến nhìn trước</strong> khiến kết quả backtest đẹp nhưng vô dụng khi chạy thật. Hãy kiểm tra trên dữ liệu chưa từng dùng (out-of-sample) và trên demo.'),
      key: ['Backtest cần ≥ 100 lệnh và quy tắc rõ ràng.', 'Xem kỳ vọng, profit factor, drawdown và chuỗi thua.', 'Tránh overfitting; kiểm chứng trên dữ liệu mới.'],
      quiz: [{ q: 'Số lệnh tối thiểu hợp lý để đánh giá chiến lược?', o: ['5 lệnh', '20 lệnh', '100 lệnh trở lên'], a: 2, w: 'Mẫu nhỏ dễ cho kết quả ngẫu nhiên.' },
             { q: 'Overfitting là gì?', o: ['Tối ưu hoá quá khớp quá khứ nên không hiệu quả khi chạy thật', 'Mở quá nhiều lệnh', 'Dùng quá ít vốn'], a: 0, w: 'Chiến lược “ghi nhớ” dữ liệu cũ thay vì nắm bắt quy luật.' }] },

    { id: '7-4', title: 'Xây dựng hệ thống giao dịch của riêng bạn', min: 8, body:
      '<p>Mục tiêu cuối cùng là một hệ thống phù hợp tính cách, thời gian và vốn của bạn – không phải bản sao của người khác.</p>' +
      '<h2>Khung 6 bước</h2><ol><li><strong>Phong cách</strong>: Scalping / Day / Swing dựa trên thời gian rảnh và tính cách.</li><li><strong>Thị trường</strong>: 1–3 cặp tiền để hiểu sâu.</li><li><strong>Bộ lọc xu hướng</strong>: ví dụ EMA 200 khung lớn.</li><li><strong>Vùng và tín hiệu vào lệnh</strong>: hỗ trợ/kháng cự + mô hình nến.</li><li><strong>Quản lý lệnh</strong>: SL, TP, trailing, R:R tối thiểu.</li><li><strong>Quản lý vốn và nhật ký</strong>.</li></ol>' +
      I18N.fig.steps({"aria":"Sáu bước xây dựng hệ thống giao dịch riêng","items":[["Phong cách","giao dịch"],["Thị trường","(1–3 cặp)"],["Bộ lọc","xu hướng"],["Vùng và","tín hiệu vào lệnh"],["Quản lý lệnh","SL, TP, R:R"],["Vốn và","nhật ký"]],"cap":"Hệ thống tốt phù hợp với tính cách, thời gian và vốn của bạn."}) + '<h2>Quy trình cải tiến liên tục</h2><ul><li>Mỗi tuần xem lại nhật ký, mỗi tháng đánh giá chỉ số.</li><li>Chỉ thay đổi <strong>một biến</strong> mỗi lần và kiểm chứng.</li><li>Không đổi chiến lược chỉ vì một chuỗi thua ngắn hạn.</li></ul>' +
      tip('Lời cuối', 'Lợi thế của bạn không nằm ở chỉ báo bí mật mà ở kỷ luật thực hiện lặp đi lặp lại. Hãy đơn giản, nhất quán và bảo vệ vốn trên hết.') +
      warn('Nhắc lại', 'Giao dịch Forex tiềm ẩn rủi ro mất toàn bộ vốn. Nội dung tại Forex Academy VN chỉ mang tính giáo dục và không phải lời khuyên đầu tư.'),
      key: ['Hệ thống tốt phù hợp với tính cách và thời gian của bạn.', 'Đơn giản, nhất quán, thay đổi từng biến một.', 'Kỷ luật và bảo vệ vốn là lợi thế lớn nhất.'],
      quiz: [{ q: 'Khi cải tiến hệ thống, nên?', o: ['Đổi nhiều thứ cùng lúc', 'Thay đổi một biến mỗi lần và kiểm chứng', 'Bỏ hẳn nhật ký'], a: 1, w: 'Thay một biến mới biết nguyên nhân thay đổi kết quả.' },
             { q: 'Lợi thế lâu dài lớn nhất của nhà giao dịch là?', o: ['Chỉ báo bí mật', 'Kỷ luật thực hiện và bảo vệ vốn', 'Đòn bẩy cao'], a: 1, w: 'Thành công đến từ sự nhất quán.' }] }
  ]}
  ];

  var glossary = [
    { t: 'Pip', d: 'Đơn vị biến động giá nhỏ nhất thường dùng; 0,0001 với đa số cặp, 0,01 với cặp có JPY.' },
    { t: 'Pipette', d: 'Chữ số thập phân thứ năm của giá, bằng 1/10 pip.' },
    { t: 'Lot', d: 'Đơn vị khối lượng giao dịch. 1 lot chuẩn = 100.000 đơn vị tiền cơ sở.' },
    { t: 'Spread', d: 'Chênh lệch giữa giá bán (Bid) và giá mua (Ask), là chi phí giao dịch cơ bản.' },
    { t: 'Bid / Ask', d: 'Bid là giá bạn bán; Ask là giá bạn mua. Ask luôn cao hơn Bid.' },
    { t: 'Đòn bẩy (Leverage)', d: 'Cho phép mở vị thế lớn hơn vốn thực, khuếch đại cả lãi và lỗ.' },
    { t: 'Ký quỹ (Margin)', d: 'Số tiền bị giữ lại làm đảm bảo để duy trì một vị thế.' },
    { t: 'Equity', d: 'Vốn thực tế của tài khoản gồm số dư cộng lãi/lỗ đang chạy.' },
    { t: 'Margin call', d: 'Cảnh báo khi vốn không đủ để duy trì lệnh đang mở.' },
    { t: 'Stop out', d: 'Mức sàn tự động đóng lệnh khi margin level quá thấp.' },
    { t: 'Stop Loss (SL)', d: 'Lệnh tự đóng vị thế khi lỗ đến mức định trước.' },
    { t: 'Take Profit (TP)', d: 'Lệnh tự đóng vị thế khi đạt mục tiêu lợi nhuận.' },
    { t: 'Trailing Stop', d: 'Dừng lỗ tự động bám theo giá khi lệnh có lãi.' },
    { t: 'Lệnh Limit', d: 'Lệnh chờ khớp ở giá tốt hơn giá hiện tại.' },
    { t: 'Lệnh Stop', d: 'Lệnh chờ khớp khi giá vượt một mức nhất định.' },
    { t: 'Swap', d: 'Phí hoặc lãi khi giữ lệnh qua đêm do chênh lệch lãi suất.' },
    { t: 'Slippage (Trượt giá)', d: 'Chênh lệch giữa giá mong muốn và giá khớp thực tế, thường xảy ra khi biến động mạnh.' },
    { t: 'Thanh khoản (Liquidity)', d: 'Mức độ dễ dàng mua/bán mà không làm giá thay đổi nhiều.' },
    { t: 'Xu hướng (Trend)', d: 'Hướng đi chủ đạo của giá: tăng, giảm hoặc đi ngang.' },
    { t: 'Hỗ trợ (Support)', d: 'Vùng giá nơi lực mua thường chặn đà giảm.' },
    { t: 'Kháng cự (Resistance)', d: 'Vùng giá nơi lực bán thường chặn đà tăng.' },
    { t: 'Phá vỡ (Breakout)', d: 'Giá vượt khỏi vùng hỗ trợ/kháng cự hoặc biên độ tích luỹ.' },
    { t: 'Retest', d: 'Giá quay lại kiểm tra vùng vừa phá vỡ trước khi tiếp tục.' },
    { t: 'Phá vỡ giả (Fakeout)', d: 'Giá vượt vùng rồi quay lại nhanh chóng, bẫy người vào theo.' },
    { t: 'Pin bar', d: 'Nến có thân nhỏ và bóng dài, thể hiện sự từ chối giá.' },
    { t: 'Engulfing', d: 'Nến có thân nuốt trọn thân nến trước, tín hiệu đảo chiều.' },
    { t: 'Doji', d: 'Nến có giá mở và đóng gần bằng nhau, thể hiện sự lưỡng lự.' },
    { t: 'SMA', d: 'Đường trung bình động đơn giản của giá đóng cửa trong N phiên.' },
    { t: 'EMA', d: 'Đường trung bình động hàm mũ, ưu tiên giá gần đây nên nhạy hơn SMA.' },
    { t: 'RSI', d: 'Chỉ báo động lượng dao động 0–100, thường có vùng 30/70.' },
    { t: 'MACD', d: 'Chỉ báo động lượng dựa trên hiệu hai đường EMA, có đường Signal và histogram.' },
    { t: 'Bollinger Bands', d: 'Dải biến động quanh SMA 20 với khoảng cách 2 độ lệch chuẩn.' },
    { t: 'ATR', d: 'Chỉ báo đo mức biến động trung bình của giá.' },
    { t: 'Fibonacci', d: 'Công cụ chia nhịp chạy giá thành các mức tỷ lệ như 38,2%, 50%, 61,8%.' },
    { t: 'Phân kỳ (Divergence)', d: 'Giá và chỉ báo đi ngược hướng nhau, cảnh báo suy yếu động lượng.' },
    { t: 'Confluence (Hội tụ)', d: 'Nhiều yếu tố kỹ thuật cùng chỉ về một vùng giá.' },
    { t: 'R:R', d: 'Tỷ lệ lợi nhuận tiềm năng so với rủi ro của một lệnh.' },
    { t: 'Expectancy (Kỳ vọng)', d: 'Lãi/lỗ trung bình mỗi lệnh của một hệ thống, thường tính theo R.' },
    { t: 'Drawdown', d: 'Mức sụt giảm vốn từ đỉnh xuống đáy.' },
    { t: 'Overtrading', d: 'Giao dịch quá nhiều, thường do cảm xúc, làm tăng chi phí và rủi ro.' },
    { t: 'FOMO', d: 'Nỗi sợ bỏ lỡ cơ hội, khiến vào lệnh muộn hoặc thiếu kế hoạch.' },
    { t: 'Martingale', d: 'Chiến thuật gấp thếp sau khi thua; rủi ro cháy tài khoản rất cao.' },
    { t: 'Scalping', d: 'Phong cách giao dịch rất ngắn hạn, giữ lệnh vài phút.' },
    { t: 'Day trading', d: 'Mở và đóng lệnh trong cùng một ngày.' },
    { t: 'Swing trading', d: 'Giữ lệnh vài ngày đến vài tuần để ăn một nhịp xu hướng.' },
    { t: 'NFP', d: 'Bảng lương phi nông nghiệp của Mỹ, báo cáo việc làm có tác động mạnh lên thị trường.' },
    { t: 'CPI', d: 'Chỉ số giá tiêu dùng, thước đo lạm phát quan trọng.' },
    { t: 'DXY', d: 'Chỉ số đo sức mạnh đồng USD so với rổ tiền tệ chính.' },
    { t: 'Broker (Sàn môi giới)', d: 'Đơn vị cung cấp nền tảng để giao dịch Forex/CFD.' },
    { t: 'Demo', d: 'Tài khoản thực hành bằng tiền ảo.' }
  ];

  window.DATA = { levels: levels, glossary: glossary };
})();
