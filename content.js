// Keep track of the currently highlighted element
let highlightedElement;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
  } else if (request.command === "pastePrompt") {
    waitPrompt().then(() => {
      let prompt = request.prompt;
      let inputField = document.querySelector("#prompt-textarea");
      let sendButton = document.querySelector(
        ".absolute.p-1.rounded-md.text-gray-500"
      );
      inputField.value = prompt;
      // inputField.dispatchEvent(new Event("input"));
      sendButton.click();
    });
  }
});
async function waitPrompt() {
  await delay(5000);
}

// console.log("1");
// let snippets = request.snippets;
// let prompt = request.prompt;
// alert("prompt: " + prompt);
// let inputField = document.querySelector("#prompt-textarea");
// console.log("2");
// if (inputField) {
//   inputField.value = prompt;
//   console.log("3");
// }
// console.log("4");
// document.querySelector(".absolute.p-1.rounded-md.text-gray-500").click();
// console.log("5");
