function taskBigView(){
    document.getElementById('board-main'). innerHTML += renderTaskBigView();
}

function closeTaskBigView(){
    document.getElementById('task-big-container').classList.add('d-none');
}

function navigateToBoard(){
    window.location.href = "board.html"
}

function addNewTask(){
    window.location.href = "add-task.html"
}