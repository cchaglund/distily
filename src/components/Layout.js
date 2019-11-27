/** @jsx jsx */

import { useState, useEffect} from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

const Layout = ({topComponents, columnsData}) => {
  const [ colAreas, setColAreas ] = useState();
  const [ colFractions, setColFractions ] = useState();

  useEffect(() => {
    const colTemplateAreas = columnsData.map((col, index) => {
      return 'a' + index.toString();
    });

    const colTemplateColums = columnsData.map(() => {
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

  const renderedColumns = columnsData.map((col, index) => {
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

  return (
    <LayoutContainer>
      <TopSection>
        <div css={ css`grid-area: left`}>
          { topComponents.left }
        </div>
        <div css={ css`grid-area: right`}>
          { topComponents.right }
        </div>
      </TopSection>
      <BottomSection>
        { renderedColumns }
      </BottomSection>
    </LayoutContainer>
  );
};

export default Layout;