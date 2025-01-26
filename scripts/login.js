const emailInputRef = document.getElementById("email");
const passwordInputRef = document.getElementById("password");

let users = [];
let user = {};

async function userLogin() {
    await fetchUsers();
    const userExists = checkIfUserExists();
    if(userExists){
        initiateLogin();
    }else {
        visualizeNoLoginMatch();
    }
}

async function fetchUsers() {
    let response = await fetch(BASE_URL + PATH_TO_USERS + ".json");
    let fetchedUsers = await response.json();
    let userKeysArray = Object.keys(fetchedUsers);
    for (let i = 0; i < userKeysArray.length; i++) {
        users.push({
            id: userKeysArray[i],
            user: {
                email: fetchedUsers[userKeysArray[i]]["userData"].email.replace(/['"]/g, "").trim(),
                password: fetchedUsers[userKeysArray[i]]["userData"].password.replace(/['"]/g, "").trim(),
                name: fetchedUsers[userKeysArray[i]]["userData"].name.replace(/['"]/g, "").trim(),
            },
        });
    }
}

function checkIfUserExists() {
    let email = emailInputRef.value;
    let password = passwordInputRef.value;
    user = {};
    user = users.find((user) => user.user.email === email && user.user.password === password);
    if(user) {
        return true
    }
}

function initiateLogin() {
    userName = user.user.name;
    localStorage.setItem("userName", userName);
    userKey = user.id;
    getUserInitials(userName);
    setLoginInformationToSessionStorage(userName, email, password);
    rememberUser(userKey);
    navigateToSummary();
}

function visualizeNoLoginMatch() {
    document.getElementById("pw-state-message").innerHTML = "Check your email and password. Please try again.";
    passwordInputRef.style.border = "1px solid var(--icon-urgent-red)";
    emailInputRef.style.border = "1px solid var(--icon-urgent-red)";
}

function getUserInitials(userName) {
    if (userName.includes(" ")) {
        let firstName = userName.split(" ")[0].trim().charAt(0).toUpperCase();
        let secondName = userName.split(" ")[1].trim().charAt(0).toUpperCase();
        let userInitials = firstName + secondName;
        sessionStorage.setItem("userName", userInitials);
    } else {
        let firstNameInitial = userName.charAt(0).toUpperCase();
        sessionStorage.setItem("userName", firstNameInitial);
    }
}

function setLoginInformationToSessionStorage(userName, userEmail, userPassword) {
    userData = {
        "name": userName,
        "email": userEmail,
        "password": userPassword,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("loginStatus", "user");
}

function rememberUser(userKey) {
    let key = userKey;
    let rememberMe = document.getElementById("privacyCheckbox").checked;
    if (rememberMe) {
        localStorage.setItem("userkey", key);
    } else {
        return;
    }
}

function loadUserInitials() {
    onlyLoadIfUserOrGuest();
    let userInitials = sessionStorage.getItem("userName");
    let loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus === "user") {
        document.getElementById("profileBtn").innerText = userInitials;
    } else {
        document.getElementById("profileBtn").innerText = "G";
    }
}

function setGuestToSessionStorage() {
    sessionStorage.setItem("loginStatus", "guest");
    localStorage.setItem("guest", true);
    navigateToSummary();
}

function navigateToSummary() {
    window.location.href = "summary.html";
}

function loadUserPage() {
    loadUserInitials();
    let date = new Date();
    let time = date.getHours();
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName");
    if (time >= 5 && time <= 11) {
        document.getElementById("greeting").innerHTML = "Good morning,";
    } else if (time >= 11 && time <= 18) {
        document.getElementById("greeting").innerHTML = "Good afternoon,";
    } else {
        document.getElementById("greeting").innerHTML = "Good evening,";
    }
    if (userName) {
        document.getElementById("userName").innerHTML = userName;
    }
    navigateToSummary();
}

function loadGuestPage() {
    loadUserInitials();
    let date = new Date();
    let time = date.getHours();
    if (time >= 5 && time <= 11) {
        document.getElementById("greeting").innerHTML = "Good morning!";
    } else if (time >= 11 && time <= 18) {
        document.getElementById("greeting").innerHTML = "Good afternoon!";
    } else {
        document.getElementById("greeting").innerHTML = "Good evening!";
    }
    navigateToSummary();
}

function resetLoginWarning() {
    let pwInput = document.getElementById("password").value;
    if (pwInput === "") {
        document.getElementById("email").style.border = "1px solid #ccc";
        document.getElementById("password").style.border = "1px solid #ccc";
        document.getElementById("pw-state-message").innerHTML = "";
    }
}

function userLogout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("userName");
    localStorage.removeItem("user");
    localStorage.removeItem("userkey");
    localStorage.removeItem("userName");
}

async function autoLogin() {
    let userKey = localStorage.getItem("userkey");
    let userName = localStorage.getItem("userName");
    if (userKey) {
        await setBackendJsonToSessionStorage();
        navigateToUserPage(userName);
    }
}
