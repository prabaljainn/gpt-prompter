let clickHandler = function (event) {
  let element = event.target; // get the element clicked
  let text = element.textContent; // get the text content from the element
  chrome.storage.local.set({ isStarted: text });
  alert(text); // log the text
  // you may want to save this text somewhere
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.command); // Log the received command
  if (request.command === "start") {
    document.addEventListener("click", clickHandler);
  } else if (request.command === "stop") {
    document.removeEventListener("click", clickHandler);
  }
});
