let highlightedElement;

let mouseoverHandler = function (event) {
  highlightedElement = event.target;
  highlightedElement.style.backgroundColor = "lightcoral"; // change outline color
};

let mouseoutHandler = function (event) {
  if (highlightedElement) {
    highlightedElement.style.backgroundColor = ""; // remove outline
  }
};

let clickHandler = function (event) {
  event.preventDefault();
  let element = event.target;
  let text = element.textContent;
  // element.style.outline = ""; // remove outline on click

  chrome.runtime.sendMessage(
    { command: "addSnippet", snippet: text },
    function (response) {
      console.log("Snippet added: " + text);
    }
  );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "start") {
    document.addEventListener("mouseover", mouseoverHandler);
    document.addEventListener("mouseout", mouseoutHandler);
    document.addEventListener("click", clickHandler);
  } else if (request.command === "stop") {
    if (highlightedElement) {
      highlightedElement.style.backgroundColor = ""; // remove outline
    }
    document.removeEventListener("mouseover", mouseoverHandler);
    document.removeEventListener("mouseout", mouseoutHandler);
    document.removeEventListener("click", clickHandler);
  }
});
