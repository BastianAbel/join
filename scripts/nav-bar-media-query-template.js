function desktopNavBarTemplate() {
    return `
            <div class="join-logo-desktop-nav-bar">
               <a href="#"><img src="/assets/icons/join-logo-white.svg" alt=""></a> 
            </div>
            <div class="desktop-nav-bar">
                <a href="/pages/summary.html" id="nav-bar-container-summary" class="desktop-nav-bar-container"
                    ><img id="nav-bar-img-1" src="/assets/icons/summary.svg" alt="" /> <span>Summary</span></a
                >
                <a href="/pages/board.html" id="nav-bar-container-board" class="desktop-nav-bar-container"
                    ><img id="nav-bar-img-2" src="/assets/icons/board.svg" alt="" /> <span>Board</span></a
                >
                <a href="/pages/add-task.html" id="nav-bar-container-add-to-task" class="desktop-nav-bar-container"
                    ><img id="nav-bar-img-3" src="/assets/icons/add-to-task.svg" alt="" /> <span>Add Task</span></a
                >
                <a href="/pages/contactlist.html" id="nav-bar-container-contacts" class="desktop-nav-bar-container"
                    ><img id="nav-bar-img-4" src="/assets/icons/contacts.svg" alt="" /> <span>Contacts</span></a
                >
            </div>
            <div>
                <div class="legal-main-container-desktop-nav-bar">
                <div class="legal-container-desktop-nav-bar">
                    <a href="/pages/privacy-policy.html">Privacy Policy</a>
                    <a href="/pages/impressum.html">Legal notice</a>
                    </div>
                </div>
           
    `;
}

function mobileNavBarTemplate() {
    return `
    <div class="nav-bar">
                    <a href="/pages/summary.html" id="nav-bar-container-summary" class="nav-bar-container">
                        <img id="nav-bar-img-1" src="/assets/icons/summary.svg" alt="" /> <span>Summary</span>
                    </a>
                    <a href="/pages/board.html" id="nav-bar-container-board" class="nav-bar-container">
                        <img id="nav-bar-img-2" src="/assets/icons/board.svg" alt="" /> <span>Board</span>
                    </a>
                    <a href="/pages/add-task.html" id="nav-bar-container-add-to-task" class="nav-bar-container">
                        <img id="nav-bar-img-3" src="/assets/icons/add-to-task.svg" alt="" /> <span>Add Task</span>
                    </a>
                    <a href="/pages/contactlist.html" id="nav-bar-container-contacts" class="nav-bar-container">
                        <img id="nav-bar-img-4" src="/assets/icons/contacts.svg" alt="" /> <span>Contacts</span>
                    </a>
                </div>
            `;
}
