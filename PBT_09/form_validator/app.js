const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");

const nameIcon = document.getElementById("nameIcon");
const emailError = document.getElementById("emailError");
const confirmError = document.getElementById("confirmError");
const phoneError = document.getElementById("phoneError");

const strengthFill =
    document.getElementById("strengthFill");

const strengthText =
    document.getElementById("strengthText");

let validity = {
    name:false,
    email:false,
    password:false,
    confirm:false,
    phone:false
};

// ======================
// NAME
// ======================

nameInput.addEventListener("input", () => {

    const value = nameInput.value.trim();

    validity.name =
        value.length >= 2 &&
        value.length <= 50;

    nameIcon.textContent =
        validity.name ? "✅" : "❌";

    updateSubmit();
});

// ======================
// EMAIL
// ======================

emailInput.addEventListener("input", () => {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validity.email =
        regex.test(emailInput.value);

    emailError.textContent =
        validity.email
        ? ""
        : "Email không hợp lệ";

    updateSubmit();
});

// ======================
// PASSWORD STRENGTH
// ======================

passwordInput.addEventListener("input", () => {

    const value = passwordInput.value;

    let level = 0;

    const weak =
        value.length < 8;

    const medium =
        value.length >= 8 &&
        /[a-zA-Z]/.test(value) &&
        /\d/.test(value);

    const strong =
        value.length >= 8 &&
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[^A-Za-z0-9]/.test(value);

    if (strong) {

        level = 100;

        strengthFill.style.width = "100%";
        strengthFill.style.background = "green";

        strengthText.textContent = "Mạnh";

        validity.password = true;
    }
    else if (medium) {

        level = 60;

        strengthFill.style.width = "60%";
        strengthFill.style.background = "orange";

        strengthText.textContent = "Trung bình";

        validity.password = true;
    }
    else {

        level = 30;

        strengthFill.style.width = "30%";
        strengthFill.style.background = "red";

        strengthText.textContent = "Yếu";

        validity.password = false;
    }

    checkConfirm();
    updateSubmit();
});

// ======================
// CONFIRM PASSWORD
// ======================

function checkConfirm(){

    validity.confirm =
        passwordInput.value ===
        confirmInput.value &&
        confirmInput.value !== "";
        confirmError.textContent =
        validity.confirm
        ? ""
        : "Password không khớp";
}

confirmInput.addEventListener("input", () => {

    checkConfirm();
    updateSubmit();

});

// ======================
// PHONE FORMAT
// ======================

phoneInput.addEventListener("input", () => {

    let digits =
        phoneInput.value
        .replace(/\D/g,"")
        .substring(0,10);

    let formatted = digits;

    if(digits.length > 4){
        formatted =
            digits.substring(0,4)
            + "-"
            + digits.substring(4);
    }

    if(digits.length > 7){
        formatted =
            digits.substring(0,4)
            + "-"
            + digits.substring(4,7)
            + "-"
            + digits.substring(7);
    }

    phoneInput.value = formatted;

    validity.phone =
        digits.length === 10;

    phoneError.textContent =
        validity.phone
        ? ""
        : "Số điện thoại phải đủ 10 số";

    updateSubmit();
});

// ======================
// ENABLE SUBMIT
// ======================

function updateSubmit(){

    submitBtn.disabled =
        !Object.values(validity)
        .every(Boolean);

}

// ======================
// SUBMIT
// ======================

form.addEventListener("submit", e => {

    e.preventDefault();

    const modal =
        document.getElementById("modal");

    const userInfo =
        document.getElementById("userInfo");

    userInfo.innerHTML = `
        <p><b>Họ tên:</b>
        ${nameInput.value}</p>

        <p><b>Email:</b>
        ${emailInput.value}</p>

        <p><b>Điện thoại:</b>
        ${phoneInput.value}</p>
    `;

    modal.classList.remove("hidden");

});

// ======================
// CLOSE MODAL
// ======================

document
.getElementById("closeModal")
.addEventListener("click", () => {

    document
    .getElementById("modal")
    .classList
    .add("hidden");

});