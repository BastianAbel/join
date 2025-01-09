function getContactInitials(contactName) {
    return contactName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
}

function filterInputFromArray(sourceArray, input) {
    return sourceArray.filter((name) => name.toLowerCase().includes(input.toLowerCase()));
}

function getRandomColor() {
    let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
    return colors[Math.floor(Math.floor(Math.random() * colors.length))];
}

function setColorById(id, color) {
    let profilePicture = document.getElementById(id);
    profilePicture.style.backgroundColor = color;
}

function getContactFromArrayById(array, id) {
    return array.find((entry) => entry.id == id);
}

async function setBackendJsonToSessionStorage() {
    let response = await fetch(BASE_URL + ".json");
    let fetchedData = await response.json();
    sessionStorage.setItem("joinJson", JSON.stringify(fetchedData));
    console.log(fetchedData);
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

function getJsonObjectFromSessionStorage() {
    let completeJson = sessionStorage.getItem("joinJson");
    let completeObject = JSON.parse(completeJson);
    return completeObject;
}

function getArrayFromObject(object) {
    let allKeys = Object.keys(object);
    let array = [];
    for (let i = 0; i < allKeys.length; i++) {
        array.push(object[allKeys[i]]);
    }
    return array;
}
