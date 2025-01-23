let desktopNavBar = document.getElementById("desktop-nav-bar");
let mobileNavBarMainContainer = document.getElementById("mobile-nav-bar");

function handleMediaQueryChange(width) {
    if (width.matches) {
        desktopNavBar.classList.add("desktop-nav-bar-main-container");
        desktopNavBar.innerHTML = desktopNavBarTemplate();
        mobileNavBarMainContainer.classList.remove("nav-bar-main-container");
        mobileNavBarMainContainer.innerHTML = "";	
        
    }else{
        desktopNavBar.classList.remove("desktop-nav-bar-main-container");
        desktopNavBar.innerHTML = "";
        mobileNavBarMainContainer.classList.add("nav-bar-main-container");	
        mobileNavBarMainContainer.innerHTML = mobileNavBarTemplate();
    }
}

// Media Query erstellen
const mediaQuery = window.matchMedia("(min-width: 431px)");

// Event Listener hinzufügen
mediaQuery.addListener(handleMediaQueryChange);

// Initialen Zustand prüfen
handleMediaQueryChange(mediaQuery);
