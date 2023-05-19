function queryChatGpt() {
  chrome.windows.create({
    url: chrome.runtime.getURL("https://chat.openai.com/"),
  });
  const area = document.querySelector("#prompt-textarea");
  area.innerText =
    "Hello, I'm a bot that can help you with your questions. Ask me anything!";
  const btn = document
    .getElementsByClassName(
      "absolute p-1 rounded-md text-gray-500 bottom-1.5"
    )[0]
    .click();
}

chrome.browserAction.onClicked.addListener(function (tab) {});
