const SCROLL_MARGIN = 50; // Abstand vom Rand, ab dem gescrollt wird
const SCROLL_SPEED = 20; // Geschwindigkeit des Scrollens
let scrollInterval;
let allTasks = [];
let allUsers = [];

function taskBigView(j, taskDate, taskPriority, priorityImage, assignedUsers) {

    document.getElementById('profileBtn').style.backgroundColor = "#b8b9bb";
    document.getElementById('window-overlay').classList.remove('d-none');
    getSmallCardInfo(j, taskDate, taskPriority, priorityImage, assignedUsers);
}

function getSmallCardInfo(j, taskDate, taskPriority, priorityImage, assignedUsers) {
    let taskTitle = document.getElementById(`task-title${j}`).innerHTML;
    let taskDescription = document.getElementById(`task-description${j}`).innerHTML;
    let taskType = document.getElementById(`task-type${j}`).innerHTML;


    setInfoToBigCard(taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers)
}

function setInfoToBigCard(taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, assignedUsers) {
    document.getElementById("board-main").innerHTML += renderTaskBigView(taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage);
    getEmployeeInfo(assignedUsers);
}

function getEmployeeInfo(assignedUsers) {
    if (typeof assignedUsers === "string") {
        assignedUsers = assignedUsers.split(",");
    }
    for (let index = 0; index < assignedUsers.length; index++) {
        let bgColor = document.getElementById(`user${index}`).style.backgroundColor;
        document.getElementById('assignedContacts').innerHTML += `
        <div class="contact">
            <div class="contact-info">
                <div style="background-color: ${bgColor}" class="contact-img">${getEmployeesInitials(assignedUsers[index])}</div><span>${assignedUsers[index]}</span>
            </div>
        </div>
        `
    }
}

function closeTaskBigView() {
    document.getElementById('window-overlay').classList.add('d-none');
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

function getAllTasksAndUsersFromSessionStorage() {
    let sessionResponse = sessionStorage.getItem("joinJson");
    let sessionResponseJson = JSON.parse(sessionResponse);
    console.log(sessionResponseJson)
    let tasks = sessionResponseJson["tasks"];
    allTasks = getArrayFromObject(tasks);
    let users = sessionResponseJson["users"];
    allUsers = getArrayFromObject(users);
    writeCardsToBoardSectionsFromArray(allTasks);
    console.table(allTasks);
    console.table(allUsers);
}

// prettier-ignore
function writeCardsToBoardSectionsFromArray(array) {
    console.log(array)
    for (let j = 0; j < array.length; j++) {
        let renderValuesObject = getObjectWithValuesNeedeInBoardCard(array[j]);
        if (array[j].state === "toDo") {
            hideElementAndRenderAnother("todo", "board-to-do-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        } else if (array[j].state === "inProgress") {
            hideElementAndRenderAnother("inProgress", "board-in-progress-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        } else if (array[j].state === "awaitFeedback") {
            hideElementAndRenderAnother("awaitingFeedback", "board-await-feedback-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        } else if (array[j].state === "done") {
            hideElementAndRenderAnother("done", "board-done-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color, j);
        }
    }
}

function getObjectWithValuesNeedeInBoardCard(task) {
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
