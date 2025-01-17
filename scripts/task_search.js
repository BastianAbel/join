let data = [];
let contentRef = document.getElementById("card-overlay-wrapper");
let progressBarCalc = "";

async function setBackendJsonToSessionStorage() {
    try {
        let response = await fetch(BASE_URL + ".json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let fetchedTasks = await response.json();
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
    const cardTypeColor = changeColorCardType(task.type);
    contentRef.innerHTML += taskCardTemplateToHtml(task, subtaskState, priorityImg, employeesName, progressBarCalc, cardTypeColor);
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
    let completedSubtasks = 0;
    let totalSubtasks = subtasks ? subtasks.length : 0;

    if (totalSubtasks === 0) {
        statusProgressBar(completedSubtasks, totalSubtasks);
        return `<span>Keine Subtasks</span>`;
    }

    completedSubtasks = subtasks.filter((subtask) => subtask.checked).length;
    statusProgressBar(completedSubtasks, totalSubtasks);

    return `<span id="state">${completedSubtasks}/${totalSubtasks} ${totalSubtasks === 1 ? "Subtask" : "Subtasks"}</span>`;
}

function getEmployeesInitials(EmployeesName) {
    if (typeof EmployeesName !== "string") {
        throw new Error("EmployeesName must be a string");
    }
    return EmployeesName.split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
}

function statusProgressBar(completedSubtasks, totalSubtasks) {
    if (!completedSubtasks || totalSubtasks === 0) {
        progressBarCalc = "0%";
        return;
    }
    let percent = completedSubtasks / totalSubtasks;
    percent = Math.round(percent * 100);

    progressBarCalc = `${percent}%`;
}

function changeColorCardType(taskType) {
    if (taskType === "technicalTask") {
        return "background-color:rgba(31,215,193,1)";
    }
    if (taskType === "userStory") {
        return "background-color:rgba(0,56,255,1)";
    }
}

function stopEventBubbling(event) {
    event.stopPropagation();
}