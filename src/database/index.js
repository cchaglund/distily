import projectsDB from './projects';

const projObj = new projectsDB();

const DB = {
  projects: {
    add: (project) => projObj.addProject(project),
    update: (id, data) => projObj.updateProject(id, data),
    get: (id) => projObj.getProject(id),
    getAll: () => projObj.getAllProjects(),
    delete: (id) => projObj.deleteProject(id)
  }
};

export default DB;