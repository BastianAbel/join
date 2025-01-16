function taskCardTemplateToHtml(task, state, priorityImage, employeesName, progressBarCalc, cardTypeColor, j) {
    return ` 
    <div id="cardId${j}" onclick="taskBigView('${j}', '${task.dueDate}', '${task.priority}', '${priorityImage}', '${
        task.assignedTo
    }')" class="card-main-container draggable" draggable="true" ondragstart="startDragging(event, '${task.id}')" ondrag="checkMousePosition(event)">
            <div class="card-main-container-content">
                <div style=" ${cardTypeColor}" class="labels-board-card-label">
                    <div id="task-type${j}" class="card-label"><span>${capitalizeFirstLetter(task.type)}</span></div>
                </div>
                <div class="card-headline">
                    <h2 id="task-title${j}">${task.title}</h2>
                    <div id="task-description${j}" class="card-under-headline"><span>${task.description}</span></div>
                </div>
                <div class="status-bar-and-task-information">
                    <div class="progress-bar-wrapper">
                    <div class="progress-bar" role="progressbar" style="width: ${progressBarCalc}"></div>
                </div>
                    ${state}
                </div>
                <div class="user-and-card-mover-container">
                    <div id="user-main-container" class="user-main">
                    ${employeesName}
                    </div>
                    <div class="move-card-button"><img src="${priorityImage}" alt="${task.priority}"></div>
                </div> 
                <div class="dropdown-main-container">
                    <select class="dropdown-container" onclick="stopEventBubbling(event)" name="options" onchange="handleDropdownChange(event, '${
                        task.id
                    }')">
                        <option class="dropdown-options" value="" selected>Verschieben in </option>
                        <option value="toDo">Todo</option>
                        <option value="inProgress">In Progress</option>
                        <option value="awaitFeedback">Await feedback</option>
                        <option value="done">Done</option>
                        </select>  
                    </div>           
            </div>
        </div>
        `;
}

function handleDropdownChange(event, taskId) {
    currentDraggedTask = allTasks.find((task) => task.id === taskId);
    const value = event.target.value;
    if (value) {
        moveTaskToState(value);
    }
}

function renderInfoNothingInBoardSection(id, text) {
    return `<div
                    id="${id}"
                    class="progress-content"
                >
                    <span>No tasks ${text}</span>
                </div>`;
}
