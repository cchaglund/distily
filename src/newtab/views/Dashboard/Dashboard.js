/* eslint-disable no-undef */
/** @jsx jsx */

import { useState, useEffect } from 'react';
import { withTheme } from 'emotion-theming';
import { css, jsx } from '@emotion/core';
import TextInput from '../../../components/TextInput';
import Layout from '../../../components/Layout';
import Summary from './Summary';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import SearchResults from '../SearchResults';
import {
  withRouter,
} from 'react-router-dom';

const Dashboard = () => {
  const [ projects, setProjects ] = useState();
  const [ topUrls, setTopUrls ] = useState();
  const [ error, setError ] = useState();
  const [ optionData, setOptionData ] = useState();
  const [ searching, setSearching ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState();
  const [ currentProject, setCurrentProject ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getCurrentProject'
    });

    browser.runtime.sendMessage({
      type: 'getAllProjects'
    });

    browser.runtime.sendMessage({
      type: 'getAllUrls'
    });

    browser.runtime.sendMessage({
      type: 'getTopUrls'
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'allProjects':
          setProjects(message.data);
          break;
        case 'topUrls':
          setTopUrls(message.data);
          break;
        case 'currentProject':
          setCurrentProject(message.data);
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
    // TODO: use controller's uniqueProjectTitleCheck instead
    const titleExists = projects ? projects.filter( project => {
      return project.title === title;
    }) : null;

    if (titleExists && titleExists.length !== 0) {
      setError(`Project '${title}' already exists`);
      return;
    }

    browser.windows.getCurrent({ populate: true})
      .then( window => {
        if (currentProject && currentProject.activeWindow === window.id) {
          // open new project in new window
          browser.runtime.sendMessage({
            type: 'createProject',
            data: title
          });
        } else {
          // window has tabs and is not project, so give user option how to create new proj
          const tabs = window.tabs.map( tab => {
            return {
              url: tab.url,
              title: tab.title,
              id: tab.id
            };
          });
          setOptionData({
            windowID: window.id,
            projectTitle: title,
            tabs: tabs
          });
        }
      });
  };

  const Option = (
    <div>
      <p css={ css` margin-top: 0; font-size: 0.7rem;` }>
        This window is not a project but has open tabs.
      </p>
      <p css={ css` margin-top: 0; font-size: 0.7rem; font-weight: bold;` }>
        Create project with current window's tabs, or in a new window?
      </p>
      <div css={ css` display: flex; ` }>
        <div css={ css` padding-right: 0.5rem` }>
          <Button 
            btnClass={'action'}
            text={'With tabs'}
            size={'regular'}
            clicked={() => {
              browser.runtime.sendMessage({
                type: 'createProjectFromWindow',
                data: optionData
              });
              setOptionData();
            }} />
        </div>
        <Button 
          btnClass={'action'}
          text={'New window'}
          size={'regular'}
          clicked={() => {
            browser.runtime.sendMessage({
              type: 'createProject',
              data: optionData.projectTitle
            });
            setOptionData();
          }} />
      </div>
    </div>
  );

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
      { projects && topUrls ?
        <Layout
          topComponents={{
            left: <div>
              <TextInput
                text={'Create new project'}
                type={'action'}
                size={'regular'}
                clicked={ (newTitle) => createHandler(newTitle) } 
                error={ error ? error : null}
                option={ optionData ? Option : null } />
            </div>,
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
              topUrls={ topUrls ? topUrls : null }/> 
          }
        </Layout>
        :
        <Spinner />
      }
      
    </div>
  );
};

export default withTheme(withRouter(Dashboard));