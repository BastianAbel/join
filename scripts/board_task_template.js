function taskCardTemplateToHtml(task, state, priorityImage, employeesName, progressBarCalc, cardTypeColor) {
    return ` 
    <div id="cardId${j}" onclick="taskBigView('${j}', '${task.dueDate}', '${task.priority}', '${priorityImage}', '${task.assignedTo}'  )" class="card-main-container">
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
                    <div class="user-main"> ${employeesName}</div>
                    </div>
                    <div class="move-card-button"><img src="${priorityImage}" alt="${task.priority}"></div>
                </div>
            </div>
        </div>
        `;
}
