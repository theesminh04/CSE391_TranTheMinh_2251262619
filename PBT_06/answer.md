### PHIẾU BÀI TẬP 06
### CSS FRAMEWORKS — Bootstrap 5 / TailwindCSS

---

### TRACK A — BOOTSTRAP 5
---

### PHẦN A — ĐỌC HIỂU (20 điểm)  
### Câu A1 (10đ) — Grid System  
Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:  
| Kích thước | < 768px | 768px - 991px | ≥ 992px |  
| :--- | :---:| :---: | ---: |
| So cot | 1 | 2 | 4 |
| Box layout | tren xuong duoi | chia thanh 2 hang | nam ngang tren 1 dong | 

- 768px :  
  ** ---------- **   
       BOX1  
  ** ---------- **   
       BOX2  
  ** ---------- **  
       BOX3  
  ** ---------- **  

- 768px - 991px :   
** ---------- **  
  BOX1 | BOX2   
** ---------- **   
  BOX3 | BOX4   
** ---------- ** 

- 992px :  
  ** ------------- **  
  ** B1|B2|B3|B4 **  
  ** --------------**  

- col-md-6 yêu cầu trình duyệt khi màn hình đạt kích thước >= 768px -> cho phần tử này chiếm 50% chiều rộng của thẻ cha chứa nó
- Do đã khai báo col-12 nên trình duyệt sẽ hiểu là phần tử này chiếm 12 cột từ kích thước 0px đến 767 nên việc viết thêm col-sm-12 là thừa vì col-12 đã làm xong rồi 

### Câu A2 (10đ) — Utilities & Components
1. Giải thích class d-none d-md-block  
Đây là sự kết hợp của các utility class điều khiển thuộc tính display dựa trên nguyên tắc Mobile First:
- d-none: Đặt display: none; làm mặc định từ màn hình nhỏ nhất (0px trở lên).
- d-md-block: Khi màn hình đạt tới kích thước md (Medium, ≥ 768px), nó sẽ ghi đè thuộc tính trên thành display: block;.

2. Liệt kê và giải thích 5 spacing utilities (Margin/Padding)
Cú pháp chung của Spacing trong Bootstrap là {thuộc tính}{vị trí}-{kích thước} (Ví dụ: m là margin, p là padding; t là top, x là left/right).

- mt-3 (Margin Top 3): một khoảng đẩy ở phía trên của phần tử. Kích thước 3 tương đương với 1rem 
- px-4 (Padding X 4): một khoảng đệm ở trục X, tức là cả hai bên trái và phải của phần tử. Kích thước 4 tương đương với 1.5rem 
- mb-auto (Margin Bottom Auto): auto tính toán khoảng margin ở phía dưới (bottom). Thường được dùng trong các Flexbox container để đẩy các phần tử khác ra xa (ví dụ: đẩy một footer xuống sát đáy của thẻ cha).
- mx-auto (Margin X Auto): set margin bên trái và bên phải là auto. Đây là cách phổ biến nhất để căn giữa một phần tử block (như thẻ < div >) theo chiều ngang bên trong thẻ cha của nó 
- py-2 (Padding Y 2): tạo khoảng đệm ở trục Y, tức là cả trên và dưới của phần tử. Kích thước 2 tương đương với 0.5rem 
  
3. Sự khác nhau giữa .container, .container-fluid, và .container-md  
Đây là các class tạo khung chứa (wrapper) cho nội dung, giúp căn chỉnh và giới hạn chiều rộng của trang web:

| Class | Đặc điểm và Kích thước |  
| :---: | :---: |  
| .container | Có chiều rộng tối đa (max-width) cố định và thay đổi theo từng điểm gãy (breakpoint) |
| .container-fluid | Chiếm 100% chiều rộng của màn hình ở mọi kích thước thiết bị |
| .container-md | Kết hợp của cả hai, chiếm 100% chiều rộng giống như fluid trên các màn hình nhỏ (dưới 768px). Khi màn hình đạt tới kích thước md (≥ 768px)

---

### PHẦN C — PHÂN TÍCH (20 điểm)
### Câu C1 (10đ) — Tùy biến Bootstrap

1. Bạn muốn đổi màu $primary từ xanh mặc định sang #E63946. Giải thích quy trình (cần công cụ gì, modify file nào).  
Công cụ cần thiết:  
+ Node.js & npm/yarn: Để quản lý gói và cài đặt mã nguồn Bootstrap.  
+ Trình biên dịch SASS (SASS Compiler): Có thể là tiện ích mở rộng trên VS Code (như Live Sass Compiler), dòng lệnh sass (Dart Sass), hoặc các công cụ build (Vite, Webpack, Gulp, Parcel).

Quy trình thực hiện (Các bước cơ bản):
+ Cài đặt Bootstrap: Tải mã nguồn Bootstrap vào dự án của bạn 
+ Tạo file SCSS tùy biến: Tạo một file mới của riêng bạn, ví dụ: custom.scss
+ Ghi đè biến trước, Import sau :  
  // 1. Khai báo biến ghi đè của bạn  
$primary: #E63946;  
  // 2. Import toàn bộ Bootstrap  
@import "../node_modules/bootstrap/scss/bootstrap";  

+ Biên dịch : Dùng SASS Compiler để dịch file custom.scss của bạn thành file custom.css thông thường
+  Sử dụng: Nhúng file custom.css vừa được tạo ra vào thẻ < link > trong file HTML thay vì dùng link CDN mặc định của Bootstrap
  
2. Tại sao KHÔNG nên override trực tiếp .btn-primary { background: red; } mà nên dùng SASS variables?  
- Nếu viết trực tiếp .btn-primary { background: red !important; } vào file CSS đó là một "anti-pattern" khi dự án lớn hơn. Đây là lý do bạn nên dùng SASS variables:  
  +Tính đồng bộ toàn hệ thống (Single Source of Truth)  
  +Tự động tính toán các trạng thái (Hover, Active, Focus)
  +Code sạch và nhẹ hơn (Maintainability)

### Câu C2 (10đ) — So sánh  

1. 
| Tiêu chí | CSS Thuần (Pure CSS) | Bootstrap |
| :---: | :---: | :---: |
| Số dòng CSS cần viết | Nhiều dòng, tự định nghĩa mọi thứ từ flexbox, margin, padding, màu sắc, shadow cho đến trạng thái hover. | Gần như bằng 0 |
| Thời gian phát triển | Lâu hơn, xây dựng từ con số 0, tự căn chỉnh từng pixel và đặc biệt tốn thời gian để test giao diện (responsive) trên nhiều màn hình khác nhau. | Nhanh, chỉ cần copy/paste HTML structure từ tài liệu |
| Khả năng tùy biến | 100% | Khá cứng và bị phụ thuộc cũng như tùy biến sâu bắt buộc phải dùng SASS để can thiệp hoặc phải viết CSS ghi đè | 

1. NÊN dùng Bootstrap khi:  
- Nhanh
- Làm trang admin/dashboard
- Làm việc trong team thiếu UI/UX Designer
- Dự án không có "Design System" riêng
  
2. KHÔNG NÊN dùng Bootstrap khi:
- Dự án yêu cầu Pixel-Perfect theo thiết kế Figma/Adobe XD
- Yêu cầu khắt khe về tốc độ tải trang (Performance)
- Trang Landing Page mang tính nghệ thuật/Sáng tạo cao

