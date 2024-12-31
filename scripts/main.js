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
function addColorToElements(elementsClassName) {
    let nameBubbles = document.getElementsByClassName(elementsClassName);
    for (let i = 0; i < nameBubbles.length; i++) {
        nameBubbles[i].style.backgroundColor = getRandomColor();
    }
}
