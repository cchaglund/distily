/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../../components/Layout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import SearchResults from '../SearchResults';
import Overview from './Overview';
import History from './History';
import Charts from './Charts';
import Spinner from '../../../components/Spinner';
import styled from '@emotion/styled';
import exportProject from '../../../helpers/exportProject';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Project = ({ currentProject, location}) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();
  const [ createdDate, setCreatedDate ] = useState();
  const [ lastOpenedDate, setLastOpenedDate ] = useState();
  const [ timesOpened, setTimesOpened ] = useState();
  const [ panelType, setPanelType ] = useState('overview');
  const [ panel, setPanel ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();

  useEffect(() => {
    const currProject = currentProject || location.state.params.data;
    setProject(currProject);

    browser.runtime.sendMessage({
      type: 'getAllProjectUrls',
      data: currProject.id
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'projectUrls':
          setUrls(message.data);
          break;
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

    setCreatedDate(new Date(currProject.created).toLocaleDateString());
    setLastOpenedDate(new Date(currProject.lastOpened).toLocaleDateString());
    setTimesOpened(currProject.timesOpened);

    return () => {
      console.log('removing listener');
      browser.runtime.onMessage.removeListener( handleMessages );
    };
  }, []);

  const Div = styled.div`
    margin-top: 0.5rem;
    display: flex;
    > * {
      margin-right: 0.7rem;
    }
  `;

  const Span = styled.span`
    color: #9F9F9F;
    font-size: 0.7rem;
  `;

  const Header = styled.div`
    display: flex;
  `;

  const Export = styled.h6`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    color: lightgray;
    cursor: pointer;
    &:hover {
      color: black;
    }
  `;

  const handleSearch = (term) => {
    setSearching(true);
    setSearchTerm(term);
  };

  const closeSearch = () => {
    setSearching(false);
    setSearchTerm(null);
  };

  const leftComponent = (
    <div>
      <Header>
        <h3>{ project ? project.title : null }</h3>
        <Export onClick={ () => exportProject({ project: project, urls: urls }, project.title)}>Export</Export>
      </Header>
      <Div>
        <Span>URLs visited: { urls ? urls.length : '-' }</Span>
        <Span>Times opened: { timesOpened }</Span>
        <Span>Created: { createdDate }</Span>
        <Span>Last Opened: { lastOpenedDate }</Span>
      </Div>
      <Div>
        <Button
          btnClass={'nav'}
          text={'Overview'}
          inactive={ panelType === 'overview' ? true : false }
          clicked={() => changeView('overview')} />
        <Button
          btnClass={'nav'}
          text={'History'} 
          inactive={ panelType === 'history' ? true : false }
          clicked={() => changeView('history')}/>
        <Button
          btnClass={'nav'}
          text={'Charts'} 
          inactive={ panelType === 'charts' ? true : false }
          clicked={() => changeView('charts')}/>
      </Div>
    </div>
  );

  const rightComponent = (
    <TextInput
      text={'Search for URL'}
      type={'search'}
      size={'regular'}
      clicked={ (term) => handleSearch(term) }/>
  );

  const changeView = (panelType) => {
    switch(panelType) {
      case 'overview':
        setPanelType('overview');
        setPanel(<Overview urls={urls ? urls : null } project={project ? project : null} />);
        break;
      case 'history':
        setPanelType('history');
        setPanel(<History urls={urls ? urls : null } project={project ? project : null} />);
        break;
      case 'charts':
        setPanelType('charts');
        setPanel(<Charts urls={urls ? urls : null } project={project ? project : null} />);
        break;
    }
  };

  {/*
  <BarChart 
    urls={adjustedData}/>
  <BubbleChart
    urls={urls}/> */}

  return (
    <div>
      { project ?
        <Layout
          projectTitle={ project ? project.title : null}
          topComponents={{
            left: leftComponent,
            right: rightComponent
          }}
        >
          { searching ? 
            <SearchResults 
              list={ urls ? urls : null }
              term={ searchTerm } 
              resultsType={'url'}
              close={() => closeSearch()}/> 
            : panel ? panel : <Overview urls={urls ? urls : null } project={project ? project : null} />
          }
        </Layout>
        :
        <Spinner />
      }
    </div>
  );
};

export default withRouter(Project);