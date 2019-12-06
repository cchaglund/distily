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
  const [ blacklist, setBlacklist ] = useState();

  useEffect(() => {
    browser.runtime.sendMessage({
      type: 'getAllBlacklistTerms'
    });

    browser.runtime.onMessage.addListener( message => {
      switch (message.type) {
        case 'allBlacklistTerms': {
          setBlacklist(message.data);
          break;
        }
      }
    });
  }, []);

  const addToBlacklist = (term) => {
    browser.runtime.sendMessage({
      type: 'addToBlacklist',
      data: term
    });
    // settings.forEach( setting => {
    //   if (setting.id === 1) {

    //   }
    // });
  };

  // const settingsDisplay = () => {
  //   return (
  //     blacklist ? blacklist.map(entry => {
  //       console.log('settingDisplay:', entry);
  //       // return <div key={ settingName }>
  //       //   <h5>{ setting ? setting.title : 'Loading...' }</h5>
  //       //   <h6>{ setting.entries ? 
  //       //     <ul>
  //       //       { 
  //       //         Object.keys(setting.entries).map( (entry, index) => {
  //       //           return <li key={index}>
  //       //             {entry}
  //       //           </li>;
  //       //         }) 
  //       //       }
  //       //     </ul> 
  //       //     : 'Loading...' }
  //       //   </h6>
  //       // </div>;
  //     }) : null
  //   );
  // };

  const blacklistList = blacklist ? 
    blacklist.map( (item, index) => {
      return <Button
        key={index}
        type={'blacklisted'}
        text={item.term}
        size={'wide'}
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
          {/* <h5>{ setting ? setting.blacklist.title : 'Loading...'}</h5> */}
          { blacklistList }
        </div>
      }}
    >
    </Layout>
  );
};

export default withTheme(withRouter(Settings));