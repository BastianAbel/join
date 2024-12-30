let users = [];

// User werden geladen und gepusht
async function userLogin() {
    let response = await fetch(BASE_URL + PATH_TO_USERS + ".json")
    let fetchedUsers = await response.json()
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
    console.log(users)
    checkIfUserExists()
}
//Check if user exists
function checkIfUserExists() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(user => user.user.email === email && user.user.password === password);
    let userName = user.user.name;
    console.log(user)
    if (user) {
        userName = user.user.name
        navigateToUserPage(userName);
    } else {
        console.log("user nicht gefunden")
    }
}

// Weiterleitung Userseite
function navigateToUserPage(userName) {
    window.location.href = `greeting-user.html?userName=${encodeURIComponent(userName)}`;
}

// Weiterleitung Guestseite
function navigateToGuestPage() {
    showTimeAndUserGuest();
    window.location.href = "greeting-guest.html";
}

// Greeting Time
function showTimeAndUser() {
    let date = new Date();
    let time = date.getHours();
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('userName');
    if (time < 12) {
        document.getElementById('greeting').innerHTML = "Good morning,";
    } else if (time < 18) {
        document.getElementById('greeting').innerHTML = "Good afternoon,";
    } else {
        document.getElementById('greeting').innerHTML = "Good evening,";
    }
    if (userName) {
        document.getElementById('userName').innerHTML = userName;
    }
}

//Greeting Time Guest
function showTimeAndUserGuest() {
    let date = new Date();
    let time = date.getHours();
    if (time >= 5 && time <= 11) {
        document.getElementById('greeting').innerHTML = "Good morning!";
    } else if (time >= 11 && time <= 18) {
        document.getElementById('greeting').innerHTML = "Good afternoon!";
    } else {
        document.getElementById('greeting').innerHTML = "Good evening!";
    }
}





