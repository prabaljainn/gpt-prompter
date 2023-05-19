let isStarted = false;
let snippets = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case "getState":
      sendResponse({ isStarted: isStarted });
      break;
    case "toggleState":
      isStarted = !isStarted;
      sendResponse({ isStarted: isStarted });
      break;
    case "getSnippets":
      sendResponse({ snippets: snippets });
      break;
    case "resetSnippets":
      snippets = [];
      sendResponse({ snippets: snippets });
      break;
    case "addSnippet":
      snippets.push(request.snippet);
      sendResponse({ snippets: snippets });
      break;
    default:
      console.log("Unknown command: " + request.command);
  }
});
