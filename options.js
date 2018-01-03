/**
 * Create list of URLs and listen to delete clicks.
 */
document.addEventListener('DOMContentLoaded', () =>
{
	getBlockedPages((urls) =>
		reloadBlockedPages(urls));
});

/**
 * Refills the list of blocked pages with an array of URLs.
 * @param urls Array of domains that are blocked.
 */
function reloadBlockedPages(urls)
{
	let blockedPagesList = document.getElementById("blockedPagesList");
	blockedPagesList.innerHTML = "";

	for (let url of urls)
	{
		let listElement = document.createElement("div");
		listElement.classList.add("mdl-list__item");
		let span = document.createElement("span");
		span.classList.add("mdl-list__item-primary-content");

		//url
		span.appendChild(document.createTextNode(url));
		listElement.appendChild(span);


		let button = document.createElement("button");
		button.classList.add("mdl-list__item-secondary-action");
		button.classList.add("mdl-button");
		button.classList.add("mdl-js-button");
		button.classList.add("mdl-button--icon");

		let i = document.createElement("i");
		i.classList.add("material-icons");

		//trash icon
		i.appendChild(document.createTextNode("delete"));

		//remove & reload pages
		button.addEventListener('click', () =>
		{
			deleteBlockedPage(url, (newURLs) =>
				reloadBlockedPages(newURLs));
		});

		button.appendChild(i);
		listElement.appendChild(button);

		blockedPagesList.appendChild(listElement);
	}
}