// Check if Passwords are identical
function checkIfPasswordsMatch() {
    let pw = document.getElementById("password").value;
    let confirmPw = document.getElementById("confirmPassword").value;
    if (pw === "" && confirmPw === "") {
        document.getElementById("pw-state-message").classList.add('d-none');
    } else if (pw === confirmPw) {
        document.getElementById('pw-state-message').innerHTML = "Passwords match!"
        document.getElementById("pw-state-message").classList.remove('d-none');
        document.getElementById('pw-state-message').classList.add('pw-match-green');
    }
    else {
        document.getElementById('pw-state-message').innerHTML = "Your passwords don't match. Please try again."
        document.getElementById("pw-state-message").classList.remove('d-none');
        document.getElementById('pw-state-message').classList.remove('pw-match-green');
    }
}
// User im Backend anlegen
function addUser(){
    let userName = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    let userData = {"name":`"${userName}"`, "email":`"${email}"`, "password":`"${password}"`};
    postData(path = "users/", data = {userData});
    document.getElementById("register-popup").classList.remove('d-none');
    setTimeout(navigateToLogin, 800)
}
// Weiterleitung
function navigateToLogin(){
    window.location.href = "login-page.html";
}