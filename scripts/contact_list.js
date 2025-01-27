const CONTACT_LIST_CONTAINER = document.getElementById("contact-list-container");
let allContacts = [];
let firstLetters = [];

async function loadAllContacts() {
    //TODO - remove setBackendJsonToSessionStorage()
    await setBackendJsonToSessionStorage();
    let fullObjectInSessionStorage = getJsonObjectFromSessionStorage();
    let contactsKeysArray = Object.keys(fullObjectInSessionStorage.contacts);
    for (let i = 0; i < contactsKeysArray.length; i++) {
        allContacts.push({
            id: contactsKeysArray[i],
            contact: fullObjectInSessionStorage.contacts[contactsKeysArray[i]],
            color: getRandomColor(),
        });
    }
    return allContacts;
}

async function getListSection() {
    allContacts.sort((a, b) => (a.contact.name > b.contact.name ? 1 : a.contact.name < b.contact.name ? -1 : 0));
    firstLetters = Array.from(new Set(allContacts.map((entry) => entry.contact.name[0].toUpperCase())));
    for (let i = 0; i < firstLetters.length; i++) {
        CONTACT_LIST_CONTAINER.innerHTML += renderContactSection(firstLetters[i]);
        for (let j = 0; j < allContacts.length; j++) {
            if (allContacts[j].contact.name.startsWith(firstLetters[i])) {
                document.getElementById(`div-for-contacts-with-letter(${firstLetters[i]})`).innerHTML += renderContactListContact(allContacts[j].contact, getContactInitials(allContacts[j].contact.name), allContacts[j].id);
                setColorById(`profile-picture(${allContacts[j].id})`, allContacts[j].color);
            }
        }
    }
}

async function initializeContactsList() {
    loadUserInitials();
    onlyLoadIfUserOrGuest();
    await setBackendJsonToSessionStorage();
    await loadAllContacts();
    await getListSection();
}

function navigateToContactList() {
    window.location.href = "contactlist.html";
}

function contactBigView(name, email, phone, initials, id, contact) {
    let color = allContacts.find((e) => e.id == id).color;
    document.getElementById("single-contact-view").innerHTML = renderSingleContactView(name, email, phone, initials, id, color, contact);
}

function editBigView(initials, color, id, name, email, phone) {
    document.getElementById("edit-delete-menu").style.display = "none";
    document.getElementById("profileBtn").style.backgroundColor = "#b8b9bb";
    document.getElementById("window-overlay").classList.remove("d-none");
    document.getElementById("main-content").innerHTML += renderEditContactView(initials, color, id);
    document.getElementById("newName").value = name;
    document.getElementById("newEmail").value = email;
    document.getElementById("newPhone").value = phone;
}

function closeEditContactView() {
    document.getElementById("edit-delete-menu").style.display = "flex";
    document.getElementById("window-overlay").classList.add("d-none");
    document.getElementById("profileBtn").style.backgroundColor = "white";
    document.getElementById("editContactContainer").classList.add("d-none");
    document.getElementById("editContactContainer").outerHTML = "";
    navigateToContactList();
}

function closeAddContactView() {
    document.getElementById("profileBtn").style.backgroundColor = "white";
    document.getElementById("window-overlay").classList.add("d-none");
    document.getElementById("addContactContainer").classList.add("d-none");
    document.getElementById("addContactContainer").outerHTML = "";
    
}

function EditContactViewSlideDown() {
    document.getElementById("editContactContainer").classList.add("hidden");
    setTimeout(() => {
        closeEditContactView();
    }, 300);
}

document.addEventListener("mouseup", function (e) {
    let editContactDiv = document.getElementById("editContactContainer");
    if (editContactDiv && !editContactDiv.contains(e.target)) {
        editContactDiv.classList.add("hidden");
        setTimeout(() => {
            closeEditContactView();
        }, 300);
    }
});

function openAddContactView() {
    document.getElementById("profileBtn").style.backgroundColor = "#b8b9bb";
    document.getElementById("window-overlay").classList.remove("d-none");
    document.getElementById("main-content").innerHTML += renderAddContactView();
}

document.addEventListener("mouseup", function (e) {
    let addContactDiv = document.getElementById("addContactContainer");
    if (addContactDiv && !addContactDiv.contains(e.target)) {
        addContactDiv.classList.add("hidden");
        setTimeout(() => {
            closeAddContactView();
        }, 300);
    }
});

function AddContactViewSlideDown() {
    document.getElementById("addContactContainer").classList.add("hidden");
    setTimeout(() => {
        closeAddContactView();
    }, 300);
}

function navigateToContactList() {
    window.location.href = "contactlist.html";
}

let submenuVisible = false;

function showSubmenu() {
    let submenu = document.getElementById("submenu");
    submenu.classList.remove("d-none", "hidden");
    submenuVisible = true;
}

document.addEventListener("mouseup", function (e) {
    let submenuDiv = document.getElementById("submenu");
    if (submenuVisible && !submenuDiv.contains(e.target)) {
        submenuDiv.classList.add("hidden");
        setTimeout(() => {
            submenuDiv.classList.add("d-none");
            submenuVisible = false;
        }, 100);
    }
});

let editDeleteMenuVisible = false;

function showEditDeleteMenu() {
    let editDeleteMenu = document.getElementById("edit-delete-menu");
    document.getElementById("option-circle").classList.add("d-none");
    editDeleteMenu.classList.remove("d-none", "hidden");
    editDeleteMenuVisible = true;
}

document.addEventListener("mouseup", function (e) {
    let editDeleteMenuDiv = document.getElementById("edit-delete-menu");
    if (editDeleteMenuVisible && !editDeleteMenuDiv.contains(e.target)) {
        editDeleteMenuDiv.classList.add("hidden");
        setTimeout(() => {
            editDeleteMenuDiv.classList.add("d-none");
            document.getElementById("option-circle").classList.remove("d-none");
            editDeleteMenuVisible = false;
        }, 100);
    }
});

function getEditedUserData(id) {
    let newName = document.getElementById("newName").value;
    let newEmail = document.getElementById("newEmail").value;
    let newPhone = document.getElementById("newPhone").value;
    saveEditedUserData(newName, newEmail, newPhone, id);
}

function saveEditedUserData(newName, newEmail, newPhone, id) {
    document.getElementById("newName").innerHTML = newName;
    document.getElementById("newEmail").innerHTML = newEmail;
    document.getElementById("newPhone").innerHTML = newPhone;
    updateData((path = PATH_TO_CONTACTS), (id = id), (data = { "email": newEmail, "name": newName, "phone": newPhone }));
    EditContactViewSlideDown();
    
}

async function deleteContact(id) {
    await deleteData((path = PATH_TO_CONTACTS), (id = id));
    await setBackendJsonToSessionStorage();
    loadAllContacts();
    navigateToContactList();
}
