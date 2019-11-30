/** @jsx jsx */

import { useState, useEffect} from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Link,
  withRouter,
} from 'react-router-dom';

const Layout = (props) => {
  const [ colAreas, setColAreas ] = useState();
  const [ colFractions, setColFractions ] = useState();

  useEffect(() => {
    const colTemplateAreas = props.columnsData.map((col, index) => {
      return 'a' + index.toString();
    });

    const colTemplateColums = props.columnsData.map(() => {
      return '1fr';
    });

    setColFractions(colTemplateColums.join(' '));
    setColAreas(colTemplateAreas.join(' '));
  }, []);

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

  const BottomSection = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: ${ colFractions };
    grid-column-gap: 50px;
    grid-template-rows: auto;
    grid-template-areas: 
      "${ colAreas }"
  `;
  
  const Column = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const renderedColumns = props.columnsData.map((col, index) => {
    return (
      <div 
        key={index}
        css={ css`grid-area: a${index.toString()}`}>
        <Column>
          { col }
        </Column>
      </div>
    );
  });

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
    <div>
      <StyledNav>
        <LinkWrapper>
          <StyledLink to="/">Dashboard</StyledLink>
        </LinkWrapper>
        { props.location.pathname === '/project' ? <LinkWrapper 
          to="/project">Project > {props.projectTitle ? props.projectTitle : null}</LinkWrapper> 
          : null}
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
        <BottomSection>
          { renderedColumns }
        </BottomSection>
      </LayoutContainer>
    </div>
  );
};

export default withRouter(Layout);