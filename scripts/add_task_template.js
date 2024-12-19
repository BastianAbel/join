function renderSubtask(subtaskTitle) {
    return `<li>
				<div class="subtask-text-img-container">
					<span onblur="removeEditClass(event)">${subtaskTitle}</span>
					<div class="subtask-img-container">
						<img 
							src="/assets/icons/edit-symbol.svg"
							alt="pencil icon"
							onclick="editContent(event)"
						/>
						<img
							id="sub-task-icon-vector"
							src="/assets/icons/subtask-vektor.svg"
							alt="vector icon"
						/>
						<img
							src="/assets/icons/trashcan.svg"
							alt="trashcan-logo"
							onclick="deleteSubtask(event)"
						/>
					</div>
				</div>
			</li>`;
}

function renderAssignContact(name) {
    return `<div class="assign-contact-li-container" onclick="checkContact(event)">
				<div class="contact-circle-and-name-container">
					<div id="name-circle(${name})" class="name-circle">${getContactInitials(name)}</div>
					<li>${name}</li>
				</div>
				<img src="/assets/icons/checkbox-not-checked.svg" alt="unchecked checkbox"/>
			</div>`;
}

function renderNameCircle(name) {
    return `<div id="contact-name-circle(${name})" class="name-circle">${getContactInitials(name)}</div>`;
}
