## PBT03 CSS CORE — Selectors, Box Model, Inheritance & Cascade

### PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
### Câu A1 (5đ) — 3 Cách nhúng CSS

Đọc chương 08. Liệt kê 3 cách nhúng CSS vào HTML (inline, internal, external). Mỗi cách:

Viết 1 ví dụ code
Ưu điểm và nhược điểm
Khi nào nên dùng
Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao?

- 3 cách nhúng CSS vào HTML là inline, internal và external
- Với inline ưu điểm là nhanh, tiện còn nhược điểm là chỉ dùng khẩn cấp và override tạm thời. Ví dụ code: 

```css
<h1 style="color: blue; text-align: center;">Chào mừng bạn!</h1>
<p style="font-size: 20px; color: red;">Đây là đoạn văn được định dạng bằng Inline CSS.</p> 
```

- Với internal ưu điểm là nhanh, không cần tạo thêm file, phù hợp với web 1 file duy nhất bên cạnh đó thì nhược điểm là làm file HTML bị dài và rối, không thể tái sử dụng cho các trang khác. Thời điểm thích hợp để sử dụng internal khi làm landing page, viết đè hoặc khi đang trong quá trình test nhanh giao diện UX/UI mà không muốn chuyển đổi giữa các file. Ví dụ code: 

```css 
 <head> 
<style>
    body { background-color: #0f0e0e; }
    h1 { color: darkblue; }
</style>
</head> 
```


- Với external ưu điểm có thể tái sử dụng một file CSS cho rất nhiều trang HTML, dễ bảo trì, tốc đô trình duyệt lưu vào bộ nhớ đệm, tải nhanh hơn ở các lần sau. Nhược điểm là tốn thêm một yêu cầu tải file (HTTP request) lúc ban đầu và nếu file CSS chưa tải xong thì trang web trông sẽ thô. Thời điểm khuyên dùng external khi làm web có từ 2 trang trở lên, tối ưu SEO và tốc độ tải trang nhờ cơ chế cache của trình duyệt. Ví dụ code: (Giả sử file CSS ở ví dụ internal là "style.css" thì mình có thể sử dụng file đó nhúng vào file HTML ở ví dụ dưới đây)

```css
<head> 
    <link rel="stylesheet" href="style.css">
</head> 
```

### Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.
- Xếp theo thứ tự inline - internal và external, vì inline nằm ngay cạnh phần tử nên có quyền lực cao nhất trực tiếp thay đổi. Theo em nghĩ internal sẽ "thắng" hai cách nhúng CSS còn lại nhưng cũng tùy thuộc vào xem trong lúc nhúng CSS có sử dụng thêm gì không ví dụ như !important được cài vào internal thì sẽ "thắng" tất cả.

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ và 45.990.000đ 
3. #app header                  → Chọn: ShopTLU Home Products About
4. nav a:first-child             → Chọn: Home (là thẻ a đầu tiên trong nav)
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: - 25.990.000đ, Mô tả sản phẩm... (của iPhone 16), 45.990.000đ
Mô tả sản phẩm... (của MacBook Pro)
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

![ketquaslectortest](screenshots\selectortestbaiA2.JPG)

### Câu A3 (7đ) — Box Model — Tính toán kích thước
Đọc chương 11 (Box Model). Tính kích thước thực tế (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

/* Trường hợp 1: content-box (mặc định) */
- .box-1 {  
    width: 400px;  
    padding: 20px;  
    border: 5px solid black;  
    margin: 10px;  
}  
→ Chiều rộng hiển thị = $400 \text{ (width)} + 20 \times 2 \text{ (padding)} + 5 \times 2 \text{ (border)} = 450\text{px}$  
→ Không gian chiếm trên trang = $450 \text{ (visual width)} + 10 \times 2 \text{ (margin)} = 470\text{px}$.

/* Trường hợp 2: border-box */  
.box-2 {  
    box-sizing: border-box;  
    width: 400px;  
    padding: 20px;  
    border: 5px solid black;   
    margin: 10px;  
}  
→ Chiều rộng hiển thị = 400px   
→ Kích thước content thực tế = $400 \text{ (width)} - 20 \times 2 \text{ (padding)} - 5 \times 2 \text{ (border)} = 350\text{px}$.  
→ Không gian chiếm trên trang = $400 \text{ (visual width)} + 10 \times 2 \text{ (margin)} = 420\text{px}$  

/* Trường hợp 3: Margin collapse */  
.box-a { margin-bottom: 25px; }  
.box-b { margin-top: 40px; }  
→ Khoảng cách giữa box-a và box-b = $40    
→ Giải thích tại sao KHÔNG PHẢI 65px:  Khi hai lề gặp nhau trình duyệt sẽ không cộng dồn nhau thay vào đó sẽ so sánh hai giá trị va chọn giá trị lớn hơn và chỉ xảy ra theo chiều dọc còn chiều ngang vẫn cộng dồn được.

### Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = bao nhiêu?
- $40\text{px} + (-10\text{px}) = 30\text{px}$ 
- Xảy ra khi xuất hiện có dấu âm, khi này trình duyệt không chọn giá trị lớn nhất nữa mà chuyển qua cộng đại số.

### Câu A4 (5đ) — Specificity (Độ ưu tiên)
1. Cho các CSS rules sau cùng target 1 element <p class="price" id="main-price"> 
| Rule | Selector    | ID | Class | Element | Tổng điểm(Quy đổi) |  
|   A  | p           | 0  | 0     | 1       |  0,0,1 (1 điểm)    |  
|   B  | .price      | 0  | 1     | 0       |  0,1,0 (10 điểm)   |    
|   C  | #main-price | 1  | 0     | 0       |  1,0,0 (100 điểm)  |  
|   D  | p.price     | 0  | 1     | 1       |  0,1,1 (11 điểm)   |  

2. Kết quả: Màu Đỏ (Red).

Giải thích: Rule C thắng vì sử dụng ID selector. Trong hệ thống tính điểm của CSS, 1 điểm ở cột ID có giá trị lớn hơn bất kỳ số lượng Class hay Element nào cộng lại. Trình duyệt so sánh từ trái sang phải, và Rule C là quy tắc duy nhất có giá trị ở cột đầu tiên (ID).

3. Nếu thêm < p class="price" id="main-price" style="color: orange;" >, element có màu gì?

Kết quả: Màu Cam (Orange).

Giải thích: inline luôn có độ ưu tiên cao hơn các quy tắc viết trong file .css hoặc thẻ < style >."Cấp bậc" cao hơn cả ID selector trong thang đo Specificity.

4. Nếu Rule A thêm !important, element có màu gì? Tại sao?

Kết quả: Màu Đen (Black).

Giải thích: !important là phép tối thượng. Khi thêm !important vào một thuộc tính ghi đè tất cả các quy tắc tính điểm thông thường (kể cả ID selector và Inline Style).

***

### PHẦN B — THỰC HÀNH CODE (55 điểm)
### Bài B1 (20đ) — Style trang Profile
Lấy file profile.html từ PBT_01 (hoặc tạo mới). Tạo file style.css external.  

- Có 6 loại Selector được sử dụng trong bài code trên:  
1. Selector toàn cục  
2. Selector phần tử  
3. ID Selector  
4. Class Selector  
5. Selector hậu duệ  
6. Selector lớp giả  
   
### Bài B2 (20đ) — Box Model Lab
Tạo file boxmodel_lab.html + boxmodel.css.

- Phần 1 — Chứng minh content-box vs border-box (10đ):  

![kichthuoctong](screenshots\phan1b2phanB.jpg)
![kichthuocborder](screenshots\2phan1b2phanB.jpg)

Hộp 1 (content-box): chiều rộng thực tế = 350 px 

Hộp 2 (border-box): chiều rộng thực tế = 300 px 

Sự khác biệt nằm ở cách trình duyệt tính toán kích thước tổng thể của phần tử dựa trên giá trị box-sizing:  

Hộp 1 (content-box - Hành vi mặc định của CSS):  
Khai báo width: 300px áp dụng cho phần lõi nội dung. Khi render, trình duyệt sẽ thêm khoảng đệm và viền ra phía bên ngoài lõi nội dung đó.

Hộp 2 (border-box):  
Khai báo width: 300px áp dụng cho toàn bộ kích thước của hộp. Trình duyệt sẽ tự động bóp nhỏ phần diện tích dành cho nội dung bên trong lại (chỉ còn 250px) để nhường chỗ cho padding và border.  

- Phần 2 — Layout 3 cột (10đ):

Tạo layout 3 cột trong 1 container 1000px:

Cột trái (sidebar): 250px, background nhạt, padding: 15px  
Cột giữa (content): 500px, padding: 20px  
Cột phải (ads): 250px, background nhạt, padding: 15px  
Điều kiện: Tổng 3 cột phải = 1000px. Nếu KHÔNG dùng border-box, tính toán  cho thấy tổng > 1000px. Chụp screenshot cả 2 trường hợp.  

![borderbox](screenshots\sudungborderbox.jpg)  
![contentbox](screenshots\kosudungborderbox.jpg)  

### Bài B3 (15đ) — Specificity Battle
Tạo file specificity.html + specificity.css.

Tạo 1 trang với phần tử: < p id="demo" class="text highlight">Hello World < /p>

Yêu cầu: Viết 10 CSS rules khác nhau cùng target phần tử trên, mỗi rule đặt color khác nhau. Sắp xếp TỪ THẤP ĐẾN CAO theo specificity.  

1. Danh sách 10 Rules & Specificity Score:
*: (0,0,0) - Gray

p: (0,0,1) - Silver

.text: (0,1,0) - Blue

p.text: (0,1,1) - Green

.text.highlight: (0,2,0) - Orange

p.text.highlight: (0,2,1) - Brown

#demo: (1,0,0) - Purple

p#demo: (1,0,1) - Pink

#demo.text: (1,1,0) - Red

p#demo.text.highlight: (1,2,1) - Darkblue  

2. Phần tử sẽ hiển thị màu xanh tim do selector p#demo.text.highlight có độ ưu tiên (Specificity Score) cao nhất (1,2,1). Trong CSS, khi có xung đột về thuộc tính (như cùng là color), trình duyệt sẽ chọn quy tắc có điểm số cao nhất để áp dụng, bất kể thứ tự xuất hiện trong file.

3. ![ketquab3B](screenshots\kosudungborderbox.jpg) 

4. Kết quả không thay đổi khi thay đổi thứ tự rules do chỉ có tác dụng khi hai selector có cùng độ ưu tiên. Vì 10 quy tắc trên đều có điểm Specificity khác nhau, nên dù đưa màu Gray xuống cuối cùng, màu Darkblue vẫn sẽ thắng vì nó có trọng số lớn hơn.

***

### PHẦN C — DEBUG & SUY LUẬN (20 điểm)
Câu C1 (10đ) — Debug CSS Layout  
Layout dưới đây bị vỡ. Container rộng 960px, sidebar + content phải nằm cạnh nhau. Nhưng content bị đẩy xuống dòng mới.

1. Tính chiều rộng thực tế của sidebar và content (content-box!)  
Sidebar: 300px (width) + 40px (padding 2 bên) + 2px (border 2 bên) = 342px  
Content: 660px (width) + 60px (padding 2 bên) + 2px (border 2 bên) = 722px  

2. Do layout yêu cầu cả hai thành phần cùng nằm trên một hàng nhờ float: left nên cần có tổng chiều rộng nhỏ hơn hoặc bằng chiều rộng của cha là .container. Tổng chiều rộng yêu cầu 342x + 722px = 1064px mà chiều rộng container cho phép là 960px. Do 1064 > 960 nên không đủ chỗ để chứa cả hai trên hàng ngang nên theo float thì phần tử xuất hiện sau .content sẽ xuống dưới. 

3. Cách 1: Sử dụng box-sizing: border-box (Cách chuẩn hiện đại)  
Tổng width sau khi áp dụng: 300px + 660px = 960px (Vừa khít container).  
   Cách 2: Tính toán lại width thủ công (Cách truyền thống / Không dùng border-box)  
Width mới của Sidebar: 300px - 40px (padding) - 2px (border) = 258px  
Width mới của Content: 660px - 60px (padding) - 2px (border) = 598px  
Tổng width sau khi điều chỉnh: (258+42) + (598+62) = 300 + 660 = 960px  

4. ![ketquabC1C](screenshots\ketquaC1phanC.JPG)  

### Câu C2 (10đ) — Cascade Puzzle
1. "Sản phẩm A" (h2) có font-size = 20px và color = green  

Về font-size: Thẻ h2 này nằm trong < div class="container" > (14px) và < body > (16px). Tuy nhiên, thuộc tính kế thừa luôn có độ ưu tiên thấp nhất. Nó bị nhắm trúng đích bởi rule .card .title { font-size: 20px; }. Do đó, kích thước chữ là 20px.  

Về color: Có 2 rule nhắm trực tiếp vào màu sắc của thẻ này:  

#featured .title { color: red; } (Độ ưu tiên / Specificity: 1 ID, 1 Class = 110)  
.highlight { color: green !important; } (Độ ưu tiên / Specificity: 1 Class = 10)  

2. "Mô tả sản phẩm" (p trong card featured) có color = blue  
   
Rule .card p { color: inherit; } nhắm trực tiếp vào thẻ < p > này (độ ưu tiên: 1 Class, 1 Tag = 11).  

Từ khóa inherit buộc phần tử phải lấy giá trị đã được tính toán (computed value) từ thẻ cha trực tiếp của nó, bất chấp các rule khác.

3. "Sản phẩm B" (h2) có font-size = 20px và color = blue  

Về font-size: Tương tự như "Sản phẩm A", rule .card .title { font-size: 20px; } nhắm trực tiếp vào phần tử này và đè lên các giá trị kế thừa từ .container hay body.  

Về color: Phần tử này không bị nhắm mục tiêu bởi bất kỳ CSS rule nào quy định màu sắc trực tiếp (Nó không nằm trong #featured, cũng không có class .highlight). Do đó, CSS sẽ sử dụng cơ chế kế thừa (Inheritance). Nó nhìn lên thẻ cha là < div class="card"> đang có color: blue; và lấy màu này làm của mình.
4. "Mô tả sản phẩm B" (p.highlight) có color = green  

Có 2 rule nhắm trực tiếp vào thẻ < p> này:  
.card p { color: inherit; } (Độ ưu tiên: 1 Class, 1 Tag = 11)  
.highlight { color: green !important; } (Độ ưu tiên: 1 Class = 10)