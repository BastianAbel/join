function taskCardTemplateToHtml(task, state, priorityImage, employeesName, progressBarCalc, cardTypeColor, j) {
    return ` 
    <div id="${task.id}" onclick="taskBigView('${task.id}','${j}', '${task.dueDate}', '${task.priority}', '${priorityImage}', '${task.assignedTo}', '${encodeURIComponent(
        JSON.stringify(task.subtasks)
    )}', '${cardTypeColor}')" class="card-main-container draggable" draggable="true" ondragstart="startDragging(event, '${
        task.id
    }')" ondrag="checkMousePosition(event)" onmousedown="rotate(event)" onmouseover="enableScrollByMouseposition(event)">
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
                    <select class="dropdown-container" onclick="stopEventBubbling(event)" name="options" onchange="handleDropdownChange(event, '${task.id}')">
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

function renderEditTaskBigView() {
    return `
    <div id="inner-form-container">
                        <div class="add-task-attribute-container">
                            <label for="task-title">Title<span class="require-asterisk">*</span></label>
                            <input id="task-title" class="add-task-attribute-input grey-placeholder" type="text"
                                placeholder="Enter a title" required />
                        </div>
                        <div class="add-task-attribute-container">
                            <label for="task-description">Description</label>
                            <textarea id="task-description" class="add-task-attribute-input grey-placeholder"
                                placeholder="Enter a Description"></textarea>
                        </div>
                        <div class="add-task-attribute-container">
                            <label for="task-contact-input">Assigned to</label>
                            <div id="add-task-contact-container" class="add-task-input-img-container"
                                onclick="showContactList()">
                                <input type="text" id="task-contact-input" class="add-task-attribute-input"
                                    placeholder="Select contacts to assign" oninput="filterInput(event)"
                                    onclick="showContactList()" />
                                <img src="/assets/icons/arrow-drop-down.svg" alt="closed drop down logo"
                                    id="add-task-contact-drop-down-icon" onclick="showContactList()" />
                            </div>
                            <div id="add-task-contact-list-container" class="d_none">
                                <ul id="add-task-contacts-list"></ul>
                            </div>
                            <div id="name-circle-container" class="d_none"></div>
                        </div>
                        <div class="add-task-attribute-container">
                            <label for="task-due-date">Due date<span class="require-asterisk">*</span></label>
                            <div id="add-task-date-container" class="add-task-input-img-container">
                                <input id="task-due-date" class="add-task-attribute-input grey-placeholder" type="text"
                                    placeholder="dd/mm/yyyy" oninput="formatDateInput()" required />
                                <img src="/assets/icons/calender.svg" alt="calender icon" />
                            </div>
                        </div>
                        <div class="add-task-attribute-container">
                            <span>Prio</span>
                            <div id="prio-container">
                                <div id="prio-urgent-btn" class="prio-btn" onclick="setUrgentPrio()">
                                    <span>Urgent</span><img src="/assets/icons/prio-alta-red.svg" alt="" />
                                </div>
                                <div id="prio-medium-btn" class="prio-btn" onclick="setMediumPrio()">
                                    <span>Medium</span><img src="/assets/icons/prio-media-orange.svg" alt="" />
                                </div>
                                <div id="prio-low-btn" class="prio-btn" onclick="setLowPrio()">
                                    <span>Low</span><img src="/assets/icons/prio-baja-green.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="add-task-attribute-container">
                            <label for="task-category-select">Category<span class="require-asterisk">*</span></label>
                            <select id="task-category-select" class="add-task-attribute-input" required>
                                <option value="" disabled selected>
                                    Select task category
                                </option>
                                <option value="userStory">User Story</option>
                                <option value="technicalTask">Technical Task</option>
                            </select>
                        </div>
                        <div class="add-task-attribute-container">
                            <label for="subtask-title">Subtasks</label>
                            <div id="sub-task-input-container" class="add-task-input-img-container">
                                <input id="subtask-title" class="add-task-attribute-input grey-placeholder" type="text"
                                    placeholder="Add new Subtask" oninput="showAndHideIcons()" />
                                <img id="sub-task-icon-plus" src="/assets/icons/plus-subtask.svg" alt="plus-icon" />
                                <img id="sub-task-icon-cross" src="/assets/icons/subtask-cross.svg" alt="cross icon"
                                    onclick="clearSubtaskInputField()" class="d_none" /><img id="sub-task-icon-vector"
                                    src="/assets/icons/subtask-vektor.svg" alt="vector icon" class="d_none" /><img
                                    id="sub-task-icon-check" src="/assets/icons/subtask-check.svg" alt="checked icon"
                                    onclick="addSubTask()" class="d_none" />
                            </div>
                            <div id="subtask-list-container">
                                <ul id="subtask-list"></ul>
                            </div>
                        </div>
                        <div id="require-info-container">
                            <span class="require-asterisk">*</span>
                            <p>This field is required</p>
                        </div>
                    </div>
        
    `;
}
