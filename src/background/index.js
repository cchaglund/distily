/* eslint-disable no-undef */


/* const defaultUninstallURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://wwww.github.com/kryptokinght'
    : '';
}; */


import Contr from './controller.js';

console.log('Background.js file loaded');

const Controller = new Contr( browser );

browser.runtime.onInstalled.addListener( () => {
  Controller.initStorage();
});

browser.runtime.onMessage.addListener( message => {
  switch (message.type) {
    case 'openNewWindow':
      Controller.createNewProject(message.title);
      break;
    case 'popupOpened':
      Controller.fetchCurrentProject();
      break;
  }
});

browser.webNavigation.onCompleted.addListener(evt => {
  Controller.URLvisited(evt);
});

browser.tabs.onActivated.addListener( (activeTab) => {  
  browser.tabs.get(activeTab.tabId)
    .then( res => {
      const url = new URL(res.url);

      if (url.host === '') {
        browser.tabs.onUpdated.addListener( (tabId, changeInfo) => {
          if (changeInfo.url) {
            const newUrl = new URL(changeInfo.url);
            if (newUrl.host !== '') {
              activeTab.url = newUrl.href;
              activeTab.host = newUrl.hostname;
              activeTab.path = newUrl.pathname;

              Controller.tabActivated(activeTab);
            }
          }
        }, {
          tabId: activeTab.tabId
        });
      } else {
        activeTab.url = url.href;
        activeTab.host = url.hostname;
        activeTab.path = url.pathname;

        Controller.tabActivated(activeTab);
      }
    });
});