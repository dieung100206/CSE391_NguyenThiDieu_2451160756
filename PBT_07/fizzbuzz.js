/*
====================================================
File: fizzbuzz.js
====================================================

Yêu cầu:

Version 1:
- FizzBuzz cổ điển từ 1 → 100

Version 2:
- customFizzBuzz(n, rules)
- Hoạt động với bất kỳ bộ rules nào

====================================================
*/


/*
====================================================
VERSION 1: CLASSIC FIZZBUZZ
====================================================
*/

console.log("===== CLASSIC FIZZBUZZ =====");

for (let i = 1; i <= 100; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    }

    else if (i % 3 === 0) {
        console.log("Fizz");
    }

    else if (i % 5 === 0) {
        console.log("Buzz");
    }

    else {
        console.log(i);
    }
}


/*
====================================================
VERSION 2: CUSTOM FIZZBUZZ
====================================================
*/

function customFizzBuzz(n, rules) {

    console.log("\n===== CUSTOM FIZZBUZZ =====");

    for (let i = 1; i <= n; i++) {

        let result = "";

        for (let j = 0; j < rules.length; j++) {

            if (i % rules[j].divisor === 0) {
                result += rules[j].word;
            }
        }

        if (result === "") {
            console.log(i);
        } else {
            console.log(i + " = " + result);
        }
    }
}


/*
====================================================
TEST
====================================================
*/

customFizzBuzz(30, [
    {
        divisor: 3,
        word: "Fizz"
    },
    {
        divisor: 5,
        word: "Buzz"
    },
    {
        divisor: 7,
        word: "Jazz"
    }
]);


/*
====================================================
VÍ DỤ KẾT QUẢ
====================================================

3  = Fizz
5  = Buzz
7  = Jazz

15 = FizzBuzz

21 = FizzJazz

30 = FizzBuzz

35 = BuzzJazz

42 = FizzJazz

70 = BuzzJazz

105 = FizzBuzzJazz

====================================================
TEST THÊM
====================================================

customFizzBuzz(50, [
    { divisor: 2, word: "Two" },
    { divisor: 4, word: "Four" }
]);

Ví dụ:

2  = Two
4  = TwoFour
8  = TwoFour
12 = TwoFour

====================================================
ƯU ĐIỂM
====================================================

- Không bị giới hạn ở Fizz/Buzz.
- Có thể thêm vô số rule.
- Hoạt động với bất kỳ divisor nào.
- Dễ mở rộng và tái sử dụng.

====================================================
*/