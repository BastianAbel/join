const CONTACT_LIST_CONTAINER = document.getElementById("contact-list-container");
let allContacts = [];
let firstLetters = [];

async function loadAllContacts() {
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

function contactBigView(name, email, initials, id, phone) {
    let color = allContacts.find((e) => e.id == id).color;
    document.getElementById("main-content").innerHTML = renderSingleContactView(name, email, initials, id, color, phone);
}

function navigateToContactList() {
    window.location.href = "contactlist.html";
}
