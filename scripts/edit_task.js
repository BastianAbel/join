let editTaskPrio = "";
let editCheckedUsersNamesAndColors = [];
let editCheckedContactNamesAndColors = [];
let editNewTask = {};
let editContactNames = [];
let editFilteredNamesAndColors = [];

async function editGetAllUserNames() {
    onlyLoadIfUserOrGuest();
    loadUserInitials();
    await loadAllUsers();
    let usersNamesAndColors = allUsers.map((entry) => ({
        name: entry.user.userData.name.replace(/[^a-zA-ZöüäÖÜÄ ]/g, ""),
        color: entry.color,
        id: entry.id,
        tasksAssignedTo: entry.tasksAssignedTo,
    }));
    editFilteredNamesAndColors = usersNamesAndColors;
    addContactNamesToList(editFilteredNamesAndColors, document.getElementById('edit-task-contacts-list'));
    console.log(editFilteredNamesAndColors);
}

function checkContact(event, data) {
    const container = event.currentTarget;
    let currentContact = getContactFromArrayById(editFilteredNamesAndColors, data.id);
    container.classList.toggle("checked-contact");
    if (container.classList.contains("checked-contact")) {
        editCheckedUsersNamesAndColors.push(currentContact);
    } else {
        editCheckedUsersNamesAndColors.splice(editCheckedUsersNamesAndColors.indexOf(currentContact), 1);
    }
}

function addContactNamesToList(array, element) {
    element.innerHTML = "";
    for (let j = 0; j < array.length; j++) {
        let name = array[j].name;
        let id = array[j].id;
        element.innerHTML += renderAssignContact(name, id);
        setColorById(`name-circle(${id})`, array[j].color);
    }
}

function editFormatDateInput() {
    let dueDateInput = document.getElementById('edit-task-due-date');
    if (dueDateInput.value.length == 2 || dueDateInput.value.length == 5) {
        dueDateInput.value += `/`;
    }

    if (dueDateInput.value.length == 10 && !isDateValid(dueDateInput.value)) {
        dueDateInput.value = "";
    }
}

function editSetUrgentPrio() {
    let editPrioUrgentButton = document.getElementById('edit-prio-urgent-btn');
    let editPrioMediumButton = document.getElementById('edit-prio-medium-btn');
    let editPrioLowButton = document.getElementById('edit-prio-low-btn');
    editPrioUrgentButton.classList.add("active-urgent");
    editPrioMediumButton.classList.remove("active-medium");
    editPrioLowButton.classList.remove("active-low");
    editTaskPrio = "urgent";
}

function editSetMediumPrio() {
    let prioUrgentButton = document.getElementById('edit-prio-urgent-btn');
    let prioMediumButton = document.getElementById('edit-prio-medium-btn');
    let prioLowButton = document.getElementById('edit-prio-low-btn');
    prioUrgentButton.classList.remove("active-urgent");
    prioMediumButton.classList.add("active-medium");
    prioLowButton.classList.remove("active-low");
    editTaskPrio = "medium";
}

function editSetLowPrio() {
    let prioUrgentButton = document.getElementById('edit-prio-urgent-btn');
    let prioMediumButton = document.getElementById('edit-prio-medium-btn');
    let prioLowButton = document.getElementById('edit-prio-low-btn');
    prioUrgentButton.classList.remove("active-urgent");
    prioMediumButton.classList.remove("active-medium");
    prioLowButton.classList.add("active-low");
    editTaskPrio = "low";
}

function editShowContactList() {
    let editTaskContactListContainer = document.getElementById("edit-task-contact-list-container");
    let editTaskDropDownIcon = document.getElementById("edit-task-contact-drop-down-icon");
    let editNameCircleContainer = document.getElementById("edit-name-circle-container");
    if (event.currentTarget == event.target) {
        editTaskContactListContainer.classList.toggle("d_none");
        if (!editTaskContactListContainer.classList.contains("d_none")) {
            editTaskDropDownIcon.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            editTaskDropDownIcon.src = "/assets/icons/arrow-drop-down.svg";
            editNameCircleContainer.classList.remove("d_none");
            editNameCircleContainer.classList.add("open-circle-container");
            editNameCircleContainer.innerHTML = "";
            addNameCircles(editCheckedUsersNamesAndColors, editNameCircleContainer, `contact-name-circle`);
        }
        if (!editNameCircleContainer.classList.contains("d_none") && !editNameCircleContainer.hasChildNodes()) {
            editNameCircleContainer.classList.add("d_none");
            editNameCircleContainer.classList.remove("open-circle-container");
        }
    }
}

function editAddSubTask() {
    let subtaskTitle = "";
    let subTaskObject = {};
    let editSubtaskInput = document.getElementById("edit-subtask-title");
    let editSubtaskList = document.getElementById("edit-subtask-list")
    if (editSubtaskInput.value) {
        subtaskTitle = editSubtaskInput.value;
        editSubtaskList.innerHTML += renderSubtask(subtaskTitle);
        subTaskObject["description"] = subtaskTitle;
        subTaskObject["checked"] = false;
        subtaskList.push(subTaskObject);
        editSubtaskInput.value = "";
        editClearSubtaskInputField();
    }
}

function editClearSubtaskInputField() {
    document.getElementById("edit-subtask-title").value = "";
    document.getElementById("edit-sub-task-icon-plus").classList.remove("d_none");
    document.getElementById("edit-sub-task-icon-cross").classList.add("d_none");
    document.getElementById("edit-sub-task-icon-vector").classList.add("d_none");
    document.getElementById("edit-sub-task-icon-check").classList.add("d_none");
}

function editShowAndHideIcons() {
    let editSubtaskInput = document.getElementById("edit-subtask-title");
    let editSubtaskIconPlus = document.getElementById("edit-sub-task-icon-plus");
    let editSubtaskIconCross = document.getElementById("edit-sub-task-icon-cross");
    let editSubtaskIconVector = document.getElementById("edit-sub-task-icon-vector");
    let editSubtaskIconCheck = document.getElementById("edit-sub-task-icon-check");
    if (editSubtaskInput.value.length > 0) {
        editSubtaskIconPlus.classList.add("d_none");
        editSubtaskIconCross.classList.remove("d_none");
        editSubtaskIconVector.classList.remove("d_none");
        editSubtaskIconCheck.classList.remove("d_none");
    }
}

function editTaskGetEmployeeInfo(assignedUsers) {
    if (typeof assignedUsers === "string") {
        assignedUsers = assignedUsers.split(",");
    }
    for (let index = 0; index < assignedUsers.length; index++) {
        let bgColor = getRandomColor();
        document.getElementById("edit-name-circle-container").innerHTML += `
            <div style="background-color: ${bgColor}" class="name-circle">${getEmployeesInitials(assignedUsers[index])}</div>
        `;
    }
}

