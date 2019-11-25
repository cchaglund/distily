/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import './Popup.css';
import Ctrl from '../background/controller';

const Controller = new Ctrl(browser);

const CreateProject = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${ props => props.active ? 'lightblue' : 'red' }
`;

const Popup = () => {
  const [ projectTitle, setProjectTitle ] = useState('');
  const [ projects, setProjects ] = useState();
  const [ enteredProjectTitle, setEnteredProjectTitle ] = useState();

  useEffect( () => {

    Controller.getAllProjects()
      .then(res => {
        setProjects(res);

        browser.windows.getCurrent()
          .then(windowInfo => {
            res.forEach( project => {
              if (project.activeWindow === windowInfo.id) {
                setProjectTitle(project.title);
              }
            });
          });
      });
  }, []);

  const createHandler = () => {
    if ( enteredProjectTitle ) {
      Controller.createNewProject(enteredProjectTitle);
    } else {
      console.log('Enter title!');
    }
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage();
    window.close();
  };

  const openProject = (id) => {
    Controller.openProject(id);
  };

  const projectList = projects ? Object.keys(projects).map( proj => {
    return (
      <li 
        key={projects[proj].id}
        onClick={ () => openProject(projects[proj].id)}>
        {projects[proj].title}
      </li>
    );
  }) : null;

  return (
    <div className="popup">
      <div>
        Create new project
      </div>
      <CreateProject>
        <input 
          type="text" 
          value={ enteredProjectTitle ? enteredProjectTitle : '' } 
          onChange={ (e) => setEnteredProjectTitle(e.target.value) } />
        <Button
          active={ enteredProjectTitle }
          onClick={createHandler}>
            Create
        </Button>
      </CreateProject>
      { projectTitle }
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
