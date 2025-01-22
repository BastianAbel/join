function taskCardTemplateToHtml(task, state, priorityImage, employeesName, progressBarCalc, cardTypeColor, j) {
    return ` 
    <div id="${task.id}" onclick="taskBigView('${task.id}','${j}', '${task.dueDate}', '${task.priority}', '${priorityImage}', '${task.assignedTo}', '${encodeURIComponent(JSON.stringify(task.subtasks))}', '${cardTypeColor}')" class="card-main-container draggable" draggable="true" ondragstart="startDragging(event, '${task.id
        }')" ondrag="enableScrollByDragging(event)" onmousedown="rotate(event)" onmouseup="removeRotations()" onmouseover="enableScrollByMouseposition(event)">
            <div class="card-main-container-content">
                <div style=" ${cardTypeColor}" class="labels-board-card-label">
                    <div id="task-type${j}" class="card-label"><span>${capitalizeFirstLetter(task.type)}</span></div>
                </div>
                <div class="card-headline">
                    <h2 id="task-title${j}">${task.title}</h2>
                    <div id="task-description${j}" class="card-under-headline">${task.description}</div>
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
    return /*html*/`
<div id="edit-task-big-container" class="edit-task-container">
            <div class="edit-task-close-container">
                <img onclick="editTaskSlideOut()" onmousedown="removeRotations()" src="../assets/icons/close-black.svg" alt="">
            </div>
    <div id="edit-inner-form-container">
        <div class="add-task-attribute-container">
            <label for="edit-task-title">Title</label>
            <input
                id="edit-task-title"
                class="add-task-attribute-input grey-placeholder"
                type="text"
                placeholder="Enter a title"
                required
            />
        </div>

        <div class="add-task-attribute-container">
            <label for="edit-task-description">Description</label>
            <textarea
                id="edit-task-description"
                class="add-task-attribute-input grey-placeholder"
                placeholder="Enter a Description"
            ></textarea>
        </div>

        <div class="add-task-attribute-container">
            <label for="edit-task-due-date">Due date</label>
            <div id="edit-task-date-container" class="add-task-input-img-container">
                <input
                    id="edit-task-due-date"
                    class="add-task-attribute-input grey-placeholder"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    oninput="editFormatDateInput()"
                    required
                />
                <img src="/assets/icons/calender.svg" alt="calender icon" />
            </div>
        </div>

        <div class="add-task-attribute-container">
            <span>Priority</span>
            <div id="prio-container">
                <div id="edit-prio-urgent-btn" class="prio-btn" onclick="editSetUrgentPrio()">
                    <span>Urgent</span>
                    <img src="/assets/icons/prio-alta-red.svg" alt="" />
                </div>
                <div id="edit-prio-medium-btn" class="prio-btn" onclick="editSetMediumPrio()">
                    <span>Medium</span>
                    <img src="/assets/icons/prio-media-orange.svg" alt="" />
                </div>
                <div id="edit-prio-low-btn" class="prio-btn" onclick="editSetLowPrio()">
                    <span>Low</span>
                    <img src="/assets/icons/prio-baja-green.svg" alt="" />
                </div>
            </div>
        </div>

        <div class="add-task-attribute-container">
            <label for="task-contact-input">Assigned to</label>
            <div
                id="edit-task-contact-container"
                class="add-task-input-img-container"
                onclick="editShowContactList()"
            >
                <input
                    type="text"
                    id="edit-contact-input"
                    class="add-task-attribute-input"
                    placeholder="Select contacts to assign"
                    oninput="filterInput(event)"
                    onclick="editShowContactList()"
                />
                <img
                    src="/assets/icons/arrow-drop-down.svg"
                    alt="closed drop down logo"
                    id="edit-task-contact-drop-down-icon"
                    onclick="editShowContactList()"
                />
            </div>
            <div id="edit-task-contact-list-container" class="d_none">
                <ul id="edit-task-contacts-list"></ul>
            </div>
            <div id="edit-name-circle-container" class="d_none"></div>
        </div>

        <div class="add-task-attribute-container">
            <label for="edit-subtask-title">Subtasks</label>
            <div id="edit-sub-task-input-container" class="add-task-input-img-container">
                <input
                    id="edit-subtask-title"
                    class="add-task-attribute-input grey-placeholder"
                    type="text"
                    placeholder="Add new Subtask"
                    oninput="editShowAndHideIcons()"
                />
                <img id="edit-sub-task-icon-plus" src="/assets/icons/plus-subtask.svg" alt="plus-icon" />
                <img
                    id="edit-sub-task-icon-cross"
                    src="/assets/icons/subtask-cross.svg"
                    alt="cross icon"
                    onclick="clearSubtaskInputField()"
                    class="d_none"
                />
                <img
                    id="edit-sub-task-icon-vector"
                    src="/assets/icons/subtask-vektor.svg"
                    alt="vector icon"
                    class="d_none"
                />
                <img
                    id="edit-sub-task-icon-check"
                    src="/assets/icons/subtask-check.svg"
                    alt="checked icon"
                    onclick="editAddSubTask()"
                    class="d_none"
                />
            </div>
            <div id="edit-subtask-list-container">
                <ul id="edit-subtask-list"></ul>
            </div>
        </div>
        <div id="edit-submit-changes-btn-container">
            <button type="submit" id="edit-create-task-btn" class="add-task-btn">Ok<img src="/assets/icons/check.svg" alt="" /></button>
        </div>
    </div>
</div>`;
}
