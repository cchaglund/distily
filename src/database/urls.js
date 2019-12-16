/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import DB from './database';

class URLsDB {
  broadcastUpdatedUrls () {
    this.getAllURLs()
      .then( res => {
        const sending = browser.runtime.sendMessage({
          type: 'allUrls',
          data: res
        });
        sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
      });
  }

  addURL (url) {
    let promise = new Promise( resolve => {
      let newURL = {
        title: url.title,
        time: null,
        visits: 1,
        focuses: 1,
        lastOpened: Date.now(),
        added: Date.now(),
        hash: url.hash,
        project: url.project,
        href: url.href,
        host: url.host,
      };

      const data = {
        store: 'urls',
        method: 'add',
        mode: 'readwrite',
        payload: newURL,
        callback: {
          success: (e) => {
            this.broadcastUpdatedUrls();
            resolve(e.target.result);
          },
          complete: (e) => console.log('URL add tx complete', e),
          error: (e) => console.log('Error adding URL', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getURL (id) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'urls',
        method: 'get',
        mode: 'readonly',
        payload: id,
        callback: {
          success: (URL) => {
            resolve(URL);
          },
          complete: (e) => console.log('Get URL tx complete', e),
          error: (e) => console.log('Error getting URL', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getAllProjectURLs (projectID) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'urls',
        method: 'getAll',
        mode: 'readonly',
        payload: null,
        callback: {
          success: (res) => {
            const urls = res.target.result;
            const projectUrls = urls.filter(url => {
              return url.project === projectID;
            });
            resolve(projectUrls);
          },
          complete: (e) => console.log('Completed retrieval of all URLs', e),
          error: (e) => console.log('Error getting all URLs', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getAllURLs () {
    let promise = new Promise( resolve => {
      const data = {
        store: 'urls',
        method: 'getAll',
        mode: 'readonly',
        payload: null,
        callback: {
          success: (res) => {
            resolve(res.target.result);
          },
          complete: (e) => console.log('Completed retrieval of all URLs', e),
          error: (e) => console.log('Error getting all URLs', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  updateURL (url) {
    let promise = new Promise( resolve => {
      this.getURL(url.id)
        .then( res => {
          let URL = {
            ...res.target.result,
            ...url
          };

          const data = {
            store: 'urls',
            method: 'put',
            mode: 'readwrite',
            payload: URL,
            callback: {
              success: (e) => {
                this.broadcastUpdatedUrls();
                resolve(e);
              },
              complete: (e) => console.log('URL update tx complete', e),
              error: (e) => console.log('Error updating URL', e),
            }
          };

          DB.connect(data);
        });
    });
    
    return promise;
  }

  deleteURL (id) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'urls',
        method: 'delete',
        mode: 'readwrite',
        payload: id,
        callback: {
          success: (url) => {
            resolve(url);
          },
          complete: (e) => console.log('Get URL tx complete', e),
          error: (e) => console.log('Error getting URL', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }
}

export default URLsDB;

// const example = (count = 0) => {
//   const dbPromise = openProjects();

//   dbPromise.then( db => {
//     const tx = db.transaction('projects', 'readwrite');
//     const store = tx.objectStore('projects');
//     var index = store.index('lastOpened');

//     return index.openCursor(range);
//   }).then(function showRange(cursor) {
//     if (!cursor) {return;}
//     console.log('Cursored at:', cursor.key);
//     for (var field in cursor.value) {
//       console.log(cursor.value[field]);
//     }
//     return cursor.continue().then(showRange);
//   }).then(function() {
//     console.log('Done cursoring');
//   });
// };


