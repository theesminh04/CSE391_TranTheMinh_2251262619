# PHIẾU BÀI TẬP 08 - JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS
## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

```
1. [Function_Declaration](Function_Declaration_BaiA1.js)  
 
function tinhThueBaoHiem(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong,
        thuc_nhan: luong - thuong
    };
}  

Function Declaration được hoisting đầy đủ 
```
```
2. Function_Expression
   
   const tinhThueBaoHiem = function(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong,
        thuc_nhan: luong - thuong
    };
};

console.log(tinhThueBaoHiem(15000000));

Function Expression có hoisting tên biến nhưng chưa khởi tạo và không được gọi trước khi khai báo  
```
```
3. Arrow_Function
   
   console.log(tinhThueBaoHiem(15000000));

   const tinhThueBaoHiem = (luong) => {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong,
        thuc_nhan: luong - thuong
    };
};

Giống như Function_Expression, Arrow_Function không được gọi trước khi khai báo
```

### Câu A2 (5đ) — Scope & Closure
- Không chạy code, dự đoán output:  
```
Ver1:  
1  
2  
3  
2  
2  
```
```
Ver2:  
3  
3  
3  
0  
1  
2  
```

- Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau trong vòng lặp setTimeout?

`var` có **function scope**, nên trong vòng lặp chỉ có **một biến `i` duy nhất** được dùng chung cho tất cả callback. Khi `setTimeout` chạy, vòng lặp đã kết thúc và `i` đã bằng `3`  
`let` có **block scope**, đặc biệt trong vòng lặp `for`, mỗi lần lặp sẽ tạo ra **một biến `j` riêng**. Vì vậy mỗi callback trong `setTimeout` nhớ một giá trị khác nhau của `j`.  

### Câu A3 (5đ) — Array Methods
Đọc chương 06. Cho mảng: const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  
Viết 1 dòng code cho mỗi yêu cầu (dùng arrow function):  

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

1. Lấy các số chẵn
const soChan = nums.filter(num => num % 2 === 0);

2. Nhân mỗi số với 3
const nhanBa = nums.map(num => num * 3);

3. Tính tổng tất cả
const tong = nums.reduce((total, num) => total + num, 0);

4. Tìm số đầu tiên > 7
const soDauTienLonHon7 = nums.find(num => num > 7);

5. Kiểm tra CÓ số > 10 không
const coSoLonHon10 = nums.some(num => num > 10);

6. Kiểm tra TẤT CẢ đều > 0
const tatCaLonHon0 = nums.every(num => num > 0);

7. Tạo mảng "Số X là [chẵn/lẻ]"
const chanLe = nums.map(num => `Số ${num} là ${num % 2 === 0 ? "chẵn" : "lẻ"}`);

8. Đảo ngược mảng, không mutate mảng gốc
const daoNguoc = [...nums].reverse();  

### Câu A4 (5đ) — Object Destructuring & Spread
Không chạy code, dự đoán output:  

const product = {  
    name: "iPhone 16",  
    price: 25990000,  
    specs: { ram: 8, storage: 256, color: "Titan" }  
};  

// Destructuring  
const { name, price, specs: { ram, color } } = product;  
console.log(name, price, ram, color);  // `chỉ lấy tên, giá, ram và màu`  
console.log(specs);                     // `ReferenceError: specs is not defined` `specs chỉ được dùng để đi vào object con, không tạo ra biến tên specs` 

// Spread  
const updated = { ...product, price: 23990000, sale: true };  `copy toàn bộ product, sau đó ghi đè price thành 23990000, và thêm thuộc tính mới sale: true `  
console.log(updated.price);            // `23990000`  
console.log(updated.sale);             // `true `   
console.log(product.price);            // `23990000  (gốc có đổi?)  `

// Spread gotcha  
const copy = { ...product };  
copy.specs.ram = 16;  
console.log(product.specs.ram);          // `16 vì spread { ...product } chỉ copy shallow copy, tức là chỉ copy lớp ngoài  `

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)
### Bài B1 (20đ) — Quản lý Sản phẩm E-Commerce
[b1](product_manager.js)

### Bài B2 (20đ) — Giỏ hàng (Shopping Cart) 
[b2](shopping_cart.js)  

### Bài B3 (20đ) — Higher-Order Functions Challenge  
[b3](higher_order.js)

---

## PHẦN C — SUY LUẬN (20 điểm)
### Câu C1 (10đ) — Refactor Code
```
Code sau hoạt động đúng nhưng viết rất tệ. Refactor sử dụng array methods + arrow functions:  

const processOrders = orders =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return { id, customer, total, discount, finalTotal: total - discount };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
```


### Câu C2 (10đ) — Thiết kế API
```
Bạn đang thiết kế một thư viện JS nhỏ miniArray cung cấp map, filter, reduce TỰ VIẾT (không dùng built-in).   

const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result[result.length] = fn(arr[i], i, arr);
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result[result.length] = arr[i];
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator;
        let startIndex;

        if (arguments.length >= 3) {
            accumulator = initialValue;
            startIndex = 0;
        } else {
            accumulator = arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

console.log(miniArray.map([1, 2, 3], x => x * 2));           
// [2, 4, 6]

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));     
// [3, 4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
// 10

```