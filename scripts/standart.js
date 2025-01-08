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

let submenuVisible = false;

function showSubmenu() {
    let submenu = document.getElementById('submenu');
    submenu.classList.remove('d-none', 'hidden');
    submenuVisible = true; 
}

document.addEventListener('mouseup', function (e) {
    let submenuDiv = document.getElementById('submenu');
    if (submenuVisible && !submenuDiv.contains(e.target)) {
        submenuDiv.classList.add('hidden');
        setTimeout(() => {
            submenuDiv.classList.add('d-none');
            submenuVisible = false; 
        }, 100); 
    }
});

let editDeleteMenuVisible = false;

function showEditDeleteMenu(){
    let editDeleteMenu = document.getElementById('edit-delete-menu');
    document.getElementById('option-circle').style.display = "none";
    editDeleteMenu.classList.remove('d-none', 'hidden');
    editDeleteMenuVisible = true;
}

window.addEventListener('mouseup', function (e) {
    let editDeleteMenuDiv = document.getElementById('edit-delete-menu');
    if (editDeleteMenuVisible && !editDeleteMenuDiv.contains(e.target)) {
        editDeleteMenuDiv.classList.add('hidden');
        setTimeout(() => {
            editDeleteMenuDiv.classList.add('d-none');
            document.getElementById('option-circle').style.display = "flex";
            editDeleteMenuVisible = false; 
        }, 100); 
    }
});

