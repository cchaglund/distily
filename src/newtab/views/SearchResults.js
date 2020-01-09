/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import ProjectsList from '../../components/ProjectsList';
import UrlsList from '../../components/UrlsList';
import Button from '../../components/Button';
import * as Fuse from 'fuse.js';
import {
  withRouter,
} from 'react-router-dom';

const Search = ({list, term, theme, close, resultsType}) => {
  const [ searchResults, setSearchResults ] = useState();

  useEffect(() => {
    search(list, term);
  }, []);

  const BottomSection = styled.div`
    ${theme.BottomSectionTwoColumns}
  `;

  const Column = styled.div`
    ${ theme.Column}
    grid-area: ${ props => props.area};
    position: relative;
    z-index: 3;
    padding: 1rem;
  `;

  const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  `;

  const resumeProject = (projId, openType, tabCount) => {
    browser.runtime.sendMessage({
      type: 'resumeProject',
      data: {
        projectId: projId,
        openType: openType,
        tabCount: tabCount
      }
    });
  };

  const search = (list, term) => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'title'
      ]
    };

    const fuse = new Fuse(list, options);
    const result = fuse.search(term);
    setSearchResults(result);
  };

  return(
    <React.Fragment>
      <Overlay 
        onClick={() => close()}/>
      <BottomSection>
        <Column area={ 'right' }>
          <Button
            btnClass={'nav'}
            size={'regular'}
            text={'Exit search'} 
            clicked={() => close()} />
          <h5>Results</h5>
          { searchResults ? 
            resultsType === 'url' ?
              <UrlsList 
                urls={searchResults}
                type={'recent'}/> :
              <ProjectsList 
                projects={searchResults}
                clickAction={'resume'}
                clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} /> 
            : null }
        </Column>
      </BottomSection>
    </React.Fragment>
  );
};

export default withTheme(withRouter(Search));