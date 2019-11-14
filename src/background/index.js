/* eslint-disable no-undef */

import Contr from './controller.js';

console.log('Background.js file loaded');

const Controller = new Contr( browser );

/* const defaultUninstallURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://wwww.github.com/kryptokinght'
    : '';
}; */

browser.runtime.onMessage.addListener( message => {
  if (message.type === 'openNewWindow') {
    Controller.createNewProject(message.title);
  }
});

// browser.tabs.onCreated.addListener( tab => {
//   Controller.newTabHandler(tab);
// });


browser.webNavigation.onCompleted.addListener(evt => {
  Controller.addPageToProject(evt);
});