function toggleClassById(className, ...IDs) {
    for (let i = 0; i < IDs.length; i++) {
        currentElement = document.getElementById(IDs[i]);
        currentElement?.classList.toggle(className);
    }
}

function getBackToPreviousSite() {
    window.history.back();
}

function onlyLoadIfUserOrGuest(){
    user = sessionStorage.getItem('user');
    guest = sessionStorage.getItem('guest')
    if (guest || user) {
        return true;
    } else {
        window.location.href = 'login-page.html';
    }
}

function showSubmenu(){
    document.getElementById('submenu').classList.remove('d-none');
}

document.addEventListener('mouseup', function (e) {
    let submenuDiv = document.getElementById('submenu');
    if (submenuDiv && !submenuDiv.contains(e.target)) {
        submenuDiv.classList.add('d-none'); 
    }
});
