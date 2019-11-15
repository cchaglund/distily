/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import '@polymer/paper-button/paper-button.js';

import './Options.css';

const Options = () => {
  const [ projects, setProjects ] = useState();

  useEffect( () => {
    browser.runtime.sendMessage({ 
      type: 'optionsOpened' 
    });

    browser.runtime.onMessage.addListener( message => {
      if (message.type === 'projectsData') {
        setProjects(message.data);
      }
    });
  }, []);

  const projectList = projects ? Object.keys(projects).map( projTitle => {
    return <li key={projTitle}>{projTitle}</li>;
  }) : null;

  // projects ? console.log(Object.keys(projects)) : null;

  return (
    <div className="App-header">
      Projects
      <ul>
        { projects ? projectList : null }
      </ul>
    </div>
  );
};

export default Options;
