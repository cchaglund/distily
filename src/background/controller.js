class Controller  {
  constructor(browser) {
    this.browser = browser;
  }

  initStorage () {
    this.browser.storage.local.get()
      .then( results => {
        // Initialize if not yet initialized
        if ( !results.projects ) {
          results.projects = {};
        }

        this.browser.storage.local.set(results);
      });
  }

  createNewProject (projectTitle) {
    // Open new window
    this.browser.windows.create()
      .then( res => {
        const newWindow = res;

        this.browser.storage.local.get()
          .then( results => {
            // TODO: do I need this check? the proj shouldn't exist when creating a new one
            if ( !results.projects[projectTitle] ) {
              results.projects[projectTitle] = {
                currentWindowID: newWindow.id,
                urls: {}
              };
            }

            // results.projects[projectTitle].tabs

            this.browser.storage.local.set(results);
          });
      });
  }

  URLvisited (evt) {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    const url = new URL(evt.url);

    this.browser.storage.local.get()
      .then( res => {
        Object.keys(res.projects).forEach( project => {
          const currentProject = res.projects[project];
          if (currentProject.currentWindowID === evt.windowId) {
            if ( currentProject.urls[url.href] ) {
              currentProject.urls[url.href].visited = currentProject.urls[url.href].visited + 1;
              this.browser.storage.local.set(res);
            } else {
              this.addNewPage(url, evt.windowId);
            }
          }
        }
        );
      });
  }

  addNewPage (url, windowId) {
    if (url.href === 'about:blank') {
      return;
    }

    this.browser.storage.local.get()
      .then( results => {
        if (results.projects) {
          Object.keys(results.projects).forEach( project => {
            const currentProject = results.projects[project];
            if (currentProject.currentWindowID === windowId) {
              currentProject.urls[url.href] = {
                host: url.hostname,
                path: url.pathname,
                visited: 1
              };
              this.browser.storage.local.set(results);
            }
          });
        }
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