/** @jsx jsx */
/* eslint-disable no-undef */

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import './Popup.css';
import Button from '../components/Button';
import ProjectsList from '../components/ProjectsList';
import TextInput from '../components/TextInput';

const PopupContainer = styled.div`
  width: 250px;
  padding: 2rem;
`;

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectsContainer = styled.div`
  margin-top: 1.5rem;
`;

const Popup = () => {
  const [ currentProject, setCurrentProject ] = useState();
  const [ projects, setProjects ] = useState();
  const [ error, setError ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({
      type: 'getAllProjects'
    });

    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'allProjects':
          setProjects(message.data);
          break;
        case 'currentProject':
          console.log('got curr proj', message.data);
          setCurrentProject(message.data);
          break;
      }
    });

    // Controller.getAllProjects()
    //   .then(res => {
    //     setProjects(res);

    //     browser.windows.getCurrent()
    //       .then(windowInfo => {
    //         res.forEach( project => {
    //           if (project.activeWindow === windowInfo.id) {
    //             setCurrentProject(project);
    //           }
    //         });
    //       });
    //   });
  }, []);

  const createHandler = (title) => {
    const titleExists = projects.filter( project => {
      return project.title === title;
    });

    if (titleExists.length !== 0) {
      setError('Name already exists');
      return;
    }

    browser.runtime.sendMessage({
      type: 'createProject',
      data: title
    });
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  const openProject = (id) => {
    // Controller.openProject(id);
  };

  const resumeProject = projIndex => {
    browser.runtime.sendMessage({
      type: 'resumeProject',
      data: projIndex
    });
  };

  const projectDetails = (
    <div css={
      css`
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
      `
    }>
      <h5 css={css`margin: 0; margin-bottom: 1rem`}>Working on</h5>
      <h4 css={css`padding-left: 1rem; margin: 0; margin-bottom: 0.5rem`}>{currentProject ? currentProject.title : null}</h4>
      <div css={css`padding-left: 1rem`}>
        <Button
          type={'nav'}
          size={'regular'}
          clicked={() => openProject(currentProject ? currentProject.id : null)}
          text={'Overview'} />
      </div>
    </div>
  );

  return (
    <PopupContainer>
      { currentProject ? projectDetails : null }
      <CreateContainer>
        { error }
        <TextInput
          text={'Create'}
          type={'action'}
          size={'regular'}
          clicked={ (newTitle) => createHandler(newTitle) }/>
      </CreateContainer>
      <ProjectsContainer>
        <h6>Open project</h6>
        { projects ? <ProjectsList 
          projects={projects}
          clicked={(projID) => resumeProject(projID)} /> : null }
      </ProjectsContainer>
      <Button
        type={'nav'}
        size={'regular'}
        clicked={() => openOptions()}
        text={'Dashboard'} />
    </PopupContainer>
  );
};


export default Popup;
