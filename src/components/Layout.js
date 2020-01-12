/* eslint-disable no-undef */

import React from 'react';
import styled from '@emotion/styled';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import theme from '../assets/theme';

const Layout = ({topComponents, children, currentProject}) => {
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
    padding: 0.5rem 0 0.5rem 1.6rem;
  `;

  const CurrentProject = styled.div`
    margin-left: auto;
    text-align: center;
    min-width: 4rem;
    padding: 0.3rem 1.7rem;
    border-radius: 0 0 0 0.1rem;
    & > h4 {
      font-weight: bold;
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
  `;

  const StyledNav = styled.nav`
    background-color: #f9f9f9;
    top: 0;
    height: auto;
    width: 100vw;
    position: fixed;
    display: flex;
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
            { topComponents.left }
          </div>
          <div>
            { topComponents.right }
          </div>
        </TopSection>
        <div>
          {children}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default withRouter(Layout);