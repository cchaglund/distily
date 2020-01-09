/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './Newtab.css';
import Dashboard from './views/Dashboard/Dashboard';
import Project from './views/Project/Project';
import Settings from './views/Settings';
import ThemeProvider from '../assets/provider';
import './Newtab.css';

const Newtab = () => {
  const [ currentProject, setCurrentProject ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    browser.runtime.sendMessage({
      type: 'getAllProjects'
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'currentProject': {
          // makes sure project which user wants to open matches the window they're in
          browser.windows.getCurrent()
            .then( window => {
              if (message.windowID === window.id) {
                setCurrentProject(message.data);
              }
            });
          break;
        }
        case 'allProjects':
          setProjects(message.data);
          break;
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

    return () => {
      console.log('removing listener');
      browser.runtime.onMessage.removeListener( handleMessages );
    };
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/dashboard">
            <Dashboard
              currentProject={ currentProject }
              projects={ projects } />
          </Route>
          <Route path="/project">
            <Project
              currProject={ currentProject } 
              projects={ projects } />
          </Route>
          <Route path="/">
            {
              currentProject ? 
                <Project 
                  currProject={ currentProject }
                  projects={ projects } />
                : 
                <Dashboard
                  currentProject={ currentProject }
                  projects={ projects } />
            }
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Newtab;
