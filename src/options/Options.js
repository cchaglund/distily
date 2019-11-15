/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './Options.css';
import Overview from './Overview';
import Project from './Project';

const Options = () => {
  const [ projects, setProjects ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({ 
      type: 'optionsOpened' 
    });

    browser.runtime.onMessage.addListener( message => {
      if (message.type === 'projectsData') {
        setProjects(message.data);
      }
    });
  }, []);

  return (
    <Router>
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
              projects={projects}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Options;
