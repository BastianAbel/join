const SCROLL_MARGIN = 50; // Abstand vom Rand, ab dem gescrollt wird
const SCROLL_SPEED = 20; // Geschwindigkeit des Scrollens
let scrollInterval;
let allTasks = [];
let allUsers = [];

function taskBigView(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, subtasks, cardTypeColor) {
    document.getElementById('profileBtn').style.backgroundColor = "#b8b9bb";
    document.getElementById('window-overlay').classList.remove('d-none');
    if (subtasks !== "undefined") {
        const decodedSubtasks = JSON.parse(decodeURIComponent(subtasks));
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor, decodedSubtasks );
    } else {
        getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor);
    }
}

function getSmallCardInfo(taskId, j, taskDate, taskPriority, priorityImage, assignedUsers, cardTypeColor, subtasks ) {
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
        `
    }
}

function getSubtaskInfo(subtasks, taskId) {
    if (subtasks === undefined) {
        document.getElementById('subtaskContainer').innerHTML = "Keine Subtasks";
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            console.log(subtasks[i].description)
            document.getElementById('subtaskContainer').innerHTML += `
            <div class="subtask-element-container">
                <input id="privacyCheckbox${i}" type="checkbox" onchange="changeStateofCheckbox(${i}, '${taskId}')" required>
                <label for="privacyCheckbox${i}"></label>
                <span>${subtasks[i].description}</span>
            </div>
        `;
        }
    }
}

function changeStateofCheckbox(i, taskId) {
    let isChecked = document.getElementById(`privacyCheckbox${i}`).checked;
    if(isChecked){
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": true }) 
    } else {
        updateData(path = PATH_TO_TASKS, id = `${taskId}/subtasks/${i}`, data = { "checked": false }) 
    }
}


function openEditTaskBigView(){
    document.getElementById('window-overlay').outerHTML = "";
    document.getElementById('board-main').innerHTML = renderEditTaskBigView();
}

function closeTaskBigView() {
    document.getElementById('window-overlay').outerHTML = "";
    document.getElementById('profileBtn').style.backgroundColor = "white";
    document.getElementById("task-big-container").outerHTML = "";
}

function bigTaskSlideOut() {
    document.getElementById('task-big-container').classList.add('slide-out-task-big')
    setTimeout(() => {
        closeTaskBigView();
    }, 300);
}

document.addEventListener('mouseup', function (e) {
    let bigTaskDiv = document.getElementById('task-big-container');
    if (bigTaskDiv && !bigTaskDiv.contains(e.target)) {
        bigTaskDiv.classList.add('slide-out-task-big');
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

async function deleteTask(taskId){
    await deleteData(path = PATH_TO_TASKS, id = taskId);
    await setBackendJsonToSessionStorage();
    navigateToBoard();
}

function getAllTasksAndUsersFromSessionStorage() {
    let sessionResponse = sessionStorage.getItem("joinJson");
    let sessionResponseJson = JSON.parse(sessionResponse);
    console.log(sessionResponseJson)
    let tasks = sessionResponseJson["tasks"];
    allTasks = getArrayFromObject(tasks);
    let users = sessionResponseJson["users"];
    allUsers = getArrayFromObject(users);
    writeCardsToBoardSectionsFromArray(allTasks, allUsers);
    console.table(allTasks);
    console.table(allUsers);
}

// prettier-ignore
function writeCardsToBoardSectionsFromArray(array) {
    console.log(array)
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

function makeItDraggable() {
    //TODO - alle Karten brauchen onDragStart;
    //TODO - alle Ziellbereich brauchen allowDrop und onDrop;
    //TODO - Scroll-Mechanik steht in Dev-Test
    //TODO - bei Drop muss der neue State in Firebase gespeichert werden. Dann müssen die neuen Werte in den Sessionstorage. Und danach muss das Board geupdatet werden
    //TODO - Wenn alles klappt, erhalten die Cards den Drag-Effekt (leicht schräg)
    //TODO - onDragEnd wird der Drag-Effekt wieder entnommen (gerade Karte)
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
