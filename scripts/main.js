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
