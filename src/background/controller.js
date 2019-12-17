import DB from '../database/index';
import hash from 'hash.js';

class Controller  {
  constructor(browser) {
    this.browser = browser;
  }

  initState () {
    this.getStorage()
      .then( results => {
        if ( !results.state ) {
          results.state = {};
        }

        this.setStorage(results);
      });
  }

  getStorage () {
    return this.browser.storage.local.get();
  }

  setStorage (data) {
    this.browser.storage.local.set(data);
  }

  getProject (id) {
    return new Promise( resolve => {
      DB.projects.get(id)
        .then( res => {
          resolve(res.target.result);
        });
    });
  }

  getCurrentProject () {
    DB.projects.getAll()
      .then( res => {
        this.browser.windows.getCurrent()
          .then(windowInfo => {
            res.forEach( project => {
              if (project.activeWindow === windowInfo.id) {
                const sending = this.browser.runtime.sendMessage({
                  type: 'currentProject',
                  data: project,
                  windowID: windowInfo.id
                });
                sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
              }
            });
          });
      });
  }

  getAllProjects () {
    return new Promise( resolve => {
      DB.projects.getAll()
        .then( res => {
          const sending = this.browser.runtime.sendMessage({
            type: 'allProjects',
            data: res
          });
          sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
          resolve(res);
        });
    });
  }

  getAllBlacklistTerms () {
    return new Promise( resolve => {
      DB.blacklist.getAll()
        .then( res => {
          const sending = this.browser.runtime.sendMessage({
            type: 'allBlacklistTerms',
            data: res
          });
          sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
          resolve(res);
        });
    });
  }

  createBlacklistItem (term) {
    DB.blacklist.add({
      term: term
    });
  }

  getAllProjectURLS(projectID) {
    return new Promise( resolve => {
      DB.urls.getAllByProject(projectID)
        .then( res => {
          const sending = this.browser.runtime.sendMessage({
            type: 'projectUrls',
            data: res
          });
          sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
          resolve(res);
        });
    });
  }

  getAllURLS() {
    return new Promise( resolve => {
      DB.urls.getAll()
        .then( res => {
          const sending = this.browser.runtime.sendMessage({
            type: 'allUrls',
            data: res
          });
          sending.then(() => console.log('sent'), (e) => console.log('error: ', e));
          resolve(res);
        });
    });
  }

  updateProject (id, data) {
    return new Promise( resolve => {
      DB.projects.update(id, data)
        .then( res => {
          resolve(res);
        });
    });
  }

  updateURL (url) {
    url.visits = url.visits + 1;
    url.focuses = url.focuses + 1;
    url.lastOpened = Date.now();
    return new Promise( resolve => {
      DB.urls.update(url)
        .then( res => {
          resolve(res);
        });
    });
  }

  deleteUrl (id) {
    return new Promise( resolve => {
      DB.urls.delete(id)
        .then( res => {
          resolve(res);
        });
    });
  }

  createNewProject (projectTitle) {
    return new Promise( resolve => {
      this.uniqueProjectTitleCheck(projectTitle)
        .then(res => {
          if (res === false) {
            resolve(res);
            return;
          }
          // Open new window
          this.browser.windows.create()
            .then( res => {
              const newProject = {
                title: projectTitle,
                activeWindow: res.id
              };

              DB.projects.add(newProject)
                .then(res => {
                  console.log(res);
                  resolve(res);
                });
            });
        });
    });
  }

  resumeProject (data) {
    const create = urls => {
      this.browser.windows.create(urls)
        .then( windowInfo => {
          this.getProject(data.projectId)
            .then(project => {
              this.updateProject(data.projectId, {
                active: true,
                activeWindow: windowInfo.id,
                lastOpened: Date.now(),
                timesOpened: project.timesOpened + 1
              });
            });
            
        });
    };

    // no openType indicates it should open without any tabs
    if ( data.openType ) {
      if (data.openType === 'switchWindow') {
        this.getProject(data.projectId)
          .then(project => {
            this.browser.windows.update(project.activeWindow, {focused: true});
          });
      } else {
        this.getAllProjectURLS(data.projectId)
          .then( res => {
            let urls = [];

            const sortUrls = (property, tabCount) => {
              let sortedUrls = [...res ];

              sortedUrls.sort( (urlA, urlB) => {
                return (urlA[property] < urlB[property]) ? 1 : -1;
              });

              tabCount = tabCount > sortedUrls.length ? sortedUrls.length : tabCount;

              for (let i = 0; i < tabCount; i++) {
                urls.push(sortedUrls[i].href);
              }
            };

            switch (data.openType) {
              case 'recent':
                sortUrls('lastOpened', data.tabCount);
                break;
              case 'top':
                sortUrls('visits', data.tabCount) ;
                break;
            }

            create({ url: urls });
          });
      }
    } else {
      create();
    }
  }

  createNewURL (urlObject) {
    return new Promise( resolve => {
      DB.urls.add(urlObject)
        .then(res => {
          resolve(res);
        });
    });
  }

  uniqueProjectTitleCheck (title) {
    return new Promise( resolve => {
      this.getAllProjects()
        .then( res => {
          let uniqueTitle = true;
          res.forEach(project => {
            if (project.title === title) {
              uniqueTitle = false;
              return;
            }
          });
          resolve(uniqueTitle);
        });
    });
  }

  openProject (id) {
    this.getProject(id)
      .then(result => {
        this.getStorage()
          .then(res => {
            res.state.projectToOpen = result;
            this.setStorage(res);
            this.browser.tabs.create();
          });
      });
  }

  openUrl (url) {
    this.browser.tabs.create({
      url: url.href
    });
  }

  closeWindowHandler ( windowId ) {
    this.getAllProjects()
      .then(res => {
        res.forEach( project => {
          if (project.activeWindow === windowId) {
            this.updateProject(project.id, {
              active: false,
              activeWindow: null
            });
          }
        });
      });
  }

  // registerOpenProject (windowId, projectName) {
  //   this.getStorage()
  //     .then(res => {
  //       if (!res.openProjects) {
  //         res.openProjects = {};
  //       }

  //       res.openProjects[projectName] = {
  //         windowId: windowId
  //       };

  //       this.setStorage({
  //         openProjects: {
  //           ...res.openProjects,
  //           [projectName]: res.openProjects[projectName]
  //         }
  //       });
  //     });
  // }

  // getProjectWindow (windowId) {
  //   let newPromise = new Promise( (resolve) => {
  //     this.getStorage()
  //       .then( results => {
  //         Object.keys(results.projects).forEach( project => {
  //           const currentProject = results.projects[project];
  //           if (currentProject.currentWindowID === windowId) {
  //             const toReturn = {
  //               name: project,
  //               urls: currentProject.urls
  //             };
  //             console.log(toReturn);
  //             resolve( toReturn );
  //           } 
  //         });
  //       });
  //   });
  //   return newPromise;
  // }

  // fetchProjectTitle () {
  //   const title = new Promise( (resolve, reject) => {
  //     this.browser.windows.getCurrent()
  //       .then( windowInfo => {
  //         this.getStorage()
  //           .then( res => {
  //             if (!res.openProjects) {
  //               reject('No open projects');
  //             }
  //             Object.keys(res.openProjects).forEach( projTitle => {
  //               if ( res.openProjects[projTitle].windowId === windowInfo.id) {
  //                 resolve(projTitle);
  //               }
  //             });
  //           });
  //       });
  //   });
    
  //   return title;
  // }

  // fetchAllProjectData () {
  //   const data = new Promise(resolve => {
  //     this.getStorage()
  //       .then( res => {
  //         resolve(res.projects);
  //       });
  //   });

  //   return data;
  // }

  tabActivated (activeInfo) {
    this.getStorage()
      .then( results => {
        Object.keys(results.projects).forEach( project => {
          const currentProject = results.projects[project];
          if (currentProject.currentWindowID === activeInfo.windowId) {
            if ( currentProject.urls[activeInfo.url] ) {
              currentProject.urls[activeInfo.url].focused = currentProject.urls[activeInfo.url].focused + 1;
              this.setStorage(results);
            }
          }
        }
        );
      });
  }

  handleURL (evt) {
    let url = new URL(evt.url);
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    if ( url.protocol === 'about:' ||url.protocol === 'moz-extension:' ) {
      return;
    }

    this.getAllBlacklistTerms()
      .then(items => {
        let blacklistHit = null;

        items.forEach( item =>{
          if (url.href.includes(item.term) ) {
            blacklistHit = item.term;
          }
        });

        if (blacklistHit) {
          return;
        }

        // this seems unecessary to add url.host to url.host...?
        url = {
          hash: hash.sha256().update(evt.url).digest('hex'),
          host: url.host,
          href: url.href
        };

        const windowID = evt.windowId;
        const tabID = evt.tabId;

        this.getAllProjects()
          .then(projects => {
            const activeProjects = projects.filter( project => {
              return project.active === true;
            });

            activeProjects.forEach( project => {
              if (project.activeWindow === windowID) {
                this.checkURLexists(url.hash, project.id)
                  .then(res => {
                    if (res.exists === true) {
                      this.updateURL(res.URL);
                    } else {
                      this.browser.tabs.get(tabID)
                        .then( tab => {
                          url.title = tab.title;
                          url.project = project.id;
                          this.createNewURL(url);
                        });
                    }
                  });
              }
            });
          });
      });
  }

  checkURLexists (urlHash, projectID) {
    return new Promise( resolve => {
      let exists = false;
      let URLobject = null;

      this.getAllProjectURLS(projectID)
        .then(res => {
          if (res.length !== 0) {
            res.forEach( url => {
              if (url.hash === urlHash && url.project === projectID) {
                exists = true;
                URLobject = url;
              }
            });
          }
          
          resolve({
            exists: exists,
            URL: URLobject
          });
        });
    });
  }

  // if (url.host === '') {
  //   browser.tabs.onUpdated.addListener( (tabId, changeInfo) => {
  //     if (changeInfo.url) {
  //       browser.tabs.get(tabId)
  //         .then(tab => {
  //           const newUrl = new URL(changeInfo.url);
  //           if (newUrl.host !== '') {
  //             activeTab.title = tab.title;
  //             activeTab.url = newUrl.href;
  //             activeTab.host = newUrl.hostname;
  //             activeTab.path = newUrl.pathname;

  //             Controller.tabActivated(activeTab);
  //           }
  //         });
  //     }
  //   }, {
  //     tabId: activeTab.tabId
  //   });
  // } else {
  //   activeTab.title = res.title;
  //   activeTab.url = url.href;
  //   activeTab.host = url.hostname;
  //   activeTab.path = url.pathname;

  //   Controller.tabActivated(activeTab);
  // }



  // addUrlToProject (newUrl, windowId, tabId) {
  //   console.log(newUrl);
  //   console.log(hash.sha256().update('abc').digest('hex'));
  //   console.log(hash.sha256().update('abc').digest('hex'));
  //   console.log(hash.sha256().update('abc').digest('hex'));
  //   console.log(hash.sha256().update('abd').digest('hex'));
  //   console.log('HERE', newUrl);
  //   if ( newUrl.protocol === 'about:' ||newUrl.protocol === 'moz-extension:' ) {
  //     return;
  //   }

  //   this.browser.tabs.get(tabId)
  //     .then( tab => {
  //       const url = new URL(tab.url);

  //       this.getProjectWindow(windowId)
  //         .then( project => {
  //           project.urls[newUrl.href] = {
  //             host: newUrl.hostname,
  //             path: newUrl.pathname,
  //             visited: 1,
  //             focused: 1,
  //             // Title needs a unique title
  //             title: tab.title + Math.floor(Math.random()*200),
  //             url: url.href,
  //           };
  //           this.updateProject(project);
  //         });

  //       // this.tabActivated(tabInfo);
  //     });
  // }

  // newTabHandler (tab) {
  //   console.log('tab created', tab);
  //   if ( tab.windowId) {
  //     // if tab.windowId matches any project window id, add the url to the project's tabs
  //   }
  // }
}

export default Controller;