<img src="https://github.com/davidchuyaya/VisitOnce/blob/master/Resources/logo.png" width="400px">

Once
=====
A chrome extension that limits blocked sites to 1 visit per day.  
Made with the typical web stuff (HTML, CSS, Javascript) using IntelliJ IDEA. The images were made with GIMP. Try it out for yourself [here](https://chrome.google.com/webstore/detail/koibjjcabhgmipfagkmaccgjkcokolbn/publish-accepted?hl=en).

How it works
-----
<p>
Every time you <b>close</b> or <b>update</b> a tab, <code>background.js</code> executes in the browser's background. If the tab you just left is on the list of blocked sites <b>and</b> no other tabs of the same domain name are open, then today's date is recorded. This is a record of the date on which you last visited this site. If other tabs with the same domain name are open, we assume you're not *done* using the site.
</p>

<p>
Every time a tab is opened, <code>content_script.js</code> executes within the page.
If the tab is blocked <b>and</b> the saved date corresponding to its domain is today, then the page is erased and replaced with a message signaling that the page is blocked. The indicator icon for the extension is changed accordingly, depending on whether the site is blocked and whether you've visited it yet today.
Any tab opened in incognito is blocked by default, assuming the extension is allowed in incognito mode.
</p>

Getting started
-----
1. Install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
2. Clone this repo with **VCS -> Git -> Clone**, then input the repository's URL.
3. Go to **File -> Settings -> Plugins**, and make sure **Javascript Support** and **CSS Support** are checked. You may need to restart.
4. Go to **File -> Settings -> Languages & Frameworks -> Javascript -> Libraries**. Press **Download**, find **chrome**, and install that. This helps IntelliJ IDEA with displaying hints for chrome extension Javascript.
5. Open Chrome.
6. Open [chrome extensions](chrome://extensions/), check **Developer Mode**, and press **Load Unpacked Package**.
7. Navigate to wherever you cloned the repository and you're good to go!  
Note: Whenever you update the Javascript, just go back to [chrome extensions](chrome://extensions/) and press Ctrl+R to refresh it.

Screenshots
-----
###### The popup window for a blocked site
<img src="https://raw.githubusercontent.com/davidchuyaya/VisitOnce/master/Screenshots/once.png" width="800px">

###### A blocked site whose content was replaced
<img src="https://raw.githubusercontent.com/davidchuyaya/VisitOnce/master/Screenshots/blocked.png" width="800px">

###### The options displaying the currently blocked sites, with a delete button
<img src="https://raw.githubusercontent.com/davidchuyaya/VisitOnce/master/Screenshots/options.png" width="800px">
