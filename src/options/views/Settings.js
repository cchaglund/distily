/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { withTheme } from 'emotion-theming';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import {
  withRouter,
} from 'react-router-dom';

const Settings = (props) => {
  const [ settings, setSettings ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getAllSettings'
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'allSettings': {
          setSettings(message.data);
          break;
        }
      }
    });
  }, []);

  const addToBlacklist = (term) => {
    console.log('trying to add!', term);
  };

  return (
    <Layout
      topComponents={{
        left: <div>
          <h5>Always open last session</h5>
          <h5>Some other option</h5>
          <h5>Change some setting</h5>
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
          { settings ? settings.map(setting => <h5>{setting.title}</h5>) : null }
        </div>
      }}
    >
    </Layout>
  );
};

export default withTheme(withRouter(Settings));