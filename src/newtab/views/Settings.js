/* eslint-disable no-undef */
/** @jsx jsx */

import { useEffect, useState, createRef } from 'react';
import { css, jsx } from '@emotion/core';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import BlacklistButton from '../../components/BlacklistButton';
import styled from '@emotion/styled';
import importProject from '../../helpers/importProject';
import {
  withRouter,
} from 'react-router-dom';

const Settings = () => {
  const [ blacklist, setBlacklist ] = useState();
  const [ fileName, setFileName ] = useState();

  let fileInput = createRef();

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

  const UploadLabel = styled.label`
    cursor: pointer;
    & input {
      background-color: blue;
    }
  `;

  const Input = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
  `;

  const SuccessMessage = styled.p`
    font-weight: bold;
    font-size: 0.7rem;
    padding: 0 0.3rem;
  `;

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
        blacklistTerm={item}
        // clicked={() => clicked(input)} 
      />;
    })
    : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    var reader = new FileReader();
    setFileName(fileInput.current.files[0].name);
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = (event) => {
      importProject(event.target.result);
    };
    
  };

  return (
    <Layout
      topComponents={{
        left: <div>
          <h4>Import Project</h4>
          <form onSubmit={handleSubmit}>
            <UploadLabel htmlFor='uploadProject' >
              <Input 
                type="file" 
                ref={fileInput} 
                id='uploadProject' 
                onChange={ handleSubmit }/>
              <div css={ css`display: flex; align-items: center;`}>
                <Button
                  btnClass={'action'}
                  text={ fileName ? 'Upload new project' : 'Upload project' }
                  clicked={ () => null }/>
                <SuccessMessage>
                  { fileName ? `${ fileName } was successfully uploaded!` : null }
                </SuccessMessage>
              </div>
            </UploadLabel>
          </form>
        </div>,
        right: <div>
          <h4>Blacklist</h4>
          <TextInput
            text={'Add to blacklist'}
            type={'action'}
            size={'regular'}
            inputType={'search'}
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

export default withRouter(Settings);