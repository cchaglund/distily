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
    // browser.runtime.sendMessage({
    //   type: 'getAllProjects'
    // });

    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    // browser.runtime.sendMessage({
    //   type: 'getAllUrls'
    // });

    const handleMessages = message => {
      switch (message.type) {
        case 'currentProject': {
          // makes sure project which user wants to open matches the window they're in
          browser.windows.getCurrent()
            .then( window => {
              if (message.windowID === window.id) {
                console.log('heeey');
                setCurrentProject(message.data);
                // props.history.push({
                //   pathname: '/project',
                //   state: {
                //     params: {
                //       data: message.data
                //     }
                //   }
                // });
              }
            });
          break;
        }
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
            <Dashboard />
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
                <Dashboard/>
            }
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Options;
