let responseContainer = document.getElementById("input-feedback-container");

const validationPatterns = {
    "email" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "phonenumber" : /^(?:\+49|0)[1-9]\d{1,14}$/
}

function checkValidation(validationType, inputfieldId) {
    setResponseContainer();
    const inputfield = document.getElementById(inputfieldId);
    let valid = validationPatterns[validationType].test(inputfield.value);
    if(!valid && inputfield.value.length > 0) {
        responseContainer.innerHTML = inputfield.value + " is not a valid " + validationType + "!";
        inputfield.classList.add("not-valid");
        return false
    }
    return true
} 

function setResponseContainer() {
    responseContainer = document.getElementById("input-feedback-container");
}

function inputsFilled(...inputs) {
    setResponseContainer();
    let filled = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = document.getElementById(inputs[i]);
        if (!input.value && input.value === "") {
            filled = false;
            input.classList.add("not-valid");
            responseContainer.innerHTML = "Inputs must be filled!";
        }
    }
    return filled;
}

function resetNotFilledResponse(element) {
    setResponseContainer();
    const input = element;
    input.classList.remove("not-valid");
    responseContainer.innerHTML = "";
}
