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
      { currentProject ? <Redirect
        to={{ 
          pathname: '/project',
          params: {
            data: currentProject
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
              projects={projects ? projects : null}
              urls={urls ? urls : null }/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Options;
