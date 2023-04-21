// Define the time range when you want to block the websites (in 24-hour format)
const startHour = 9;
const endHour = 22;
const currentHour = new Date().getHours();
const blockWebsites = currentHour >= startHour && currentHour < endHour;

if (blockWebsites) {
  // Get the user's block list from storage
  chrome.storage.sync.get('blockList', ({ blockList = [] }) => {
    // Check if the current URL matches any website in the block list
    const currentUrl = new URL(window.location.href);
    if (blockList.some((website) => currentUrl.hostname.includes(website))) {
      // Load the content of the local "blocked-page.html" file
      fetch(chrome.runtime.getURL('blocked-page.html'))
        .then((response) => response.text())
        .then((html) => {
          // Replace the entire document's content with the blocked page content
          document.documentElement.innerHTML = html;
        })
        .catch((error) => {
          console.error('Error loading blocked page:', error);
        });
    }
  });
}
