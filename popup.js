/**
 * Listen for clicks on blockButton. Once the button is clicked, add the url domain to the stored array.
 */
document.addEventListener('DOMContentLoaded', () =>
{
	getDomain((domain) =>
	{
		//url text
		var urlText = document.getElementById('urlText');
		urlText.textContent = domain;

		//block button
		var blockButton = document.getElementById('blockButton');

		blockButton.addEventListener('click', () =>
		{
			//set icon so user knows this website is blocked
			//NOTE: This code resembles setBlocked1(), but without sending messages.
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>
			{
				chrome.browserAction.setIcon({
					path: {
						"16": "Resources/blocked1-16.png",
						"48": "Resources/blocked1-48.png",
						"128": "Resources/blocked1-128.png"
					}, tabId: tabs[0].id
				});
			});

			//save the domain
			saveNewBlockedPage(domain);
		});

			//options button
		var optionsButton = document.getElementById("optionsButton");
		optionsButton.addEventListener('click', () =>
		{
			chrome.tabs.create({active: true, url: "options.html"});
		});
	});
});

