let isStarted = false;
let snippets = [];

// Listener for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case "getState": // Gets the current state of the extension (started/stopped)
      sendResponse({ isStarted: isStarted });
      break;
    case "toggleState": // Toggles the current state of the extension
      isStarted = !isStarted;
      sendResponse({ isStarted: isStarted });
      break;
    case "getSnippets": // Gets the stored snippets
      sendResponse({ snippets: snippets });
      break;
    case "resetSnippets": // Resets the stored snippets
      snippets = [];
      sendResponse({ snippets: snippets });
      break;
    case "addSnippet": // Adds a new snippet to the store
      snippets.push(request.snippet);
      sendResponse({ snippets: snippets });
      break;
    default: // Logs an unknown command for debugging
      console.log("Unknown command: " + request.command);
  }
});

// Listener for external messages (optional)
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true });
    // respond however you like
  }
);
