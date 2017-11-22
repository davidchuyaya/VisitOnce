var tabURLs = {};

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	tabURLs[tabId] = tab.url;
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
	alert("URL: " + tabURLs[tabId]);
	chrome.storage.sync.get((sitesToCount) => {

	});
});
chrome.tabs.onReplaced.addListener((newTabId, oldTabId) => {
	alert("replaced");
});