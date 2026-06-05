# PHIẾU BÀI TẬP 09
## DOM MANIPULATION & EVENTS
### PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
### Câu A1 (5đ) — DOM Tree
- Dom Tree
  div#app  
|── header  
│   |- h1  
│   │   |── "Todo App"  
│   |─ nav  
│       |── a.active  
│       │   |── "All"  
│       |── a  
│       │   |── "Active"  
│       |── a  
│           |── "Completed"  
|── main  
    |── form#todoForm  
    │   |── input#todoInput  
    │   |── button  
    │       |── "Add"  
    |── ul#todoList  
        |─ li.todo-item  
        │   |── "Learn HTML"  
        |── li.todo-item.completed  
            |── "Learn CSS"  

- Viết querySelector  
Chọn thẻ < h1 >
```javascript
document.querySelector("h1");
``` 
Chọn input trong form  
```javascript
document.querySelector("form input");
```

Chọn tất cả .todo-item  
```javascript
document.querySelectorAll(".todo-item");
```

Chọn link đang active
```javascript
document.querySelector("a.active");
```

Chọn < li > đầu tiên trong #todoList  
```javascript
document.querySelector("#todoList li");
```

Chọn tất cả < a > bên trong < nav >  
```javascript
document.querySelectorAll("nav a");
```

### Câu A2 (5đ) — innerHTML vs textContent
Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái.  
Câu hỏi bảo mật: Tại sao innerHTML có thể gây lỗ hổng XSS? Viết 1 ví dụ code minh họa:  

innerHTML nguy hiểm vì nó cho phép trình duyệt phân tích và chạy HTML được chèn vào. Nếu dữ liệu đến từ người dùng, kẻ xấu có thể nhập mã độc như:
``` 
<img src=x onerror="alert('Hacked!')">
```

- code nguy hiểm:  
```
// Giả sử user nhập:
// < img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput; 
// Nguy hiểm vì HTML từ user có thể được trình duyệt thực thi
```

- cách sửa:
```
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

### Câu A3 (5đ) — Event Bubbling
Không chạy code, dự đoán thứ tự console.log:  

- Khi click vào button, output =  
BUTTON  
INNER  
OUTER   
Do click trực tiếp vào button -> event bubbling lên #inner và tiếp tục bubbling lên #outer

- Nếu uncomment stopPropagation(), output = BUTTON vì e.stopPropagation() sẽ chặn sự kiện nổi bọt lên phần tử cha. Do đó #inner và #outer sẽ không nhận được sự kiện click  

--- 

### PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
### Câu C1 (8đ) — Debug DOM Code
Tìm và sửa tất cả lỗi (ít nhất 7 lỗi): 

- Lỗi 1: Dùng innerHTML để hiển thị số đếm
```
countDisplay.innerHTML = count;
```
=> Fix
```
countDisplay.textContent = count;
```
- Lỗi 2: Sai tên event "onclick"  
```
addEventListener("onclick", function() {
```
=> Fix
```
addEventListener("click", function() {
```
- Lỗi 3: Gán lại biến const countDisplay
```
countDisplay = count;
```
=> Fix
```
countDisplay.textContent = count;
```
- Lỗi 4: Xóa history bằng innerHTML = null  
```
historyList.innerHTML = null;
```
=> Fix
```
historyList.innerHTML = "";
```
- Lỗi 5: item.remove thiếu dấu ()
```
item.remove;
```
=> Fix
```
item.remove();
```
- Lỗi 6: Lấy count từ localStorage nhưng không đổi sang number  
```
count = localStorage.getItem("count");
```
=> Fix
```
count = Number(localStorage.getItem("count")) || 0;
```
- Lỗi 7: Có lưu history vào localStorage nhưng không load lại
```
localStorage.setItem("history", historyList.innerHTML);
```
=> Fix
```
historyList.innerHTML = localStorage.getItem("history") || "";
```

### Câu C2 (7đ) — Performance
Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?

Nếu có 1000 elements, code trên sẽ tạo 1000 event listeners.  
Điều này không tốt vì:

|Vấn đề|	Giải thích|
|:---:|:---:|
|Tốn bộ nhớ	|Mỗi element giữ một function event riêng|
|Chậm hơn khi khởi tạo	|Trình duyệt phải gắn event 1000 lần|
|Khó quản lý	|Muốn xóa/sửa event phải xử lý nhiều phần tử|
|Không áp dụng cho element mới	|Nếu sau này thêm item mới bằng JS, item đó chưa có event|

Event Delegation giải quyết thế nào?  
+ Thay vì gắn event cho từng item, ta gắn một event duy nhất lên phần tử cha. 
+ 1000 items → chỉ cần 1 event listener  
Event Delegation giúp: 
- Giảm bộ nhớ
- Code gọn hơn
- Dễ quản lý hơn
- Tự hoạt động với element mới được thêm vào sau

Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.
- DocumentFragment là một vùng chứa DOM tạm thời, chưa nằm trực tiếp trên trang web.
- Khi thêm 1000 div vào fragment, trình duyệt chưa cần render từng cái lên màn hình.  
