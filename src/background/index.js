/* eslint-disable no-undef */

import Contr from './controller';
import DB from '../database/database';

console.log('Background.js file loaded');
const Controller = new Contr( browser );

browser.runtime.onInstalled.addListener( () => {
  Controller.initStorage();
  DB.init();
});

browser.runtime.onMessage.addListener( message => {
  switch (message.type) {
    case 'openNewWindow':
      Controller.createNewProject(message.title);
      break;
    case 'createProject':
      Controller.createNewProject(message.title);
      break;
    case 'openProject':
      Controller.openProject(message.title);
      break;
  }
});

browser.windows.onRemoved.addListener( windowId => {
  Controller.closeWindowHandler(windowId);
});

browser.webNavigation.onCompleted.addListener( evt => {
  Controller.URLvisited(evt);
  // get tab with completed nav, and set the title of the page from here
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