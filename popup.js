const toggle = document.getElementById('enableToggle');
const fillBtn = document.getElementById('fill');

// Load toggle state from sync
chrome.storage.sync.get('enabled', (res) => {
  toggle.checked = res.enabled ?? true;
});

// Update toggle state
toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

// Fill button
fillBtn.addEventListener('click', () => {
  const type = document.getElementById('typeSelect').value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.runtime.sendMessage({ type: 'fill', dataType: type, tabId });
  });
  window.close();
});
