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
// import Spinner from '../../../components/Spinner';
import styled from '@emotion/styled';
import exportProject from '../../../helpers/exportProject';
import DeleteModal from '../../../components/DeleteModal';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Project = ({ currProject, location, history}) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();
  const [ currentProject, setCurrentProject ] = useState();
  const [ panelType, setPanelType ] = useState('overview');
  const [ panel, setPanel ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();
  const [ deleting, setDeleting ] = useState(false);

  useEffect(() => {
    const proj = currProject || location.state.params.data;
    setProject(proj);
    setCurrentProject(currProject || null);

    browser.runtime.sendMessage({
      type: 'getAllProjectUrls',
      data: proj.id
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'projectUrls':
          setUrls(message.data);
          break;
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

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

  const Container = styled.div`
    height: 100vh;
  `;

  const Span = styled.span`
    color: #9F9F9F;
    font-size: 0.7rem;
  `;

  const Header = styled.div`
    display: flex;
  `;

  const ProjectSettings = styled.h6`
    display: flex;
    align-items: center;
    padding-left: 1rem;
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

  const cancelDeletion = () => {
    setDeleting(false);
  };

  const deleteConfirmed = () => {
    setDeleting(false);
    history.push({ pathname: '/dashboard' });
  };

  // const leftComponent = (
  //   <div>
  //     <Header>
  //       <h3>{ project ? project.title : null }</h3>
  //       <ProjectSettings 
  //         onClick={ () => exportProject({ project: project, urls: urls }, project.title)}>
  //         Export
  //       </ProjectSettings>
  //       <ProjectSettings
  //         onClick={ () => setDeleting( true) }>
  //         Delete
  //       </ProjectSettings>
  //     </Header>
  //     <Div>
  //       <Span>URLs visited: { urls ? urls.length : '-' }</Span>
  //       <Span>Times opened: { project.timesOpened }</Span>
  //       <Span>Created: { new Date(project.created).toLocaleDateString() }</Span>
  //       <Span>Last Opened: { new Date(project.lastOpened).toLocaleDateString() }</Span>
  //     </Div>
  //     <Div>
  //       <Button
  //         btnClass={'nav'}
  //         text={'Overview'}
  //         inactive={ panelType === 'overview' ? true : false }
  //         clicked={() => changeView('overview')} />
  //       <Button
  //         btnClass={'nav'}
  //         text={'History'} 
  //         inactive={ panelType === 'history' ? true : false }
  //         clicked={() => changeView('history')}/>
  //       <Button
  //         btnClass={'nav'}
  //         text={'Charts'} 
  //         inactive={ panelType === 'charts' ? true : false }
  //         clicked={() => changeView('charts')}/>
  //     </Div>
  //   </div>
  // );

  // const rightComponent = (
  //   <TextInput
  //     text={'Search for URL'}
  //     type={'search'}
  //     size={'regular'}
  //     clicked={ (term) => handleSearch(term) }/>
  // );

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
    <Container>
      <Layout
        projectTitle={ project ? project.title : null}
        currentProject={ currentProject ? currentProject.title : null }
        topComponents={{
          left: <div>
            <Header>
              <h3>{ project ? project.title : null }</h3>
              <ProjectSettings 
                onClick={ () => exportProject({ project: project, urls: urls }, project.title)}>
                Export
              </ProjectSettings>
              <ProjectSettings
                onClick={ () => setDeleting( true) }>
                Delete
              </ProjectSettings>
            </Header>
            <Div>
              <Span>URLs visited: { urls ? urls.length : '-' }</Span>
              <Span>Times opened: { project ? project.timesOpened : null }</Span>
              <Span>Created: { project ? new Date(project.created).toLocaleDateString() : null }</Span>
              <Span>Last Opened: { project ? new Date(project.lastOpened).toLocaleDateString() : null }</Span>
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
          </div>,
          right: <TextInput
            text={'Search for URL'}
            type={'search'}
            size={'regular'}
            clicked={ (term) => handleSearch(term) }/>
        }}
      >
        { searching &&
          <SearchResults 
            list={ urls ? urls : null }
            term={ searchTerm } 
            resultsType={'url'}
            close={() => closeSearch()}/> 
        }
        { panel ? panel : urls && project && <Overview urls={ urls } project={ project } /> }
      </Layout>
      { deleting ? 
        <DeleteModal
          type={ 'project'}
          id={ project.id }
          title={ project.title }
          cancelClick={ () => cancelDeletion() } 
          confirmClick={ () => deleteConfirmed() } /> 
        : null }
    </Container>
  );
};

export default withRouter(Project);