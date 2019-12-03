/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Link,
  withRouter,
} from 'react-router-dom';

const Layout = (props) => {
  const LayoutContainer = styled.div`
    width: 90vw;
    height: 100%;
    margin: auto;
  `;

  const TopSection = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 180px;
    grid-template-rows: auto;
    grid-template-areas: 
      "left right"
  `;

  const LinkWrapper = styled.div`
    padding: 0.5rem 0.8rem;
    ${ props => props.extraStyle }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
  `;

  const StyledNav = styled.nav`
    padding: 0 1rem;
    display: flex;
  `;

  return (
    <div>
      <StyledNav>
        <LinkWrapper>
          <StyledLink to="/">
            <h5>Dashboard</h5>
          </StyledLink>
        </LinkWrapper>
        { props.location.pathname === '/project' ? 
          <LinkWrapper 
            to="/project">
            <h5>Project > {props.projectTitle ? 
              props.projectTitle 
              : null}</h5>
          </LinkWrapper>
          : null}
        <LinkWrapper extraStyle={'margin-left: auto;'}>
          <StyledLink to="/settings">
            <h5>Settings</h5>
          </StyledLink>
        </LinkWrapper>
      </StyledNav>

      <LayoutContainer>
        <TopSection>
          <div css={ css`grid-area: left`}>
            { props.topComponents.left }
          </div>
          <div css={ css`grid-area: right`}>
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