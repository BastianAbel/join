let initials = "";
let newColor = getRandomColor();

/**
 * Function to get the initials of a contact, set a new color and fill the placeholder bubble at the add contact form
 */
function fillPlaceholderBubble() {
  const PLACEHOLDER_CIRCLE = document.getElementById("add-contact-placeholder");
  const CONTACT_INITIALS = document.getElementById(
    "add-contact-initials-paragraph"
  );
  const CONTACT_PLACEHOLDER_IMG = document.getElementById(
    "add-contact-placeholder-img"
  );
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

/**
 * Function to clear all input fields of the add contact form
 */
function clearAllInput() {
  location.reload();
}

/**
 * Function to get all contact-id's in firebase
 * @returns an array of all contact-id's in firebase
 */
async function getIdOfNewContact() {
  let response = await loadData(PATH_TO_CONTACTS);
  let contactsKeysArray = Object.keys(response);
  return contactsKeysArray[contactsKeysArray.length - 1];
}

/**
 * Function to create a new contact in firebase by collecting the input values of the add contact form
 * and pushing them to the allContacts array before giving feedback to the user
 * @param {event} event
 */
async function createContact(event) {
  event.preventDefault();
  if (
    !inputsFilled(
      "add-contact-name-input-field",
      "add-contact-email-input-field",
      "add-contact-phone-input-field"
    )
  ) {
    return;
  }
  const EMAIL_INPUT = document.getElementById("add-contact-email-input-field");
  const PHONE_INPUT = document.getElementById("add-contact-phone-input-field");
  const NAME_INPUT = document.getElementById("add-contact-name-input-field");
  let newContact = {
    email: EMAIL_INPUT.value,
    name: NAME_INPUT.value,
    phone: PHONE_INPUT.value,
  };

  if (!newContact.email || !newContact.name || !newContact.phone) return;
  try {
    await postData(PATH_TO_CONTACTS, newContact);
    await setBackendJsonToSessionStorage();
    let newId = await getIdOfNewContact();
    allContacts.push({ id: newId, contact: newContact, color: newColor });
    document.getElementById("single-contact-view").innerHTML = renderNewContact(
      newContact.name,
      newContact.email,
      initials,
      newId,
      newColor,
      newContact.phone
    );
    ["addContactContainer", "window-overlay"].forEach((id) =>
      document.getElementById(id).classList.add("d-none")
    );

    let successDiv = document.getElementById("add-contact-success-div");
    successDiv.classList.remove("d-none", "slide-down-success");
    successDiv.classList.add("slide-up-success");
    setTimeout(() => {
      successDiv.classList.replace("slide-up-success", "slide-down-success");
      setTimeout(() => successDiv.classList.add("d-none"), 500);
      navigateToContactList();
    }, 1500);
  } catch (error) {
    console.error("Fehler beim Erstellen des Kontaktes:", error);
  }
}
