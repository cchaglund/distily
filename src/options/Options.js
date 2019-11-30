/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './Options.css';
import Dashboard from './views/Dashboard';
import Project from './views/Project';

const Options = () => {
  const [ projects, setProjects ] = useState();
  const [ urls, setUrls ] = useState();
  const [ currentProject, setCurrentProject ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({
      type: 'getAllProjects'
    });

    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    browser.runtime.sendMessage({
      type: 'getAllUrls'
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'allProjects':
          setProjects(message.data);
          break;
        case 'currentProject':
          setCurrentProject(message.data);
          break;
        case 'allUrls':
          setUrls(message.data);
          break;
      }
    });
  }, []);

  return (
    <Router>
      { currentProject ? <Redirect
        to={{ 
          pathname: '/project',
          params: {
            data: currentProject
          }
        }} /> : null }
      <div>
        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/">
            <Dashboard 
              projects={projects ? projects : null}
              urls={urls ? urls : null }/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Options;
