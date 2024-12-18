const TASK_CONTACT_SELECT = document.getElementById("task-contact-select");
const SUBTASK_INPUT = document.getElementById("subtask-title");
const SUBTASK_LIST = document.getElementById("subtask-list");
const TASK_TITLE_INPUT = document.getElementById("task-title");
const PRIO_URGENT_BUTTON = document.getElementById("prio-urgent-btn");
const PRIO_MEDIUM_BUTTON = document.getElementById("prio-medium-btn");
const PRIO_LOW_BUTTON = document.getElementById("prio-low-btn");
let contactNames = [];

function getAllContactNames() {
    for (let i = 0; i < contacts.length; i++) {
        contactNames.push(contacts[i].name);
    }
    createChildnotesToContactList();
}

function createChildnotesToContactList() {
    for (let j = 0; j < contactNames.length; j++) {
        let name = contactNames[j];
        let element = document.createElement("option");
        element.textContent = name;
        element.value = name.toLowerCase();
        TASK_CONTACT_SELECT.appendChild(element);
    }
}

function addSubTask() {
    let subtaskTitle = "";
    if (SUBTASK_INPUT.value) {
        subtaskTitle = SUBTASK_INPUT.value;
        SUBTASK_LIST.innerHTML += renderSubtask(subtaskTitle);
        SUBTASK_INPUT.value = "";
    }
}

function deleteSubtask(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
}

function clearAllInputAddTask() {
    location.reload();
}

function setUrgentPrio() {
    PRIO_URGENT_BUTTON.classList.add("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.remove("active-medium");
    PRIO_LOW_BUTTON.classList.remove("active-low");
}

function setMediumPrio() {
    PRIO_URGENT_BUTTON.classList.remove("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.add("active-medium");
    PRIO_LOW_BUTTON.classList.remove("active-low");
}

function setLowPrio() {
    PRIO_URGENT_BUTTON.classList.remove("active-urgent");
    PRIO_MEDIUM_BUTTON.classList.remove("active-medium");
    PRIO_LOW_BUTTON.classList.add("active-low");
}
