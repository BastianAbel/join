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
    checkIfEmailExists(userName, email, password);
}
//check if email is already existing
async function checkIfEmailExists(userName, email, password) {
    await fetchUsers();
    let userEmail = users.find(user => user.user.email === email);
    console.log(userEmail)
    if (userEmail) {
        document.getElementById('pw-state-message').innerHTML = "This email already exists."
        document.getElementById('pw-state-message').classList.remove('pw-match-green');
        return false;
    } else {
        document.getElementById('pw-state-message').innerHTML = ""
        let userData = { "name": `"${userName}"`, "email": `"${email}"`, "password": `"${password}"` };
        postData(path = "users/", data = { userData });
        document.getElementById("register-popup").classList.remove('d-none');
        setTimeout(navigateToLogin, 800)
        return true;
    }
}

// Weiterleitung
function navigateToLogin() {
    window.location.href = "login-page.html";
}

function checkforvisibility(element, imgId) {
    inputRefValue = element.value;
    lockImgRef = document.getElementById("password-lock-" + imgId);
    visibilityImgRef = document.getElementById("password-visibility-" + imgId);
    if(inputRefValue.length === 0) {
        lockImgRef.classList.remove("d-none");
        visibilityImgRef.classList.add("d-none");
    }else{
        lockImgRef.classList.add("d-none");
        visibilityImgRef.classList.remove("d-none");
    }
}

function changePasswordVisibility(inputfieldId, imgElement) {
    visibleImgRef = imgElement;
    inputfieldRef = document.getElementById(inputfieldId);
    if(inputfieldRef.type == "text") {
        inputfieldRef.type = "password";
        visibleImgRef.src = "/assets/icons/visibility_off.svg"
    }else{
        inputfieldRef.type = "text";
        visibleImgRef.src = "/assets/icons/visibility_on.svg"
    }
}