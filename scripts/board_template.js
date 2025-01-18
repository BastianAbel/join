function renderTaskBigView(taskId, taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage, cardTypeColor){
    return `
    <div id="window-overlay" class="d-none window-overlay"></div>
        <div id="task-big-container" class=" task-overlay-container">
            <div class="userstory-close-container">
                <div style=" ${cardTypeColor}" class="labels-board-card-label">
                    <div class="card-label"><span>${taskType}</span></div>
                </div>
                <img onclick="bigTaskSlideOut()" onmousedown="removeRotations()" src="../assets/icons/close-black.svg" alt="">
            </div>
            <h1 class="task-overlay-head">${taskTitle}</h1>
            <span>${taskDescription}</span>
            <div class="date-container">
                <span class="info-text">Due date:</span><span>${taskDate}</span>
            </div>
            <div class="priority-container">
                <span class="info-text">Priority:</span>
                <div class="priority-state-container">
                    <span>${capitalizeFirstLetter(taskPriority)} <img src="${priorityImage}" alt=""></span>
                </div>
            </div>
            <div class="assigned-contacts-container">
                <span class="assigned-head">Assigned To:</span>
                <div id="assignedContacts" class="assigned-contacts">  
                </div>
            </div>
            <div class="subtasks">
                <div class="subtasks-head">Subtasks</div>
                <div id="subtaskContainer" class="subtasks-container">
                </div>
            </div>
            <div class="delete-edit-container">
                <div onclick="deleteTask('${taskId}')" class="option-container">
                    <div class="option-delete"></div><span>Delete</span>
                </div>
                <div class="seperator"></div>
                <div onclick="openEditTaskBigView()" class="option-container">
                    <div class="option-edit"></div><span>Edit</span>
                </div>
            </div>
        </div>
    `;
}
