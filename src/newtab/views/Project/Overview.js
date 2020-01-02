/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
import Button from '../../../components/Button';
import Notes from './Notes';
import ProjectsList from '../../../components/ProjectsList';
import UrlsList from '../../../components/UrlsList';
import styled from '@emotion/styled';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Overview = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();
  const [ projectWindowMatch, setProjectWindowMatch ] = useState(false);

  useEffect(() => {
    const project = props.project;

    browser.windows.getCurrent()
      .then( windowInfo => {
        if (windowInfo.id === props.project.activeWindow) setProjectWindowMatch(true);
      });
    
    setProject(project);
    setUrls(props.urls);

  }, []);

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

  const Div = styled.div`
    display: flex;
    > * {
      margin: 0.5rem 0.7rem 0.5rem 0;
    }
  `;

  const BottomSection = styled.div`
    ${props.theme.BottomSectionFourColumns}
  `;

  const Column = styled.div`
    ${ props.theme.Column}
    grid-area: ${ props => props.area};
  `;

  {/*
  <BarChart 
    urls={adjustedData}/>
  <BubbleChart
    urls={urls}/> */}

  return (
    <BottomSection>
      <Column area={ 'left' }>
        { project && ! projectWindowMatch ? <ProjectsList 
          projects={ [project] }
          type={'single'}
          clickAction={'resume'}
          clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} />
          : null }
        <Notes 
          projectID={ project ? project.id : null }
          notes={ project ? project.notes : null }/>
      </Column>
      <Column area={ 'mid-left'}>
        <h4>Recent URLs</h4>
        <Div>
          <Button
            btnClass={'action'}
            size={'regular'}
            text={'Open recent 5'}
            clicked={() => resumeProject(project.id, 'recent', 5)} />
          <Button
            btnClass={'action'}
            size={'regular'}
            text={'Recent 10'} 
            clicked={() => resumeProject(project.id, 'recent', 10)} />
        </Div>
        { urls ? <UrlsList
          key='1'
          urls={urls}
          type={'recent'} /> : null }
      </Column>
      <Column area={ 'mid-right' }>
        <h4>Top URLS</h4>
        <Div>
          <Button
            btnClass={'action'}
            size={'regular'}
            text={'Open top 5'} 
            clicked={() => resumeProject('top', 5)} />
          <Button
            btnClass={'action'}
            size={'regular'}
            text={'Top 10'} 
            clicked={() => resumeProject('top', 10)} />
        </Div>
        { urls ? <UrlsList 
          key='2'
          urls={urls}
          type={'top'}
          clicked={(id) => console.log('trying to open url', id)} /> : null }
      </Column>
      <Column area={ 'right' }>
        <h4>By domain</h4>
        { urls ? <UrlsList 
          key='3'
          urls={urls}
          type={'host'}
          clicked={(id) => console.log('trying to open url', id)} /> : null }
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(Overview));