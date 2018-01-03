/**
 * Gets the domain name of the URL of the current tab
 * @param {function(string)} callback Called when the URL is found
 */
function getDomain(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>
	{
		let tab = tabs[0];
		let url = new URL(tab.url);
		callback(url.hostname);
	});
}

/**
 * Retrieves the blocked pages and calls the callback.
 * @param {function} callback Function that accepts an array of domains
 */
function getBlockedPages(callback)
{
	chrome.storage.sync.get("urls", (items) =>
	{
		let urls = items.urls;
		callback(urls);
	});
}

/**
 * Saves the blocked pages.
 * @param {array} urls Array of domains.
 */
function setBlockedPages(urls)
{
	chrome.storage.sync.set({"urls": urls});
}
/**
 * Block the page at the given URL. Saves the domain of the page.
 * @param {string} domain Domain of page to block. Should be obtained from
 * {@code (new URL(urlString)).hostname}.
 */
function saveNewBlockedPage(domain)
{
	//save the url
	getBlockedPages((urls) =>
	{
		//the url array is null
		if (urls === undefined)
			urls = [domain];
		else if (urls.includes(domain)) //don't save the same domain twice
			return;
		else
			urls.push(domain);
		console.log("new urls: " + urls);

		setBlockedPages(urls);
	});
}

/**
 * Removes the domain from the list of pages to block, then calls the callback.
 * @param {string} domain Domain of page to unblock. MUST be element of {@link getBlockedPages}.
 * @param {function} callback Called after url is deleted. Accepts the new array of URLs.
 */
function deleteBlockedPage(domain, callback)
{
	getBlockedPages((urls) =>
	{
		if (urls === undefined)
			return;

		urls.splice(urls.indexOf(domain), 1);
		setBlockedPages(urls);
		callback(urls);
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
	getBlockedPages((urls) =>
	{
		if (urls === undefined || urls.length === 0)
			return;

		//check if this is a url to block
		if (!urls.includes(domain))
			return;

		chrome.tabs.query({url: "*://" + domain + "/*"}, (matchedTabs) => {
			if (matchedTabs.length > 0) //tabs from the same domain are still open
				return;

			let date = new Date();
			//store the day of month when this domain was last closed

			chrome.storage.sync.set({[domain]:date.getDate()});
		});
	});
}