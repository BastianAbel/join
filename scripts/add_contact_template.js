function renderNewContact(name, email, initials, id, color, phone) {
    return `
	<!-- popup -->
        
	<div id="edit-delete-menu" class="edit-popup-container d-none">
                <div onclick="editBigView('${initials}', '${color}', '${id}', '${name}', '${email}', '${phone}' )" class="option-container">
                    <div class="option-edit"></div><span>Edit</span>
                 </div>
                <div onclick="deleteContact('${id}')" class="option-container">
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
                    <a class="small-span" href="">${email}</a>
                    <span class="small-span"><b>Phone</b></span>
                    <span class="small-span">${phone}</span>
                </div>
                <div id="option-circle" onclick="showEditDeleteMenu()" class="options-icon-container">
                    <img src="/assets/icons/options-logo.svg" alt="" />
                </div>
            </div>
    <div class="nav-bar-main-container">
        <div class="nav-bar">
            <a href="/pages/summary.html" id="nav-bar-container-summary" class="nav-bar-container"><img id="nav-bar-img-1"
                    src="/assets/icons/summary.svg" alt="" />
                <span>Summary</span></a>
            <a href="/pages/board.html" id="nav-bar-container-board" class="nav-bar-container"><img id="nav-bar-img-2"
                    src="/assets/icons/board.svg" alt="" />
                <span>Board</span></a>
            <a href="/pages/add-task.html" id="nav-bar-container-add-to-task" class="nav-bar-container"><img id="nav-bar-img-3"
                    src="/assets/icons/add-to-task.svg" alt="" />
                <span>Add Task</span></a>
            <a href="/pages/contactlist.html" id="nav-bar-container-contacts" class="nav-bar-container"><img id="nav-bar-img-4"
                    src="/assets/icons/contacts.svg" alt="" />
                <span>Contacts</span></a>
        </div>
    </div>`;
}
