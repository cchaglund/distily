/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import theme from '../assets/theme';

const Layout = (props) => {
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
                setCurrentProject(message.data.title);
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

  const LayoutContainer = styled.div`
    width: 90vw;
    height: 100%;
    margin: auto;
    margin-top: 6rem;
  `;

  const TopSection = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;

  const LinkWrapper = styled.div`
    padding: 0.5rem 0.8rem;
  `;

  const CurrentProject = styled.div`
    margin-left: auto;
    text-align: center;
    min-width: 4rem;
    padding: 0.3rem 1.7rem;
    border-radius: 0 0 0 0.1rem;
    background-color: ${theme.colors.orange.color};
    color: white;
    & > h4 {
      font-weight: bold;
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
  `;

  const StyledNav = styled.nav`
    background-color: white;
    top: 0;
    height: auto;
    width: 100vw;
    position: fixed;
    border-bottom: 1px solid lightgray;
    display: flex;
    padding: ${ currentProject ? '0 0 0 1rem' : '0 1rem' };
  `;

  return (
    <div>
      <StyledNav>
        <LinkWrapper>
          <StyledLink to="/dashboard">
            <h5>Dashboard</h5>
          </StyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <StyledLink to="/settings">
            <h5>Settings</h5>
          </StyledLink>
        </LinkWrapper>
        { currentProject ? 
          <CurrentProject>
            <h5>{ currentProject }</h5>
          </CurrentProject> : null
        }
      </StyledNav>

      <LayoutContainer>
        <TopSection>
          <div>
            { props.topComponents.left }
          </div>
          <div>
            { props.topComponents.right }
          </div>
        </TopSection>
        <div>
          {props.children}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default withRouter(Layout);