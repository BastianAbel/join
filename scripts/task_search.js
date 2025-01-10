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
        renderSearchResultCard(result.task);
    });
}

function renderSearchResultCard(task) {
    const subtaskState = getSubtaskStatus(task.subtasks);
    const priorityImg = getPriorityImage(task.priority);
    const employeesName = createUserContainer(task.assignedTo);
    contentRef.innerHTML += taskCardTemplateToHtml(task, subtaskState, priorityImg, employeesName);

    data = [];
}

function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createUserContainer(assignedUsers) {
    let userContainers = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        let userContainer = document.createElement("div");
        userContainer.className = "user";
        userContainer.style.backgroundColor = getRandomColor();
        let initials = getEmployeesInitials(assignedUsers[i]);
        userContainer.innerHTML = initials;

        userContainers += userContainer.outerHTML;
    }
    return userContainers;
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

    return { von: completedSubtasks.length, gesamt: totalSubtasks };
}

function getEmployeesInitials(EmployeesName) {
    if (typeof EmployeesName !== "string") {
        throw new Error("EmployeesName must be a string");
    }
    return EmployeesName.split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
}
