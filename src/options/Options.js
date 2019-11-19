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

const Options = () => {
  const [ projects, setProjects ] = useState();
  const [ projectToShow, setProjectToShow ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({ 
      type: 'optionsOpened' 
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'projectsData':
          console.log(message);
          setProjects(message.data);
          loadProject();
          break;
      }
    });
  }, []);

  const loadProject = () => {
    browser.storage.local.get()
      .then(res => {
        if (res.state.projectToOpen) {
          setProjectToShow(res.state.projectToOpen);
        }
      });
  };

  const redirect = (proj) => {
    return <Redirect
      to={{ 
        pathname: '/project',
        params: {
          title: proj,
          data: projects[proj]
        }
      }} />;
  };

  return (
    <Router>
      { projectToShow ? redirect(projectToShow) : null }
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
