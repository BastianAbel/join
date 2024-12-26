function getContactInitials(contactName) {
    return contactName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
}

function filterInputFromArray(sourceArray, input) {
    return sourceArray.filter((name) => name.toLowerCase().includes(input.toLowerCase()));
}
