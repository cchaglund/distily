import projectsObject from './projects';
import urlsObject from './urls';

const projectsDB = new projectsObject();
const urlsDB = new urlsObject();

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
    getAll: () => urlsDB.getAllURLS(),
    getAllByProject: (projectID) => urlsDB.getAllProjectURLs(projectID),
    delete: (id) => urlsDB.deleteURL(id)
  }
};

export default DB;