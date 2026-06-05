## PBT_04: CSS LAYOUT — Positioning, Flexbox & Grid
---
### PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (10đ) — 5 Loại Positioning  
Đọc chương 12. Điền bảng sau mà KHÔNG tra Google:

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :--- | :--- | :--- | :--- |
| static | có | mặc định trong luồng tài liệu | có | hành vi mặc định|
| relative | có | ban đầu của chính nó | có | dịch chuyển nhẹ phần tử mà không ảnh hưởng layout xung quanh |
| absolute | không | tổ tiên được định vị gần nhất | có | nút đóng (X) ở góc|
| fixed | không | viewport | không | thanh điều hướng (navbar) cố định|
| sticky | có | kết hợp giữa vị trí ban đầu và viewport, cha có thể cuộn | có | header của bảng dữ liệu|

---

Câu hỏi thêm:  
- Tham chiếu body khi không có phần tử cha/ông nào có position khác static.
- Tham chiếu parent khi parent (hoặc tổ tiên gần nhất) được set position thành relative (phổ biến nhất), absolute, fixed hoặc sticky.
- `Nearest positioned ancestor`  là phần tử  bọc ngoài gần nhất trong cây DOM được kích hoạt `position` và đóng vai trò làm hệ quy chiếu cho các thẻ `absolute`  căn chỉnh trên, dưới, trái, phải.

### Câu A2 (10đ) — Flexbox vs Grid  
![c2pA](screenshots\bai2phanA.jpg)

--- 

### PHẦN B — THỰC HÀNH CODE (60 điểm)
### Bài B1 (15đ) — Positioning Playground
![b1pB](screenshots\bai2phanA.jpg)

---

### PHẦN C — SUY LUẬN (20 điểm)
### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?
1. Navigation bar ngang (logo + menu + buttons)	
 - sử dụng Flexbox
 - Vì: Flexbox chuyên cho bố cục 1 chiều (ngang/dọc). Dùng justify-content để phân bổ đều, align-items: center để căn giữa dọc.
2. Lưới ảnh Instagram (3 cột đều, số ảnh không biết trước)
 - sử dụng CSS Grid
 - Vì: Grid thiết kế cho 2 chiều, tự động tính toán hàng/cột. Dễ dàng dùng grid-template-columns: repeat(auto-fit, minmax(...)) cho responsive.
3. Layout blog (main content + sidebar)
 - sử dụng Grid + Flexbox
 - Vì: Grid quản lý bố cục tổng thể (2 cột: sidebar + main), Flexbox xử lý nội dung bên trong từng card.
4. Footer 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
 - sử dụng Grid
 - Vì: Footer cần các cột có chiều rộng bằng nhau và chiều cao đầy đủ, Grid với grid-column: 1/-1 rất phù hợp.
5. Card sản phẩm (ảnh trên, text giữa, nút dưới - nút dính đáy)
 - sử dụng Flexbox
 - Vì: Flexbox với flex-direction: column và margin-top: auto cho nút luôn ở đáy card.

### Câu C2 (10đ) — Debug Flexbox
Layout sau bị lỗi. Mô tả lỗi và sửa. GIẢI THÍCH LỖI VÀ CÁCH SỬA

1. Lỗi 1: Cards không đều chiều cao - nút "Mua" nhảy lên/xuống
- Nguyên nhân:
  + Mỗi .card không được định dạng như một cột flex theo chiều dọc.
  + Khi ảnh hoặc nội dung bên trong card có độ cao khác nhau, card cũng có chiều cao khác nhau.
  + Nút .btn được đặt theo luồng bình thường nên nó xuất hiện ngay sau nội dung, dẫn đến nút nằm cao hoặc thấp tùy card.
- Tại sao sửa:
  + Nếu dùng .card { display: flex; flex-direction: column; }, mỗi card sẽ tổ chức nội dung theo cột.
  + Khi dùng .btn { margin-top: auto; }, nút sẽ luôn được đẩy xuống đáy card.
  + Kết quả: dù ảnh cao thấp khác nhau, nút "Mua" vẫn đứng cùng một hàng so với đáy và card trông cân đều.

1. Lỗi 2: Hero dính góc trái trên
- Nguyên nhân:
  + .hero có display: flex, nhưng không có align-items và justify-content.
  + Flex container mặc định căn nội dung về góc trên bên trái.
- Tại sao sửa:
  + .hero { align-items: center; justify-content: center; } sẽ căn giữa cả theo trục dọc và trục ngang.
  + Như vậy phần nội dung hero sẽ đứng chính giữa vùng cao 100vh, trông đẹp và cân đối hơn.

1. Lỗi 3: Sidebar bị co lại khi content dài
- Nguyên nhân:
  + .layout chỉ có display: flex;
  + .sidebar có width nhưng vẫn có thể bị co lại khi không giới hạn độ co, hoặc khi vùng .content quá lớn.
- Tại sao sửa:
  + .sidebar { flex-shrink: 0; } ngăn sidebar bị co lại khi content bên cạnh mở rộng.
  + .content { flex: 1; min-width: 0; } giúp nội dung chính chiếm phần còn lại mà không làm layout vỡ.
  + .layout { align-items: flex-start; } giữ sidebar và content bắt đầu ở cùng trục ngang trên.
  
Lỗi:
- Lỗi 1 là do thiết kế card thiếu flex-column và nút button không được ghim xuống đáy.
- Lỗi 2 là do thiết kế flex container thiếu căn giữa nội dung.
- Lỗi 3 là do sidebar thiếu quy tắc ngăn co và content thiếu min-width để co giãn đúng.

Kết quả của sửa sẽ là:
- Cards đều chiều cao và nút "Mua" không nhảy lên/xuống.
- Hero nằm chính giữa, không còn dính góc.
- Sidebar giữ đúng độ rộng khi content dài.