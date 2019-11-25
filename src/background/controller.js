import DB from '../database/index';

class Controller  {
  constructor(browser) {
    this.browser = browser;
  }

  initStorage () {
    this.getStorage()
      .then( results => {
        // Initialize if not yet initialized
        if ( !results.projects ) {
          results.projects = {};
        }

        if ( !results.state ) {
          results.state = {};
        }

        this.setStorage(results);
      });
  }

  sendMessage (type, data) {
    this.browser.runtime.sendMessage({ 
      type: type,
      data: data
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

  updateProject (id, data) {
    return new Promise( resolve => {
      DB.projects.update(id, data)
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

          console.log('hej?');

          DB.projects.add(newProject)
            .then(res => {
              console.log(res);
              resolve(res);
            });
        });



      // this.getStorage()
      //   .then( results => {
      //     if (!results.projects) {
      //       results.projects = {};
      //     }
          
      //     // TODO: do I need this check? the proj shouldn't exist when creating a new one
      //     if ( !results.projects[projectTitle] ) {
      //       results.projects[projectTitle] = {
      //         currentWindowID: res.id,
      //         urls: {}
      //       };
      //       this.registerOpenProject(res, projectTitle);
      //     }

      //     this.setStorage(results);
      //   });
    });
  }

  registerOpenProject (windowId, projectName) {
    this.getStorage()
      .then(res => {
        if (!res.openProjects) {
          res.openProjects = {};
        }

        res.openProjects[projectName] = {
          windowId: windowId
        };

        this.setStorage({
          openProjects: {
            ...res.openProjects,
            [projectName]: res.openProjects[projectName]
          }
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

  getProjectWindow (windowId) {
    let newPromise = new Promise( (resolve) => {
      this.getStorage()
        .then( results => {
          Object.keys(results.projects).forEach( project => {
            const currentProject = results.projects[project];
            if (currentProject.currentWindowID === windowId) {
              const toReturn = {
                name: project,
                urls: currentProject.urls
              };
              resolve( toReturn );
            } 
          });
        });
    });
    return newPromise;
  }

  fetchProjectTitle () {
    const title = new Promise( (resolve, reject) => {
      this.browser.windows.getCurrent()
        .then( windowInfo => {
          this.getStorage()
            .then( res => {
              if (!res.openProjects) {
                reject('No open projects');
              }
              Object.keys(res.openProjects).forEach( projTitle => {
                if ( res.openProjects[projTitle].windowId === windowInfo.id) {
                  resolve(projTitle);
                }
              });
            });
        });
    });
    
    return title;
  }

  fetchAllProjectData () {
    const data = new Promise(resolve => {
      this.getStorage()
        .then( res => {
          resolve(res.projects);
        });
    });

    return data;
  }

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

  URLvisited (evt) {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }
      
    const url = new URL(evt.url);

    this.getProjectWindow(evt.windowId)
      .then( project => {
        if (project) {
          if ( project.urls[url.href] ) {
            project.urls[url.href].visited = project.urls[url.href].visited + 1;
            this.updateProject(project);
          } else {
            this.addUrlToProject(url, evt.windowId, evt.tabId);
          }
        }
      }, err => {
        console.log(err);
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

  closeWindowHandler ( windowId ) {
    this.getAllProjects()
      .then(res => {
        res.forEach( project => {
          if (project.activeWindow === windowId) {
            this.updateProject(project.id, {active: false});
          }
        });
      });
  }

  addUrlToProject (newUrl, windowId, tabId) {
    console.log('HERE', newUrl);
    if ( newUrl.protocol === 'about:' ||newUrl.protocol === 'moz-extension:' ) {
      return;
    }

    this.browser.tabs.get(tabId)
      .then( tab => {
        const url = new URL(tab.url);

        this.getProjectWindow(windowId)
          .then( project => {
            project.urls[newUrl.href] = {
              host: newUrl.hostname,
              path: newUrl.pathname,
              visited: 1,
              focused: 1,
              // Title needs a unique title
              title: tab.title + Math.floor(Math.random()*200),
              url: url.href,
            };
            this.updateProject(project);
          });

        // this.tabActivated(tabInfo);
      });
  }

  // newTabHandler (tab) {
  //   console.log('tab created', tab);
  //   if ( tab.windowId) {
  //     // if tab.windowId matches any project window id, add the url to the project's tabs
  //   }
  // }
}

export default Controller;