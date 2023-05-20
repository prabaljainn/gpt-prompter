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
    case "openChatGPT":
      // Open the ChatGPT window and paste the snippets into the prompt
      chrome.windows.create(
        {
          url: "https://chat.openai.com/",
          width: 800,
          height: 800,
        },
        (window) => {
          chrome.tabs.onUpdated.addListener(function tabUpdateListener(
            tabId,
            changeInfo
          ) {
            if (
              tabId === window.tabs[0].id &&
              changeInfo.status === "complete"
            ) {
              chrome.tabs.sendMessage(tabId, {
                command: "pastePrompt",
                prompt: request.prompt,
                snippets: snippets,
              });
              chrome.tabs.onUpdated.removeListener(tabUpdateListener);
            }
          });
        }
      );
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
