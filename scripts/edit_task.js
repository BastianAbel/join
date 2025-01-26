let editCheckedUsersNamesAndColors = [];
let editCheckedContactNamesAndColors = [];
let editNewTask = {};
let editContactNames = [];
let editFilteredNamesAndColors = [];
let helperArray = [];


async function editGetAllContactsNames() {
    onlyLoadIfUserOrGuest();
    loadUserInitials();
    await loadAllContacts();
    let contactsNamesAndColors = allContacts.map((entry) => ({
        name: entry.user.name.replace(/[^a-zA-ZöüäÖÜÄ ]/g, ""),
        color: entry.color,
        id: entry.id,
        tasksAssignedTo: entry.tasksAssignedTo,
    }));
    editFilteredNamesAndColors = contactsNamesAndColors;
    addContactNamesToList(editFilteredNamesAndColors, document.getElementById("edit-task-contacts-list"));
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

function setContactAssignedToChecked(taskArrayOfAssignedContacts, arrayOfAllContactNames) {
    let listElementDiv;
    for (let i = 0; i < arrayOfAllContactNames.length; i++) {
        for (let j = 0; j < taskArrayOfAssignedContacts.length; j++) {
            {
                if (arrayOfAllContactNames[i].name == taskArrayOfAssignedContacts[j]) {
                    listElementDiv = document.getElementById(`check-box-assign-contact-id(${arrayOfAllContactNames[i].id})`);
                    listElementDiv.classList.add("checked-contact");
                }
            }
        }
    }
}

function editFormatDateInput() {
    let dueDateInput = document.getElementById("edit-task-due-date");
    if (dueDateInput.value.length == 2 || dueDateInput.value.length == 5) {
        dueDateInput.value += `/`;
    }

    if (dueDateInput.value.length == 10 && !isDateValid(dueDateInput.value)) {
        dueDateInput.value = "";
    }
}

function editSetUrgentPrio() {
    let editPrioUrgentButton = document.getElementById("edit-prio-urgent-btn");
    let editPrioMediumButton = document.getElementById("edit-prio-medium-btn");
    let editPrioLowButton = document.getElementById("edit-prio-low-btn");
    editPrioUrgentButton.classList.add("active-urgent");
    editPrioMediumButton.classList.remove("active-medium");
    editPrioLowButton.classList.remove("active-low");
    taskPrio = "urgent";
}

function editSetMediumPrio() {
    let prioUrgentButton = document.getElementById("edit-prio-urgent-btn");
    let prioMediumButton = document.getElementById("edit-prio-medium-btn");
    let prioLowButton = document.getElementById("edit-prio-low-btn");
    prioUrgentButton.classList.remove("active-urgent");
    prioMediumButton.classList.add("active-medium");
    prioLowButton.classList.remove("active-low");
    taskPrio = "medium";
}

function editSetLowPrio() {
    let prioUrgentButton = document.getElementById("edit-prio-urgent-btn");
    let prioMediumButton = document.getElementById("edit-prio-medium-btn");
    let prioLowButton = document.getElementById("edit-prio-low-btn");
    prioUrgentButton.classList.remove("active-urgent");
    prioMediumButton.classList.remove("active-medium");
    prioLowButton.classList.add("active-low");
    taskPrio = "low";
}

function editFilterInput(event) {
    let editTaskContactList = document.getElementById("edit-task-contact-list");
    editFilteredNamesAndColors = filterInputFromArray(NamesAndColors, event.target.value);
    addContactNamesToList(editFilteredNamesAndColors, editTaskContactList);
}

function checkContact(event, data) {
    const container = event.currentTarget;
    let currentContact = getContactFromArrayById(editFilteredNamesAndColors, data.id);
    container.classList.toggle("checked-contact");
    if (container.classList.contains("checked-contact")) {
        editCheckedContactNamesAndColors.push(currentContact);
        contactNames.push(currentContact.name);
        helperArray.push(currentContact.name);
    } else {
        editCheckedContactNamesAndColors.splice(editCheckedContactNamesAndColors.indexOf(currentContact), 1);
        contactNames.splice(contactNames.indexOf(currentContact.name), 1);
        helperArray.splice(helperArray.indexOf(currentContact.name), 1);
    }
}

function loadCardContactsInArray(taskId) {
    let currentTask = getTaskFromArrayById(allTasks, taskId);
    helperArray = currentTask.assignedTo;
    editCheckedContactNamesAndColors = editFilteredNamesAndColors.filter((contact) => helperArray.includes(contact.name));
}

function getTaskFromArrayById(array, id) {
    return array.find((entry) => entry.id == id);
}

function editShowContactList(event, taskId) {
    let editTaskContactListContainer = document.getElementById("edit-task-contact-list-container");
    let editTaskDropDownIcon = document.getElementById("edit-task-contact-drop-down-icon");
    let editNameCircleContainer = document.getElementById("edit-name-circle-container");
    let currentTask = getTaskFromArrayById(allTasks, taskId);
    helperArray = currentTask.assignedTo;
    editCheckedContactNamesAndColors = editFilteredNamesAndColors.filter((contact) => helperArray.includes(contact.name));

    if (event.currentTarget == event.target) {
        editTaskContactListContainer.classList.toggle("d_none");
        if (!editTaskContactListContainer.classList.contains("d_none")) {
            editTaskDropDownIcon.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            editTaskDropDownIcon.src = "/assets/icons/arrow-drop-down.svg";
            editNameCircleContainer.classList.remove("d_none");
            editNameCircleContainer.classList.add("open-circle-container");
            editNameCircleContainer.innerHTML = "";

            addNameCircles(editCheckedContactNamesAndColors, editNameCircleContainer, `contact-name-circle`);
        }
        if (!editNameCircleContainer.classList.contains("d_none") && !editNameCircleContainer.hasChildNodes()) {
            editNameCircleContainer.classList.add("d_none");
            editNameCircleContainer.classList.remove("open-circle-container");
        }
    }
    setContactAssignedToChecked(currentTask.assignedTo, editFilteredNamesAndColors);
}

async function removeTaskIdFromUncheckedContacts(taskId) {
    let uncheckedContacts = editFilteredNamesAndColors.filter((contact) => !contactNames.includes(contact.name));
    for (let i = 0; i < uncheckedContacts.length; i++) {
        let contact = uncheckedContacts[i];
        let contactTasks = contact.tasksAssignedTo || [];
        let taskIndex = contactTasks.indexOf(taskId);
        if (taskIndex !== -1) {
            contactTasks.splice(taskIndex, 1);
            await updateData(PATH_TO_CONTACTS, contact.id, contact);
        }
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

function editAddSubTask() {
    let subtaskTitle = "";
    let subTaskObject = {};
    let editSubtaskInput = document.getElementById("edit-subtask-title");
    let editSubtaskList = document.getElementById("edit-subtask-list");
    if (editSubtaskInput.value) {
        subtaskTitle = editSubtaskInput.value;
        editSubtaskList.innerHTML += renderSubtask(subtaskTitle);
        subTaskObject["checked"] = false;
        subTaskObject["description"] = subtaskTitle;
        subtaskList.push(subTaskObject);
        editSubtaskInput.value = "";
        editClearSubtaskInputField();
    }
}

async function editGetSubtaskInfo(subtasks, taskId) {
    if (subtasks == "undefined") {
        document.getElementById("edit-subtask-list").innerHTML = "";
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            subtaskList.push(subtasks[i]);
            document.getElementById("edit-subtask-list").innerHTML += `<li>
				<div class="subtask-text-img-container">
					<span onblur="removeEditClass(event)">${subtasks[i].description}</span>
					<div class="subtask-img-container">
						<img 
							src="/assets/icons/edit-symbol.svg"
							alt="pencil icon"
							onclick="editContent(event)"
						/>
						<img
							id="sub-task-icon-vector"
							src="/assets/icons/subtask-vektor.svg"
							alt="vector icon"
						/>
						<img
							src="/assets/icons/trashcan.svg"
							alt="trashcan-logo"
							onclick="deleteSubtask(event,'${subtasks[i].description}')"
						/>
					</div>
				</div>
			</li>`;
        }
    }
}

async function getChangedTaskData(taskId) {
    let changedTaskTitle = document.getElementById("edit-task-title").value;
    let changedTaskDescription = document.getElementById("edit-task-description").value;
    let changedTaskDate = document.getElementById("edit-task-due-date").value;
    let changedTaskPrio = taskPrio;
    let changedContacts = editCheckedContactNamesAndColors.map((contact) => contact.name);
    let changedSubtaskList = subtaskList;
    await setChangedTaskDataToBackend(taskId, changedTaskTitle, changedTaskDescription, changedTaskDate, changedTaskPrio, changedContacts, changedSubtaskList);
}

async function setChangedTaskDataToBackend(taskId, changedTaskTitle, changedTaskDescription, changedTaskDate, changedTaskPrio, changedContacts, changedSubtaskList) {
    if (changedTaskTitle !== "" || changedTaskDescription !== "" || changedTaskDate !== "" || changedTaskPrio !== "" || changedContacts !== "") {
        updateData((path = PATH_TO_TASKS), (id = taskId), (data = {
            "title": changedTaskTitle,
            "description": changedTaskDescription,
            "dueDate": changedTaskDate,
            "priority": changedTaskPrio,
            "assignedTo": changedContacts,
            "subtasks": changedSubtaskList,
        }));
        await addTaskToAssignedContacts();
        await setBackendJsonToSessionStorage();
        editTaskSlideOut();
    }

}
