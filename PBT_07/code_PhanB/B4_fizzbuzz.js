// ===============================
// Version 1: Classic
// In 1-100. Chia hết 3 → "Fizz", chia hết 5 → "Buzz", 
// chia hết cả 2 → "FizzBuzz"
// ===============================

console.log("===== Version 1: Classic FizzBuzz =====");

for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i + " = FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i + " = Fizz");
    } else if (i % 5 === 0) {
        console.log(i + " = Buzz");
    } else {
        console.log(i);
    }
}


// ===============================
// Version 2: Custom
// Viết hàm customFizzBuzz(n, rules) 
// rules = mảng [{ divisor: 3, word: "Fizz" }, { divisor: 5, word: "Buzz" }, ...]
// Hàm phải hoạt động với BẤT KỲ bộ rules nào
// ===============================

function customFizzBuzz(n, rules) {
    console.log("===== Version 2: Custom FizzBuzz =====");

    for (var i = 1; i <= n; i++) {
        var result = "";

        for (var j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                result = result + rules[j].word;
            }
        }

        if (result === "") {
            console.log(i);
        } else {
            console.log(i + " = " + result);
        }
    }
}


// ===============================
// test
// ===============================

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);


// test 35 và 105
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);