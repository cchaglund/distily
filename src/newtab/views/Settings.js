/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { withTheme } from 'emotion-theming';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import BlacklistButton from '../../components/BlacklistButton';
import {
  withRouter,
} from 'react-router-dom';

const Settings = () => {
  const [ blacklist, setBlacklist ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getAllBlacklistTerms'
    });

    const handleMessages = message => {
      switch (message.type) {
        case 'allBlacklistTerms': {
          setBlacklist(message.data);
          break;
        }
      }
    };

    browser.runtime.onMessage.addListener( handleMessages );

    return () => {
      console.log('removing listener');
      browser.runtime.onMessage.removeListener( handleMessages );
    };
  }, []);

  const addToBlacklist = (term) => {
    browser.runtime.sendMessage({
      type: 'addToBlacklist',
      data: term
    });
  };

  const blacklistList = blacklist ? 
    blacklist.map( (item, index) => {
      return <BlacklistButton
        key={index}
        text={item.term}
        // clicked={() => clicked(input)} 
      />;
    })
    : null;

  return (
    <Layout
      topComponents={{
        left: null,
        right: <div>
          <h4>Blacklist</h4>
          <TextInput
            text={'Add to blacklist'}
            type={'action'}
            size={'regular'}
            placeholder={'e.g. gmail.com'}
            clicked={ (term) => addToBlacklist(term) } />
          <h6>Domains here won't be tracked</h6>
          { blacklistList }
        </div>
      }}
    >
    </Layout>
  );
};

export default withTheme(withRouter(Settings));