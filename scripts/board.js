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
            hideElementAndRenderAnother("todo", "board-to-do-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc);
        } else if (array[j].state === "inProgress") {
            hideElementAndRenderAnother("inProgress", "board-in-progress-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc);
        } else if (array[j].state === "awaitFeedback") {
            hideElementAndRenderAnother("awaitingFeedback", "board-await-feedback-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc);
        } else if (array[j].state === "done") {
            hideElementAndRenderAnother("done", "board-done-section", renderValuesObject.task, renderValuesObject.subtaskState, renderValuesObject.prioImg, renderValuesObject.employeesName, progressBarCalc);
        }
    }
}

function getObjectWithValuesNeedeInBoardCard(task) {
    return {
        task: task,
        subtaskState: getSubtaskStatus(task.subtasks),
        prioImg: getPriorityImage(task.priority),
        employeesName: createUserContainer(task.assignedTo),
    };
}

function hideElementAndRenderAnother(elementToHide, parentToRenderCardsIn, renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5) {
    document.getElementById(elementToHide).classList.add("d-none");
    document.getElementById(parentToRenderCardsIn).innerHTML += taskCardTemplateToHtml(renderParam_1, renderParam_2, renderParam_3, renderParam_4, renderParam_5);
}

function makeItDraggable() {
    //TODO - alle Karten brauchen draggable=true;
    //TODO - alle Karten brauchen onDragStart;
    //TODO - alle Ziellbereich brauchen allowDrop und onDrop;
    //TODO - Scroll-Mechanik steht in Dev-Test
    //TODO - bei Drop muss der neue State in Firebase gespeichert werden. Dann müssen die neuen Werte in den Sessionstorage. Und danach muss das Board geupdatet werden
    //TODO - Wenn alles klappt, erhalten die Cards den Drag-Effekt (leicht schräg)
    //TODO - onDragEnd wird der Drag-Effekt wieder entnommen (gerade Karte)
}
