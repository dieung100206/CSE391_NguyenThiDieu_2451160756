/*
==================================================
File: restaurant_bill.js
==================================================

Bài toán:
- Tính hóa đơn nhà hàng
- Giảm giá theo tổng tiền
- Giảm thêm nếu là Wednesday
- VAT 8%
- Tip 5% (optional)

==================================================
*/

const menu = [
    {
        ten: "Phở bò",
        gia: 65000,
        soLuong: 2
    },
    {
        ten: "Trà đá",
        gia: 5000,
        soLuong: 3
    },
    {
        ten: "Bún chả",
        gia: 55000,
        soLuong: 1
    }
];

const day = "Wednesday";
const useTip = true;

/*
==================================================
TÍNH TỔNG TIỀN
==================================================
*/

let tongTien = 0;

for (let i = 0; i < menu.length; i++) {
    tongTien += menu[i].gia * menu[i].soLuong;
}

/*
==================================================
TÍNH GIẢM GIÁ
==================================================
*/

let discountPercent = 0;

if (tongTien > 1000000) {
    discountPercent = 15;
}
else if (tongTien > 500000) {
    discountPercent = 10;
}

if (day === "Wednesday") {
    discountPercent += 5;
}

const discountAmount =
    tongTien * discountPercent / 100;

const afterDiscount =
    tongTien - discountAmount;

/*
==================================================
VAT
==================================================
*/

const vat =
    afterDiscount * 0.08;

/*
==================================================
TIP
==================================================
*/

let tip = 0;

if (useTip) {
    tip = afterDiscount * 0.05;
}

/*
==================================================
THANH TOÁN CUỐI CÙNG
==================================================
*/

const finalAmount =
    afterDiscount + vat + tip;

/*
==================================================
IN HÓA ĐƠN
==================================================
*/

console.log("╔══════════════════════════════════════════════╗");
console.log("║              HÓA ĐƠN NHÀ HÀNG              ║");
console.log("╠══════════════════════════════════════════════╣");

for (let i = 0; i < menu.length; i++) {

    const itemTotal =
        menu[i].gia * menu[i].soLuong;

    console.log(
        `${i + 1}. ${menu[i].ten} x${menu[i].soLuong} @${menu[i].gia.toLocaleString()}đ = ${itemTotal.toLocaleString()}đ`
    );
}

console.log("╠══════════════════════════════════════════════╣");

console.log(
    "Tổng cộng:".padEnd(25) +
    tongTien.toLocaleString() + "đ"
);

console.log(
    `Giảm giá (${discountPercent}%):`.padEnd(25) +
    discountAmount.toLocaleString() + "đ"
);

console.log(
    "VAT (8%):".padEnd(25) +
    vat.toLocaleString() + "đ"
);

console.log(
    "Tip (5%):".padEnd(25) +
    tip.toLocaleString() + "đ"
);

console.log("╠══════════════════════════════════════════════╣");

console.log(
    "THANH TOÁN:".padEnd(25) +
    finalAmount.toLocaleString() + "đ"
);

console.log("╚══════════════════════════════════════════════╝");

/*
==================================================
KẾT QUẢ VỚI DỮ LIỆU MẪU
==================================================

Phở bò:
65.000 x 2 = 130.000

Trà đá:
5.000 x 3 = 15.000

Bún chả:
55.000 x 1 = 55.000

Tổng:
200.000

Giảm giá:
5% (Wednesday)

= 10.000

Sau giảm:
190.000

VAT:
15.200

Tip:
9.500

THANH TOÁN:
214.700đ

==================================================
*/