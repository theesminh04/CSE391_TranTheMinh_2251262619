### PHIẾU BÀI TẬP 07
### JAVASCRIPT BASICS — Variables, Data Types, Control Structures
--- 

### PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
Câu A1 (5đ) — var / let / const  
Đọc chương 03. Không chạy code, dự đoán output cho từng đoạn:  

| Đoạn | Biến sử dụng | Dự đoán của kết quả | Kết quả chạy thực tế |
| :---: | :---: | :---: | :---: |
| 1 | var | undefined | undefined |
| 2 | let | error | ReferenceError: Cannot access 'y' before initialization |
| 3 | const | error | TypeError: Assignment to constant variable.4const (Array)[1, 2, 3, 4][ 1, 2, 3, 4 ]5let (Block)In ra 2, sau đó in ra 1Trong block: 2Ngoài block: 1 |
| 4 | array | [1, 2, 3, 4] | [ 1, 2, 3, 4 ] |
| 5 | block | In ra 2, sau đó in ra 1 | In ra 2, sau đó in ra 1 |

### Câu A2 (5đ) — Data Types & Coercion
| Câu lệnh (console.log)| Dự đoán |	Kết quả thực tế |  
| :---: | :---: | :---: |  
|typeof null|"object"|"object"|  
|"5" + 3|"53"|"53"|  
|"5" - 3|2|2|  
|"5" * "3"|15|15|  
|true + true|2|2|  
|[] + []|"" (Rỗng)|""| 
|[] + {}|"[object Object]"|"[object Object]"|  
|{} + []|"[object Object]"|"[object Object]"|  

- Toán tử cộng (+) ưu tiên Chuỗi (String): Ở console.log("5" + 3), do "5" là chuỗi, số 3 bị ép thành chuỗi "3". Kết quả là "5" + "3" = "53".  
- Toán tử trừ (-) (và *, /) chỉ dành cho Số (Number): Ở console.log("5" - 3), chuỗi "5" được ép thành số 5. Phép tính trở thành 5 - 3, cho ra kết quả toán học chuẩn xác là 2.  
  
### Câu A3 (5đ) — So sánh == vs ===  
Dự đoán true hay false:  

| Câu lệnh | Kết quả |  
| :---: | :---: |  
|5 == "5"|true|
|5 === "5"|false|
|null == undefined|true|
|null === undefined|false|
|NaN == NaN|false|
|0 == false|true|
|0 === false|false|
|"" == false|true|  

Từ giờ nên dùng == thay vì === vì :  

- Tránh lỗi ngầm định
- Dễ đọc và bảo trì 
- Hiệu suất nhỏ

### Câu A4 (5đ) — Truthy & Falsy 
Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:  
1. Các giá trị Falsy trong Js: 
false, 0, 0n, "", '', ``,  null, undefined, NaN  
2. 
| Lệnh if | Dự đoán |
| :---: | :---: |
|if ("0") console.log("A"); | in A |
|if ("") console.log("B");|khong in|
|if ([]) console.log("C");| in C|
|if ({}) console.log("D");| in D|
|if (null) console.log("E");| khong in|
|if (0) console.log("F");| khong in |
|if (-1) console.log("G");| in G |
|if (" ") console.log("H");| in H|

### Câu A5 (5đ) — Template Literals 

- Cách 1:  
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

- Cách 2:  
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

- Cách 3:  
 `var html = `  
` <div class="card"> `  
    ` <h2>${title}</h2> `  
    ` <p>${description}</p> `  
    ` <span>Giá: ${price}đ</span> `  
` </div>`; 

--- 

### PHẦN C — SUY LUẬN (20 điểm)
### Câu C1 (10đ) — Debug JavaScript

| Lỗi | Giải thích | Sửa |
| :---: | :---: | :---: |
|phép gán - if (giaSauGiam = 0) | dấu "=" là toán tử gán không phải so sánh, trong code có gán "giaSauGiam" thành 0 khiến if nhận giá trị 0 nên sẽ không bao giờ chạy và luôn trả về 0 | dùng toán tử so sánh nghiêm ngặt === |
|lỗi ẩn là Closure với "var" trong vòng lặp| thay vì in từ item 0 -> item 4 thì vòng lặp này in item 5 x5 lần do "var" có phạm vi của hàm "function scope" nên không phải theo khối "block scope", vòng lặp "for" chạy nhanh và kết thúc đồng hời i tăng lên 5 | thế "var" bằng "let", "let" có phạm vi của khối (blockscope) nên mỗi vòng lặp sẽ tạo bản lặp của biến i với giá trị tại thời điểm đó |
|return "Phần trăm giảm không hợp lệ"|việc trả về một chuỗi (`string`) khi gặp lỗi là một bad practice. nếu hệ thống lấy kết quả này đi tính toán tiếp (ví dụ: `gia2 + 10000`), nó sẽ biến thành phép nối chuỗi hoặc ra `NaN`, làm sập logic phía sau.|(`Throw Error`) để chặn ngay khi dữ liệu sai.|
|bỏ qua kiểm tra kiểu dữ liệu input const gia = tinhGiaGiamGia("100000", 20) | truyền vào một chuỗi `"100000"` thay vì số nguyên | cho iput thành số hoặc thêm logic kiểm tra `typeof` bên trong hàm, truyền vào đúng kiểu số: `100000`. |
|bỏ qua kiểm tra giá bán âm hoặc not valid: thiếu validate giaBan| một sản phẩm không thể có giá bán âm < 0 hoặc giá bán là chữ NaN| add điều kiện kiểm tra giaBan|
|lạm dụng `var` cho biến không thay đổi (`var giamGia = giaBan * phanTramGiam / 100`)| `var` đã lỗi thời vì nó gây ra các vấn đề về hoisting và scoping, Hơn nữa, biến `giamGia` chỉ được tính một lần và không bao giờ gán lại.|dùng `const` để khai báo biến tĩnh, giúp code an toàn và dễ đọc hơn|