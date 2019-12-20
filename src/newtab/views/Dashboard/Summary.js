/* eslint-disable no-undef */

import React from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import ProjectsList from '../../../components/ProjectsList';
import UrlsList from '../../../components/UrlsList';
import Button from '../../../components/Button';
import {
  withRouter,
} from 'react-router-dom';

const Summary = ({ history, projects, urls, topUrls, theme }) => {
  const showMore = () => {
    console.log('showing more');
  };

  const openProject = projIndex => {
    // indexedDB starts at 1, so to get the project by index I take id - 1
    let project = projects[projIndex - 1];

    history.push({
      pathname: '/project',
      state: {
        params: {
          data: project
        }
      }
    });
  };

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

  const BottomSection = styled.div`
    ${theme.BottomSection}
  `;

  const Column = styled.div`
    ${ theme.Column}
    grid-area: ${ props => props.area};
  `;

  return(
    <BottomSection>
      <Column area={ 'left' }>
        <h4>Jump back in</h4>
        { projects ? <ProjectsList 
          projects={projects}
          clickAction={'resume'}
          type={'recent'}
          clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} /> : null }
        <Button 
          btnClass={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'mid' }>
        <h4>Top URLS</h4>
        { topUrls ? <UrlsList 
          urls={topUrls}
          clicked={(projIndex) => openProject(projIndex)} /> : null }
        <Button 
          btnClass={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'right' }>
        <h4>Manage</h4>
        { projects ? <ProjectsList
          projects={projects}
          clickAction={'open'}
          type={'neutral'}
          clicked={(projIndex) => openProject(projIndex)} /> : null }
        <Button 
          btnClass={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(Summary));