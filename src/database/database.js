const DB = {
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
    };

    dbReq.onsuccess = event => {
      db = event.target.result;
    };

    dbReq.onerror = event => {
      alert('error opening database ' + event.target.errorCode);
    };
  },

  connect: (data) => {
    let dbReq = indexedDB.open('distily', 1);

    dbReq.onsuccess = event => {
      let db = event.target.result;

      const tx = db
        .transaction(data.store, data.mode)
        .objectStore(data.store)[data.method](data.payload);

      tx.onsuccess = e => data.callback.success(e, tx);
      tx.oncomplete = e => data.callback.complete(e);
      tx.onerror = e => data.callback.error(e);
    };

    dbReq.onerror = event => {
      alert('error opening database ' + event.target.errorCode);
    };
  },
};

export default DB;

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

