/* eslint-disable no-undef */
console.log('Background.js file loaded');

/* const defaultUninstallURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://wwww.github.com/kryptokinght'
    : '';
}; */

browser.runtime.onMessage.addListener(function (message) {
  if (message.type === 'openNewWindow') {
    console.log(message);
    browser.windows.create();
  }
});

// Load existent stats with the storage API.
var gettingStoredStats = browser.storage.local.get();

gettingStoredStats.then(results => {
  // Initialize the saved stats if not yet initialized.
  if (!results.stats) {
    results = {
      host: {},
      type: {}
    };
  }

  // Monitor completed navigation events and update
  // stats accordingly.
  browser.webNavigation.onCommitted.addListener((evt) => {
    if (evt.frameId !== 0) {
      return;
    }

    let transitionType = evt.transitionType;
    results.type[transitionType] = results.type[transitionType] || 0;
    results.type[transitionType]++;

    // Persist the updated stats.
    browser.storage.local.set(results);
  });

  browser.webNavigation.onCompleted.addListener(evt => {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    const url = new URL(evt.url);

    results.host[url.hostname] = results.host[url.hostname] || 0;
    results.host[url.hostname]++;

    // Persist the updated stats.
    browser.storage.local.set(results);
  }, {
    url: [{schemes: ['http', 'https']}]});
});