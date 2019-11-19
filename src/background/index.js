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
      Controller.loadPopup();
      break;
    case 'openProject':
      Controller.openProject(message.title);
      break;
    case 'optionsOpened':
      Controller.loadOptions();
      break;
  }
});

browser.windows.onRemoved.addListener( windowId => {
  Controller.closeWindowHandler(windowId);
});

browser.webNavigation.onCompleted.addListener( evt => {
  Controller.URLvisited(evt);
  // get tab with completed nav, and set the title of the page from here

  console.log('nav complete', evt);
});

browser.tabs.onActivated.addListener( activeTab => {  
  browser.tabs.get(activeTab.tabId)
    .then( res => {
      const url = new URL(res.url);

      activeTab.url = url.href;
      activeTab.host = url.hostname;
      activeTab.path = url.pathname;

      Controller.tabActivated(activeTab);
    });
});