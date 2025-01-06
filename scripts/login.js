let users = [];

// User werden geladen und gepusht
async function userLogin() {
    await fetchUsers();
    checkIfUserExists();
}
//TODO - Pfad überprüfen
async function fetchUsers() {
    let response = await fetch(BASE_URL + PATH_TO_USERS + ".json");
    let fetchedUsers = await response.json();
    let userKeysArray = Object.keys(fetchedUsers);
    for (let i = 0; i < userKeysArray.length; i++) {
        users.push({
            id: userKeysArray[i],
            user: {
                email: fetchedUsers[userKeysArray[i]]["userData"].email.replace(/['"]/g, '').trim(),
                password: fetchedUsers[userKeysArray[i]]["userData"].password.replace(/['"]/g, '').trim(),
                name: fetchedUsers[userKeysArray[i]]["userData"].name.replace(/['"]/g, '').trim(),
            }
        });
    }
}

function checkIfUserExists() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(user => user.user.email === email && user.user.password === password);
    console.log(user)
    if (user) {
        userName = user.user.name
        getUserInitials(userName);
        setLoginInformationToSessionStorage(userName, email, password);
        navigateToUserPage(userName);
    } else {
        document.getElementById('pw-state-message').innerHTML = "Check your email and password. Please try again.";
        document.getElementById('password').style.border = "1px solid var(--icon-urgent-red)";
        document.getElementById('email').style.border = "1px solid var(--icon-urgent-red)";
    }
}

function getUserInitials(userName) {
    if (userName.includes(' ')) {
        let firstName = userName.split(' ')[0].trim().charAt(0).toUpperCase();
        let secondName = userName.split(' ')[1].trim().charAt(0).toUpperCase();
        let userInitials = firstName + secondName;
        localStorage.setItem("user", userInitials);
    } else {
        let firstNameInitial = userName.charAt(0).toUpperCase();
        localStorage.setItem("user", firstNameInitial);
    }
}

function setLoginInformationToSessionStorage(userName, userEmail, userPassword) {
    userData = {
        "name" :  userName,
        "email" : userEmail,
        "password" : userPassword,
    }
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("loginStatus", "user")
    
}

function loadUserInitials(){
    onlyLoadIfUserOrGuest();
    let userInitials = localStorage.getItem("user");
    let loginStatus = sessionStorage.getItem('loginStatus');
    if(loginStatus === "user") {
        document.getElementById('profileBtn').innerText = userInitials;
    } else {
        document.getElementById('profileBtn').innerText = "G";
    }
}


function navigateToUserPage(userName) {
    window.location.href = `greeting-user.html?userName=${encodeURIComponent(userName)}`;
}

function setGuestToSessionStorage() {
    sessionStorage.setItem("loginStatus", "guest")
    sessionStorage.setItem("guest", true)
    window.location.href = "greeting-guest.html";
}

function navigateToSummary() {
    setTimeout(() => {
        window.location.href = "summary.html";
    }, 2000)
}

function loadUserPage() {
    loadUserInitials(); 
    let date = new Date();
    let time = date.getHours();
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('userName');
    if (time >= 5 && time <= 11) {
        document.getElementById('greeting').innerHTML = "Good morning,";
    } else if (time >= 11 && time <= 18) {
        document.getElementById('greeting').innerHTML = "Good afternoon,";
    } else {
        document.getElementById('greeting').innerHTML = "Good evening,";
    }
    if (userName) {
        document.getElementById('userName').innerHTML = userName;
    }
    navigateToSummary();
}

function loadGuestPage() {
    loadUserInitials();
    let date = new Date();
    let time = date.getHours();
    if (time >= 5 && time <= 11) {
        document.getElementById('greeting').innerHTML = "Good morning!";
    } else if (time >= 11 && time <= 18) {
        document.getElementById('greeting').innerHTML = "Good afternoon!";
    } else {
        document.getElementById('greeting').innerHTML = "Good evening!";
    };
    navigateToSummary()
}

function resetLoginWarning() {
    let pwInput = document.getElementById('password').value
    if (pwInput === "") {
        document.getElementById('email').style.border = "1px solid #ccc";
        document.getElementById('password').style.border = "1px solid #ccc";
        document.getElementById('pw-state-message').innerHTML = "";
    }
}

async function setBackendJsonToSessionStorage() {
    let response = await fetch(BASE_URL + ".json");
    let fetchedUsers = await response.json();
    sessionStorage.setItem("joinJson", JSON.stringify(fetchedUsers))
    console.log(fetchedUsers);
}

function userLogout(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginStatus");
    localStorage.removeItem("user");
}