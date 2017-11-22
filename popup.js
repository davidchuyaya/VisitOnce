/**
 * Gets the URL of the current tab
 * @param {function(string)} callback Called when the URL is found
 */
function getUrl(callback) {
	// Query filter to be passed to chrome.tabs.query - see
	// https://developer.chrome.com/extensions/tabs#method-query
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, (tabs) => {
		var tab = tabs[0];
		callback(tab.url);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	getUrl((url) => {
		var blockButton = document.getElementById('blockButton');
		blockButton.addEventListener('click', () => {
			blockButton.textContent = url;
		});
	});
});

