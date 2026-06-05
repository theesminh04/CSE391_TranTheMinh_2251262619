const items = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

//tính tip hay không
const hasTip = true;

//ngày hiện tại
const today = new Date();
const day = today.getDay(); 
// Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3

let subtotal = 0;

//tổng tiền món ăn
for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
}

//giảm giá theo tổng tiền
let discountPercent = 0;

if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

if (day === 3) {
    discountPercent += 5;
}

//tính tiền giảm giá
let discountAmount = subtotal * discountPercent / 100;

//tổng sau giảm giá
let afterDiscount = subtotal - discountAmount;

//VAT 8%
let vat = afterDiscount * 8 / 100;

//tip 5% 
let tip = 0;

if (hasTip === true) {
    tip = afterDiscount * 5 / 100;
}

//tổng thanh toán
let totalPayment = afterDiscount + vat + tip;

//hàm định dạng tiền Việt Nam
function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + "đ";
}

//hàm căn trái
function padRight(text, length) {
    text = String(text);

    while (text.length < length) {
        text += " ";
    }

    return text;
}

//hàm căn trái cho dòng hóa đơn
function printLine(content) {
    console.log("║ " + padRight(content, 36) + " ║");
}

// In hóa đơn
console.log("╔══════════════════════════════════════╗");
printLine("        HÓA ĐƠN NHÀ HÀNG");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemTotal = item.price * item.quantity;

    let line =
        (i + 1) + ". " +
        padRight(item.name, 10) +
        " x" + item.quantity +
        "   @" + (item.price / 1000) + "k" +
        " = " + (itemTotal / 1000) + "k";

    printLine(line);
}

console.log("╠══════════════════════════════════════╣");

printLine("Tổng cộng:              " + formatMoney(subtotal));
printLine("Giảm giá (" + discountPercent + "%):           " + formatMoney(discountAmount));
printLine("VAT (8%):               " + formatMoney(vat));

if (hasTip === true) {
    printLine("Tip (5%):               " + formatMoney(tip));
} else {
    printLine("Tip (0%):               0đ");
}

console.log("╠══════════════════════════════════════╣");
printLine("THANH TOÁN:             " + formatMoney(totalPayment));
console.log("╚══════════════════════════════════════╝");