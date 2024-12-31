function checkIfPasswordsMatch() {
    let pw = document.getElementById("password").value;
    let confirmPw = document.getElementById("confirmPassword").value;
    document.getElementById('password').style.border = "1px solid #ccc";
    document.getElementById('confirmPassword').style.border = "1px solid #ccc";
    if (pw === "" || confirmPw === "") {
        document.getElementById("pw-state-message").classList.add('d-none');
    } else if (pw === confirmPw) {
        passwordClassesGreen();
    }
    else {
        passwordClassesRed();
    }
}
// klassen passwort stimmt
function passwordClassesGreen() {
    document.getElementById('pw-state-message').innerHTML = "Passwords match!"
    document.getElementById("pw-state-message").classList.remove('d-none');
    document.getElementById('pw-state-message').classList.add('pw-match-green');
    document.getElementById('password').style.border = "1px solid var(--icon-low-green)";
    document.getElementById('confirmPassword').style.border = "1px solid var(--icon-low-green)";
}
// klassen passwort stimmt nicht
function passwordClassesRed() {
    document.getElementById('pw-state-message').innerHTML = "Your passwords don't match. Please try again."
    document.getElementById('password').style.border = "1px solid var(--icon-urgent-red)";
    document.getElementById('confirmPassword').style.border = "1px solid var(--icon-urgent-red)";
    document.getElementById("pw-state-message").classList.remove('d-none');
    document.getElementById('pw-state-message').classList.remove('pw-match-green');
}
// User im Backend anlegen
function addUser() {
    let userName = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    checkIfEmailExists(email);
    let userData = { "name": `"${userName}"`, "email": `"${email}"`, "password": `"${password}"` };
    postData(path = "users/", data = { userData });
    document.getElementById("register-popup").classList.remove('d-none');
    setTimeout(navigateToLogin, 800)
}
//check if email is alreasy existing
async function checkIfEmailExists(email) {
    await fetchUsers();
    let userEmail = users.find(user => user.user.email === email);
    if (userEmail) {
        document.getElementById('pw-state-message').innerHTML = "This email already exists."
        document.getElementById('pw-state-message').classList.remove('pw-match-green');
    }
}
// Weiterleitung
function navigateToLogin() {
    window.location.href = "login-page.html";
}

//Password visibility toggle
function togglePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById('password-visibility-first').src = "/assets/icons/visibility_on.svg"
    } else {
        x.type = "password";
        document.getElementById('password-visibility-first').src = "/assets/icons/visibility_off.svg"
    }
}
//confirmPassword visibility toggle
function toggleConfirmPassword() {
    var x = document.getElementById("confirmPassword");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById('password-visibility-second').src = "/assets/icons/visibility_on.svg"
    } else {
        x.type = "password";
        document.getElementById('password-visibility-second').src = "/assets/icons/visibility_off.svg"
    }
}
