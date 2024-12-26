function checkIfPasswordsMatch() {
    let pw = document.getElementById("password").value;
    let confirmPw = document.getElementById("confirmPassword").value;
    if (pw === "" && confirmPw === "") {
        document.getElementById("pw-state-message").style.display = "none";
    } else if (pw == confirmPw) {
        document.getElementById("pw-state-message").style.color = "Green";
        document.getElementById("pw-state-message").style.display = "block";
        document.getElementById("pw-state-message").innerHTML = "Passwords match!"
    }
    else {
        document.getElementById("pw-state-message").style.color = "Red";
        document.getElementById("pw-state-message").style.display = "block";
        document.getElementById("pw-state-message").innerHTML = "Passwords do NOT match!";
    }
}

function addUser(){
    let userName = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let userData = {"name":`"${userName}"`, "email":`"${email}"`, "password":`"${password}"`};
    postData(path = "users/", data = {userData});
}
