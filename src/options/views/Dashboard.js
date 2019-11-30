/* eslint-disable no-undef */

import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import ProjectsList from '../../components/ProjectsList';
import UrlsList from '../../components/UrlsList';
import {
  withRouter
} from 'react-router-dom';
import Ctrl from '../../background/controller';

const Controller = new Ctrl(browser);

const Dashboard = (props) => {
  const [ error, setError ] = useState();
  
  const openProject = projIndex => {
    // indexedDB starts at 1, so to get the project by index I take id - 1
    let project = props.projects[projIndex - 1];

    props.history.push({
      pathname: '/project',
      state: {
        params: {
          data: project
        }
      }
    });
  };

  const resumeProject = projIndex => {
    // let project = props.projects[projIndex - 1];
    Controller.resumeProject(projIndex);
  };

  const createHandler = (title) => {
    const titleExists = props.projects.filter( project => {
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

  const search = (term) => {
    console.log('searching for ', term);
  };

  return (
    <div>
      { error ? error : null}
      <Layout
        topComponents={{
          left: <TextInput
            text={'Create new project'}
            type={'action'}
            size={'regular'}
            clicked={ (newTitle) => createHandler(newTitle) } />,
          right: <TextInput
            text={'Search project'}
            type={'search'}
            size={'regular'}
            clicked={ (term) => search(term) } />
        }}
        columnsData={[
          <div>
            <h5>Jump back in</h5>
            <h6>Recent projects</h6>
            { props.projects ? <ProjectsList 
              projects={props.projects} 
              clicked={(projIndex) => resumeProject(projIndex)} /> : null }
          </div>,
          <div>
            <h5>Top URLS</h5>
            { props.urls ? <UrlsList 
              urls={props.urls}
              type={'top'}
              clicked={(projIndex) => openProject(projIndex)} /> : null }
          </div>,
          <div>
            <h5>Inspect</h5>
            <h6>Recent projects</h6>
            { props.projects ? <ProjectsList 
              projects={props.projects} 
              clicked={(projIndex) => openProject(projIndex)} /> : null }
          </div>
        ]} />
    </div>
  );
};

export default withRouter(Dashboard);