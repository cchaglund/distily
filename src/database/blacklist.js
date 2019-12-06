/* eslint-disable no-undef */
import DB from './database';

class BlacklistDB {
  broadcastUpdatedBlacklist () {
    this.getAllBlacklistTerms()
      .then( res => {
        const sending = browser.runtime.sendMessage({
          type: 'allBlacklistTerms',
          data: res
        });
        sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
      });
  }

  addBlacklistTerm (setting) {
    let promise = new Promise( resolve => {

      const data = {
        store: 'blacklist',
        method: 'add',
        mode: 'readwrite',
        payload: setting,
        callback: {
          success: (e) => {
            this.broadcastUpdatedBlacklist();
            console.log('supposedly succeeded in adding setting');
            resolve(e.target.result);
          },
          complete: (e) => console.log('BlacklistTerm add tx complete', e),
          error: (e) => console.log('Error adding setting', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getBlacklistTerm (id) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'blacklist',
        method: 'get',
        mode: 'readonly',
        payload: id,
        callback: {
          success: (setting) => {
            resolve(setting);
          },
          complete: (e) => console.log('Get setting tx complete', e),
          error: (e) => console.log('Error getting setting', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getAllBlacklistTerms () {
    let promise = new Promise( resolve => {
      const data = {
        store: 'blacklist',
        method: 'getAll',
        mode: 'readonly',
        payload: null,
        callback: {
          success: (res) => {
            resolve(res.target.result);
          },
          complete: (e) => console.log('Completed retrieval of all blacklist', e),
          error: (e) => console.log('Error getting all blacklist', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  updateBlacklistTerm (id, newData) {
    let promise = new Promise( resolve => {
      this.getBlacklistTerm(id)
        .then( res => {
          let setting = {
            ...res.target.result,
            ...newData,
          };

          const data = {
            store: 'blacklist',
            method: 'put',
            mode: 'readwrite',
            payload: setting,
            callback: {
              success: (e) => {
                this.broadcastUpdatedBlacklist();
                resolve(e);
              },
              complete: (e) => console.log('BlacklistTerm update tx complete', e),
              error: (e) => console.log('Error updating setting', e),
            }
          };

          DB.connect(data);
        });
    });
    
    return promise;
  }
}


//   openBlacklist () {
//     const db = openDB('blacklist', 1);
//     return db;
//   }

//   addProject (project) {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       const tx = db.transaction('projects', 'readwrite');
//       const store = tx.objectStore('projects');

//       store.add({
//         active: true,
//         activeWindow: project.activeWindow,
//         title: project.title,
//         prevSession: null,
//         stats: {
//           totalTime: null,
//           totalUrls: null,
//           totalVisits: null,
//           totalFocuses: null,
//           timesOpened: null,
//           lastOpened: new Date().getTime(),
//           created: new Date().getTime()
//         }
//       });

//       return tx.complete;
//     })
//       .then( (receipt) => {
//         console.log('added ' + project.title);
//         console.log(receipt);
//         return receipt;
//       });
//   }

//   getProject (id) {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       const tx = db.transaction('projects', 'readonly');
//       const store = tx.objectStore('projects');

//       return store.get(id);
//     }).then( value => {
//       console.log('retrieved ', value);
//       return value;
//     });
//   }

//   getAllProjects () {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       var tx = db.transaction('projects', 'readonly');
//       var store = tx.objectStore('projects');
      
//       return store.getAll();
//     }).then(items => {
//       console.log('Items by name:', items);
//       return items;
//     });
//   }

//   updateProject (id, data) {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       const tx = db.transaction('projects', 'readwrite');
//       const store = tx.objectStore('projects');

//       const item = {
//         id: id,
//         [data.property]: data.value
//       };

//       store.put(item);

//       return tx.complete;
//     })
//       .then( () => console.log('updated project ' + id));
//   }

//   deleteProject (id) {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       const tx = db.transaction('projects', 'readwrite');
//       const store = tx.objectStore('projects');

//       store.delete(id);

//       return tx.complete;
//     })
//       .then( () => console.log('deleted project ' + id));
//   }

//   example (count = 0) {
//     const dbPromise = this.openProjects();

//     dbPromise.then( db => {
//       const tx = db.transaction('projects', 'readwrite');
//       const store = tx.objectStore('projects');
//       var index = store.index('lastOpened');

//       return index.openCursor(range);
//     }).then(function showRange(cursor) {
//       if (!cursor) {return;}
//       console.log('Cursored at:', cursor.key);
//       for (var field in cursor.value) {
//         console.log(cursor.value[field]);
//       }
//       return cursor.continue().then(showRange);
//     }).then(function() {
//       console.log('Done cursoring');
//     });
//   }
// }

export default BlacklistDB;

