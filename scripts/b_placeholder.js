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