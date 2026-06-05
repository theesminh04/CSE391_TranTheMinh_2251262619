### PHIẾU BÀI TẬP 05
### CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass
--- 

### PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (5đ) — Viewport & Mobile-First
- Viết chính xác thẻ <meta viewport> chuẩn. Giải thích từng thuộc tính.  
  1. Thẻ < meta viewport > chuẩn  :   
  + < meta name="viewport" content="width=device-width, initial-scale=1.0" >  
  + Trong đó, width=device-width đặt chiều rộng viewport bằng chiều rộng thật của thiết bị, còn initial-scale=1.0 đặt mức zoom ban đầu là 100%.  
  + Thẻ này đặt trong phần <head> của file HTML

- Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)  
  + iPhone thường giả lập trang như một trang desktop rộng khoảng 980px và thu phóng sao cho vừa màn hình khiến cho chữ bị nhỏ và phải zoom để nhìn.  
  
- Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?  
  
  + Mobile-First là viết CSS cho mobile trước, sau đó dùng @media (min-width: 768px) để mở rộng cho màn hình lớn.   
  
  + Desktop-First là viết CSS cho desktop trước, sau đó dùng @media (max-width: 767px) để chỉnh lại cho mobile.   
  
  + Mobile-First được khuyên dùng vì phù hợp với thói quen dùng điện thoại hiện nay, giúp giao diện gọn hơn, ưu tiên nội dung quan trọng và thường có hiệu năng tốt hơn trên thiết bị di động.

### Câu A2 (5đ) — Ghi lại breakpoints chuẩn (theo tài liệu hoặc Bootstrap). Cho mỗi breakpoint:

| Breakpoint | Kích thước (Pixel) | Thiết bị đại diện | Ví dụ: Số cột lưới sản phẩm |
| :--- | :---: | :---: | ---: |
| Extra Small (xs) | < 576px | Điện thoại di động (đứng) | 1 cột |
| Small (sm) | ≥ 576px | Điện thoại (nằm ngang), Tablet nhỏ | 2 cột |
| Medium (md) | ≥ 768px | Máy tính bảng (Tablet) | 3 cột |
| Large (lg) | ≥ 992px | Laptop, Máy tính để bàn nhỏ | 4 cột |
| Extra Large (xl) | ≥ 1200px | Màn hình Desktop tiêu chuẩn | 4 hoặc 5 cột |
| Extra Extra Large (xxl) | ≥ 1400px | Màn hình lớn, Độ phân giải cao | 6 cột |

### Câu A3 (5đ) — Media Queries
Đọc CSS sau, cho biết ở mỗi kích thước màn hình, .container có width bao nhiêu? Điền bảng.  

| Chiều rộng màn hình | .container width | 
| :---: | :---: |  
| 375px (iPhone SE) | 	375px |
|600px|	540px|
|800px|	720px|
|1000px|	960px|
|1400px|	1140px|

### Câu A4 (5đ) — SCSS Basics
Đọc chương 16. Giải thích 4 tính năng chính của SCSS và cho ví dụ:

| Tính năng | Giải thích | Ví dụ Code |
| :---: | :---: | :---: |
| Variables (Biến) | 	Cho phép lưu trữ các giá trị (màu sắc, font, kích thước) vào một cái tên bắt đầu bằng dấu $. Khi cần đổi màu cả website, bạn chỉ cần sửa ở 1 nơi. | $primary-color: #ff5733; button { background: $primary-color; } | 
|Nesting (Lồng nhau)|	Viết các selector con bên trong selector cha, giống hệt cấu trúc của HTML. Giúp code gọn gàng, dễ quản lý hơn hẳn.| nav {ul { list-style: none; } li { display: inline-block; } } | 
|Mixins|	Là những "khối code" mẫu có thể tái sử dụng nhiều lần. Nó giống như một hàm, thậm chí có thể truyền tham số vào để tùy biến. | @mixin flex-center {display: flex;align-items: center; } .box { @include flex-center; } |
|@extend / Inheritance | Giúp một selector "kế thừa" toàn bộ thuộc tính của một selector khác. Rất hữu ích để tránh lặp code cho các thành phần tương tự nhau. | .btn { padding: 10px; border: 0; } .btn-save { @extend .btn; background: green;}  



- Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS   → CSS?  
    + Các trình duyệt như google, edge,.... chỉ hiểu được CSS mà file
SCSS không phải là CSS chuẩn mà là những cú pháp đặc biệt gồm
biến, lồng,.... mà cơ chế của trình duyệt không xử lý được.

   + Bước để chuyển SCSS sang CSS là biên dịch với các bước sau 
Viết code trong file .scss -> chạy công cụ biên dịch -> công cụ sẽ 
tạo ra file .css tương ứng từ file scss -> nhúng file .css mới vào
file HTML để sử dụng. 

--- 

### PHẦN B — THỰC HÀNH CODE (60 điểm)
- Bài B3 (20đ) — SCSS Refactor
- Compile — Biên dịch SCSS → CSS và ghi lại lệnh compile trong answers.md 

Bộ biên dịch Sass (Dart Sass) để chuyển đổi từ các file `.scss` nằm trong thư mục `scss/` thành file định dạng CSS chuẩn nhằm nhúng trực tiếp vào file HTML.

- npm install -g sass
- sass scss/style.scss responsive.css
- sass scss/style.scss responsive.css --style=compressed
- sass --watch scss/style.scss:responsive.css

---

### PHẦN C — PHÂN TÍCH (20 điểm)

Câu C1 (10đ) — Phân tích trang web thực

1. Navigation 
- Desktop (1440px): Thanh điều hướng (Header) hiển thị đầy đủ và rộng rãi. Ô tìm kiếm (Search bar) dài ở trung tâm, các liên kết phụ (Kênh người bán, Tải ứng dụng, Kết nối...) hiển thị rõ ràng trên cùng.
- Tablet (768px): Cấu trúc Navigation không thay đổi thành Hamburger hay Dropdown. Thay vào đó, nó bị "ép" (squished) lại. Thanh tìm kiếm bị thu ngắn, các khoảng trắng bị cắt giảm tối đa.
- Mobile (375px): Vẫn không xuất hiện menu Hamburger. Giao diện bị vỡ khá nhiều ở phần Header do thanh tìm kiếm và các icon giỏ hàng bị bóp méo, tràn viền hoặc che khuất lẫn nhau do không đủ không gian.

2. Lưới content thay đổi cột
Sự thay đổi rõ rệt nhất nằm ở phần danh sách sản phẩm (Product Grid):
- Desktop (1440px): Lưới hiển thị 5 cột sản phẩm.
- Tablet (768px): Lưới tự động giảm xuống còn 4 cột sản phẩm.
- Mobile (375px): Lưới tiếp tục giảm xuống chỉ còn 2 cột sản phẩm để cố gắng giữ cho hình ảnh không bị quá nhỏ.

3. Elements bị ẩn trên mobile
- Dựa trên ảnh chụp ở 375px, Shopee gần như không ẩn (display: none) các thành phần lớn.
- Cột Sidebar (Bộ lọc tìm kiếm) bên trái vẫn bị ép hiển thị, dẫn đến việc nó chiếm một phần diện tích rất nhỏ, làm cho chữ bên trong bị rớt dòng và rất khó đọc. Các liên kết text nhỏ trên đỉnh Header bị che khuất hoặc tràn ra ngoài viewport thay vì được ẩn đi một cách có chủ đích.

4. Font size 
- Không có sự thay đổi rõ rệt về kích thước chữ. Font size dường như được giữ nguyên tĩnh (static) trên cả 3 màn hình. 
- Hậu quả của việc không dùng các đơn vị chữ responsive (như rem, vw) là trên màn hình 375px, chữ ở thanh bộ lọc và tiêu đề sản phẩm bị rớt dòng liên tục, gây rối mắt.

### Câu C2 (10đ) — Thiết kế Responsive Strategy
1. Mobile 375px  
![sodo](screenshots\mobile375pxSODO.jpg)

2. Tablet 768px
![SODO](screenshots\tablet768pxSODO.jpg)

3. Desktop 1440px
![soDO](screenshots\desktop1440SODO.jpg)

