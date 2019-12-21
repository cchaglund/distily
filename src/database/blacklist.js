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

  deleteBlacklistTerm (id) {
    let promise = new Promise( resolve => {
      const data = {
        store: 'blacklist',
        method: 'delete',
        mode: 'readwrite',
        payload: id,
        callback: {
          success: (blacklistTerm) => {
            resolve(blacklistTerm);
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

export default BlacklistDB;

