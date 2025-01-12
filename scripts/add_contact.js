
let initials = "";
let newColor = getRandomColor();
function fillPlaceholderBubble() {
    const PLACEHOLDER_CIRCLE = document.getElementById("add-contact-placeholder");
    const CONTACT_INITIALS = document.getElementById("add-contact-initials-paragraph");
    const CONTACT_PLACEHOLDER_IMG = document.getElementById("add-contact-placeholder-img");
    const NAME_INPUT = document.getElementById("add-contact-name-input-field");
    if (NAME_INPUT.value) {
        PLACEHOLDER_CIRCLE.classList.remove("d-none");
        initials = getContactInitials(NAME_INPUT.value);
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
    const EMAIL_INPUT = document.getElementById("add-contact-email-input-field");
    const PHONE_INPUT = document.getElementById("add-contact-phone-input-field");
    const NAME_INPUT = document.getElementById("add-contact-name-input-field");
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
            document.getElementById('contact-overlay').classList.add('d-none');
            document.getElementById('profileBtn').style.backgroundColor = "white";
            document.getElementById("main-content").innerHTML = renderNewContact(newContact.name, newContact.email, initials, newId, newColor, newContact.phone);
            document.getElementById('add-contact-success-div').classList.remove('d-none');
            document.getElementById('add-contact-success-div').classList.add('slide-up-success');
            setTimeout(() => {
                document.getElementById('add-contact-success-div').classList.remove('slide-up-success');
                document.getElementById("add-contact-success-div").classList.add("slide-down-success");
            }, 1500);
        }
    } catch (error) {
        console.error("Fehler beim Erstellen des Kontaktes:", error);
    }
}
