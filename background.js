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

// faltu ka code hai ye neeche waala but anyhow error ek kam karta hai toh chalta hai
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true });
    //respond however you like
  }
);
