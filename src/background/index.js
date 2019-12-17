/* eslint-disable no-undef */

import Contr from './controller';
import DB from '../database/database';

console.log('Background.js file loaded');
const Controller = new Contr( browser );

browser.runtime.onInstalled.addListener( () => {
  DB.init();
  Controller.initState();
});

browser.runtime.onMessage.addListener( message => {
  switch (message.type) {
    case 'openNewWindow':
      Controller.createNewProject(message.title);
      break;
    case 'createProject':
      Controller.createNewProject(message.data);
      break;
    case 'openProject':
      Controller.openProject(message.data);
      break;
    case 'resumeProject':
      Controller.resumeProject(message.data);
      break;

    case 'getAllProjects':
      Controller.getAllProjects();
      break;
    case 'getCurrentProject':
      Controller.getCurrentProject();
      break;

    case 'openUrl':
      Controller.openUrl(message.data);
      break;
    case 'deleteUrl':
      Controller.deleteUrl(message.data);
      break;
    case 'getAllUrls':
      Controller.getAllURLS();
      break;
    case 'getAllProjectUrls':
      Controller.getAllProjectURLS(message.data);
      break;

    case 'getAllBlacklistTerms':
      Controller.getAllBlacklistTerms();
      break;
    case 'addToBlacklist':
      Controller.createBlacklistItem(message.data);
      break;
  }
});

browser.windows.onRemoved.addListener( windowId => {
  Controller.closeWindowHandler(windowId);
});

browser.webNavigation.onCompleted.addListener( evt => {
  Controller.handleURL(evt);
});

// browser.tabs.onActivated.addListener( activeTab => {  
//   browser.tabs.get(activeTab.tabId)
//     .then( res => {
//       const url = new URL(res.url);

//       activeTab.url = url.href;
//       activeTab.host = url.hostname;
//       activeTab.path = url.pathname;

//       Controller.tabActivated(activeTab);
//     });
// });