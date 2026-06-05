# HTML5 FORMS & MEDIA — Biểu mẫu, Validation & Đa phương tiện
# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

# CÂU A1 :Liệt kê 10 input types khác nhau trong HTML5, cho mỗi type:

- Giao diện hiển thị (mô tả bằng lời)
- Validation tự động (nếu có)
- Use case cụ thể trong trang E-CommerceLiệt kê 10 input types khác nhau trong HTML5, cho mỗi type:

1. ```<type="text">``` → Ô nhập văn bản, hỗ trợ kiểm tra độ dài (minlength, maxlength) hoặc mẫu (pattern) → Dùng để nhập Họ và tên hoặc Địa chỉ giao hàng.
2. ```<type="email">``` → Ô nhập text, tự động kiểm tra định dạng phải có ký tự @ → Dùng cho Form đăng ký thành viên hoặc nhận bản tin.
3. ```<type="password">``` → Ô nhập ẩn ký tự (hiển thị dạng chấm tròn/dấu sao) để bảo mật thông tin → Dùng khi Đăng nhập hoặc thiết lập mật khẩu tài khoản.
4. ```<type="number">``` → Ô nhập số kèm nút tăng/giảm, kiểm tra được khoảng giá trị (min, max) → Dùng để chọn Số lượng sản phẩm trong giỏ hàng.
5. ```<type="tel">``` → Ô nhập văn bản kích hoạt bàn phím số trên mobile, kiểm tra theo pattern định sẵn → Dùng để nhập Số điện thoại liên lạc nhận hàng.
6. ```<type="date">``` → Hiển thị bộ chọn ngày tháng (date picker) trực quan giúp tránh nhập sai định dạng → Dùng để chọn Ngày giao hàng hoặc ngày sinh khách hàng.
7. ```<type="range">``` → Thanh trượt (slider) cho phép chọn giá trị trong một khoảng xác định → Dùng làm Bộ lọc giá sản phẩm từ thấp đến cao.
8. ```<type="file">``` → Nút chọn tệp tin từ thiết bị, có thể giới hạn loại file bằng accept → Dùng để khách hàng Tải ảnh đánh giá thực tế của sản phẩm.
9. ```<type="url">``` → Ô nhập văn bản, tự động kiểm tra định dạng đường dẫn liên kết (phải có http://) → Dùng để nhập Link website đối tác hoặc trang cá nhân của shop.
10. ```<type="color">``` → Hiển thị bảng màu (color picker) để người dùng chọn mã màu chính xác → Dùng cho các sản phẩm cần Tùy chỉnh màu sắc (như in áo, thiết kế theo yêu cầu).


# CÂU A2: Validation Attributes
- Đọc chương 07. Không chạy code, hãy dự đoán điều gì xảy ra khi user bấm Submit cho mỗi trường hợp sau. Giải thích TẠI SAO.

<!-- Trường hợp 1 -->
```<input type="text" required value="">```   ```<!-- User để trống -->```

- Kết quả: Trình duyệt sẽ chặn lại và hiển thị thông báo lỗi (thường là "Please fill out this field") ngay tại ô nhập liệu.
- Tại sao: Thuộc tính required đánh dấu đây là trường dữ liệu bắt buộc nhập. Vì người dùng để trống (```<value="">```), form sẽ không hợp lệ.

<!-- Trường hợp 2 -->
```<input type="email" value="abc"> ```       ```<!-- User gõ "abc" -->```

- Kết quả: Form không được gửi đi; trình duyệt yêu cầu người dùng nhập đúng định dạng email.
- Tại sao: Khi sử dụng ```<type="email">```, trình duyệt sẽ tự động kiểm tra định dạng (format). Một email hợp lệ bắt buộc phải có ký tự @, trong khi "abc" thì không có.

<!-- Trường hợp 3 -->
```<input type="number" min="1" max="10" value="15">``` ```<!-- User gõ 15 -->```

- Kết quả: Trình duyệt báo lỗi giá trị nhập vào nằm ngoài khoảng cho phép.
- Tại sao: Thuộc tính ```<max="10">``` quy định giá trị số tối đa là 10. Con số 15 mà người dùng nhập đã vi phạm giới hạn này.

<!-- Trường hợp 4 -->
```<input type="text" pattern="[0-9]{10}" value="abc123">``` ```<!-- User gõ "abc123" -->```

- Kết quả: Trình duyệt chặn việc gửi dữ liệu và báo lỗi định dạng không khớp.
- Tại sao: Thuộc tính pattern sử dụng Regex (biểu thức chính quy) để kiểm tra dữ liệu. Mẫu [0-9]{10} yêu cầu dữ liệu phải là đúng 10 chữ số, nhưng "abc123" lại chứa cả chữ cái và không đủ độ dài.

<!-- Trường hợp 5 -->
```<input type="password" minlength="8" value="123">```  ```<!-- User gõ "123" -->```

- Kết quả: Trình duyệt báo lỗi yêu cầu tăng độ dài của nội dung nhập vào.
- Tại sao: Thuộc tính ```<minlength="8">``` quy định độ dài tối thiểu là 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, không thỏa mãn điều kiện bảo mật tối thiểu đã đặt ra.

![example](img\A2.png)

# CÂU A3: Accessibility
- Đọc phần Accessibility trong chương 07. Giải thích:

- Tại sao ```<label for="email">``` quan trọng cho người dùng screen reader?
- Khi nào dùng ```<fieldset>``` + ```<legend>```? Cho ví dụ cụ thể.
aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có ```<label>?```

1. Tại sao ```<label for="email">``` quan trọng cho Screen Reader?
- Chỉ đường cho Screen Reader: Giúp trình đọc màn hình biết chính xác ô nhập liệu đó dùng để làm gì (ví dụ: "Đây là ô nhập Email").
- Kết nối: Thuộc tính for phải khớp với id của input để tạo liên kết logic giữa nhãn văn bản và ô nhập.
- Tiện lợi cho người dùng: Khi bạn click chuột vào chữ "Email", con trỏ sẽ tự động nhảy vào ô nhập liệu, giúp tăng diện tích tương tác.
2. Khi nào dùng ```<fieldset>``` + ```<legend>?``` Cho ví dụ cụ thể.
- Mục đích: Dùng để nhóm các ô nhập liệu có liên quan chặt chẽ với nhau thành một khối.
- Fieldset: Là cái khung bao quanh nhóm đó.
- Legend: Là cái tiêu đề nằm trên khung.
- Ví dụ: Trong E-commerce, ta dùng để nhóm "Thông tin thanh toán" (số thẻ, ngày hết hạn) hoặc "Địa chỉ giao hàng" (số nhà, phường/xã).
3. ```<aria-label>``` dùng khi nào? Tại sao KHÔNG nên dùng ```<aria-label>``` khi đã có ```<label>?```
- Khi nào dùng: Dùng cho các thành phần không có chữ hiển thị, thường là các nút bấm chỉ có icon.
- Ví dụ: Một nút chỉ có hình chiếc xe đẩy 🛒 thì cần ```<aria-label="Thêm vào giỏ hàng">``` để người khiếm thị hiểu chức năng nút đó.
- Tại sao không dùng chung với ```<label>```: Gây thừa thãi: Trình đọc màn hình sẽ bị "loạn" khi phải đọc cả hai nội dung cùng lúc. Ưu tiên ghi đè: ```<aria-label> ```thường đè lên ```<label>```, nếu bạn viết hai nội dung khác nhau, người dùng Screen Reader sẽ chỉ nghe thấy cái aria-label mà bỏ qua cái label. 

# CÂU A4: Media
- Giải thích thuộc tính loading="lazy" trên thẻ ```<img>```. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
- Tại sao nên cung cấp nhiều ```<source>``` trong thẻ ```<video>?``` Liệt kê ít nhất 3 format video web phổ biến.
- Thuộc tính alt trên ```<img>``` dùng để làm gì? Viết alt tốt cho 3 trường hợp:
- Ảnh sản phẩm iPhone 16
- Ảnh trang trí (decorative)
- Ảnh biểu đồ doanh thu Q1/2026

1. Thuộc tính ```<loading="lazy">``` trên thẻ ```<img>```
- Thuộc tính ```<loading="lazy">``` là một kỹ thuật tối ưu hóa hiệu suất cực kỳ hiệu quả cho trang web hiện đại.
- Nó cải thiện: Tốc độ tải trang ban đầu, trình duyệt sẽ trì hoãn việc tải các hình ảnh nằm ngoài màn hình (off-screen) cho đến khi người dùng cuộn chuột đến gần chúng. Tiết kiệm băng thông, giúp giảm lượng dữ liệu tải xuống không cần thiết nếu người dùng không cuộn xuống hết trang.
Khi nào KHÔNG nên dùng: Ảnh "Above the fold" - Tức là những ảnh nằm ở phần đầu trang mà người dùng thấy ngay khi vừa load (như Banner chính, Hero image). Nếu dùng "lazy" ở đây, ảnh sẽ hiện lên chậm hơn, gây ảnh hưởng xấu đến trải nghiệm người dùng.
2. Tại sao nên cung cấp nhiều ```<source>``` trong thẻ ```<video>?```
- Việc sử dụng nhiều thẻ ```<source>``` bên trong ```<video> ```là cách để bạn đảm bảo video có thể chạy trên mọi trình duyệt.
- Lý do: Mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các bộ giải mã (codec) khác nhau. Nếu trình duyệt không hỗ trợ định dạng đầu tiên, nó sẽ tự động thử các định dạng tiếp theo trong danh sách cho đến khi tìm thấy cái phù hợp.
- 3 format video web phổ biến:
MP4: Phổ biến nhất, tương thích hầu hết mọi thiết bị.
WebM: Định dạng hiện đại của Google, nhẹ và chất lượng cao.
Ogg: Định dạng mã nguồn mở (thường dùng làm phương án dự phòng cũ hơn).
3. Thuộc tính alt trên thẻ ```<img>``` và cách viết tốt.
- Alt cung cấp văn bản thay thế cho hình ảnh trong các kịch bản hình ảnh không thể hiển thị.
- Mục đích kỹ thuật:
Hỗ trợ tiếp cận (Accessibility): Cho phép trình đọc màn hình (Screen Reader) đọc nội dung ảnh cho người dùng khiếm thị.
Hiển thị thay thế: Hiện văn bản nếu đường dẫn ảnh bị lỗi hoặc kết nối mạng yếu.
Tối ưu SEO: Giúp công cụ tìm kiếm hiểu được nội dung của hình ảnh.
- Viết Alt chuẩn cho các trường hợp cụ thể:
Ảnh sản phẩm iPhone 16: ```<alt="iPhone 16 màu xanh ultramarine, mặt lưng có cụm camera kép đặt dọc">```
Ảnh trang trí (Decorative): ```<alt="" (Để trống thuộc tính để trình đọc màn hình tự động bỏ qua, tránh gây nhiễu cho người dùng)>```
Ảnh biểu đồ doanh thu Q1/2026: ```<alt="Biểu đồ cột doanh thu Quý 1 năm 2026 thể hiện mức tăng trưởng 15% so với quý trước">```

# CÂU A5: So sánh ```<figure>``` vs ```<img>```

|-----------|-----------------------------------|-------------------------------------------|
| Đặc điểm  | Cách 1: <img> đơn thuần           | Cách 2: <figure> + <figcaption>           |
|-----------|-----------------------------------|-------------------------------------------|
| Bản chất  | Là một phần tử nội dòng           | Là một khối nội dung độc lập              |
|           | (inline) dùng để nhúng ảnh.       | (block) chứa ảnh và chú thích.            |
|-----------|-----------------------------------|-------------------------------------------|
| Chú thích | Chỉ có văn bản thay thế ẩn (alt), | Có thêm thẻ <figcaption> để hiển          |
|           | không hiển thị chữ trên màn hình. | thị chú thích rõ ràng cho người dùng thấy.|
|-----------|-----------------------------------|-------------------------------------------|
| Mục đích  | Dùng cho các ảnh là một phần của  | Dùng cho các nội dung mang tính minh họa, |
|           | luồng trang web hoặc trang trí.   | có thể đứng tách biệt với văn bản chính.  |
|-----------|-----------------------------------|-------------------------------------------|

- Khi nào dùng Cách 1 ```(<img>)?```
Bạn dùng cách này khi hình ảnh chỉ đóng vai trò bổ trợ, không cần một tiêu đề hay lời giải thích hiển thị trực tiếp bên dưới.
Ví dụ: Logo hoặc Icon chức năng: Khi bạn nhúng logo Shopee ở thanh Header hoặc icon giỏ hàng 🛒 trong nút bấm. Những ảnh này chỉ cần thuộc tính alt để trình đọc màn hình hiểu, không cần dòng chữ "Đây là logo" bên dưới.

- Khi nào dùng Cách 2 ```(<figure>)?```
Bạn dùng cách này khi hình ảnh là một "đơn vị thông tin" quan trọng, cần có mô tả đi kèm để người dùng hiểu rõ ngữ cảnh hoặc thông số.
Ví dụ: Biểu đồ hoặc Ảnh minh họa trong bài viết: Khi bạn đưa vào một biểu đồ doanh thu Q1/2026, bạn cần dùng ```<figcaption>``` để ghi rõ: "Hình 1: Biểu đồ tăng trưởng doanh thu quý 1" để người đọc biết ảnh đó đang nói về cái gì.


# PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)
# CÂU C1: Debug Form
- Form dưới đây có 8 lỗi về validation, accessibility, và best practices. Tìm và sửa tất cả.

- Lỗi 1: Dòng 2 — Input "Tên" không có ```<label for="...">``` và id, vi phạm accessibility (người dùng nhấn vào chữ "Tên" sẽ không nhảy vào ô nhập).
Sửa: ```<label for="name">```Tên:```</label>``` ```<input type="text" id="name" name="fullname" required>```
- Lỗi 2: Dòng 4 — Input Email dùng placeholder thay thế hoàn toàn cho nhãn dán và thiếu id.
Sửa: ```<label for="email">```Email:```</label> <input type="email" id="email" name="email" required>```
- Lỗi 3: Dòng 6 & 7 — Các input Password thiếu nhãn dán định danh và thuộc tính name để phân biệt khi gửi dữ liệu.
Sửa: ```<label for="pwd">```Mật khẩu:```</label>``` ```<input type="password" id="pwd" name="password" required>```
- Lỗi 4: Dòng 9 — Input Phone dùng type="text" và không có nhãn gắn kết.
Sửa: ```<label for="phone">```Phone:```</label>``` ```<input type="tel" id="phone" name="phone" required>```
- Lỗi 5: Dòng 11 — Thẻ ```<select>``` thiếu nhãn dán và thuộc tính name để server nhận diện dữ liệu thành phố.
Sửa: ```<label for="city">```Thành phố:```</label>``` ```<select id="city" name="city">``` ```<option value="hn">```Hà Nội```</option>```...```</select>```
- Lỗi 6: Dòng 16 — Thẻ <label> ghi "Tôi đồng ý" nhưng bên trong hoặc bên cạnh lại thiếu hẳn thẻ <input type="checkbox"> để tích.
Sửa: ```<input type="checkbox" id="terms" name="terms" required>```  ```<label for="terms">```Tôi đồng ý điều khoản```</label>```
- Lỗi 7: Toàn bộ Form — Các thẻ input thiếu thuộc tính name. Nếu không có name, dữ liệu sẽ không được đóng gói để gửi đi khi nhấn "Gửi".
Sửa: Thêm thuộc tính name (ví dụ: name="email", name="phone") vào tất cả các thẻ input.
- Lỗi 8: Toàn bộ Form — Thiếu các ràng buộc validation cơ bản như required để ngăn chặn việc gửi form trống.
Sửa: Thêm thuộc tính required vào các trường bắt buộc nhập.

# CÂU C2: Thiết kế chiến lược Validation
- Bạn xây dựng form đăng ký cho ngân hàng số. Yêu cầu:

- CMND/CCCD: đúng 12 chữ số
- Số tài khoản: 10-15 chữ số
- Email: bắt buộc, đúng format
- PIN: đúng 6 chữ số, KHÔNG hiển thị

1. Regex Pattern cho CMND/CCCD và Số tài khoản
- Trong HTML5, chúng ta sử dụng thuộc tính pattern để kiểm tra dữ liệu bằng biểu thức chính quy (Regex).
CMND/CCCD (Đúng 12 chữ số): ```<pattern="^[0-9]{12}$">``` (Giải thích: ^ bắt đầu, [0-9] là chữ số, {12} là số lượng chính xác, $ là kết thúc).
Số tài khoản (Từ 10 đến 15 chữ số): ```<pattern="^[0-9]{10,15}$">``` (Giải thích: {10,15} quy định độ dài tối thiểu là 10 và tối đa là 15).
2. HTML5 Validation có đủ an toàn cho ngân hàng không?
Trả lời: KHÔNG.
Tại vì: HTML5 validation chỉ chạy trên trình duyệt (Client-side). Nó sinh ra để hỗ trợ người dùng (nhắc họ nhập đúng định dạng ngay lập tức) chứ không phải để bảo mật. Kẻ xấu có thể dễ dàng vượt qua lớp bảo vệ này bằng cách:
- Mở Developer Tools (F12) và xóa thuộc tính required hoặc pattern trong mã nguồn.
- Sử dụng các công cụ như Postman hoặc lệnh cURL để gửi dữ liệu trực tiếp lên Server mà không cần thông qua giao diện web.
- Tắt JavaScript (đối với các ràng buộc phức tạp hơn).
3. 3 loại Validation mà HTML5 KHÔNG THỂ làm được (Phải dùng JavaScript)
Mặc dù HTML5 rất mạnh mẽ, nhưng nó vẫn đầu hàng trước các trường hợp cần logic xử lý:
- Kiểm tra tính duy nhất (Asynchronous Validation): HTML5 không thể tự kết nối với cơ sở dữ liệu để kiểm tra xem "Số CCCD này đã có người đăng ký chưa?". Việc này cần JavaScript (AJAX/Fetch) để gửi yêu cầu lên Server.
- So khớp các trường dữ liệu (Cross-field Validation): Ví dụ như kiểm tra "Nhập lại mã PIN" phải trùng khớp với "Mã PIN". HTML5 không có cơ chế so sánh giá trị giữa hai ô input.
- Ràng buộc logic kinh doanh phức tạp: Ví dụ như "Mã PIN không được là các số tiến liên tục (123456) hoặc trùng với ngày sinh". Những logic này đòi hỏi JavaScript để tính toán và xử lý.
4. 2 rủi ro bảo mật nếu chỉ Validate trên Frontend
Nếu bạn không validate ở Backend và chỉ tin tưởng vào Frontend, ngân hàng của bạn sẽ đối mặt với:
- Rủi ro về tính toàn vẹn dữ liệu (Data Integrity): Dữ liệu rác, sai định dạng hoặc mã độc sẽ tràn vào cơ sở dữ liệu. Điều này có thể làm hỏng logic hệ thống, gây sai lệch số dư tài khoản hoặc khiến các tiến trình xử lý tự động bị lỗi (crash).
- Tấn công tiêm nhiễm (Injection Attacks): Kẻ tấn công có thể bỏ qua Frontend để gửi các đoạn mã độc (SQL Injection, XSS payloads). Nếu Backend không validate lại, những mã này sẽ được thực thi, dẫn đến việc lộ lọt thông tin khách hàng hoặc mất quyền kiểm soát toàn bộ hệ thống ngân hàng.