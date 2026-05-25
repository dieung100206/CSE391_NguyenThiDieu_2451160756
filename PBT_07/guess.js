/*
=========================================
GAME ĐOÁN SỐ
=========================================

- Random số từ 1 đến 100
- Tối đa 7 lượt
- Báo cao hơn / thấp hơn
- Kiểm tra nhập hợp lệ
- Không cho đoán trùng
=========================================
*/

const secretNumber = Math.floor(Math.random() * 100) + 1;

const maxAttempts = 7;

let attempts = 0;

let guessedNumbers = [];

while (attempts < maxAttempts) {

    let input = prompt(
        `Lượt ${attempts + 1}/${maxAttempts}\nNhập số từ 1 đến 100:`
    );

    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    let guess = Number(input);

    /*
    =========================================
    KIỂM TRA DỮ LIỆU HỢP LỆ
    =========================================
    */

    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập số từ 1 đến 100!");
        continue;
    }

    /*
    =========================================
    KIỂM TRA ĐOÁN TRÙNG
    =========================================
    */

    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    /*
    =========================================
    SO SÁNH KẾT QUẢ
    =========================================
    */

    if (guess === secretNumber) {

        alert(
            `🎉 Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`
        );

        break;
    }

    else if (guess < secretNumber) {

        alert("⬆️ Cao hơn!");

    }

    else {

        alert("⬇️ Thấp hơn!");

    }

    /*
    =========================================
    HẾT LƯỢT
    =========================================
    */

    if (attempts === maxAttempts) {

        alert(
            `❌ Bạn đã hết lượt!\nĐáp án là: ${secretNumber}`
        );

    }
}

/*
=========================================
KẾT THÚC GAME
=========================================
*/