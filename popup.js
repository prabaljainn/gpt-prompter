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

// Function to paint snippets in the popup
function paintSnippets() {
  chrome.runtime.sendMessage({ command: "getSnippets" }, (response) => {
    let snippets = response.snippets;
    let snippetsDiv = document.getElementById("snippets");
    snippetsDiv.innerHTML = "";
    for (let i = 0; i < snippets.length; i++) {
      let p = document.createElement("p");
      p.textContent = snippets[i];
      // On clicking a snippet, add it to the text area
      p.onclick = function () {
        let textArea = document.getElementById("text-cnt");
        textArea.value += this.textContent + "\n";
      };
      snippetsDiv.appendChild(p);
    }
  });
}

// Update button text when popup loads and paint snippets
document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("start");
  chrome.runtime.sendMessage({ command: "getState" }, (response) => {
    let isStarted = response.isStarted;
    button.textContent = isStarted ? "Stop" : "Start";
  });
  paintSnippets();
});

// Event listener for "Reset" button
// It resets the snippets
document.getElementById("reset").addEventListener("click", function () {
  chrome.runtime.sendMessage({ command: "resetSnippets" }, (response) => {
    paintSnippets();
  });
});

// Event listener for "Copy" button
// It copies the content of the text area
document.getElementById("copy").addEventListener("click", function () {
  let textArea = document.getElementById("text-cnt");
  textArea.select();
  document.execCommand("copy");
  chrome.windows.create({
    url: "https://chat.openai.com/",
  });
});

// Update button text when popup loads
document.addEventListener("DOMContentLoaded", (event) => {
  let button = document.getElementById("start");
  chrome.runtime.sendMessage({ command: "getState" }, (response) => {
    let isStarted = response.isStarted;
    button.textContent = isStarted ? "Stop" : "Start";
  });
  paintSnippets();
});

function paintSnippets() {
  chrome.runtime.sendMessage({ command: "getSnippets" }, (response) => {
    let snippets = response.snippets;
    let snippetsDiv = document.getElementById("snippets");
    snippetsDiv.innerHTML = "";
    for (let i = 0; i < snippets.length; i++) {
      let p = document.createElement("p");
      p.textContent = snippets[i];
      p.onclick = function () {
        let textArea = document.getElementById("text-cnt");
        textArea.value += this.textContent + "\n";
      };
      snippetsDiv.appendChild(p);
    }
  });
}

document.getElementById("reset").addEventListener("click", function () {
  chrome.runtime.sendMessage({ command: "resetSnippets" }, (response) => {
    paintSnippets();
  });
});

document.getElementById("copy").addEventListener("click", function () {
  let textArea = document.getElementById("text-cnt");
  textArea.select();
  document.execCommand("copy");
});

document.getElementById("gpt").addEventListener("click", function () {
  let prompt = document.getElementById("text-cnt").value;
  chrome.runtime.sendMessage({ command: "openChatGPT", prompt: prompt });
});
