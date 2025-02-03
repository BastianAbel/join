/**
 * Function to toggle css-classes at elements with 1 to n id`s
 * @param {string} className
 * @param  {...any} IDs
 */
function toggleClassById(className, ...IDs) {
    for (let i = 0; i < IDs.length; i++) {
        currentElement = document.getElementById(IDs[i]);
        currentElement?.classList.toggle(className);
    }
}

/**
 * Function to set the displayed view to the last view in the window history
 */
function getBackToPreviousSite() {
    window.history.back();
}

/**
 * Function to protect views from being loaded to screen by unauthorized viewers
 * @returns true if user is known or guest
 */
function onlyLoadIfUserOrGuest() {
    user = localStorage.getItem("user");
    guest = sessionStorage.getItem("guest");
    if (guest || user) {
        return true;
    } else {
        window.location.href = "index.html";
    }
}

/**
 * Function to check if all inputs given as arguments are filled
 * @param  {...string} inputs The id's of the inputs to check
 * @returns true if all inputs are filled
 */
function inputsFilled(...inputs) {
    const inputFeedback = document.getElementById("input-feedback-container");
    let filled = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = document.getElementById(inputs[i]);
        if (!input.value && input.value === "") {
            filled = false;
            input.classList.add("not-valid");
            inputFeedback.innerHTML = "Inputs must be filled!";
        }
    }
    return filled;
}

/**
 * Function to reset the input field's validation feedback.
 * Removes the "not-valid" class from the input element
 * and clears the feedback message.
 *
 * @param {HTMLElement} element - The input element to reset.
 */
function resetNotFilledResponse(element) {
    const inputFeedback = document.getElementById("input-feedback-container");
    const input = element;
    input.classList.remove("not-valid");
    inputFeedback.innerHTML = "";
}
