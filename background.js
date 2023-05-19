let isStarted = false;
const snippets = [];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "getState") {
    sendResponse({ isStarted: isStarted });
  } else if (request.command === "toggleState") {
    isStarted = !isStarted;
    sendResponse({ isStarted: isStarted });
  } else if (request.command === "getSnippets") {
    sendResponse({ snippets: snippets });
  } else if (request.command === "addSnippet") {
    snippets.push(request.snippet);
    sendResponse({ snippets: snippets });
  }
});
