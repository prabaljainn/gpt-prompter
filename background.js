// background.js
let isStarted = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "getState") {
    sendResponse({ isStarted: isStarted });
  } else if (request.command === "toggleState") {
    isStarted = !isStarted;
    sendResponse({ isStarted: isStarted });
  }
});
