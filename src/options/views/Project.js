/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import UrlsList from '../../components/UrlsList';
import Overview from './Overview';
import styled from '@emotion/styled';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Project = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();
  const [ createdDate, setCreatedDate ] = useState();
  const [ lastOpenedDate, setLastOpenedDate ] = useState();
  const [ timesOpened, setTimesOpened ] = useState();
  const [ child, setChild ] = useState('project');

  useEffect(() => {
    const project = props.location.state.params.data;
    setProject(project);

    browser.runtime.sendMessage({
      type: 'getAllProjectUrls',
      data: project.id
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'projectUrls':
          setUrls(message.data);
          break;
        case 'allUrls': {
          const projUrls = message.data.filter( url => {
            return url.project === project.id;
          });
          setUrls(projUrls);
        }
      }
    });

    setCreatedDate(new Date(project.created).toLocaleDateString());
    setLastOpenedDate(new Date(project.lastOpened).toLocaleDateString());
    setTimesOpened(project.timesOpened);
  }, []);

  const resumeProject = (openType, tabCount) => {
    browser.runtime.sendMessage({
      type: 'resumeProject',
      data: {
        projectId: project.id,
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

  const Span = styled.span`
    color: #9F9F9F;
    font-size: 0.7rem;
  `;

  const leftComponent = (
    <div>
      <h3>{ project ? project.title : null }</h3>
      <Div>
        <Span>URLs visited: { urls ? urls.length : '-' }</Span>
        <Span>Times opened: { timesOpened }</Span>
        <Span>Created: { createdDate }</Span>
        <Span>Last Opened: { lastOpenedDate }</Span>
      </Div>
      <Div>
        <Button
          type={'nav'}
          size={'regular'}
          text={'Overview'}
          clicked={() => changeView('overview')} />
        <Button
          type={'nav'}
          size={'regular'}
          text={'History'} 
          clicked={() => changeView('history')}/>
        <Button
          type={'nav'}
          size={'regular'}
          text={'Charts'} 
          clicked={() => changeView('charts')}/>
      </Div>
    </div>
  );

  const rightComponent = (
    <TextInput
      text={'Search for URL'}
      type={'search'}
      size={'regular'}/>
  );

  const changeView = (text) => {
    setChild(text);
  };

  {/*
  <BarChart 
    urls={adjustedData}/>
  <BubbleChart
    urls={urls}/> */}

  return (
    <Layout
      projectTitle={ project ? project.title : null}
      topComponents={{
        left: leftComponent,
        right: rightComponent
      }}
    >
      <Overview urls={urls ? urls : null } project={project ? project : null} />
    </Layout>
  );
};

export default withRouter(Project);