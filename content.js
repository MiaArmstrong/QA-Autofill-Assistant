let highlightListener = (e) => {
  if (enabledGlobally && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
    document.querySelectorAll('.qa-highlight').forEach(el => el.classList.remove('qa-highlight'));
    e.target.classList.add('qa-highlight');
  }
};

let enabledGlobally = true;

function updateHighlight(enabled) {
  enabledGlobally = enabled;
  if (enabled) {
    document.addEventListener('focusin', highlightListener);
  } else {
    document.removeEventListener('focusin', highlightListener);
    document.querySelectorAll('.qa-highlight').forEach(el => el.classList.remove('qa-highlight'));
  }
}

chrome.storage.sync.get('enabled', (res) => {
  updateHighlight(res.enabled ?? true);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    updateHighlight(changes.enabled.newValue);
  }
});
