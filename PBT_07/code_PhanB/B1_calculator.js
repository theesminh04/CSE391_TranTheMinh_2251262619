// Viết hàm calculate(num1, operator, num2)
// operator: "+", "-", "*", "/", "%", "**"
// Xử lý edge cases:
// - Chia cho 0 → thông báo lỗi
// - Operator không hợp lệ → thông báo lỗi
// - Input không phải số → thông báo lỗi

// Test:
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // → 1024