const SCROLL_MARGIN = 5; // Abstand vom Rand, ab dem gescrollt wird
const SCROLL_SPEED = 15; // Geschwindigkeit des Scrollens
let scrollInterval;
let currentDraggedTask;
let draggedElement;
let isScrolling = false;
let scrollDirection = { x: 0, y: 0 };

// let pressTimer;
// let longPressDuration = 500;
// let isDraggable = false;

// function checkForLongClick(event) {
//     event.preventDefault();
//     let target = event.target.closest(".card-main-container");
//     let element = document.getElementById(target.id);
//     // element.setAttribute("draggable", "false");
//     pressTimer = setTimeout(() => {
//         if (target) {
//             isDraggable = true;
//             // element.setAttribute("draggable", "true");
//             element.classList.add("draggable");
//         }
//     }, longPressDuration);
// }

// function clearLongClick() {
//     clearTimeout(pressTimer);
// }

// function handleEndOfDragging(event) {
//     isDraggable = false;
//     clearLongClick();
//     let target = event.target.closest(".card-main-container");
//     if (target) {
//         let element = document.getElementById(target.id);
//         element.setAttribute("draggable", "false");
//         element.classList.remove("draggable");
//     }
// }

function enableScrollByDragging(event) {
    if (!event.clientX || !event.clientY) return;
    const boardContainer = document.getElementById("board-main");
    const boardWidth = boardContainer.offsetWidth;
    const boardHeight = boardContainer.offsetHeight;

    if (event.clientY > boardHeight - SCROLL_MARGIN) {
        startScrolling(0, SCROLL_SPEED);
    } else if (event.clientY < SCROLL_MARGIN) {
        startScrolling(0, -SCROLL_SPEED);
    } else if (event.clientX > boardWidth - SCROLL_MARGIN) {
        startScrolling(SCROLL_SPEED, 0);
    } else if (event.clientX < SCROLL_MARGIN) {
        startScrolling(-SCROLL_SPEED, 0);
    } else {
        stopScrolling();
    }
}

function startScrolling(x, y) {
    scrollDirection = { x, y };
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(scrollStep);
    }
}

function scrollStep() {
    let boardContainer = document.getElementById("board-main");
    boardContainer.scrollBy(scrollDirection.x, scrollDirection.y);
    if (isScrolling) {
        requestAnimationFrame(scrollStep);
    }
}

function stopScrolling() {
    isScrolling = false;
}

function rotate(event) {
    if (isDraggable) {
        event.target.classList.add("rotate-on-drag");
        if (event.dataTransfer) {
            let dragGhost = event.target.cloneNode(true);
            dragGhost.style.transform = "rotate(5deg)";
            dragGhost.style.position = "absolute";
            dragGhost.style.top = "-9999px";
            document.body.appendChild(dragGhost);
            event.dataTransfer.setDragImage(dragGhost, dragGhost.offsetWidth / 2, dragGhost.offsetHeight / 2);
            setTimeout(() => document.body.removeChild(dragGhost), 0);
        }
    }
}

function removeRotations() {
    let rotatedCards = document.getElementsByClassName("rotate-on-drag");
    for (let j = 0; j < rotatedCards.length; j++) {
        rotatedCards[j].classList.remove("rotate-on-drag");
    }
}
