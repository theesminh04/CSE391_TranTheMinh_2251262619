const registerForm = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const nameStatus = document.querySelector("#nameStatus");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordMessage = document.querySelector("#passwordMessage");
const confirmError = document.querySelector("#confirmError");
const phoneError = document.querySelector("#phoneError");

const strengthBar = document.querySelector("#strengthBar");
const submitBtn = document.querySelector("#submitBtn");

const modalOverlay = document.querySelector("#modalOverlay");
const modalContent = document.querySelector("#modalContent");
const closeModalBtn = document.querySelector("#closeModal");

const formState = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// =========================
// Thoi gian thuc
// =========================
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", function () {
    validatePassword();
    validateConfirmPassword();
});
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
phoneInput.addEventListener("input", handlePhoneInput);

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!isFormValid()) {
        return;
    }

    showSuccessModal();
});

closeModalBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// =========================
// Xac nhan ten
// =========================
function validateName() {
    const name = nameInput.value.trim();

    if (name.length >= 2 && name.length <= 50) {
        setValid(nameInput);
        nameStatus.textContent = "✅";
        nameError.textContent = "";
        formState.name = true;
    } else {
        setInvalid(nameInput);
        nameStatus.textContent = "❌";
        nameError.textContent = "Tên phải có từ 2 đến 50 ký tự.";
        formState.name = false;
    }

    updateSubmitButton();
}

// =========================
// Xac nhan email 
// =========================
function validateEmail() {
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        setInvalid(emailInput);
        emailError.textContent = "Email không được để trống.";
        formState.email = false;
    } else if (!email.includes("@")) {
        setInvalid(emailInput);
        emailError.textContent = "Email phải chứa ký tự @.";
        formState.email = false;
    } else if (!emailRegex.test(email)) {
        setInvalid(emailInput);
        emailError.textContent = "Email không đúng định dạng. Ví dụ: example@gmail.com";
        formState.email = false;
    } else {
        setValid(emailInput);
        emailError.textContent = "";
        formState.email = true;
    }

    updateSubmitButton();
}

// =========================
// Mat khau va do manh
// =========================
function validatePassword() {
    const password = passwordInput.value;
    const strength = getPasswordStrength(password);

    strengthBar.className = "strength-bar";
    passwordMessage.className = "password-message";

    if (password === "") {
        passwordMessage.textContent = "Vui lòng nhập mật khẩu.";
        setInvalid(passwordInput);
        formState.password = false;
    } else if (strength === "weak") {
        strengthBar.classList.add("weak");
        passwordMessage.classList.add("weak");
        passwordMessage.textContent = "Yếu: Mật khẩu phải có ít nhất 8 ký tự.";
        setInvalid(passwordInput);
        formState.password = false;
    } else if (strength === "medium") {
        strengthBar.classList.add("medium");
        passwordMessage.classList.add("medium");
        passwordMessage.textContent = "Trung bình: Mật khẩu hợp lệ, nên thêm chữ hoa và ký tự đặc biệt.";
        setValid(passwordInput);
        formState.password = true;
    } else {
        strengthBar.classList.add("strong");
        passwordMessage.classList.add("strong");
        passwordMessage.textContent = "Mạnh: Mật khẩu rất tốt.";
        setValid(passwordInput);
        formState.password = true;
    }

    updateSubmitButton();
}

function getPasswordStrength(password) {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

    if (!hasMinLength) {
        return "weak";
    }

    if (
        hasMinLength &&
        hasLowercase &&
        hasUppercase &&
        hasNumber &&
        hasSpecialChar
    ) {
        return "strong";
    }

    if (hasMinLength && hasLetter && hasNumber) {
        return "medium";
    }

    return "weak";
}

// =========================
// Xac nhan mat khau
// =========================
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        setInvalid(confirmPasswordInput);
        confirmError.textContent = "Vui lòng nhập lại mật khẩu.";
        formState.confirmPassword = false;
    } else if (confirmPassword !== password) {
        setInvalid(confirmPasswordInput);
        confirmError.textContent = "Mật khẩu xác nhận không khớp.";
        formState.confirmPassword = false;
    } else {
        setValid(confirmPasswordInput);
        confirmError.textContent = "";
        formState.confirmPassword = true;
    }

    updateSubmitButton();
}

// =========================
// Dinh dang so dien thoai va xac nhan
// =========================
function handlePhoneInput() {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value = formatPhoneNumber(digits);

    validatePhone(digits);
}

function formatPhoneNumber(digits) {
    if (digits.length <= 4) {
        return digits;
    }

    if (digits.length <= 7) {
        return digits.slice(0, 4) + "-" + digits.slice(4);
    }

    return (
        digits.slice(0, 4) +
        "-" +
        digits.slice(4, 7) +
        "-" +
        digits.slice(7, 10)
    );
}

function validatePhone(digits) {
    if (digits.length === 10) {
        setValid(phoneInput);
        phoneError.textContent = "";
        formState.phone = true;
    } else {
        setInvalid(phoneInput);
        phoneError.textContent = "Số điện thoại phải gồm đúng 10 chữ số.";
        formState.phone = false;
    }

    updateSubmitButton();
}

// =========================
// Nut xac nhan
// =========================
function isFormValid() {
    return (
        formState.name &&
        formState.email &&
        formState.password &&
        formState.confirmPassword &&
        formState.phone
    );
}

function updateSubmitButton() {
    submitBtn.disabled = !isFormValid();
}

// =========================
// Ho tro UI
// =========================
function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
}

function setInvalid(input) {
    input.classList.remove("valid");
    input.classList.add("invalid");
}

// =========================
// Phuong thuc
// =========================
function showSuccessModal() {
    modalContent.textContent = "";

    const name = createInfoLine("Tên", nameInput.value.trim());
    const email = createInfoLine("Email", emailInput.value.trim());
    const phone = createInfoLine("Số điện thoại", phoneInput.value.trim());
    const password = createInfoLine("Mật khẩu", "Đã nhập, không hiển thị vì bảo mật");

    modalContent.appendChild(name);
    modalContent.appendChild(email);
    modalContent.appendChild(phone);
    modalContent.appendChild(password);

    modalOverlay.classList.remove("hidden");
}

function createInfoLine(label, value) {
    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    return p;
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}