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
