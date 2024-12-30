let users = [];

async function userLogin() {
    let response = await fetch(BASE_URL + PATH_TO_USERS + ".json")
    let fetchedUsers = await response.json()
    let userKeysArray = Object.keys(fetchedUsers);
    for (let i = 0; i < userKeysArray.length; i++) {
        users.push(
            {
                id: userKeysArray[i],
                user: fetchedUsers[userKeysArray[i]]["userData"],
            }
        )
    }
    console.log(users)
    checkIfUserExists()
}

function checkIfUserExists(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(i => i.user.email === email.value && i.user.password === password.value);
    console.log(email.value)
    console.log(users[0].user.email)
}




