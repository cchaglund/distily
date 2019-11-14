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
  if (message.type === 'openNewWindow') {
    Controller.createNewProject(message.title);
  }
});

browser.webNavigation.onCompleted.addListener(evt => {
  Controller.URLvisited(evt);
});

// browser.tabs.onCreated.addListener( tab => {
//   Controller.newTabHandler(tab);
// });