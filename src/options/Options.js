/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './Options.css';
import Dashboard from './views/Dashboard/Dashboard';
import Project from './views/Project/Project';
import Settings from './views/Settings';
import ThemeProvider from '../assets/provider';
import './Options.css';

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

    const handleMessages = message => {
      switch (message.type) {
        case 'allProjects':
          setProjects(message.data);
          break;
        case 'currentProject': {
          let thisWindowID = browser.windows.WINDOW_ID_CURRENT;
          if (message.windowID === thisWindowID) {
            setCurrentProject(message.data);
          }
          break;
        }
        case 'allUrls':
          setUrls(message.data);
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
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/">
            {
              currentProject ? 
                <Project 
                  currentProject={ currentProject }/>
                : 
                <Dashboard 
                  projects={projects ? projects : null}
                  urls={urls ? urls : null }/>
            }
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Options;
