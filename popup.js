// popup.js
document.getElementById("start").addEventListener("click", function () {
  chrome.runtime.sendMessage({ command: "getState" }, (response) => {
    let isStarted = response.isStarted;
    let nextCommand = isStarted ? "stop" : "start";
    chrome.runtime.sendMessage({ command: "toggleState" }, (response) => {
      chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.sendMessage(tabs[i].id, { command: nextCommand });
        }
      });
      this.textContent = nextCommand === "start" ? "Stop" : "Start";
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

function paintSnippets() {
  chrome.runtime.sendMessage({ command: "getSnippets" }, (response) => {
    let snippets = response.snippets;
    console.log(snippets);
    snippetsDiv.innerHTML = "";
    for (let i = 0; i < snippets.length; i++) {
      let p = document.createElement("p");
      p.textContent = snippets[i];
      snippetsDiv.appendChild(p);
    }
  });
}
// Get the div where the snippets will be displayed
let snippetsDiv = document.getElementById("text-cnt");
document.addEventListener("DOMContentLoaded", paintSnippets);

document.getElementById("reset").addEventListener("click", function () {
  chrome.runtime.sendMessage({ command: "resetSnippets" }, (response) => {
    paintSnippets();
  });
});

document.getElementById("gpt").addEventListener("click", function () {
  chrome.windows.create({
    url: "https://chat.openai.com/",
  });
  const area = document.querySelector("#prompt-textarea");
  area.innerText =
    "Hello, I'm a bot that can help you with your questions. Ask me anything!";
  const btn = document
    .getElementsByClassName(
      "absolute p-1 rounded-md text-gray-500 bottom-1.5"
    )[0]
    .click();
});
