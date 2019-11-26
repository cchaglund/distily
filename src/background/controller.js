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

  getAllProjects () {
    return new Promise( resolve => {
      DB.projects.getAll()
        .then( res => {
          resolve(res);
        });
    });
  }

  getAllProjectURLS(projectID) {
    return new Promise( resolve => {
      DB.urls.getAllByProject(projectID)
        .then( res => {
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

  createNewProject (projectTitle) {
    return new Promise( resolve => {
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
          let titleTaken = false;
          res.forEach(project => {
            if (project.title === title) {
              titleTaken = true;
              return;
            }
          });
          resolve(titleTaken);
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
            this.browser.runtime.openOptionsPage();
          });
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
                      console.log('y', url);
                      this.createNewURL(url);
                    });
                }
              });
          }
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
                console.log('why no work', urlHash);
                console.log('why no work', projectID);
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