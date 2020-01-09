/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import ProjectsList from '../../../components/ProjectsList';
import UrlsList from '../../../components/UrlsList';
import Button from '../../../components/Button';
import FadeWrapper from '../../../HOC/FadeWrapper';
import {
  withRouter,
} from 'react-router-dom';

const Summary = ({ history, projects, topUrls, theme }) => {
  const [ top10Urls, setTop10Urls ] = useState();
  const [ top20Urls, setTop20Urls ] = useState();
  const [ showMoreTopUrls, setShowMoreTopUrls ] = useState(false);
  const [ recent10Projects, setRecent10Projects ] = useState();
  const [ showMoreRecentProjects, setShowMoreRecentProjects ] = useState(false);
  
  useEffect( () => {
    let top10 = [];
    let topAll = [];

    for (let i = 0; i < 20; i++) {
      if (topUrls.length === i) break;
      if (top10.length < 10) {
        top10.push(topUrls[i]);
        topAll.push(topUrls[i]);
      } else {
        topAll.push(topUrls[i]);
      }
    }

    setTop10Urls(top10);
    setTop20Urls(topAll);

    let recent10 = [];

    for (let i = 0; i < 10; i++) {
      if (projects.length === i) break;
      recent10.push(projects[i]);
    }

    setRecent10Projects(recent10);
  }, []);

  const showMore = (type) => {
    if (type === 'urls') setShowMoreTopUrls(true);
    if (type === 'projects') setShowMoreRecentProjects(true);
  };

  const openProject = project => {
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
    <FadeWrapper>
      <BottomSection>
        <Column area={ 'left' }>
          <h4>Jump back in</h4>
          { recent10Projects ? <ProjectsList 
            projects={ showMoreRecentProjects ? projects : recent10Projects }
            clickAction={'resume'}
            type={'recent'}
            clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} /> : <h6>No projects found</h6> }
          { projects.length > 11 && ! showMoreRecentProjects ?
            <Button 
              btnClass={'nav'}
              text={'Show all'}
              size={'regular'}
              clicked={() => showMore('projects')} /> : null
          }
        </Column>
        <Column area={ 'mid' }>
          <h4>Top URLS</h4>
          { top10Urls ? <UrlsList 
            urls={ showMoreTopUrls ? top20Urls : top10Urls } /> : null }
          { topUrls.length > 11 && ! showMoreTopUrls ?
            <Button 
              btnClass={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore('urls')} /> : <h6>No urls found</h6>
          }
        </Column>
        <Column area={ 'right' }>
          <h4>Manage</h4>
          { recent10Projects ? <ProjectsList
            projects={ showMoreRecentProjects ? projects : recent10Projects }
            clickAction={'open'}
            type={'neutral'}
            clicked={(project) => openProject(project)} /> : <h6>No projects found</h6> }
          { projects.length > 11 && ! showMoreRecentProjects ?
            <Button 
              btnClass={'nav'}
              text={'Show all'}
              size={'regular'}
              clicked={() => showMore()} /> : null
          }
        </Column>
      </BottomSection>
    </FadeWrapper>
  );
};

export default withTheme(withRouter(Summary));