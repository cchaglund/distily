/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// import { openDB, deleteDB, wrap, unwrap } from 'idb';
// // import idb from 'idb';

import DB from './database';

class ProjectsDB {
  addProject (projectObject) {
    let project = {
      active: true,
      activeWindow: projectObject.activeWindow,
      title: projectObject.title,
      prevSession: null,
      stats: {
        totalTime: null,
        totalUrls: null,
        totalVisits: null,
        totalFocuses: null,
        timesOpened: null,
        lastOpened: Date.now(),
        created: Date.now()
      }
    };

    const data = {
      store: 'projects',
      method: 'add',
      mode: 'readwrite',
      payload: project,
      callback: {
        success: (e) => console.log('Project added. ID = ', e.target.result),
        complete: (e) => console.log('Project add tx complete', e),
        error: (e) => console.log('Project could not be added', e),
      }
    };

    DB.connect(data);
  }



  getProject (id) {
    const dbPromise = this.openProjects();

    dbPromise.then( db => {
      const tx = db.transaction('projects', 'readonly');
      const store = tx.objectStore('projects');

      return store.get(id);
    }).then( value => {
      console.log('retrieved ', value);
      return value;
    });
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

