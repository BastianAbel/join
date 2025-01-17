function renderTaskBigView(taskTitle, taskDescription, taskDate, taskType, taskPriority, priorityImage){
    return `
    <div id="window-overlay" class="d-none window-overlay"></div>
        <div id="task-big-container" class=" task-overlay-container">
            <div class="userstory-close-container">
                <div class="labels-board-card-label">
                    <div class="card-label"><span>${taskType}</span></div>
                </div>
                <img onclick="bigTaskSlideOut()" src="../assets/icons/close-black.svg" alt="">
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
                <div class="subtasks-container">
                    <div class="subtask-element-container">
                        <input id="privacyCheckbox1" type="checkbox" required>
                        <label for="privacyCheckbox1"></label>
                        <span>Implement Recipe Recommendation</span>
                    </div>
                    <div class="subtask-element-container">
                        <input id="privacyCheckbox2" type="checkbox" required>
                        <label for="privacyCheckbox2"></label>
                        <span>Start Page Layout</span>
                    </div>
                </div>
            </div>
            <div class="delete-edit-container">
                <div class="option-container">
                    <div class="option-delete"></div><span>Delete</span>
                </div>
                <div class="seperator"></div>
                <div class="option-container">
                    <div class="option-edit"></div><span>Edit</span>
                </div>
            </div>
        </div>
    `;
}