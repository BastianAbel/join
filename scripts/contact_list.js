const CONTACT_LIST_CONTAINER = document.getElementById("contact-list-container");
let allContacts = [];
let firstLetters = [];

async function loadAllContacts() {
    let contactsResponse = await loadData(PATH_TO_CONTACTS);
    let contactsKeysArray = Object.keys(contactsResponse);
    for (let i = 0; i < contactsKeysArray.length; i++) {
        allContacts.push({
            id: contactsKeysArray[i],
            contact: contactsResponse[contactsKeysArray[i]],
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
                document.getElementById(`div-for-contacts-with-letter(${firstLetters[i]})`).innerHTML += renderContactListContact(
                    allContacts[j].contact,
                    getContactInitials(allContacts[j].contact.name),
                    allContacts[j].id
                );
                setColorById(`profile-picture(${allContacts[j].id})`, allContacts[j].color);
            }
        }
    }
}

async function initializeContactsList() {
    loadUserInitials();
    onlyLoadIfUserOrGuest();
    await loadAllContacts();
    await getListSection();
}

function contactBigView(name, email, initials, id){
    let color = allContacts.find((e) => e.id == id).color;
    document.getElementById('main-content').innerHTML = renderSingleContactView(name, email, initials, id, color);
}

function editBigView(initials, color){
    document.getElementById('edit-delete-menu').style.display = "none";
    document.getElementById('profileBtn').style.backgroundColor = "#b8b9bb";
    document.getElementById('edit-contact-overlay').classList.remove('d-none')
    document.getElementById('main-content').innerHTML += showEditContactView(initials, color);
}

function closeEditContactView(){
    document.getElementById('edit-delete-menu').style.display = "flex";
    document.getElementById('edit-contact-overlay').classList.add('d-none');
    document.getElementById('profileBtn').style.backgroundColor = "white";
    document.getElementById('editContactContainer').classList.add('d-none');
}

window.addEventListener('mouseup', function (e) {
    let editContactDiv = document.getElementById('editContactContainer');
    if (!editContactDiv.contains(e.target)) {
        closeEditContactView();
    }
});


function navigateToContactList(){
    window.location.href = "contactlist.html"
}