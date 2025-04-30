chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'fill') {
    chrome.storage.sync.get(['enabled'], (res) => {
      if (res.enabled === false) return;
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['faker-bundle.js']
      }, () => {
        chrome.scripting.executeScript({
          target: { tabId: message.tabId },
          func: fillSelectedField,
          args: [message.dataType],
        });
      });
    });
  }
});

function fillSelectedField(dataType) {
  const el = document.activeElement;
  if (!window.faker || !(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'))) return;

  const fallback = {
    city: () => faker.location.city(),
    stateAbbr: () => faker.location.state({ abbreviated: true }),
    zipCode: () => faker.location.zipCode(),
    firstName: () => faker.person.firstName(),
    lastName: () => faker.person.lastName(),
    email: () => faker.internet.email(),
    tenDigitPhone: () => `${Math.floor(Math.random() * 9 + 1)}${Math.floor(100000000 + Math.random() * 900000000)}`,
    address: () => faker.location.streetAddress(),
    vin: () => faker.vehicle.vin(),
    plate: () => faker.vehicle.vrm(),
    username: () => faker.internet.userName(),
    company: () => faker.company.name(),
    tireSize: () => `${Math.floor(Math.random() * 100 + 100)}/${Math.floor(Math.random() * 60 + 20)}R${Math.floor(Math.random() * 10 + 12)}`,
    treadDepth: () => `${(Math.random() * 10).toFixed(1)}`,
    month: () => `${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}`,
    year: () => `${String(Math.floor(Math.random() * 30 + 2000)).slice(2)}`,
    miles: () => `${Math.floor(Math.random() * 999999 + 1)}`,
    speedRating: () => ['Q', 'R', 'S', 'T', 'U', 'H', 'V', 'W', 'Y', 'Z'][Math.floor(Math.random() * 10)],
    loadRating: () => `${Math.floor(Math.random() * 100 + 70)}`,
    tirePressurePsi: () => `${Math.floor(Math.random() * 15 + 30)}`,
    brakePadsMm: () => `${(Math.random() * 12).toFixed(1)}`,
    rotorMeas: () => `${(Math.random() * 100 + 500).toFixed(3)}`,
    discardSpec: () => `${(Math.random() * 10 + 20).toFixed(1)}`,
    wheelTorque: () => `${Math.floor(Math.random() * 100 + 70)}`,
    tireDot: () => `${Math.floor(1000 + Math.random() * 9000)}`
  };

  const value = fallback[dataType]?.() ?? '';
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(el, value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
  el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
}