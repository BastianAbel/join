let users = [];

async function userLogin() {
    let response = await fetch(BASE_URL + PATH_TO_USERS + ".json")
    let fetchedUsers = await response.json()
    let userKeysArray = Object.keys(fetchedUsers);
    for (let i = 0; i < userKeysArray.length; i++) {
        users.push(
            {
                id: userKeysArray[i],
                user: fetchedUsers[userKeysArray[i]],
            }
        )
    }
}




