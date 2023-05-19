let clickHandler = function (event) {
  let element = event.target; // get the element clicked
  let text = element.textContent; // get the text content from the element

  // Send the text to the background script
  chrome.runtime.sendMessage(
    { command: "addSnippet", snippet: text },
    (response) => {
      alert("Snippet added: " + text);
    }
  );
};
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.command); // Log the received command
  if (request.command === "start") {
    document.addEventListener("click", clickHandler);
  } else if (request.command === "stop") {
    document.removeEventListener("click", clickHandler);
  }
});
