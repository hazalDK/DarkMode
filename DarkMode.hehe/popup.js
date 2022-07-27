// Initialize button with users' preferred theme
let changeTheme = document.getElementById("changeTheme");
let buttonOn = false;

// When the button is clicked, inject setLightMode  if buttonOn is true or inject setDarkMode if buttonOn is false into current page
changeTheme.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(!buttonOn){
    buttonOn = true;
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setDarkMode,
      });
  }
  else{
    buttonOn = false;
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setLightMode,
      });
  }
});

// The body of this function will be executed as a content script inside the
// current page
function setDarkMode() {
    document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
    let media = document.querySelectorAll("img, picture, video");
    media.forEach((mediaItem) => {
        mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
    })
}

// The body of this function will be executed as a content script inside the
// current page
function setLightMode() {
    document.querySelector("html").style.filter = "invert(0) hue-rotate(0deg)";
    let media = document.querySelectorAll("img, picture, video");
    media.forEach((mediaItem) => {
        mediaItem.style.filter = "invert(0) hue-rotate(0deg)"
    })
}

