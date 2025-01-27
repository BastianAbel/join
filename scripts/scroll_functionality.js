const SCROLL_MARGIN = 5;
const SCROLL_SPEED = 15;
let scrollInterval;
let currentDraggedTask;
let draggedElement;
let isScrolling = false;
let scrollDirection = { x: 0, y: 0 };

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

function removeRotations() {
    let rotatedCards = document.getElementsByClassName("rotate-on-drag");
    for (let j = 0; j < rotatedCards.length; j++) {
        rotatedCards[j].classList.remove("rotate-on-drag");
    }
}

function enableScrollByMouseposition(event) {
    let container = event.target.parentElement;
    let rect = container.getBoundingClientRect();
    let mouseX = event.clientX;
    let scrollAmount = 100;
    let edgeThreshold = 40;
    let distanceFromRightEdge = rect.right - mouseX;
    let distanceFromLeftEdge = mouseX - rect.left;
    if (distanceFromRightEdge < edgeThreshold) {
        scrollAmount = (edgeThreshold - distanceFromRightEdge) * 12.4;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (distanceFromLeftEdge < edgeThreshold) {
        scrollAmount = (edgeThreshold - distanceFromLeftEdge) * 12.4;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
}
