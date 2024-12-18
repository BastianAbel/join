const CONTACT_INPUT = document.getElementById("task-contact-input");
const TASK_CONTACT_LIST = document.getElementById("add-task-contacts-list");
const SUBTASK_INPUT = document.getElementById("subtask-title");
const SUBTASK_LIST = document.getElementById("subtask-list");
const TASK_TITLE_INPUT = document.getElementById("task-title");
const PRIO_URGENT_BUTTON = document.getElementById("prio-urgent-btn");
const PRIO_MEDIUM_BUTTON = document.getElementById("prio-medium-btn");
const PRIO_LOW_BUTTON = document.getElementById("prio-low-btn");
let contactNames = [];
let filteredNames = [];

function getAllContactNames() {
    for (let i = 0; i < contacts.length; i++) {
        contactNames.push(contacts[i].name);
    }
    filteredNames = contactNames;
    addContactNamesToList(filteredNames, TASK_CONTACT_LIST);
    console.log(getContactInitials("Dennis Jakobi der zweite"));
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
