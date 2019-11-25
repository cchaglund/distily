/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import './Options.css';
import Overview from './Overview';
import Project from './Project';
import Ctrl from '../background/controller';

const Controller = new Ctrl(browser);

const Options = () => {
  const [ projects, setProjects ] = useState();
  const [ projectToShow, setProjectToShow ] = useState();

  useEffect( () => {

    // getAllProjects();

    browser.runtime.sendMessage({ 
      type: 'optionsOpened' 
    });

    Controller.getAllProjects()
      .then((res) => {
        setProjects(res);
      });

    // Controller.createNewProject('My new proj').then((res) =>console.log(res));
    // Controller.getProject(5).then((res) =>console.log('THIS SHOULD BE SAME A',res));
    // Controller.updateProject(25, {title: 'poo'}).then((res) =>console.log(res));

    browser.storage.local.get()
      .then(res => {
        setProjectToShow(res.state.projectToOpen);
        // Reset the project that's now been shown
        browser.storage.local.set({
          state: {
            projectToOpen: null
          }
        });
      });
  }, []);

  // const createProject = (title) => {
  //   browser.runtime.sendMessage({ 
  //     type: 'createProject',
  //     message: title 
  //   });
  // };

  // const getProject = (id) => {
  //   DB.projects.get(id)
  //     .then( res => {
  //       console.log('Project: ', res.target.result);
  //     });
  // };

  // const getAllProjects = () => {
  //   DB.projects.getAll()
  //     .then( res => {
  //       console.log('Projects: ', res);
  //     });
  // };

  // const updateProject = (id, data) => {
  //   DB.projects.update(id, data)
  //     .then( res => {
  //       console.log('Updated: ', res);
  //     });
  // };

  //   browser.storage.local.get()
  //     .then(res => {
  //       if (res.state.projectToOpen) {
  //         setProjectToShow(res.state.projectToOpen);
  //       }
  //     });
  // };


  return (
    <Router>
      { projectToShow ? <Redirect
        to={{ 
          pathname: '/project',
          params: {
            title: projectToShow.title,
            data: projectToShow
          }
        }} /> : null }
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Overview</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/">
            <Overview 
              projects={projects} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Options;
