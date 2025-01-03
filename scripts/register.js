const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const userNameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordFeedbackRef = document.getElementById("pw-state-message");
const signupPopup = document.getElementById("register-popup");

function visualizeIfPasswordsMatch() {
    const passwordInputValue = getPasswordInput();
    const isEmpty = passwordFieldsEmpty(passwordInputValue);
    if (isEmpty) {
        removePasswordFeedbackStyle()
    } else {
        (PasswordsMatch(passwordInputValue) ? setPasswordFeedbackStyle("matching") : setPasswordFeedbackStyle("notMatching"))
    }
}

function getPasswordInput() {
    password = passwordInput.value;
    confirmPassword = confirmPasswordInput.value;
    return { "password": password, "confirmPassword": confirmPassword }
}

function passwordFieldsEmpty(inputToTest) {
    return checkIfpasswordFieldsEmpty(inputToTest)
}

function checkIfpasswordFieldsEmpty(inputToTest) {
    return inputToTest.password === "" || inputToTest.confirmPassword === ""
}

function removePasswordFeedbackStyle() {
    passwordInput.style.border = "";
    confirmPasswordInput.style.border = "";
    removeFeedbackText();
}

function removeFeedbackText() {
    passwordFeedbackRef.classList.add('d-none');
}

function PasswordsMatch(inputToTest) {
    return checkIfPasswordsMatch(inputToTest)
}

function checkIfPasswordsMatch(inputToTest) {
    return inputToTest.password === inputToTest.confirmPassword
}

const PasswordFeedbackStyles = {
    matching: {
        text: "Passwords match!",
        colorcode: "--icon-low-green"
    },
    notMatching: {
        text: "Your passwords don't match. Please try again.",
        colorcode: "--icon-urgent-red"
    }
}

function setPasswordFeedbackStyle(currentState) {
    passwordFeedbackRef.innerHTML = PasswordFeedbackStyles[currentState].text;
    passwordFeedbackRef.classList.remove('d-none');
    passwordInput.style.border = "1px solid var(" + PasswordFeedbackStyles[currentState].colorcode + ")";
    confirmPasswordInput.style.border = "1px solid var(" + PasswordFeedbackStyles[currentState].colorcode + ")";
    passwordFeedbackRef.classList.toggle('pw-match-green', currentState === "matching");
}

async function processSignUp() {
    if (await emailExists()) {
        setEmailExistsFeedback();
    } else {
        removeFeedbackText();
        addNewProfileToServer();
        showSignUpPopUp();
        setTimeout(navigateToLogin, 800);
    }
}

async function emailExists() {
    return await checkIfEmailExists()
}

async function checkIfEmailExists() {
    await fetchUsers();
    emailToSearch = emailInput.value;
    return !!users.find(user => user.user.email === emailToSearch);
}

function setEmailExistsFeedback() {
    passwordFeedbackRef.innerHTML = "This email already exists."
    passwordFeedbackRef.classList.remove('pw-match-green');
    passwordFeedbackRef.classList.remove('d-none');
}

function showSignUpPopUp() {
    signupPopup.classList.remove('d-none');
}

function addNewProfileToServer() {
    let userData = { "name": `"${userNameInput.value}"`, "email": `"${emailInput.value}"`, "password": `"${passwordInput.value}"` };
    postData(path = "users/", data = { userData });
}

function navigateToLogin() {
    window.location.href = "login-page.html";
}

function togglePasswordVisibilityIcon(element, imgId) {
    inputRefValue = element.value;
    lockImgRef = document.getElementById("password-lock-" + imgId);
    visibilityImgRef = document.getElementById("password-visibility-" + imgId);
    lockImgRef.classList.toggle("d-none", !(inputRefValue.length === 0));
    visibilityImgRef.classList.toggle("d-none", (inputRefValue.length === 0));
}

function changePasswordVisibility(inputfieldId, imgElement) {
    visibleImgRef = imgElement;
    inputfieldRef = document.getElementById(inputfieldId);
    if (inputfieldRef.type == "text") {
        inputfieldRef.type = "password";
        visibleImgRef.src = "/assets/icons/visibility_off.svg"
    } else {
        inputfieldRef.type = "text";
        visibleImgRef.src = "/assets/icons/visibility_on.svg"
    }
}