function checkforvisibility(element, imgId) {
    inputRefValue = element.value;
    lockImgRef = document.getElementById("password-lock-" + imgId);
    visibilityImgRef = document.getElementById("password-visibility-" + imgId);
    if(inputRefValue.length === 0) {
        lockImgRef.classList.remove("d-none");
        visibilityImgRef.classList.add("d-none");
    }else{
        lockImgRef.classList.add("d-none");
        visibilityImgRef.classList.remove("d-none");
    }
}

function changePasswordVisibility(inputfieldId, imgElement) {
    visibleImgRef = imgElement;
    // visibleImgRef = document.getElementById("password-visibility-" + imgId);
    inputfieldRef = document.getElementById(inputfieldId);
    if(inputfieldRef.type == "text") {
        inputfieldRef.type = "password";
        visibleImgRef.src = "/assets/icons/visibility_off.svg"
    }else{
        inputfieldRef.type = "text";
        visibleImgRef.src = "/assets/icons/visibility_on.svg"
    }
}