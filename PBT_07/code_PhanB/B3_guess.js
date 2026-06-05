//máy random số từ 1 đến 100
var secretNumber = Math.floor(Math.random() * 100) + 1;

//số lần đoán hợp lệ
var guessCount = 0;

//giới hạn số lần đoán
var maxGuesses = 7;

//mảng lưu các số đã đoán
var guessedNumbers = [];

//kiểm tra thắng/thua
var isWin = false;

while (guessCount < maxGuesses) {
    var input = prompt(
        "Hãy đoán một số từ 1 đến 100.\n" +
        "Lượt còn lại: " + (maxGuesses - guessCount)
    );

    //nếu user bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    var guess = Number(input);

    //validate input: chỉ chấp nhận số từ 1 đến 100
    if (input.trim() === "" || isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng nhập một số hợp lệ từ 1 đến 100!");
        continue;
    }

    //kiểm tra user nhập trùng số đã đoán
    var isDuplicate = false;

    for (var i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    //nếu hợp lệ và chưa trùng thì tính là 1 lần đoán
    guessCount++;

    //lưu số đã đoán vào mảng
    guessedNumbers.push(guess);

    //so sánh với đáp án
    if (guess < secretNumber) {
        alert("Cao hơn");
    } else if (guess > secretNumber) {
        alert("Thấp hơn");
    } else {
        alert("Đúng rồi!");
        alert("Bạn đoán đúng sau " + guessCount + " lần!");
        isWin = true;
        break;
    }
}

//nếu hết lượt mà chưa thắng
if (isWin === false && guessCount === maxGuesses) {
    alert("Bạn đã hết 7 lượt đoán. Bạn thua!");
    alert("Đáp án đúng là: " + secretNumber);
}