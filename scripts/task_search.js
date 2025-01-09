const BASE_URL = "https://join-10cdc-default-rtdb.europe-west1.firebasedatabase.app/";
let data = [];
let contentRef = document.getElementById("card-overlay-wrapper");
let subtaskStatus = [];

async function setBackendJsonToSessionStorage() {
    let response = await fetch(BASE_URL + ".json");
    let fetchedTasks = await response.json();
    let taskKeys = Object.keys(fetchedTasks.tasks);
    sessionStorage.setItem("joinJson", JSON.stringify(fetchedTasks));
    for (let i = 0; i < taskKeys.length; i++) {
        data.push({
            task: fetchedTasks.tasks[taskKeys[i]],
        });
    }
}
setBackendJsonToSessionStorage();

function searchTask(event) {
    let searchInput = event.target.value.toLowerCase();

    if (searchInput.length < 4) {
        return;
    }
    let results = data.filter((data) => data.task.title.toLowerCase().includes(searchInput));
    contentRef.innerHTML = "";
    results.forEach((result) => {
        
        getSubtaskStatus(result.task.subtasks);
        getPriorityImage(result.task.priority);
        renderSearchResultCard(result.task);
        
    });
}

function renderSearchResultCard(task) {
    contentRef.innerHTML += taskCardTemplateToHtml(task, subtaskStatus);
    createUserContainer(task.assignedTo);
}

function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createUserContainer(assignedUsers) {
    let userContainer = document.getElementById("user-main-container");
    userContainer.innerHTML = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        let initials = getContactInitials(assignedUsers[i]);
        userContainer.innerHTML += `<div class="user-container"><div id="user${i}" class="user">${initials}</div></div>`;
        changeBgColorByUserIcons(i);
    }
}

function changeBgColorByUserIcons(i) {
    let usersIcons = document.getElementById(`user${i}`);
    usersIcons.style.backgroundColor += getRandomColor();
}

function getPriorityImage(priority) {
    if (priority === "urgent") {
        return "/assets/icons/prio-urgent.svg";
    } else if (priority === "medium") {
        return "/assets/icons/prio-media-orange.svg";
    } else if (priority === "low") {
        return "/assets/icons/prio-low.svg";
    } else {
        return "./assets/icons/low.svg";
    }
}

function checkUserSearchInputAndRedirect() {
    let userInput = document.getElementById("user-search-input");
    if (userInput.value.trim() !== "") {
        return;
    } else {
        window.location.href = "board.html";
    }
}

function getSubtaskStatus(subtasks) {
    subtaskStatus = [];
    if (!subtasks || subtasks.length === 0) {
        subtaskStatus.push({ von: 0, gesamt: 0 });
    }

    const completedSubtasks = subtasks.filter((subtask) => subtask.checked);
    const totalSubtasks = subtasks.length;

    subtaskStatus.push({ von: completedSubtasks.length, gesamt: totalSubtasks });
   
}
