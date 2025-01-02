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
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//TODO - Make Color consistent
// function addColorToElements(elementsClassName) {
//     // let nameBubbles = document.getElementsByClassName(elementsClassName);
//     let bubble = document.getElementById(elementsClassName);
//     bubble.style.backgroundColor = getRandomColor();
//     // for (let i = 0; i < nameBubbles.length; i++) {
//     //     nameBubbles[i].style.backgroundColor = getRandomColor();
//     // }
// }

function setColorById(id, color) {
    let profilePicture = document.getElementById(id);
    profilePicture.style.backgroundColor = color;
}

function getContactFromArrayById(array, id) {
    return array.find((entry) => entry.id == id);
}
