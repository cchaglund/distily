/* eslint-disable no-undef */

const importProject = (projectJson) => {
  const jsonObj = JSON.parse(projectJson);
  browser.runtime.sendMessage({
    type: 'importProject',
    data: jsonObj
  });
};

export default importProject;