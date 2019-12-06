/* eslint-disable no-unused-vars */
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

      db.createObjectStore('blacklist', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('term', 'term');

      db.onsuccess = e => {
        console.log('dbs all set up??');
      };
    };

    dbReq.onsuccess = event => {
      console.log(event);
      console.log('succeeded in initing db');
      // db = event.target.result;
      // DB.settings.add({
      //   blacklist: {
      //     title: 'Blacklisted urls',
      //     entries: {
      //       'gmail.com': null,
      //       'outlook.com': null,
      //       'google.com/search': null
      //     }
      //   },
      //   resuming: {
      //     title: 'Choose how to resume by default',
      //     entries: {
      //       'top': true,
      //       'recent': false,
      //       'fresh': false,
      //     }
      //   }
      // });
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

