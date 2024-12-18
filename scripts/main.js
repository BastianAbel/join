function getBackToPreviousSite() {
    window.history.back();
}

function getContactInitials(contactName) {
    let names = [];
    names = contactName.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
        initials += names[i][0].toUpperCase();
    }
    return initials;
}
