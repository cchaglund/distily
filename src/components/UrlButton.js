/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import DeleteModal from '../components/DeleteModal';
import { withTheme } from 'emotion-theming';
import { MdClose } from 'react-icons/md';

const UrlButton = ({ data, proportion, theme, type, deletable }) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();
  const [ deleting, setDeleting ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);

  useEffect(() => {
    let cleanHostName = data.host;
    
    if (data.host.includes('www.')) {
      cleanHostName = data.host.replace('www.', ''); 
    }

    setHost(cleanHostName);
    setTitle(data.title);
  }, []);

  const Color = require('color');
  let color = proportion ? '#b1d7f8' : theme.colors.blue.color;
  color = proportion ? Color(color).fade(1-proportion).string() : color;
  let hoverColor = theme.colors.blue.hover;

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
  `;

  const UrlButtonContainer = styled.div`
    display: flex;
    background-color: ${ color };
    width: 100%;
    cursor: pointer;
    border-radius: 0.1rem;
    box-shadow: lightgray 0 1px;
    &:hover {
      background-color: ${ hoverColor };
    }
  `;

  const PrimaryText = styled.div`
    font-weight: bold;
    font-size: 0.7rem;
    padding-right: 0.3rem;
  `;

  const SecondaryText = styled.div`
    font-size: 0.7rem;
    padding-top: 0.4rem;
    color: gray;
  `;

  const DeleteCross = styled.div`
    display: flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background-color: #edb1b6;
    border-radius: 0 0.1rem 0.1rem 0;
    font-size: 1rem;
    &:hover {
      background-color: #ed9ea5;
    }
  `;

  const openUrl = data => {
    browser.runtime.sendMessage({
      type: 'openUrl',
      data: data
    });
  };

  const cancelDeletion = () => {
    setDeleting(false);
  };

  const deleteConfirmed = () => {
    setDeleting(false);
    setDeleted(true);
  };

  return (
    <div>
      { deleted ? null :
        <Wrapper>
          <UrlButtonContainer>
            <div
              css={ css`${ theme.WideButton } width:100%` }
              onClick={ () => openUrl(data) }>
              <PrimaryText>{ type === 'host' ? host : title }</PrimaryText>
              <SecondaryText>{ type === 'host' ? title : host }</SecondaryText>
            </div>
            { deletable ?
              <DeleteCross onClick={ () => setDeleting(true) }>
                <MdClose />
              </DeleteCross> : null
            }
          </UrlButtonContainer>
        </Wrapper>
      }
      { deleting ? 
        <DeleteModal
          type={ 'url'}
          id={ data.id }
          title={ data.title }
          cancelClick={ () => cancelDeletion() } 
          confirmClick={ () => deleteConfirmed() } /> 
        : null }
    </div>
  );
};

export default withTheme(UrlButton);