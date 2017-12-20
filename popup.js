/**
 * Gets the domain name of the URL of the current tab
 * @param {function(string)} callback Called when the URL is found
 */
function getDomain(callback) {
	// Query filter to be passed to chrome.tabs.query - see
	// https://developer.chrome.com/extensions/tabs#method-query
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, (tabs) => {
		var tab = tabs[0];
		var url = new URL(tab.url);
		callback(url.hostname);
	});
}

/**
 * Listen for clicks on blockButton. Once the button is clicked, add the url domain to the stored array.
 */
document.addEventListener('DOMContentLoaded', () => {
	getDomain((domain) => {
		var blockButton = document.getElementById('blockButton');
		blockButton.addEventListener('click', () => {
			blockButton.textContent = domain;

			//save the url
			chrome.storage.sync.get("urls", (items) => {
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
		});
	});
});

