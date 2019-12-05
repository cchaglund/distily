import projectsObject from './projects';
import urlsObject from './urls';
import settingsObject from './settings.js';

const projectsDB = new projectsObject();
const urlsDB = new urlsObject();
const settingsDB = new settingsObject();

const DB = {
  projects: {
    add: (project) => projectsDB.addProject(project),
    update: (id, data) => projectsDB.updateProject(id, data),
    get: (id) => projectsDB.getProject(id),
    getAll: () => projectsDB.getAllProjects(),
    delete: (id) => projectsDB.deleteProject(id)
  },
  urls: {
    add: (url, projectID) => urlsDB.addURL(url, projectID),
    update: (id, data) => urlsDB.updateURL(id, data),
    get: (id) => urlsDB.getURL(id),
    getAll: () => urlsDB.getAllURLs(),
    getAllByProject: (projectID) => urlsDB.getAllProjectURLs(projectID),
    delete: (id) => urlsDB.deleteURL(id)
  },
  settings: {
    add: (setting) => settingsDB.addSetting(setting),
    getAll: () => settingsDB.getAllSettings(),
    update: (id, data) => urlsDB.updateURL(id, data),
  }
};

export default DB;