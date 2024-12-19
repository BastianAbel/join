function renderSubtask(subtaskTitle) {
    return `<li>
				<span>${subtaskTitle}</span
				><img
					src="../assets/icons/trashcan.svg"
					alt="trashcan-logo"
					onclick="deleteSubtask(event)"
				/>
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
