function taskCardTemplateToHtml(task, status) {
    const priorityImage = getPriorityImage(task.priority);

    return ` 
    <div class="card-main-container">
            <div class="card-main-container-content">
                <div class="labels-board-card-label">
                    <div class="card-label"><span>${capitalizeFirstLetter(task.type)}</span></div>
                </div>
                <div class="card-headline">
                    <h2>${task.title}</h2>
                    <div class="card-under-headline"><span>${task.description}</span></div>
                </div>
                <div class="status-bar-and-task-information">
                    <div class="progress-bar-wrapper">
                    <div class="progress-bar" role="progressbar" style="width: 50%"></div>
                </div>
                    <span>${status[0].von}/${status[0].gesamt} Subtasks</span>
                </div>
                <div class="user-and-card-mover-container">
                    <div id="user-main-container" class="user-main">
                        
                    </div>
                    <div class="move-card-button"><img src="${priorityImage}" alt="${task.priority}"></div>
                </div>
            </div>
        </div>
        `;
}