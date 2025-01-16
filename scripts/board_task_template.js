function taskCardTemplateToHtml(task, state, priorityImage, employeesName, progressBarCalc, cardTypeColor) {
    return ` 
    <div onclick="taskBigView()" class="card-main-container">
            <div class="card-main-container-content">
                <div style=" ${cardTypeColor}" class="labels-board-card-label">
                    <div class="card-label"><span>${capitalizeFirstLetter(task.type)}</span></div>
                </div>
                <div class="card-headline">
                    <h2>${task.title}</h2>
                    <div class="card-under-headline"><span>${task.description}</span></div>
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
                    <select class="dropdown-container" onclick="stopEventBubbling(event)" name="options">
                        <option class="dropdown-options" value="" selected>Verschieben in </option>
                        <option value="first">Todo</option>
                        <option value="second">In Progress</option>
                        <option value="third">Await feedback</option>
                        <option value="four">Done</option>
                        </select>  
                    </div>           
            </div>
        </div>
        `;
}
