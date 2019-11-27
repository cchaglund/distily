/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import './Options.css';
import Dashboard from './views/Dashboard';
import Project from './views/Project';
import Ctrl from '../background/controller';

const Controller = new Ctrl(browser);

const Options = () => {
  const [ projects, setProjects ] = useState();
  const [ projectToShow, setProjectToShow ] = useState();

  useEffect( () => {
    Controller.getAllProjects()
      .then((projects) => {
        setProjects(projects);

        browser.storage.local.get()
          .then(res => {
            if (res.state.projectToOpen) {
              setProjectToShow(res.state.projectToOpen);
              // Reset the project that's now been shown
              browser.storage.local.set({
                state: {
                  projectToOpen: null
                }
              });
            } else {
              const active = projects.filter(project => {
                return project.active;
              });
              if (active.length !== 0) {
                browser.windows.getCurrent()
                  .then(windowInfo => {
                    if (active[0].activeWindow === windowInfo.id) {
                      setProjectToShow(active[0]);
                    }
                  });
              }
            }
          });
      });
  }, []);

  const LinkWrapper = styled.div`
    padding: 1rem 1.5rem;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
  `;

  const StyledNav = styled.nav`
    height: 2rem;
    padding: 1rem;
    display: flex;
  `;

  return (
    <Router>
      { projectToShow ? <Redirect
        to={{ 
          pathname: '/project',
          params: {
            data: projectToShow
          }
        }} /> : null }
      <div>
        <StyledNav>
          <LinkWrapper>
            <StyledLink to="/">Dashboard</StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <StyledLink to="/about">About</StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <StyledLink to="/users">Users</StyledLink>
          </LinkWrapper>
        </StyledNav>

        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/">
            <Dashboard 
              projects={projects}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Options;
