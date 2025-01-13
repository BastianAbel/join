const BASE_URL = "https://join-10cdc-default-rtdb.europe-west1.firebasedatabase.app/";
let data = [];
let contentRef = document.getElementById("card-overlay-wrapper");

async function setBackendJsonToSessionStorage() {
    try {
        let response = await fetch(BASE_URL + ".json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let fetchedTasks = await response.json();
        if (!fetchedTasks.tasks) {
            throw new Error("No tasks found in the response");
        }
        let taskKeys = Object.keys(fetchedTasks.tasks);
        sessionStorage.setItem("joinJson", JSON.stringify(fetchedTasks));
        for (let i = 0; i < taskKeys.length; i++) {
            data.push({
                task: fetchedTasks.tasks[taskKeys[i]],
            });
        }
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
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
    const progressBarCalc = statusProgressBar(subtaskState);
    contentRef.innerHTML += taskCardTemplateToHtml(task, subtaskState, priorityImg, employeesName, progressBarCalc);
}

function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createUserContainer(assignedUsers) {
    if (!assignedUsers) {
        return console.log("No assigned users found");
    }
    let userContainers = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        let userContainer = document.createElement("div");
        userContainer.className = "user";
        userContainer.style.backgroundColor = getRandomColor();
        let userName = checkUserFolder(assignedUsers[i]);
        let initials = getEmployeesInitials(userName);
        userContainer.innerHTML = initials;

        userContainers += userContainer.outerHTML;
    }
    return userContainers;
}

function checkUserFolder(assignedUser) {
    if (assignedUser && assignedUser.name) {
        return assignedUser.name;
    } else if (typeof assignedUser === "string") {
        return assignedUser;
    } else {
        return "";
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
    if (!subtasks || subtasks.length === 0) {
        ({ from: 0, inFrom: 0 });
        return { from: 0, inFrom: 0 };
    }

    const completedSubtasks = subtasks.filter((subtask) => subtask.checked);
    const totalSubtasks = subtasks.length;

    return { from: completedSubtasks.length, inFrom: totalSubtasks };
}

function getEmployeesInitials(EmployeesName) {
    if (typeof EmployeesName !== "string") {
        throw new Error("EmployeesName must be a string");
    }
    return EmployeesName.split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
}

function statusProgressBar(subtaskState) {
    if (!subtaskState || subtaskState.inFrom === 0) {
        return "0%";
    }
    let percent = subtaskState.from / subtaskState.inFrom;
    percent = Math.round(percent * 100);

    return `${percent}%`;
}
