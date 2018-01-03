//dictionary of tabId to URL
var tabURLs = {};

/**
 * Keep track of the URLs of the tabs that are opened/updated so we'll have an accurate one once it closes.
 */
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	var oldDomain = tabURLs[tabId];
	var newDomain = (new URL(tab.url)).hostname;
	//the page was updated to a different page
	if (oldDomain !== undefined && oldDomain !== newDomain)
		tryBlockPage(oldDomain);
	tabURLs[tabId] = newDomain;
});

/**
 * If the tab closed is on the user's list of block domains and the tab closed the the last one of that domain,
 * then record the current date with the domain as the key like so:
 * "domain": date.
 *
 * `onCreated` will check the date of the saved domain to decide whether or not to block the site.
 */
chrome.tabs.onRemoved.addListener((tabId, info) => {
	var url = tabURLs[tabId];
	if (url !== undefined)
		tryBlockPage(url);
});

/**
 * Set the icon for this tab based on the received message. The message is sent
 * from content_script.js
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	var iconPaths = request.icon;
	chrome.browserAction.setIcon({
		path: iconPaths,
		tabId: sender.tab.id
	});
});