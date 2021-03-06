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
import styled from '@emotion/styled';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Project = (props) => {
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
    const currProject = props.currentProject || props.location.state.params.data;
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
        // TODO: wtf do I need to get all urls then filter to get projecturls?
        // case 'allUrls': {
        //   const projUrls = message.data.filter( url => {
        //     return url.project === project.id;
        //   });
        //   setUrls(projUrls);
        // }
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
          active={ panelType === 'overview' ? true : false }
          clicked={() => changeView('overview')} />
        <Button
          type={'nav'}
          size={'regular'}
          text={'History'} 
          active={ panelType === 'history' ? true : false }
          clicked={() => changeView('history')}/>
        <Button
          type={'nav'}
          size={'regular'}
          text={'Charts'} 
          active={ panelType === 'charts' ? true : false }
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



  // const overview = <Overview urls={urls ? urls : null } project={project ? project : null} />;
  // const history = <History urls={urls ? urls : null } project={project ? project : null} />;
  // const charts = <Charts urls={urls ? urls : null } project={project ? project : null} />;

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
      { searching ? 
        <SearchResults 
          list={ urls ? urls : null }
          term={ searchTerm } 
          resultsType={'url'}
          close={() => closeSearch()}/> 
        : panel ? panel : <Overview urls={urls ? urls : null } project={project ? project : null} />
      }
      {/* { panel ? panel : <Overview urls={urls ? urls : null } project={project ? project : null} />} */}
    </Layout>
  );
};

export default withRouter(Project);