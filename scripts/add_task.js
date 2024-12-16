const TASK_CONTACT_SELECT = document.getElementById("task-contact-select");
const SUBTASK_INPUT = document.getElementById("subtask-title");
const SUBTASK_LIST = document.getElementById("subtask-list");

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
