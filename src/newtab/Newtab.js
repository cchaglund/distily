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

  useEffect( () => {
    browser.runtime.sendMessage({
      type: 'getCurrentProject'
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
              currentProject={ currentProject }/>
          </Route>
          <Route path="/project">
            <Project
              currProject={ currentProject }/>
          </Route>
          <Route path="/">
            {
              currentProject ? 
                <Project 
                  currProject={ currentProject }/>
                : 
                <Dashboard
                  currentProject={ currentProject }/>
            }
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Newtab;
