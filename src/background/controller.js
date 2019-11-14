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
    console.log('only active tabs with url should be shown here: ', activeInfo);
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
            console.log(currentProject.currentWindowID === windowId);
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

  createNewProject (projectTitle) {
    // Open new window
    this.browser.windows.create()
      .then( res => {
        const newWindow = res;

        this.getStorage()
          .then( results => {
            // TODO: do I need this check? the proj shouldn't exist when creating a new one
            if (!results.projects) {
              results.projects = {};
            }
            
            if ( !results.projects[projectTitle] ) {
              results.projects[projectTitle] = {
                currentWindowID: newWindow.id,
                urls: {}
              };
            }

            // results.projects[projectTitle].tabs

            this.setStorage(results);
          });
      });
  }

  updateProject (project) {
    console.log('proj to update', project);
    this.getStorage()
      .then(res => {
        console.log(res);
        res.projects[project.name].urls = project.urls;
        // TODO: bit unecessary to rewrite the whole project object, don't really have to
        this.browser.storage.local.set(res);
        console.log('project update!');
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

  newTabHandler (tab) {
    console.log('tab created', tab);
    if ( tab.windowId) {
      // if tab.windowId matches any project window id, add the url to the project's tabs
    }
  }
}

export default Controller;