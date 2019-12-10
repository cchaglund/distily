/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import { withTheme } from 'emotion-theming';
import TextInput from '../../../components/TextInput';
import Layout from '../../../components/Layout';
import Summary from './Summary';
import SearchResults from './SearchResults';
import {
  withRouter,
} from 'react-router-dom';

const Dashboard = () => {
  const [ projects, setProjects ] = useState();
  const [ urls, setUrls ] = useState();
  const [ error, setError ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();

  useEffect(() => {
    // browser.runtime.sendMessage({
    //   type: 'getCurrentProject'
    // });

    browser.runtime.sendMessage({
      type: 'getAllProjects'
    });

    browser.runtime.sendMessage({
      type: 'getAllUrls'
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'allProjects':
          setProjects(message.data);
          break;
        case 'allUrls':
          setUrls(message.data);
          break;
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

    return () => {
      console.log('removing listener');
      browser.runtime.onMessage.removeListener( handleMessages );
    };

    // currentProject ?
    //   history.push({
    //     pathname: '/project',
    //     state: {
    //       params: {
    //         data: message.data
    //       }
    //     }
    //   }) : null ;
  }, []);

  const createHandler = (title) => {
    const titleExists = projects ? projects.filter( project => {
      return project.title === title;
    }) : null;

    if (titleExists.length !== 0) {
      setError(`Project '${title}' already exists`);
      return;
    }

    browser.runtime.sendMessage({
      type: 'createProject',
      data: title
    });
  };

  const handleSearch = (term) => {
    setSearching(true);
    setSearchTerm(term);
  };

  const closeSearch = () => {
    setSearching(false);
    setSearchTerm(null);
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
            clicked={ (term) => handleSearch(term) } />
        }}
      >
        { searching ? 
          <SearchResults 
            list={ projects ? projects : null }
            term={ searchTerm } 
            close={() => closeSearch()}/> 
          : <Summary 
            projects={projects ? projects : null}
            urls={urls ? urls : null}/> 
        }
      </Layout>
    </div>
  );
};

export default withTheme(withRouter(Dashboard));