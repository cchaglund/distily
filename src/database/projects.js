import DB from './database';

class ProjectsDB {
  addProject (projectObject) {
    let promise = new Promise( resolve => {
      let project = {
        active: true,
        activeWindow: projectObject.activeWindow,
        title: projectObject.title,
        prevSession: null,
        totalTime: null,
        totalUrls: null,
        totalVisits: null,
        totalFocuses: null,
        timesOpened: null,
        lastOpened: Date.now(),
        created: Date.now()
      };

      const data = {
        store: 'projects',
        method: 'add',
        mode: 'readwrite',
        payload: project,
        callback: {
          success: (e) => {
            console.log('Project added. ID = ', e.target.result);
            resolve(e.target.result);
          },
          complete: (e) => console.log('Project add tx complete', e),
          error: (e) => console.log('Error adding project', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getProject (id) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'projects',
        method: 'get',
        mode: 'readonly',
        payload: id,
        callback: {
          success: (project) => {
            resolve(project);
          },
          complete: (e) => console.log('Get project tx complete', e),
          error: (e) => console.log('Error getting project', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  getAllProjects () {
    let promise = new Promise( resolve => {
      const data = {
        store: 'projects',
        method: 'getAll',
        mode: 'readonly',
        payload: null,
        callback: {
          success: (res) => {
            resolve(res.target.result);
          },
          complete: (e) => console.log('Completed retrieval of all projects', e),
          error: (e) => console.log('Error getting all projects', e),
        }
      };

      DB.connect(data);
    });

    return promise;
  }

  updateProject (id, newData) {
    let promise = new Promise( resolve => {
      this.getProject(id)
        .then( res => {
          let project = {
            ...res.target.result,
            ...newData
          };

          const data = {
            store: 'projects',
            method: 'put',
            mode: 'readwrite',
            payload: project,
            callback: {
              success: (e) => {
                console.log('Project updated', e);
                resolve(e);
              },
              complete: (e) => console.log('Project update tx complete', e),
              error: (e) => console.log('Error updating project', e),
            }
          };

          DB.connect(data);
        });
    });
    
    return promise;
  }
}


//   openProjects () {
//     const db = openDB('projects', 1);
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

export default ProjectsDB;

