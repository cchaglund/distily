/* eslint-disable no-unused-vars */
import DB from './index.js';

const database = {
  init: () => {
    let db;
    let dbReq = indexedDB.open('distily', 1);

    dbReq.onupgradeneeded = event => {
      db = event.target.result;

      db.createObjectStore('projects', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('title', 'title');

      db.createObjectStore('urls', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('hash', 'hash');

      db.createObjectStore('settings', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('title', 'title');
    };

    dbReq.onsuccess = event => {
      console.log('succeeded in initing db');
      db = event.target.result;
      DB.settings.add({
        title: 'Blacklisted urls',
        entry: ['gmail.com', 'outlook.com', 'outlook.live.com', 'google.com/search'],
      });
    };

    dbReq.onerror = event => {
      alert('error opening database ' + event.target.errorCode);
    };

    dbReq.onabort = e => console.log('was aborted');
    dbReq.onblocked = e => console.log('was blocked');
    dbReq.onversionchange = e => console.log('version change');
    dbReq.onclose = e => console.log('close');

    return dbReq;
  },

  connect: (data) => {
    let dbReq = indexedDB.open('distily', 1);

    console.log('trying to connect to db with this data:', data);

    dbReq.onsuccess = event => {
      let db = event.target.result;

      const tx = db
        .transaction(data.store, data.mode)
        .objectStore(data.store)[data.method](data.payload);

      tx.onsuccess = e => {
        data.callback.success(e, tx);
      };
      tx.onabort = e => console.log('was aborted');
      tx.onblocked = e => console.log('was blocked');
      tx.onversionchange = e => console.log('version change');
      tx.onclose = e => console.log('close');
      tx.oncomplete = e => {
        console.log('complete');
        data.callback.complete(e);
      };
      tx.onupgradeneeded = e => console.log('upgrade needed');
      tx.onerror = e => {
        console.log('error', e);
        data.callback.error(e);
      };
    };

    dbReq.onerror = event => {
      alert('error opening database ' + event.target.errorCode);
    };
    dbReq.onabort = e => console.log('was aborted');
    dbReq.onblocked = e => console.log('was blocked');
    dbReq.onversionchange = e => console.log('version change');
    dbReq.onclose = e => console.log('close');
    dbReq.onupgradeneeded = e => console.log('upgrade needed');
  },
};

export default database;

// const init = () => {
//   'use strict';

//   // check for support
//   if (!('indexedDB' in window)) {
//     console.log('This browser doesn\'t support IndexedDB');
//     return;
//   }

//   console.log('about to open DB');

//   idb.open('distily', 1, (upgradeDb) => {
//     console.log('inside?');
//     if ( !upgradeDb.objectStoreNames.contains('projects') ) {
//       const projects = upgradeDb.createObjectStore('projects', {
//         keyPath: 'id',
//         autoIncrement: true
//       });

//       projects.createIndex('lastOpened', 'lastOpened');
//       projects.createIndex('timesOpened', 'timesOpened');
//       projects.createIndex('timesOpened', 'timesOpened');
//     }

//     if ( !upgradeDb.objectStoreNames.contains('urls') ) {
//       upgradeDb.createObjectStore('urls', {
//         keyPath: 'id',
//         autoIncrement: true
//       });
//     }

//     console.log('tables initiated?');
//   });
// };

