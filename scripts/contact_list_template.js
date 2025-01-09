function renderContactSection(letter) {
    return `<div class="contactlist-category">
                    <span>${letter}</span>
                </div>
                <div class="contactlist-separator"></div>
				<div id="div-for-contacts-with-letter(${letter})"></div>`;
}

function renderContactListContact(contact, initials, id) {
    return `<div onclick="contactBigView('${contact.name}','${contact.email}', '${initials}', '${id}', '${contact.phone}')" class="contactlist-contact">
                    <div id="profile-picture(${id})" class="profile-picture test-profile-picture-background">
                        <span>${initials}</span>
                    </div>
                    <div class="contactlist-name-and-email">
                        <span>${contact.name}</span>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>`;
}

function renderSingleContactView(name, email, initials, id, color, phone) {
    return ` <div id="edit-delete-menu" class="edit-popup-container d-none">
                <div class="option-container">
                    <div class="option-edit"></div><span>Edit</span>
                 </div>
                <div class="option-container">
                    <div class="option-delete"></div><span>Delete</span>
                </div>
            </div>
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
                        <span>${initials}</span>
                    </div>
                    <h2>${name}</h2>
                </div>
                <div class="contact-information">
                    <span>Contact Information</span>
                    <span class="small-span"><b>Email</b></span>
                    <a class="small-span" href="#">${email}</a>
                    <span class="small-span"><b>Phone</b></span>
                    <span class="small-span">${phone}</span>
                </div>
                <div onclick="showEditDeleteMenu()" class="options-icon-container">
                    <img src="/assets/icons/options-logo.svg" alt="" />
                </div>
            </div>`;
}
