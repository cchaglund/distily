class Controller  {
  constructor(browser) {
    this.browser = browser;
  }

  createNewProject (projectTitle) {
    // Open new window
    this.browser.windows.create()
      .then( res => {
        const newWindow = res;

        this.browser.storage.local.get()
          .then( results => {
            // this should instead be added on the project itself, so that one can have multiple project windows open simultaneously
            results.currentWindowID = newWindow.id;

            // Initialize if not yet initialized
            if ( !results.projects ) {
              results.projects = {};
            }

            if ( !results.projects[projectTitle] ) {
              results.projects[projectTitle] = {
                tabs: {}
              };
            }

            // results.projects[projectTitle].tabs

            this.browser.storage.local.set(results);
          });
      });
  }

  addPageToProject (evt) {
    // Filter out any sub-frame related navigation event
    if (evt.frameId !== 0) {
      return;
    }

    const url = new URL(evt.url);

    let bah = {
      host: {}
    };

    bah.host[url.hostname] = bah.host[url.hostname] || 0;
    bah.host[url.hostname]++;

    console.log(bah);
  }

  newTabHandler (tab) {
    console.log('tab created', tab);
    if ( tab.windowId) {
      // if tab.windowId matches any project window id, add the url to the project's tabs
    }
  }
}

export default Controller;