let clickHandler = function (event) {
  let element = event.target;
  let text = element.textContent;
  chrome.runtime.sendMessage(
    { command: "addSnippet", snippet: text },
    function (response) {
      console.log("Snippet added: " + text);
    }
  );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "start") {
    document.addEventListener("click", clickHandler);
  } else if (request.command === "stop") {
    document.removeEventListener("click", clickHandler);
  }
});
