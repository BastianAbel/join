const TASK_CONTACT_LIST_CONTAINER = document.getElementById("add-task-contact-list-container");
const CONTACT_INPUT = document.getElementById("task-contact-input");
const CONTACT_INPUT_ICON = document.getElementById("add-task-contact-drop-down-icon");
const TASK_CONTACT_LIST = document.getElementById("add-task-contacts-list");
const NAME_CIRCLE_CONTAINER = document.getElementById("name-circle-container");
const SUBTASK_INPUT = document.getElementById("subtask-title");
const SUBTASK_LIST = document.getElementById("subtask-list");
const SUBTASK_ICON_PLUS = document.getElementById("sub-task-icon-plus");
const SUBTASK_ICON_CROSS = document.getElementById("sub-task-icon-cross");
const SUBTASK_ICON_VECTOR = document.getElementById("sub-task-icon-vector");
const SUBTASK_ICON_CHECK = document.getElementById("sub-task-icon-check");
const TASK_TITLE_INPUT = document.getElementById("task-title");
const DUE_DATE_INPUT = document.getElementById("task-due-date");
const TASK_CATEGORY_SELECT = document.getElementById("task-category-select");
const TASK_DESCRIPTION = document.getElementById("task-description");
const PRIO_URGENT_BUTTON = document.getElementById("prio-urgent-btn");
const PRIO_MEDIUM_BUTTON = document.getElementById("prio-medium-btn");
const PRIO_LOW_BUTTON = document.getElementById("prio-low-btn");
let newTask = {};
let contactNames = [];
let filteredNamesAndColors = [];
let checkedContactNamesAndColors = [];
let subtaskList = [];
let taskPrio = "";

async function loadAllContacts() {
    await setBackendJsonToSessionStorage();
    let contactsResponse = await loadData(PATH_TO_CONTACTS);
    let contactsKeysArray = Object.keys(contactsResponse);
    for (let i = 0; i < contactsKeysArray.length; i++) {
        allContacts.push({
            id: contactsKeysArray[i],
            user: contactsResponse[contactsKeysArray[i]],
            color: getRandomColor(),
            tasksAssignedTo: contactsResponse[contactsKeysArray[i]].tasksAssignedTo,
        });
    }
    return allContacts;
}

async function getAllContactsNames() {
    onlyLoadIfUserOrGuest();
    loadUserInitials();
    await loadAllContacts();
    let contactsNamesAndColors = allContacts.map((entry) => ({
        name: entry.contact.name.replace(/[^a-zA-ZöüäÖÜÄ ]/g, ""),
        color: entry.color,
        id: entry.id,
        tasksAssignedTo: entry.tasksAssignedTo,
    }));
    filteredNamesAndColors = contactsNamesAndColors;
    addContactNamesToList(filteredNamesAndColors, TASK_CONTACT_LIST);
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

function addSubTask() {
    let subtaskTitle = "";
    let subTaskObject = {};
    if (SUBTASK_INPUT.value) {
        subtaskTitle = SUBTASK_INPUT.value;
        SUBTASK_LIST.innerHTML += renderSubtask(subtaskTitle);
        subTaskObject["description"] = subtaskTitle;
        subTaskObject["checked"] = false;
        subtaskList.push(subTaskObject);
        SUBTASK_INPUT.value = "";
        clearSubtaskInputField();
    }
}

function deleteSubtask(event) {
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
}

function clearAllInputAddTask() {
    location.reload();
}

function setUrgentPrio() {
    PRIO_URGENT_BUTTON.classList.add("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.remove("active-medium");
    PRIO_LOW_BUTTON.classList.remove("active-low");
    taskPrio = "urgent";
}

function setMediumPrio() {
    PRIO_URGENT_BUTTON.classList.remove("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.add("active-medium");
    PRIO_LOW_BUTTON.classList.remove("active-low");
    taskPrio = "medium";
}

function setLowPrio() {
    PRIO_URGENT_BUTTON.classList.remove("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.remove("active-medium");
    PRIO_LOW_BUTTON.classList.add("active-low");
    taskPrio = "low";
}

function filterInput(event) {
    filteredNamesAndColors = filterInputFromArray(NamesAndColors, event.target.value);
    addContactNamesToList(filteredNamesAndColors, TASK_CONTACT_LIST);
}

function checkContact(event, data) {
    const container = event.currentTarget;
    let currentContact = getContactFromArrayById(filteredNamesAndColors, data.id);
    container.classList.toggle("checked-contact");
    if (container.classList.contains("checked-contact")) {
        checkedContactNamesAndColors.push(currentContact);
        contactNames.push(currentContact.name);
    } else {
        checkedContactNamesAndColors.splice(checkedContactNamesAndColors.indexOf(currentContact), 1);
        contactNames.splice(contactNames.indexOf(currentContact.name), 1);
    }
}

function showContactList() {
    if (event.currentTarget == event.target) {
        TASK_CONTACT_LIST_CONTAINER.classList.toggle("d-none");
        if (!TASK_CONTACT_LIST_CONTAINER.classList.contains("d-none")) {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-down.svg";
            NAME_CIRCLE_CONTAINER.classList.remove("d-none");
            NAME_CIRCLE_CONTAINER.classList.add("open-circle-container");
            NAME_CIRCLE_CONTAINER.innerHTML = "";
            addNameCircles(checkedContactNamesAndColors, NAME_CIRCLE_CONTAINER, `contact-name-circle`);
        }
        if (!NAME_CIRCLE_CONTAINER.classList.contains("d-none") && !NAME_CIRCLE_CONTAINER.hasChildNodes()) {
            NAME_CIRCLE_CONTAINER.classList.add("d-none");
            NAME_CIRCLE_CONTAINER.classList.remove("open-circle-container");
        }
    }
}

function addNameCircles(array, containerElement, elementIdForColor) {
    for (let i = 0; i < array.length; i++) {
        let name = array[i].name;
        let id = array[i].id;
        let color = array[i].color;
        let targetElementForColor = elementIdForColor + `(${id})`;
        containerElement.innerHTML += renderNameCircle(name, id);
        setColorById(targetElementForColor, color);
    }
}

function formatDateInput() {
    if (DUE_DATE_INPUT.value.length == 2 || DUE_DATE_INPUT.value.length == 5) {
        DUE_DATE_INPUT.value += `/`;
    }

    if (DUE_DATE_INPUT.value.length == 10 && !isDateValid(DUE_DATE_INPUT.value)) {
        DUE_DATE_INPUT.value = "";
    }
}

function isDateValid(dateString) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) return false;
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function clearSubtaskInputField() {
    SUBTASK_INPUT.value = "";
    SUBTASK_ICON_PLUS.classList.remove("d-none");
    SUBTASK_ICON_CROSS.classList.add("d-none");
    SUBTASK_ICON_VECTOR.classList.add("d-none");
    SUBTASK_ICON_CHECK.classList.add("d-none");
}

function showAndHideIcons() {
    if (SUBTASK_INPUT.value.length > 0) {
        SUBTASK_ICON_PLUS.classList.add("d-none");
        SUBTASK_ICON_CROSS.classList.remove("d-none");
        SUBTASK_ICON_VECTOR.classList.remove("d-none");
        SUBTASK_ICON_CHECK.classList.remove("d-none");
    }
}

function editContent(event) {
    let spanElement = event.target.parentNode.parentNode.querySelector("span");
    if (spanElement) {
        spanElement.setAttribute("contenteditable", "true");
        spanElement.focus();
        spanElement.classList.add("editableSpan");
    }
}

function removeEditClass(event) {
    event.target.classList.remove("editableSpan");
    let spanElement = event.target.parentNode.parentNode.querySelector("span");
    if (spanElement) {
        spanElement.setAttribute("contenteditable", "false");
    }
}

async function createTask(event) {
    event.preventDefault();
    let param = new URLSearchParams(window.location.search);
    let state = "";
    if (param.has("state") && param.get("state") !== "") {
        state = param.get("state");
    } else {
        state = "toDo";
    }
    newTask = {
        type: document.getElementById("task-category-select").value,
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        dueDate: document.getElementById("task-due-date").value,
        priority: taskPrio || "low",
        assignedTo: contactNames,
        subtasks: subtaskList,
        state: state,
    };

    try {
        if (newTask["type"] !== "" && newTask["title"] !== "" && newTask["dueDate"] !== "") {
            await postData(PATH_TO_TASKS, newTask);
            await addTaskToAssignedContacts();
            await setBackendJsonToSessionStorage();
            clearAllInputAddTask();
        }
    } catch (error) {
        console.error("Fehler beim Erstellen der Aufgabe:", error);
    }
}

async function addTaskToAssignedContacts() {
    if (checkedContactNamesAndColors.length > 0) {
        let newTaskId = await getIdOfNewTask();
        for (let i = 0; i < checkedContactNamesAndColors.length; i++) {
            let indexInAllContacts = allContacts.findIndex((contact) => contact.id == checkedContactNamesAndColors[i].id);
            addTaskToContactInAllContactsArray(allContacts[indexInAllContacts], "tasksAssignedTo", newTaskId);
            let allAssignedToTasks = getAllTaskIdsOfUser(allContacts[indexInAllContacts], "tasksAssignedTo");
            await updateData(PATH_TO_CONTACTS, checkedContactNamesAndColors[i].id, (data = { tasksAssignedTo: allAssignedToTasks }));
        }
    }
}

function getAllTaskIdsOfUser(contact, arrayOfIds) {
    if (contact.contact[arrayOfIds]) {
        return contact.contact[arrayOfIds];
    }
}

function addTaskToContactInAllContactsArray(contact, tasksAssignedTo, newTaskId) {
    if (!contact.contact[tasksAssignedTo]) {
        contact.contact[tasksAssignedTo] = [newTaskId];
    } else if (!contact.contact[tasksAssignedTo].includes(newTaskId)) {
        contact.contact[tasksAssignedTo].push(newTaskId);
    }
}

async function getIdOfNewTask() {
    let response = await loadData(PATH_TO_TASKS);
    let taskKeysArray = Object.keys(response);
    return taskKeysArray[taskKeysArray.length - 1];
}
