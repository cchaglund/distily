/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import { withTheme } from 'emotion-theming';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import Summary from './Summary';
import SearchResults from './SearchResults';
import {
  withRouter,
} from 'react-router-dom';

const Dashboard = (props) => {
  const [ error, setError ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'currentProject':
          props.history.push({
            pathname: '/project',
            state: {
              params: {
                data: message.data
              }
            }
          });
          break;
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

    return () => {
      console.log('removing listener');
      browser.runtime.onMessage.removeListener( handleMessages );
    };
  }, []);

  const createHandler = (title) => {
    const titleExists = props.projects ? props.projects.filter( project => {
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
            list={ props.projects ? props.projects : null }
            term={ searchTerm } 
            close={() => closeSearch()}/> 
          : <Summary 
            projects={props.projects ? props.projects : null}
            urls={props.urls ? props.urls : null}/> 
        }
      </Layout>
    </div>
  );
};

export default withTheme(withRouter(Dashboard));