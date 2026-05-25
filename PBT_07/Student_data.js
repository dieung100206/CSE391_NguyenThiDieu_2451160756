/*
====================================================
File: student_data.js
====================================================

Yêu cầu:
1. Tính điểm trung bình từng sinh viên
2. Xếp loại học lực
3. In bảng kết quả
4. Đếm số sinh viên mỗi loại
5. Tìm sinh viên cao điểm nhất và thấp điểm nhất
6. Tính điểm trung bình từng môn của lớp
7. Bonus: Tính điểm trung bình theo giới tính

Chỉ dùng:
- Array
- Loop
- If / Else

Không dùng thư viện ngoài
====================================================
*/

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

/*
====================================================
BIẾN THỐNG KÊ
====================================================
*/

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let tongMath = 0;
let tongPhysics = 0;
let tongCS = 0;

let maxStudent = null;
let minStudent = null;

let tongTBNam = 0;
let tongTBNu = 0;

let soNam = 0;
let soNu = 0;

/*
====================================================
IN BẢNG KẾT QUẢ
====================================================
*/

console.log("==============================================================");
console.log("| STT | Tên      | TB   | Xếp loại                     |");
console.log("==============================================================");

for (let i = 0; i < students.length; i++) {

    let s = students[i];

    let tb =
        s.math * 0.4 +
        s.physics * 0.3 +
        s.cs * 0.3;

    tb = Number(tb.toFixed(1));

    let xepLoai = "";

    if (tb >= 8.0) {
        xepLoai = "Giỏi";
        gioi++;
    }
    else if (tb >= 6.5) {
        xepLoai = "Khá";
        kha++;
    }
    else if (tb >= 5.0) {
        xepLoai = "Trung bình";
        trungBinh++;
    }
    else {
        xepLoai = "Yếu";
        yeu++;
    }

    console.log(
        `| ${String(i + 1).padEnd(3)} | ${s.name.padEnd(8)} | ${String(tb).padEnd(4)} | ${xepLoai.padEnd(28)} |`
    );

    /*
    ============================================
    TÌM MAX
    ============================================
    */

    if (maxStudent === null || tb > maxStudent.tb) {
        maxStudent = {
            name: s.name,
            tb: tb
        };
    }

    /*
    ============================================
    TÌM MIN
    ============================================
    */

    if (minStudent === null || tb < minStudent.tb) {
        minStudent = {
            name: s.name,
            tb: tb
            };
    }

    /*
    ============================================
    TỔNG MÔN HỌC
    ============================================
    */

    tongMath += s.math;
    tongPhysics += s.physics;
    tongCS += s.cs;

    /*
    ============================================
    TB THEO GIỚI TÍNH
    ============================================
    */

    if (s.gender === "M") {
        tongTBNam += tb;
        soNam++;
    }
    else {
        tongTBNu += tb;
        soNu++;
    }
}

console.log("==============================================================");

/*
====================================================
ĐẾM XẾP LOẠI
====================================================
*/

console.log("\nTHỐNG KÊ XẾP LOẠI");

console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

/*
====================================================
CAO NHẤT - THẤP NHẤT
====================================================
*/

console.log("\nSINH VIÊN CAO ĐIỂM NHẤT");

console.log(
    maxStudent.name +
    " - TB: " +
    maxStudent.tb
);

console.log("\nSINH VIÊN THẤP ĐIỂM NHẤT");

console.log(
    minStudent.name +
    " - TB: " +
    minStudent.tb
);

/*
====================================================
ĐIỂM TB TOÀN LỚP
====================================================
*/

const tbMath =
    (tongMath / students.length).toFixed(2);

const tbPhysics =
    (tongPhysics / students.length).toFixed(2);

const tbCS =
    (tongCS / students.length).toFixed(2);

console.log("\nĐIỂM TRUNG BÌNH TOÀN LỚP");

console.log("Toán:", tbMath);
console.log("Lý:", tbPhysics);
console.log("CS:", tbCS);

/*
====================================================
BONUS: TB THEO GIỚI TÍNH
====================================================
*/

const tbNam =
    (tongTBNam / soNam).toFixed(2);

const tbNu =
    (tongTBNu / soNu).toFixed(2);

console.log("\nĐIỂM TB THEO GIỚI TÍNH");

console.log("Nam:", tbNam);

console.log("Nữ:", tbNu);

/*
====================================================
KẾT QUẢ DỰ KIẾN
====================================================

An      -> 8.0  -> Giỏi
Bình    -> 7.2  -> Khá
Chi     -> 7.8  -> Khá
Dũng    -> 5.3  -> Trung bình
Em      -> 9.1  -> Giỏi
Phong   -> 3.9  -> Yếu
Giang   -> 7.0  -> Khá
Huy     -> 4.3  -> Yếu

Xếp loại:

Giỏi: 2
Khá: 3
Trung bình: 1
Yếu: 2

Cao nhất:
Em

Thấp nhất:
Phong

====================================================
*/