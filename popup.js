// popup.js
document.getElementById("start").addEventListener("click", function () {
  chrome.runtime.sendMessage({ command: "toggleState" }, (response) => {
    let isStarted = response.isStarted;
    let buttonText = isStarted ? "Stop" : "Start";
    this.textContent = buttonText;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        command: buttonText.toLowerCase(),
      });
    });
  });
});

// Update button text when popup loads
document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("start");
  chrome.runtime.sendMessage({ command: "getState" }, (response) => {
    let isStarted = response.isStarted;
    button.textContent = isStarted ? "Stop" : "Start";
  });
});
document.querySelector(".text-contains").innerText = chrome.storage.local.get({
  isStarted: !isStarted,
});
