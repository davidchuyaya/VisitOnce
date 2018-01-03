/**
 * Gets the domain name of the URL of the current tab
 * @param {function(string)} callback Called when the URL is found
 */
function getDomain(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>
	{
		var tab = tabs[0];
		var url = new URL(tab.url);
		callback(url.hostname);
	});
}
/**
 * Block the page at the given URL. Saves the domain of the page.
 * @param {string} domain Domain of page to block. Should be obtained from
 * {@code (new URL(urlString)).hostname}.
 */
function saveNewBlockedPage(domain)
{
	//save the url
	chrome.storage.sync.get("urls", (items) =>
	{
		var urls = items.urls;

		//the url array is null
		if (urls === undefined)
			urls = [domain];
		else if (urls.includes(domain)) //don't save the same domain twice
			return;
		else
			urls.push(domain);
		console.log("new urls: " + urls);

		chrome.storage.sync.set({"urls": urls});
	});
}

/**
 * Record the page as "used" for today if there are no other tabs open that contain the
 * same domain.
 * @param {string} domain Domain of page to block. Should be obtained from
 * {@code (new URL(urlString)).hostname}.
 */
function tryBlockPage(domain)
{
	chrome.storage.sync.get("urls", (items) => {
		var urls = items.urls;
		if (urls === undefined || urls.length === 0)
			return;

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
}