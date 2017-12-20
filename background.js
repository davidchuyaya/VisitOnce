var tabURLs = {};

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	tabURLs[tabId] = tab.url;
});
chrome.tabs.onRemoved.addListener((tabId, info) => {
	chrome.storage.sync.get((sitesToCount) => {

	});
});