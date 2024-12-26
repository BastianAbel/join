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
let filteredNames = [];
let checkedContactNames = [];
let subtaskList = [];
let taskPrio = "";

function getAllContactNames() {
    for (let i = 0; i < contacts.length; i++) {
        contactNames.push(contacts[i].name);
    }
    filteredNames = contactNames;
    addContactNamesToList(filteredNames, TASK_CONTACT_LIST);
}

function addContactNamesToList(array, element) {
    element.innerHTML = "";
    for (let j = 0; j < array.length; j++) {
        let name = array[j];
        element.innerHTML += renderAssignContact(name);
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
    filteredNames = filterInputFromArray(contactNames, event.target.value);
    addContactNamesToList(filteredNames, TASK_CONTACT_LIST);
}

function checkContact(event) {
    const container = event.currentTarget;
    container.classList.toggle("checked-contact");
}

function showContactList() {
    if (event.currentTarget == event.target) {
        TASK_CONTACT_LIST_CONTAINER.classList.toggle("d_none");
        if (!TASK_CONTACT_LIST_CONTAINER.classList.contains("d_none")) {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-down.svg";
            getCheckedContacts();
            NAME_CIRCLE_CONTAINER.classList.remove("d_none");
            NAME_CIRCLE_CONTAINER.classList.add("open-circle-container");
            NAME_CIRCLE_CONTAINER.innerHTML = "";
            checkedContactNames.forEach((name) => (NAME_CIRCLE_CONTAINER.innerHTML += renderNameCircle(name)));
        }
        if (!NAME_CIRCLE_CONTAINER.classList.contains("d_none") && !NAME_CIRCLE_CONTAINER.hasChildNodes()) {
            NAME_CIRCLE_CONTAINER.classList.add("d_none");
            NAME_CIRCLE_CONTAINER.classList.remove("open-circle-container");
        }
    }
}

function getCheckedContacts() {
    let allCheckedElements = TASK_CONTACT_LIST.getElementsByClassName("checked-contact");
    checkedContactNames = [];

    for (let i = 0; i < allCheckedElements.length; i++) {
        const listElement = allCheckedElements[i].querySelector("li");
        if (listElement) {
            checkedContactNames.push(listElement.innerHTML);
        }
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
    SUBTASK_ICON_PLUS.classList.remove("d_none");
    SUBTASK_ICON_CROSS.classList.add("d_none");
    SUBTASK_ICON_VECTOR.classList.add("d_none");
    SUBTASK_ICON_CHECK.classList.add("d_none");
}

function showAndHideIcons() {
    if (SUBTASK_INPUT.value.length > 0) {
        SUBTASK_ICON_PLUS.classList.add("d_none");
        SUBTASK_ICON_CROSS.classList.remove("d_none");
        SUBTASK_ICON_VECTOR.classList.remove("d_none");
        SUBTASK_ICON_CHECK.classList.remove("d_none");
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
    event.stopPropagation();
    newTask = {
        "type": document.getElementById("task-category-select").value,
        "title": document.getElementById("task-title").value,
        "description": document.getElementById("task-description").value,
        "dueDate": document.getElementById("task-due-date").value,
        "priority": taskPrio,
        "assignedTo": checkedContactNames,
        "subtasks": subtaskList,
        "state": "backlog",
    };

    try {
        if (newTask["type"] !== "" && newTask["title"] !== "" && newTask["dueDate"] !== "") {
            await postData(PATH_TO_TASKS, newTask);
            console.log("Aufgabe erfolgreich erstellt:", newTask);
        }
    } catch (error) {
        console.error("Fehler beim Erstellen der Aufgabe:", error);
    }
}
