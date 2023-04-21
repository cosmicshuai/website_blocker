// Load the saved blocking time range and block list from storage
chrome.storage.sync.get(['startHour', 'endHour', 'blockList'], ({ startHour, endHour, blockList = [] }) => {
    // Set the input fields to the saved values
    document.getElementById('start-hour').value = startHour || 9; // Default to 9 AM
    document.getElementById('end-hour').value = endHour || 17;   // Default to 5 PM
  
    // Populate the block list
    const websiteList = document.getElementById('website-list');
    blockList.forEach(website => {
      const listItem = document.createElement('li');
      listItem.textContent = website;
      websiteList.appendChild(listItem);
    });
  });
  
  // Save the blocking time range whenever there are changes
  document.getElementById('start-hour').addEventListener('change', (event) => {
    const startHour = parseInt(event.target.value, 10);
    chrome.storage.sync.set({ startHour });
  });
  document.getElementById('end-hour').addEventListener('change', (event) => {
    const endHour = parseInt(event.target.value, 10);
    chrome.storage.sync.set({ endHour });
  });
  
  // Handle adding websites to the block list
  document.getElementById('add-website').addEventListener('click', () => {
    const newWebsiteInput = document.getElementById('new-website');
    const newWebsite = newWebsiteInput.value.trim();
    if (newWebsite) {
      // Get the current block list from storage
      chrome.storage.sync.get('blockList', ({ blockList = [] }) => {
        // Add the new website to the block list and save it
        blockList.push(newWebsite);
        chrome.storage.sync.set({ blockList });
  
        // Add the new website to the list in the options page
        const websiteList = document.getElementById('website-list');
        const listItem = document.createElement('li');
        listItem.textContent = newWebsite;
        websiteList.appendChild(listItem);
  
        // Clear the input field for the next website entry
        newWebsiteInput.value = '';
      });
    }
  });
  