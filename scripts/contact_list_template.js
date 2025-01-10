function renderContactSection(letter) {
    return `<div class="contactlist-category">
                    <span>${letter}</span>
                </div>
                <div class="contactlist-separator"></div>
				<div id="div-for-contacts-with-letter(${letter})"></div>`;
}

function renderContactListContact(contact, initials, id) {

    return `<div onclick="contactBigView('${contact.name}','${contact.email}', '${contact.phone}','${initials}', '${id}', )" class="contactlist-contact">

                    <div id="profile-picture(${id})" class="profile-picture test-profile-picture-background">
                        <span>${initials}</span>
                    </div>
                    <div class="contactlist-name-and-email">
                        <span>${contact.name}</span>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>`;
}


function renderSingleContactView(name, email,phone, initials, id, color) {
    return ` 
            <div id="contact-overlay" class="d-none contact-overlay"></div>
            <div class="contact-container">
                <div class="contact-head">
                    <div>
                        <h1>Contacts</h1>
                    </div>
                    <div class="arrow-position">
                        <img onclick="navigateToContactList()" class="" src="/assets/icons/blue-arrow-left.svg" alt="" />
                    </div>
                </div>
                <span class="border-bottom">Better with a team</span>
                <div class="contact-name">
                    <div id="profile-picture(${id})" class="contact-id profile-picture test-profile-picture-background" style="background-color: ${color};">
                        <span id="userInitials">${initials}</span>
                    </div>
                    <h2 id="userName">${name}</h2>
                </div>
                <div class="contact-information">
                    <span>Contact Information</span>
                    <span class="small-span"><b>Email</b></span>
                    <a id="userEmail" class="small-span" href="#">${email}</a>
                    <span class="small-span"><b>Phone</b></span>
                    <span id="userPhone" class="small-span">${phone}</span>
                </div>
                <div id="edit-delete-menu" class="edit-popup-container d-none">
                <div onclick="editBigView('${initials}', '${color}', '${id}', '${name}', '${email}', '${phone}')" class="option-container">
                    <div  class="option-edit"></div><span>Edit</span>
                </div>
                <div onclick="deleteContact('${id}')" class="option-container">
                    <div class="option-delete"></div><span>Delete</span>
                </div>
                </div>
                    <div id="option-circle" onclick="showEditDeleteMenu()" class="options-icon-container">
                        <img src="/assets/icons/options-logo.svg" alt="" />
                    </div>
            </div>`;
}

function renderEditContactView(initials, color, id) {
    return `<div id="editContactContainer" class="big-contact-container">
                <div class="add-contact-container">
                    <div class="close-container">
                        <img onclick="EditContactViewSlideDown()" src="/assets/icons/cross-white.svg" alt="">
                    </div>
                    <div class="add-contact-head">
                        <h1 class="border-bottom">Edit contact</h1>
                    </div>
                </div>
                <div class="placeholder-container">
                    <div class="placeholder-contact" style="background-color: ${color};">${initials} </div>
                </div>
                    <div class="create-contact-container">
                        <div class="input-container">
                            <input id="newName" type="text" placeholder="Name" required>
                            <img src="/assets/icons/contact-person.svg" alt="User Icon" class="input-icon">
                        </div>
                        <div class="input-container">
                            <input id="newEmail" type="email" placeholder="Email" required>
                            <img src="/assets/icons/mail-icon.svg" alt="Mail Icon" class="input-icon">
                        </div>
                        <div class="input-container">
                            <input id="newPhone" type="tel" placeholder="Phone" required>
                            <img src="/assets/icons/phone-icon.svg" alt="Phone Icon" class="input-icon">
                        </div>
                    </div>
                    <div class="button-container">
                        <div>
                            <button class="delete-button">Delete</button>
                        </div>
                        <div>
                            <button onclick="getEditedUserData('${id}')" class="save-contact-button">Save <img src="/assets/icons/check.svg" alt=""></button>
                        </div>
                </div>
            </div>`;
}

function renderAddContactView() {
    return `
    <div id="addContactContainer" class="big-contact-container">
    <div  class="add-contact-container">
    <div class="add-contact-container">
        <div class="close-container">
            <img onclick="AddContactViewSlideDown()" src="/assets/icons/cross-white.svg" alt="">
        </div>
        <div class="add-contact-head">
            <h1>Add Contact</h1>
            <span class="border-bottom">Tasks are better with a team!</span>
        </div>
    </div>
    <div class="placeholder-container">
        <img src="/assets/icons/contact-placeholder.svg" alt="">
    </div>
    <form action="">
        <div class="create-contact-container">
            <div class="input-container">
                <input type="text" placeholder="Name" required>
                <img src="/assets/icons/contact-person.svg" alt="User Icon" class="input-icon">
            </div>
            <div class="input-container">
                <input type="email" placeholder="Email" required>
                <img src="/assets/icons/mail-icon.svg" alt="Mail Icon" class="input-icon">
            </div>
            <div class="input-container">
                <input type="tel" placeholder="Phone" required>
                <img src="/assets/icons/phone-icon.svg" alt="Phone Icon" class="input-icon">
            </div>
        </div>
        <div class="button-container">
            <button type="submit" class="create-contact-button">Create contact<img src="/assets/icons/check.svg"alt=""></button>
        </div>
    </form>
    </div>
    `;
}
