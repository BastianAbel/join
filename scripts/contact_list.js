let allContacts = [];

async function loadAllContacts() {
    let contactsResponse = await loadData(PATH_TO_CONTACTS);
    let contactsKeysArray = Object.keys(contactsResponse);
    for (let i = 0; i < contactsKeysArray.length; i++) {
        allContacts.push({
            id: contactsKeysArray[i],
            contact: contactsResponse[contactsKeysArray[i]],
        });
    }
    return allContacts;
}

async function getListSection() {
    allContacts.sort((a, b) => (a.contact.name > b.contact.name ? 1 : a.contact.name < b.contact.name ? -1 : 0));
    console.log(allContacts);
}

async function initializeContactsList() {
    await loadAllContacts();
    console.log(allContacts);
    await getListSection();
}
