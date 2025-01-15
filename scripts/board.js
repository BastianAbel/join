const SCROLL_MARGIN = 50; // Abstand vom Rand, ab dem gescrollt wird
const SCROLL_SPEED = 20; // Geschwindigkeit des Scrollens
let scrollInterval;
let allTasks = [];

function taskBigView() {
    document.getElementById("board-main").innerHTML += renderTaskBigView();
}

function closeTaskBigView() {
    document.getElementById("task-big-container").classList.add("d-none");
}

function navigateToBoard() {
    window.location.href = "board.html";
}

function addNewTask(state) {
    window.location.href = `add-task.html?state=${state}`;
}

function getAllTaskFromSessionStorage() {
    let sessionResponse = sessionStorage.getItem("joinJson");
    let sessionResponseJson = JSON.parse(sessionResponse);
    let tasks = sessionResponseJson["tasks"];
    allTasks = getArrayFromObject(tasks);
    writeCardsToBoardSectionsFromArray(allTasks);
    console.table(allTasks);
}

// prettier-ignore
function writeCardsToBoardSectionsFromArray(array) {
    for (let j = 0; j < array.length; j++) {
        let renderValuesObject = getObjectWithValuesNeedeInBoardCard(array[j]);
        if (array[j].state === "toDo") {
            hideElementAndRenderAnother("todo", "board-to-do-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color);
        } else if (array[j].state === "inProgress") {
            hideElementAndRenderAnother("inProgress", "board-in-progress-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color);
        } else if (array[j].state === "awaitFeedback") {
            hideElementAndRenderAnother("awaitingFeedback", "board-await-feedback-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color);
        } else if (array[j].state === "done") {
            hideElementAndRenderAnother("done", "board-done-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc, renderValuesObject.color);
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

function hideElementAndRenderAnother(elementToHide, parentToRenderCardsIn, renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5, renderParam_6) {
    document.getElementById(elementToHide).classList.add("d-none");
    document.getElementById(parentToRenderCardsIn).innerHTML += taskCardTemplateToHtml(renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5, renderParam_6);
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
