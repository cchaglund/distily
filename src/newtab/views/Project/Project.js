/* eslint-disable no-undef */
/** @jsx jsx */

import { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../../components/Layout';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import SearchResults from '../SearchResults';
import Overview from './Overview';
import History from './History';
import Charts from './Charts';
import ProjectsList from '../../../components/ProjectsList';
// import Spinner from '../../../components/Spinner';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import exportProject from '../../../helpers/exportProject';
import DeleteModal from '../../../components/DeleteModal';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const Project = ({ currProject, location, history, projects }) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();
  const [ currentProject, setCurrentProject ] = useState();
  const [ panelType, setPanelType ] = useState('overview');
  const [ panel, setPanel ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();
  const [ deleting, setDeleting ] = useState(false);

  useEffect(() => {
    const proj = (location.state && location.state.params.data) || currProject;
    setProject(proj);
    setCurrentProject(currProject || null);

    browser.runtime.sendMessage({
      type: 'getAllProjectUrls',
      data: proj.id
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'projectUrls' + proj.id:
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

  const ProjectSettings = styled.h6`
    margin: 0;
    margin-left: 1rem;
    display: flex;
    align-items: flex-end;
    color: lightgray;
    cursor: pointer;
    &:hover {
      color: black;
    }
  `;

  const StyledTippy = styled(Tippy)`
    background: white;
    color: black;
    box-shadow: lightgray 0 1px;
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
        setPanel(urls && project && <Charts urls={ urls } project={ project } />);
        break;
    }
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

  const renameProjectTitle = (title) => {
    browser.runtime.sendMessage({
      type: 'renameProject',
      data: {
        id: project.id,
        title: title
      }
    });
  };

  return (
    <Container>
      <Layout
        projectTitle={ project ? project.title : null}
        currentProject={ currentProject ? currentProject.title : null }
        topComponents={{
          left: <div>
            <StyledTippy 
              arrow={false}
              interactive={true}
              trigger={'click'}
              placement={'right-start'} 
              content={<div>
                <h6>Rename project</h6>
                <TextInput
                  text={'Rename'}
                  type={'action'}
                  inputType={'rename'}
                  size={'regular'}
                  initialValue={ project && project.title}
                  clicked={ (newTitle) => renameProjectTitle(newTitle)}
                  projects={projects} />
              </div>} >
              <div css={ css`display: flex; align-items: flex-end;` }>
                <h3 css={ css`margin-bottom: 0` }>{ project ? project.title : null }</h3>
                <ProjectSettings
                  onClick={ () => exportProject({ project: project, urls: urls }, project.title)}>
                  Export
                </ProjectSettings>
                <ProjectSettings
                  onClick={ () => setDeleting( true) }>
                  Delete
                </ProjectSettings>
              </div>
            </StyledTippy>
            <Div css={ css`margin-bottom: 1rem;` }>
              <Span>Urls: { urls ? urls.length : '-' }</Span>
              <Span>Created: { project ? new Date(project.created).toLocaleDateString() : null }</Span>
              <Span>Last Opened: { project ? new Date(project.lastOpened).toLocaleDateString() : null }</Span>
            </Div>
            {/* <div css={ css`display: flex; margin-bottom: 1rem; align-items: flex-start;` }>
              <ProjectSettings
                css={ css`margin-right: 1.2rem;` }
                onClick={ () => exportProject({ project: project, urls: urls }, project.title)}>
                Export
              </ProjectSettings>
              <ProjectSettings
                onClick={ () => setDeleting( true) }>
                Delete
              </ProjectSettings>
            </div> */}
            <div>
              { currentProject ? 
                project && project.id !== currentProject.id &&
                <ProjectsList 
                  projects={ [project] }
                  type={'single'}
                  clickAction={'resume'}
                  clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} />
                : <ProjectsList 
                  projects={ [project] }
                  type={'single'}
                  clickAction={'resume'}
                  clicked={(projIndex, openType, tabCount) => resumeProject(projIndex, openType, tabCount)} />
              }
            </div>
          </div>,
          right: <TextInput
            text={'Search for URL'}
            type={'search'}
            size={'regular'}
            clicked={ (term) => handleSearch(term) }/>
        }}
      >
        <div>
          <div css={ css`display: flex; justify-content: center; margin-bottom: -1.5rem;` }>
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
            {/* <Button
              btnClass={'nav'}
              text={'Charts'} 
              inactive={ panelType === 'charts' ? true : false }
              clicked={() => changeView('charts')}/> */}
          </div>
          <hr css={ css`border: 1px solid #efedec; border-radius: 100%;` }></hr>
        </div>
        { searching &&
          <SearchResults 
            list={ urls ? urls : null }
            term={ searchTerm } 
            resultsType={'url'}
            close={() => closeSearch()}/> 
        }
        { panel ? panel : urls && project && !searching && <Overview urls={ urls } project={ project } /> }
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

export default withTheme(withRouter(Project));