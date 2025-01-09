const PLACEHOLDER_CIRCLE = document.getElementById("add-contact-placeholder");
const CONTACT_INITIALS = document.getElementById("add-contact-initials-paragraph");
const CONTACT_PLACEHOLDER_IMG = document.getElementById("add-contact-placeholder-img");
const NAME_INPUT = document.getElementById("add-contact-name-input-field");
const EMAIL_INPUT = document.getElementById("add-contact-email-input-field");
const PHONE_INPUT = document.getElementById("add-contact-phone-input-field");
const SUCCESS_MESSAGE = document.getElementById("add-contact-success-div");
let initials = "";
let newColor = getRandomColor();
function fillPlaceholderBubble() {
    const name = NAME_INPUT.value;
    if (name) {
        PLACEHOLDER_CIRCLE.classList.remove("d-none");
        initials = getContactInitials(name);
        setColorById("add-contact-placeholder", newColor);
        CONTACT_PLACEHOLDER_IMG.classList.add("d-none");
        CONTACT_INITIALS.innerHTML = initials;
    } else {
        PLACEHOLDER_CIRCLE.classList.add("d-none");
        CONTACT_PLACEHOLDER_IMG.classList.remove("d-none");
    }
}

function clearAllInput() {
    location.reload();
}

async function getIdOfNewContact() {
    let response = await loadData(PATH_TO_CONTACTS);
    let contactsKeysArray = Object.keys(response);
    return contactsKeysArray[contactsKeysArray.length - 1];
}

async function createContact(event) {
    event.preventDefault();
    let newContact = {
        "email": EMAIL_INPUT.value,
        "name": NAME_INPUT.value,
        "phone": PHONE_INPUT.value,
    };

    try {
        if (newContact["email"] !== "" && newContact["name"] !== "" && newContact["phone"] !== "") {
            await postData(PATH_TO_CONTACTS, newContact);
            await setBackendJsonToSessionStorage();
            let newId = await getIdOfNewContact();
            allContacts.push({
                id: newId,
                contact: newContact,
                color: newColor,
            });
            navigateToContactList();
            contactBigView(newContact.name, newContact.email, initials, id, newContact.phone);
        }
    } catch (error) {
        console.error("Fehler beim Erstellen des Kontaktes:", error);
    }

    console.log(newContact);

    //TODO - Post Contact to DB
}
