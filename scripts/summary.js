const TO_DO_COUNTER = document.getElementById("to-do-counter-span");
const DONE_COUNTER = document.getElementById("done-counter-span");
const URGENT_COUNTER = document.getElementById("urgent-counter-span");
const DUE_TIME_FIELD = document.getElementById("due-time-field");
const TASK_IN_BOARD_COUNTER = document.getElementById("task-in-board-counter-div");
const TASK_IN_PROGRESS_COUNTER = document.getElementById("task-in-progress-counter-div");
const AWAITING_FEEDBACK_COUNTER = document.getElementById("awaiting-feedback-counter-div");
let allTasks = [];
let toDoCount = 0;
let doneCount = 0;
let urgentCount = 0;
let taskInBoardCount = 0;
let taskInProgressCount = 0;
let awaitingFeedbackCount = 0;
let upcomimgDeadline = "";

function getAllTasksFromStoredObject() {
    let storedObject = getJsonObjectFromSessionStorage();
    allTasks = getArrayFromObject(storedObject.tasks);
}

function getCountOfValuesInArray(array, attribute, value) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i][attribute] === value) {
            count++;
        }
    }
    return count;
}

function getCountOfTasksInProgress() {
    let inProgress = getCountOfValuesInArray(allTasks, "state", "inProgress");
    return inProgress;
}

function getCountOfToDo() {
    let toDo = getCountOfValuesInArray(allTasks, "state", "toDo");
    return toDo;
}

function getCountOfDone() {
    let done = getCountOfValuesInArray(allTasks, "state", "done");
    return done;
}

function getCountOfAwaitFeedback() {
    let awaitFeedback = getCountOfValuesInArray(allTasks, "state", "awaitFeedback");
    return awaitFeedback;
}

function getCountOfPrioUrgent() {
    let prioUrgent = getCountOfValuesInArray(allTasks, "priority", "urgent");
    return prioUrgent;
}

function getCountOfTaskInBoard() {
    let taskInBoard = toDoCount + taskInProgressCount + awaitingFeedbackCount;
    return taskInBoard;
}

function getUpcomingDeadline() {
    let allDeadlines = allTasks.map((task) => task.dueDate);
    let nearestDeadline;
    let smallestDiff = Infinity;
    let dateWithSmallestDiff;
    for (let j = 0; j < allDeadlines.length; j++) {
        let dateString = allDeadlines[j];
        let date = new Date(Date.parse(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")));
        let today = new Date();
        let timeDiffInMs = Math.abs(date.getTime() - today.getTime());
        let timeDiffInDays = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
        if (timeDiffInDays < smallestDiff) {
            smallestDiff = timeDiffInDays;
            dateWithSmallestDiff = date;
        }
    }
    nearestDeadline = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(dateWithSmallestDiff);
    return nearestDeadline;
}

function setNeededValues() {
    taskInProgressCount = getCountOfTasksInProgress();
    toDoCount = getCountOfToDo();
    doneCount = getCountOfDone();
    awaitingFeedbackCount = getCountOfAwaitFeedback();
    urgentCount = getCountOfPrioUrgent();
    taskInBoardCount = getCountOfTaskInBoard();
    upcomimgDeadline = getUpcomingDeadline();
}

function writeValuesToElements() {
    TO_DO_COUNTER.innerHTML = toDoCount;
    TASK_IN_PROGRESS_COUNTER.innerHTML = taskInProgressCount;
    AWAITING_FEEDBACK_COUNTER.innerHTML = awaitingFeedbackCount;
    DONE_COUNTER.innerHTML = doneCount;
    URGENT_COUNTER.innerHTML = urgentCount;
    DUE_TIME_FIELD.innerHTML = upcomimgDeadline;
    TASK_IN_BOARD_COUNTER.innerHTML = taskInBoardCount;
}

function initSummary() {
    loadUserInitials();
    getJsonObjectFromSessionStorage();
    getAllTasksFromStoredObject();
    setNeededValues();
    writeValuesToElements();
}
