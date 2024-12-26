const BASE_URL = "https://join-10cdc-default-rtdb.europe-west1.firebasedatabase.app/";
const PATH_TO_CONTACTS = "contacts/";
const PATH_TO_TASKS = "tasks/";
const PATH_TO_USERS = "users/"

async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}
