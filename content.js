// Keep track of the currently highlighted element
let highlightedElement;

// Handler for the mouseover event. It highlights the hovered element
let mouseoverHandler = function (event) {
  highlightedElement = event.target;
  // Change background color to lightcoral when hovered
  highlightedElement.style.backgroundColor = "lightcoral";
};

// Handler for the mouseout event. It removes the highlight from the previously hovered element
let mouseoutHandler = function (event) {
  if (highlightedElement) {
    // Remove background color when mouse leaves the element
    highlightedElement.style.backgroundColor = "";
  }
};

// Handler for the click event. It sends a message to add the clicked text to the snippets
let clickHandler = function (event) {
  event.preventDefault();
  let element = event.target;
  let text = element.textContent;

  chrome.runtime.sendMessage(
    { command: "addSnippet", snippet: text },
    function (response) {
      console.log("Snippet added: " + text);
    }
  );
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "start") {
    // When the extension is started, attach the mouseover, mouseout, and click event listeners
    document.addEventListener("mouseover", mouseoverHandler);
    document.addEventListener("mouseout", mouseoutHandler);
    document.addEventListener("click", clickHandler);
  } else if (request.command === "stop") {
    // When the extension is stopped, remove the event listeners and the highlight from the last highlighted element
    if (highlightedElement) {
      highlightedElement.style.backgroundColor = "";
    }
    document.removeEventListener("mouseover", mouseoverHandler);
    document.removeEventListener("mouseout", mouseoutHandler);
    document.removeEventListener("click", clickHandler);
  }
});
