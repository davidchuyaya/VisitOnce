var tabURLs = {};

/**
 * Keep track of the URLs of the tabs that are opened/updated so we'll have an accurate one once it closes.
 */
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	if (tab.url in tabURLs)
		return;
	tabURLs[tabId] = tab.url;
});
/**
 * If the tab closed is on the user's list of block domains and the tab closed the the last one of that domain,
 * then record the current date with the domain as the key like so:
 * "domain": date.
 *
 * `onCreated` will check the date of the saved domain to decide whether or not to block the site.
 */
chrome.tabs.onRemoved.addListener((tabId, info) => {
	chrome.storage.sync.get("urls", (items) => {
		var urls = items.urls;
		if (urls === undefined || urls.length === 0)
			return;

		var url = tabURLs[tabId];
		if (url === undefined)  //NOTE: this shouldn't happen
			return;

		var urlObject = new URL(url);
		var domain = urlObject.hostname;
		//check if this is a url to block
		if (!urls.includes(domain))
			return;

		chrome.tabs.query({url: "*://" + domain + "/*"}, (matchedTabs) => {
			if (matchedTabs.length > 0) //tabs from the same domain are still open
				return;

			var date = new Date();
			//store the day of month when this domain was last closed
			chrome.storage.sync.set({[domain]:date.getDate()});
		});
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	var iconPaths = request.icon;
	chrome.browserAction.setIcon({
		path: iconPaths,
		tabId: sender.tab.id
	});
});