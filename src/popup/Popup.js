/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import './Popup.css';

const CreateProject = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${ props => props.active ? 'lightblue' : 'red' }
`;

const Popup = () => {
  const [ projectTitle, setProjectTitle ] = useState('');
  const [ activeProjectTitle, setActiveProjectTitle ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({ 
      type: 'popupOpened' 
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'activeProjectTitle':
          logProjectTitle(message.data.title);
          break;
        case 'projectsData':
          setProjects(message.data.projects);
          break;
      }
    });
  }, []);

  const logProjectTitle = (title) => {
    setActiveProjectTitle(title);
  };

  const changeHandler = (val) => {
    setProjectTitle( val );
  };

  const createHandler = () => {
    if (projectTitle.length !== 0 || projectTitle.length === '' ) {
      browser.runtime.sendMessage({ 
        type: 'openNewWindow',
        title: projectTitle 
      });
    } else {
      console.log('enter text first!');
    }
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  const openProject = (projTitle) => {
    browser.runtime.sendMessage({ 
      type: 'openProject',
      title: projTitle 
    });
  };

  const projectList = projects ? Object.keys(projects).map( projTitle => {
    return (
      <li 
        key={projTitle}
        onClick={ () => openProject(projTitle)}>
        {projTitle}
      </li>
    );
  }) : null;

  return (
    <div className="popup">
      <div
        onClick={ () => console.log('create clicked')}>
          Create new project
      </div>
      <CreateProject>
        <input 
          type="text" 
          value={ projectTitle } 
          onChange={ (e) => changeHandler(e.target.value) } />
        <Button
          active={ projectTitle.length !== 0 || projectTitle.length === '' }
          onClick={createHandler}>
            Create
        </Button>
      </CreateProject>
      { activeProjectTitle ? activeProjectTitle : null }
      <a 
        href=''
        onClick={openOptions}>
        Open options
      </a>
      <ul>
        { projectList }
      </ul>
    </div>
  );
};


export default Popup;
