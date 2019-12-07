/* eslint-disable no-undef */

import React from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import ProjectsList from '../../components/ProjectsList';
import UrlsList from '../../components/UrlsList';
import Button from '../../components/Button';
import {
  withRouter,
} from 'react-router-dom';

const Summary = (props) => {
  const showMore = () => {
    console.log('showing more');
  };

  const openProject = projIndex => {
    // indexedDB starts at 1, so to get the project by index I take id - 1
    let project = props.projects[projIndex - 1];

    props.history.push({
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
    ${props.theme.BottomSection}
  `;

  const Column = styled.div`
    ${ props.theme.Column}
    grid-area: ${ props => props.area};
  `;

  return(
    <BottomSection>
      <Column area={ 'left' }>
        <h4>Jump back in</h4>
        <h6>Recent projects</h6>
        { props.projects ? <ProjectsList 
          projects={props.projects}
          clickAction={'resume'}
          type={'top'}
          clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'mid' }>
        <h4>Top URLS</h4>
        <h6>All time</h6>
        { props.urls ? <UrlsList 
          urls={props.urls}
          type={'top'}
          clicked={(projIndex) => openProject(projIndex)} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'right' }>
        <h4>Manage</h4>
        <h6>Recent projects</h6>
        { props.projects ? <ProjectsList
          projects={props.projects}
          clickAction={'open'}
          type={'neutral'}
          clicked={(projIndex) => openProject(projIndex)} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(Summary));