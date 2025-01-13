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

function writeCardsToBoardSectionsFromArray(array) {
    for (let j = 0; j < array.length; j++) {
        let prioImg = getPriorityImage(array[j].priority);
        let subtaskState = getSubtaskStatus(array[j].subtasks);
        let employeesName = createUserContainer(array[j].assignedTo);
        let progressBarCalc = statusProgressBar(subtaskState);
        if (array[j].state === "toDo") {
            document.getElementById("todo").classList.add("d-none");
            document.getElementById("board-to-do-section").innerHTML += taskCardTemplateToHtml(array[j], subtaskState, prioImg, employeesName, progressBarCalc);
        } else if (array[j].state === "inProgress") {
            document.getElementById("inProgress").classList.add("d-none");
            document.getElementById("board-in-progress-section").innerHTML += taskCardTemplateToHtml(array[j], subtaskState, prioImg, employeesName, progressBarCalc);
        } else if (array[j].state === "awaitFeedback") {
            document.getElementById("awaitingFeedback").classList.add("d-none");
            document.getElementById("board-await-feedback-section").innerHTML += taskCardTemplateToHtml(array[j], subtaskState, prioImg, employeesName, progressBarCalc);
        } else if (array[j].state === "done") {
            document.getElementById("done").classList.add("d-none");
            document.getElementById("board-done-section").innerHTML += taskCardTemplateToHtml(array[j], subtaskState, prioImg, employeesName, progressBarCalc);
        }
    }
}

function renderSearchResultCard(task) {
    const subtaskState = getSubtaskStatus(task.subtasks);
    const priorityImg = getPriorityImage(task.priority);
    const employeesName = createUserContainer(task.assignedTo);
    const progressBarCalc = statusProgressBar(subtaskState);
    contentRef.innerHTML += taskCardTemplateToHtml(task, subtaskState, priorityImg, employeesName, progressBarCalc);
}
