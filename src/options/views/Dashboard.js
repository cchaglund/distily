/* eslint-disable no-undef */

import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import ProjectsList from '../../components/ProjectsList';
import UrlsList from '../../components/UrlsList';
import Button from '../../components/Button';
import {
  withRouter,
} from 'react-router-dom';

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
    browser.runtime.sendMessage({
      type: 'resumeProject',
      data: projIndex
    });
  };

  const createHandler = (title) => {
    const titleExists = props.projects.filter( project => {
      return project.title === title;
    });

    if (titleExists.length !== 0) {
      setError(`Project '${title}' already exists`);
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

  const showMore = () => {
    console.log('showing more');
  };  

  return (
    <div>
      <Layout
        topComponents={{
          left: <TextInput
            text={'Create new project'}
            type={'action'}
            size={'regular'}
            clicked={ (newTitle) => createHandler(newTitle) } 
            error={ error ? error : null}/>,
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
            <Button 
              type={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore()} />
          </div>,
          <div>
            <h5>Top URLS</h5>
            <h6>All time</h6>
            { props.urls ? <UrlsList 
              urls={props.urls}
              type={'top'}
              clicked={(projIndex) => openProject(projIndex)} /> : null }
            <Button 
              type={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore()} />
          </div>,
          <div>
            <h5>Inspect</h5>
            <h6>Recent projects</h6>
            { props.projects ? <ProjectsList 
              projects={props.projects} 
              clicked={(projIndex) => openProject(projIndex)} /> : null }
            <Button 
              type={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore()} />
          </div>
        ]} />
    </div>
  );
};

export default withRouter(Dashboard);