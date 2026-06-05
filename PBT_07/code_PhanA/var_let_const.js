//hoisting với var
console.log("--- Đoạn 1 ---");
console.log("Kết quả x:", x);
var x = 5;

//let và Temporal Dead Zone (TDZ)
console.log("\n--- Đoạn 2 ---");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("Lỗi xuất hiện:", error.message);
}

//gán lại hằng số const
console.log("\n--- Đoạn 3 ---");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.log("Lỗi xuất hiện:", error.message);
}

//biến (Mutation) với const Array
console.log("\n--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log("Mảng sau khi push:", arr);

//block scope của let
console.log("\n--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);