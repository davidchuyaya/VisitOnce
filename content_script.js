/**
 * Blocks the current displaying page.
 */
function clearPage()
{
	document.getElementsByTagName("html")[0].innerHTML = "";

	document.title = "Page blocked";
	let div = document.createElement("div");
	div.appendChild(document.createTextNode("You've visited this page once today."));

	let body = document.body;
	body.appendChild(div);
}

/**
 * Send a message to change the extension's icon to the given type. "type" is the name of a resource in the
 * Resources folder. That resource must have 3 sizes: 128px, 48px, and 16px.
 *
 * Whomever is listening to messages on chrome.runtime must capture this message and set the icon accordingly.
 * @param type Name of resource.
 */
function setIconOfType(type)
{
	chrome.runtime.sendMessage({"icon": {
			"16": "Resources/" + type + "-16.png",
			"48": "Resources/" + type + "-48.png",
			"128": "Resources/" + type + "-128.png"
		}});
}

/**
 * Change extension icon to signal that the page is not on the list of sites to block.
 */
function setIconUnblocked()
{
	setIconOfType("unblocked");
}

/**
 * Change extension icon to signal that the page is to be blocked, but the user has only used it once
 * on this day.
 */
function setIconBlocked1()
{
	setIconOfType("blocked1");
}

/**
 * Change extension icon to signal that the page is blocked.
 */
function setIconBlocked0()
{
	setIconOfType("blocked0");
}

/**
 * Blocks this page if it's on the list of pages to block or if it was opened in incognito mode.
 */
function setIconPageBlocked()
{
	//incognito pages are blocked
	if (chrome.extension.inIncognitoContext) {
		setIconBlocked0();
		clearPage();
		return true;
	}

	getBlockedPages((urls) =>
	{
		if (urls === undefined) {
			setIconUnblocked();
			return;
		}

		let domain = window.location.hostname;
		if (!urls.includes(domain)) {
			setIconUnblocked();
			return;
		}

		chrome.storage.sync.get(domain, (items) => {
			let date = items[domain];
			//this page has yet to be opened (ever)
			if (date === undefined) {
				setIconBlocked1();
				return;
			}

			let today = (new Date).getDate();
			//block the page if you've used it already today
			if (date === today) {
				setIconBlocked0();
				clearPage();
			}
			else {
				setIconBlocked1();
			}
		});

	});
}

setIconPageBlocked();