function clearPage()
{
	document.getElementsByTagName("html")[0].innerHTML = "";
}

/**
 * Blocks this page if it's on the list of pages to block or if it was opened in incognito mode.
 */
function blockPage()
{
	//incognito pages are blocked
	if (chrome.extension.inIncognitoContext) {
		clearPage();
		return;
	}

	chrome.storage.sync.get("urls", (items) => {
		var urls = items.urls;
		if (urls === undefined)
			return;

		var domain = window.location.hostname;
		if (!urls.includes(domain))
			return;

		chrome.storage.sync.get(domain, (items2) => {
			var date = items2[domain];
			//this page has yet to be opened (ever)
			if (date === undefined)
				return;

			var today = (new Date).getDate();
			//block the page if you've used it already today
			if (date === today)
				clearPage();
		});

	});
}

blockPage();