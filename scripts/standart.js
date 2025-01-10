function toggleClassById(className, ...IDs) {
    for (let i = 0; i < IDs.length; i++) {
        currentElement = document.getElementById(IDs[i]);
        currentElement?.classList.toggle(className);
    }
}

function getBackToPreviousSite() {
    window.history.back();
}

function onlyLoadIfUserOrGuest() {
    user = localStorage.getItem('user');
    guest = localStorage.getItem('guest');
    if (guest || user) {
        return true;
    } else {
        window.location.href = 'login-page.html';
    }
}



