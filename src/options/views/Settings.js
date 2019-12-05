/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { withTheme } from 'emotion-theming';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import {
  withRouter,
} from 'react-router-dom';

const Settings = () => {
  const [ settings, setSettings ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getAllSettings'
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'allSettings': {
          let data = message.data[0]; 
          console.log(delete data.id);
          setSettings(data);
          break;
        }
      }
    });
  }, []);

  const addToBlacklist = (domain) => {
    console.log('trying to add!', domain);

    browser.runtime.sendMessage({
      type: 'addToBlacklist',
      data: domain
    });
    // settings.forEach( setting => {
    //   if (setting.id === 1) {

    //   }
    // });
  };

  const settingsDisplay = () => {
    return (
      settings ? Object.keys(settings).map(settingName => {
        const setting = settings[settingName];

        return <div key={ setting }>
          <h5>{ setting ? setting.title : 'Loading...' }</h5>
          <h6>{ setting.entries ? 
            <ul>
              { 
                Object.keys(setting.entries).map( (entry, index) => {
                  return <li key={index}>
                    {entry}
                  </li>;
                }) 
              }
            </ul> 
            : 'Loading...' }
          </h6>
        </div>;
      }) : null
    );
  };

  const blacklist = settings ? 
    Object.keys(settings.blacklist.entries).map( (entry, index) => {
      return <Button
        key={index}
        type={'blacklisted'}
        text={entry}
        size={'wide'}
        // clicked={() => clicked(input)} 
      />;
    })
    : null;

  return (
    <Layout
      topComponents={{
        left: <div>
          { settingsDisplay() }
        </div>,
        right: <div>
          <h4>Blacklist</h4>
          <h6>Domains here won't be tracked</h6>
          <TextInput
            text={'Add to blacklist'}
            type={'action'}
            size={'regular'}
            placeholder={'e.g. gmail.com'}
            clicked={ (term) => addToBlacklist(term) } />
          {/* <h5>{ setting ? setting.blacklist.title : 'Loading...'}</h5> */}
          { blacklist }
        </div>
      }}
    >
    </Layout>
  );
};

export default withTheme(withRouter(Settings));