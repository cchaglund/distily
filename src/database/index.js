import projectsObject from './projects';
import urlsObject from './urls';
import blacklistObject from './blacklist';

const projectsDB = new projectsObject();
const urlsDB = new urlsObject();
const blacklistDB = new blacklistObject();

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
  blacklist: {
    add: (term) => blacklistDB.addBlacklistTerm(term),
    getAll: () => blacklistDB.getAllBlacklistTerms(),
    delete: (id) => blacklistDB.deleteBlacklistTerm(id)
  }
};

export default DB;