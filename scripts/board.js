let allTasks = [];
let allTaskUsers = [];

function taskBigView(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, subtasks, cardTypeColor) {
    document.getElementById("profileBtn").style.backgroundColor = "#b8b9bb";
    document.getElementById("window-overlay").classList.remove("d-none");
    const decodedAssignedUsers = JSON.parse(decodeURIComponent(assignedUsers));
    if (subtasks !== "undefined") {
        const decodedSubtasks = JSON.parse(decodeURIComponent(subtasks));
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, decodedAssignedUsers, cardTypeColor, decodedSubtasks);
    } else {
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, decodedAssignedUsers, cardTypeColor);
    }
}

function getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks) {
    let taskTitle = document.getElementById(`task-title${j}`).innerHTML;
    let taskDescription = document.getElementById(`task-description${j}`).innerHTML;
    let taskType = document.getElementById(`task-type${j}`).innerHTML;

    setInfoToBigCard(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks);
}

function setInfoToBigCard(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks) {
    document.getElementById("board-main").innerHTML += renderTaskBigView(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, cardTypeColor, assignedUsers);
    getEmployeeInfo(assignedUsers);
    getSubtaskInfo(subtasks, taskId);
}

function getEmployeeInfo(assignedUsers) {
    if (typeof assignedUsers === "string") {
        assignedUsers = assignedUsers.split(",");
    }
    for (let index = 0; index < assignedUsers.length; index++) {
        let bgColor = getRandomColor();
        document.getElementById("assignedContacts").innerHTML += `
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
        document.getElementById("subtaskContainer").innerHTML = "Keine Subtasks";
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            document.getElementById("subtaskContainer").innerHTML += `
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
    let subtaskResponse = await loadData((path = `${PATH_TO_TASKS}${taskId}/subtasks/${i}/checked`));
    if (subtaskResponse === true) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg")';
    } else if (subtaskResponse === false) {
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg")';
    }
}

function changeStateofCheckbox(i, taskId) {
    let isChecked = document.getElementById(`privacyCheckbox${i}`).checked;
    if (isChecked) {
        updateData((path = PATH_TO_TASKS), (id = `${taskId}/subtasks/${i}`), (data = { "checked": true }));
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-checked.svg") no-repeat';
    } else {
        updateData((path = PATH_TO_TASKS), (id = `${taskId}/subtasks/${i}`), (data = { "checked": false }));
        document.getElementById(`checkboxLabel${i}`).style.background = 'url("/assets/icons/checkbox-not-checked.svg") no-repeat';
    }
}

function EditShowContactList() {
    if (event.currentTarget == event.target) {
        TASK_CONTACT_LIST_CONTAINER.classList.toggle("d_none");
        if (!TASK_CONTACT_LIST_CONTAINER.classList.contains("d_none")) {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            CONTACT_INPUT_ICON.src = "/assets/icons/arrow-drop-down.svg";
            NAME_CIRCLE_CONTAINER.classList.remove("d_none");
            NAME_CIRCLE_CONTAINER.classList.add("open-circle-container");
            NAME_CIRCLE_CONTAINER.innerHTML = "";
            addNameCircles(checkedUsersNamesAndColors, NAME_CIRCLE_CONTAINER, `contact-name-circle`);
        }
        if (!NAME_CIRCLE_CONTAINER.classList.contains("d_none") && !NAME_CIRCLE_CONTAINER.hasChildNodes()) {
            NAME_CIRCLE_CONTAINER.classList.add("d_none");
            NAME_CIRCLE_CONTAINER.classList.remove("open-circle-container");
        }
    }
}

function openEditTaskBigView(taskTitle, taskDescription, taskDate, taskPriority, assignedUsers, taskId) {
    document.getElementById("window-overlay").classList.remove("d-none");
    document.getElementById("task-big-container").outerHTML = "";
    document.getElementById("board-main").innerHTML += renderEditTaskBigView(taskId, taskTitle, taskDescription, taskDate);
    document.getElementById("edit-task-title").value = taskTitle;
    document.getElementById("edit-task-description").value = taskDescription;
    document.getElementById("edit-task-due-date").value = taskDate;
    editTaskGetEmployeeInfo(assignedUsers);
    loadRightPriorityColor(taskPriority);
    // editGetSubtaskInfo(subtasks, taskId);
    editGetAllContactsNames();
}

function loadRightPriorityColor(taskPriority) {
    if (taskPriority == "urgent") {
        document.getElementById("edit-prio-urgent-btn").classList.add("active-urgent");
    } else if (taskPriority == "medium") {
        document.getElementById("edit-prio-medium-btn").classList.add("active-medium");
    } else if (taskPriority == "low") {
        document.getElementById("edit-prio-low-btn").classList.add("active-low");
    }
}

function closeEditTaskBigView() {
    document.getElementById("window-overlay").classList.add("d-none");
    document.getElementById("task-big-container").classList.remove("d-none");
}
function closeTaskBigView() {
    document.getElementById("window-overlay").classList.add("d-none");
    document.getElementById("profileBtn").style.backgroundColor = "white";
    document.getElementById("task-big-container").outerHTML = "";
}

function closeEditTaskBigView() {
    document.getElementById("window-overlay").classList.add("d-none");
    document.getElementById("profileBtn").style.backgroundColor = "white";
    document.getElementById("edit-task-big-container").outerHTML = "";
}

function editTaskSlideOut() {
    document.getElementById("edit-task-big-container").classList.add("slide-out-task-big");
    setTimeout(() => {
        closeEditTaskBigView();
    }, 300);
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
    await deleteData((path = PATH_TO_TASKS), (id = taskId));
    await setBackendJsonToSessionStorage();
    navigateToBoard();
}

function getAllTasksAndUsersFromSessionStorage() {
    let sessionResponse = sessionStorage.getItem("joinJson");
    let sessionResponseJson = JSON.parse(sessionResponse);
    let tasks = sessionResponseJson["tasks"];
    allTasks = getArrayFromObject(tasks);
    let users = sessionResponseJson["users"];
    allTaskUsers = getArrayFromObject(users);
    allTaskUsers = getArrayFromObject(users);
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

function handleDropdownChange(event, taskId) {
    currentDraggedTask = allTasks.find((task) => task.id === taskId);
    const value = event.target.value;
    if (value) {
        moveTaskToState(value);
    }
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

function EditShowContactList() {
    if (event.currentTarget == event.target) {
        let editTaskContactListContainer = document.getElementById("edit-task-contact-list-container");
        let editTaskContactListIcon = document.getElementById("edit-task-contact-drop-down-icon");
        let editNameCircleContainer = document.getElementById("edit-name-circle-container");
        editTaskContactListContainer.classList.toggle("d_none");
        if (!editTaskContactListContainer.classList.contains("d_none")) {
            editTaskContactListIcon.src = "/assets/icons/arrow-drop-up.svg";
        } else {
            editTaskContactListIcon.src = "/assets/icons/arrow-drop-down.svg";
            editNameCircleContainer.classList.remove("d_none");
            editNameCircleContainer.classList.add("open-circle-container");
            editNameCircleContainer.innerHTML = "";
            addNameCircles(checkedUsersNamesAndColors, editNameCircleContainer, `contact-name-circle`);
        }
        if (!editNameCircleContainer.classList.contains("d_none") && !editNameCircleContainer.hasChildNodes()) {
            editNameCircleContainer.classList.add("d_none");
            editNameCircleContainer.classList.remove("open-circle-container");
        }
    }
}

function highlight(id) {
    document.getElementById(id).classList.add("highlight-drag-area");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("highlight-drag-area");
}
