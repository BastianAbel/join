const SCROLL_MARGIN = 5; // Abstand vom Rand, ab dem gescrollt wird
const SCROLL_SPEED = 15; // Geschwindigkeit des Scrollens
let scrollInterval;
let currentDraggedTask;
let draggedElement;
let allTasks = [];
let allUsers = [];

function taskBigView(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, subtasks, cardTypeColor) {
    document.getElementById('profileBtn').style.backgroundColor = "#b8b9bb";
    document.getElementById('window-overlay').classList.remove('d-none');
    if (subtasks !== "undefined") {
        const decodedSubtasks = JSON.parse(decodeURIComponent(subtasks));
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor, decodedSubtasks);
    } else {
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor);
    }
}

function getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks) {
    let taskTitle = document.getElementById(`task-title${j}`).innerHTML;
    let taskDescription = document.getElementById(`task-description${j}`).innerHTML;
    let taskType = document.getElementById(`task-type${j}`).innerHTML;
   

    setInfoToBigCard(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks)
}

function setInfoToBigCard(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks) {
    document.getElementById("board-main").innerHTML += renderTaskBigView(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, cardTypeColor);
    getEmployeeInfo(assignedUsers);
    getSubtaskInfo(subtasks, taskId);
}

function getEmployeeInfo(assignedUsers) {
    if (typeof assignedUsers === "string") {
        assignedUsers = assignedUsers.split(",");
    }
    for (let index = 0; index < assignedUsers.length; index++) {
        let bgColor = getRandomColor();
        document.getElementById('assignedContacts').innerHTML += `
        <div class="contact">
            <div class="contact-info">
                <div style="background-color: ${bgColor}" class="contact-img">${getEmployeesInitials(assignedUsers[index])}</div><span>${assignedUsers[index]}</span>
            </div>
        </div>
        `;
    }
}

async function getSubtaskInfo(subtasks, taskId) {
    if (subtasks === undefined) {
        document.getElementById('subtaskContainer').innerHTML = "Keine Subtasks";
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            document.getElementById('subtaskContainer').innerHTML += `
            <div class="subtask-element-container">
                <input id="privacyCheckbox${i}" type="checkbox" onchange="changeStateofCheckbox(${i}, '${taskId}')" required>
                <label id="checkboxLabel${i}" for="privacyCheckbox${i}"></label>
                <span>${subtasks[i].description}</span>
            </div>
        `;
            await getCheckboxBg(taskId, i);
        }
    }
}

async function getCheckboxBg(taskId, i) {
    let subtaskResponse = await loadData(path = `${PATH_TO_TASKS}${taskId}/subtasks/${i}/checked`);
    if (subtaskResponse === true) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg")';
    } else if (subtaskResponse === false) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg")';
    }
}

function changeStateofCheckbox(i, taskId) {

    let isChecked = document.getElementById(`privacyCheckbox${i}`).checked;
    if (isChecked) {
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": true });
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg") no-repeat';
    } else {
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": false })
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg") no-repeat';
    }
}


function openEditTaskBigView() {
    document.getElementById('window-overlay').outerHTML = "";
    document.getElementById('board-main').innerHTML = renderEditTaskBigView();
}

async function getSubtaskInfo(subtasks, taskId) {
    if (subtasks === undefined) {
        document.getElementById('subtaskContainer').innerHTML = "Keine Subtasks";
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            document.getElementById('subtaskContainer').innerHTML += `
            <div class="subtask-element-container">
                <input id="privacyCheckbox${i}" type="checkbox" onchange="changeStateofCheckbox(${i}, '${taskId}')" required>
                <label id="checkboxLabel${i}" for="privacyCheckbox${i}"></label>
                <span>${subtasks[i].description}</span>
            </div>
        `;
            await getCheckboxBg(taskId, i);
        }
    }
}

async function getCheckboxBg(taskId, i) {
    let subtaskResponse = await loadData(path = `${PATH_TO_TASKS}${taskId}/subtasks/${i}/checked`);
    if (subtaskResponse === true) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg")';
    } else if (subtaskResponse === false) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg")';
    }
}

function changeStateofCheckbox(i, taskId) {

    let isChecked = document.getElementById(`privacyCheckbox${i}`).checked;
    if (isChecked) {
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": true });
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg") no-repeat';
    } else {
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": false })
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg") no-repeat';
    }
}


function openEditTaskBigView() {
    document.getElementById('window-overlay').outerHTML = "";
    document.getElementById('board-main').innerHTML = renderEditTaskBigView();
}

function closeTaskBigView() {
    document.getElementById('window-overlay').outerHTML = "";
    document.getElementById('profileBtn').style.backgroundColor = "white";
    document.getElementById("task-big-container").outerHTML = "";
}

function bigTaskSlideOut() {
    document.getElementById("task-big-container").classList.add("slide-out-task-big");
    setTimeout(() => {
        closeTaskBigView();
    }, 300);
}

document.addEventListener("mouseup", function (e) {
    let bigTaskDiv = document.getElementById("task-big-container");
    if (bigTaskDiv && !bigTaskDiv.contains(e.target)) {
        bigTaskDiv.classList.add("slide-out-task-big");
        setTimeout(() => {
            closeTaskBigView();
        }, 300);
    }
});

function navigateToBoard() {
    window.location.href = "board.html";
}

function addNewTask(state) {
    window.location.href = `add-task.html?state=${state}`;
}

async function deleteTask(taskId) {
    await deleteData(path = PATH_TO_TASKS, id = taskId);
    await setBackendJsonToSessionStorage();
    navigateToBoard();
}

function getAllTasksAndUsersFromSessionStorage() {
    let sessionResponse = sessionStorage.getItem("joinJson");
    let sessionResponseJson = JSON.parse(sessionResponse);
    let tasks = sessionResponseJson["tasks"];
    allTasks = getArrayFromObject(tasks);
    let users = sessionResponseJson["users"];
    allUsers = getArrayFromObject(users);
    writeCardsToBoardSectionsFromArray(allTasks);
}

// prettier-ignore
function writeCardsToBoardSectionsFromArray(array) {
    for (let j = 0; j < array.length; j++) {
        let renderValuesObject = getObjectWithValuesNeededInBoardCard(array[j]);
        if (array[j].state === "toDo") {
            hideElementAndRenderAnother("todo", "board-to-do-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j)
        } else if (array[j].state === "inProgress") {
            hideElementAndRenderAnother("inProgress", "board-in-progress-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        } else if (array[j].state === "awaitFeedback") {
            hideElementAndRenderAnother("awaitingFeedback", "board-await-feedback-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        } else if (array[j].state === "done") {
            hideElementAndRenderAnother("done", "board-done-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        }
    }
}

function getObjectWithValuesNeededInBoardCard(task) {
    return {
        task: task,
        subtaskState: getSubtaskStatus(task.subtasks),
        prioImg: getPriorityImage(task.priority),
        employeesName: createUserContainer(task.assignedTo),
        color: changeColorCardType(task.type),
    };
}

function hideElementAndRenderAnother(elementToHide, parentToRenderCardsIn, renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5, renderParam_6, j) {
    document.getElementById(elementToHide).classList.add("d-none");
    document.getElementById(parentToRenderCardsIn).innerHTML += taskCardTemplateToHtml(renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5, renderParam_6, j);
}

function checkMousePosition(event) {
    if (!event.clientX || !event.clientY) return; // Event hat keine Koordinaten
    // Ermittelt die Größe von Board-Main
    let boardContainer = document.getElementById("board-main");
    const boardWidth = boardContainer.offsetWidth;
    const boardHeight = boardContainer.offsetHeight;

    // Scroll nach unten, wenn die Maus nahe am unteren Rand ist
    if (event.clientY > boardHeight - SCROLL_MARGIN) {
        startScrolling(0, SCROLL_SPEED);
    }
    // Scroll nach oben, wenn die Maus nahe am oberen Rand ist
    else if (event.clientY < SCROLL_MARGIN) {
        startScrolling(0, -SCROLL_SPEED);
    }
    // Scroll nach rechts, wenn die Maus nahe am rechten Rand ist
    else if (event.clientX > boardWidth - SCROLL_MARGIN) {
        startScrolling(SCROLL_SPEED, 0);
    }
    // Scroll nach links, wenn die Maus nahe am linken Rand ist
    else if (event.clientX < SCROLL_MARGIN) {
        startScrolling(-SCROLL_SPEED, 0);
    } else {
        stopScrolling();
    }
}

// Startet das Scrollen
function startScrolling(x, y) {
    let boardContainer = document.getElementById("board-main");
    if (scrollInterval) return; // Verhindert doppeltes Intervall
    scrollInterval = setInterval(() => {
        boardContainer.scrollBy(x, y);
    }, 15);
}

// Stoppt das Scrollen
function stopScrolling() {
    clearInterval(scrollInterval);
    scrollInterval = null;
}

function allowDrop(event) {
    event.preventDefault();
}

async function moveTaskToState(newState) {
    currentDraggedTask.state = newState;
    await updateData(PATH_TO_TASKS, currentDraggedTask.id, (data = currentDraggedTask));
    await updateSessionStorage();
    clearBoard();
    getAllTasksAndUsersFromSessionStorage();
    checkSectionForChildNodes();
}

function startDragging(event, taskId) {
    currentDraggedTask = allTasks.find((task) => task.id == taskId);
    draggedElement = event.target;
}

async function updateSessionStorage() {
    let response = await fetch(BASE_URL + ".json");
    let fetchedData = await response.json();
    sessionStorage.setItem("joinJson", JSON.stringify(fetchedData));
}

function clearBoard() {
    let boardSections = document.getElementsByClassName("board-progress-state");
    for (let i = 0; i < boardSections.length; i++) {
        boardSections[i].innerHTML = "";
    }
}

function checkSectionForChildNodes() {
    let boardSections = document.getElementsByClassName("board-progress-state");
    for (let i = 0; i < boardSections.length; i++) {
        if (boardSections[i].children.length == 0) {
            if (i == 0) {
                document.getElementById("todo").classList.remove("d-none");
            } else if (i == 1) {
                document.getElementById("inProgress").classList.remove("d-none");
            } else if (i == 2) {
                document.getElementById("awaitingFeedback").classList.remove("d-none");
            } else if (i == 3) {
                document.getElementById("done").classList.remove("d-none");
            }
        }
    }
}

function rotate(event) {
    event.target.classList.add("rotate-on-drag");
    if (event.dataTransfer) {
        let dragGhost = event.target.cloneNode(true);
        dragGhost.style.transform = "rotate(5deg)";
        dragGhost.style.position = "absolute";
        dragGhost.style.top = "-9999px";
        document.body.appendChild(dragGhost);
        event.dataTransfer.setDragImage(dragGhost, dragGhost.offsetWidth / 2, dragGhost.offsetHeight / 2);
        setTimeout(() => document.body.removeChild(dragGhost), 0);
    }
}

function removeRotations() {
    let rotatedCards = document.getElementsByClassName("rotate-on-drag");
    for (let j = 0; j < rotatedCards.length; j++) {
        rotatedCards[j].classList.remove("rotate-on-drag");
    }
}

function enableScrollByMouseposition(event) {
    let container = event.target.parentElement;
    let rect = container.getBoundingClientRect();
    let mouseX = event.clientX;

    if (mouseX > rect.right - 20) {
        container.scrollBy({ left: 248, behavior: "smooth" });
    } else if (mouseX < rect.left + 20) {
        container.scrollBy({ left: -248, behavior: "smooth" });
    }
}
