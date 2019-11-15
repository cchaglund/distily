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

        this.setStorage(results);
      });
  }

  getStorage () {
    return this.browser.storage.local.get();
  }

  setStorage (data) {
    this.browser.storage.local.set(data);
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

  fetchCurrentProject () {
    this.browser.windows.getCurrent()
      .then( windowInfo => {
        this.getStorage()
          .then( res => {
            if (!res.openProjects) {
              return;
            }
            Object.keys(res.openProjects).forEach( projTitle => {
              if ( res.openProjects[projTitle].windowId === windowInfo.id) {
                this.browser.runtime.sendMessage({ 
                  type: 'activeProjectTitle',
                  data: projTitle,
                });
              }
            });
          });
      });
  }

  createNewProject (projectTitle) {
    // Open new window
    this.browser.windows.create()
      .then( res => {
        const newWindow = res;

        this.getStorage()
          .then( results => {
            if (!results.projects) {
              results.projects = {};
            }
            
            // TODO: do I need this check? the proj shouldn't exist when creating a new one
            if ( !results.projects[projectTitle] ) {
              results.projects[projectTitle] = {
                currentWindowID: newWindow.id,
                urls: {}
              };
              this.registerOpenProject(newWindow.id, projectTitle);
            }

            // results.projects[projectTitle].tabs
            this.setStorage(results);
          });
      });
  }

  updateProject (project) {
    this.getStorage()
      .then(res => {
        res.projects[project.name].urls = project.urls;
        // TODO: bit unecessary to rewrite the whole project object, don't really have to
        this.browser.storage.local.set(res);
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
            this.addNewUrl(url, evt.windowId);
          }
        }
      }, err => {
        console.log(err);
      });
  }

  closeWindowHandler ( windowId ) {
    console.log( windowId );
    this.getStorage()
      .then(res => {
        let updatedOpenProjects = { ...res.openProjects };
        Object.keys( updatedOpenProjects ).forEach( projTitle => {
          if ( updatedOpenProjects[ projTitle ].windowId === windowId ) {
            delete updatedOpenProjects[ projTitle ];
          }
        });
        this.setStorage({
          openProjects: updatedOpenProjects
        });
      });
  }

  addNewUrl (newUrl, windowId) {
    if (newUrl.href === 'about:blank') {
      return;
    }

    this.getProjectWindow(windowId)
      .then( project => {
        project.urls[newUrl.href] = {
          host: newUrl.hostname,
          path: newUrl.pathname,
          visited: 1,
          focused: 1,
        };
        this.updateProject(project);
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