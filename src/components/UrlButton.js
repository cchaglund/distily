/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import DeleteModal from '../components/DeleteModal';
import { withTheme } from 'emotion-theming';
import { MdClose } from 'react-icons/md';
import cleanHost from '../helpers/cleanHost';

const UrlButton = ({ data, proportion, theme, deletable }) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();
  const [ deleting, setDeleting ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);

  useEffect(() => {
    let cleanHostName = cleanHost(data.host);
    
    setHost(cleanHostName);
    setTitle(data.title);
  }, []);

  const Color = require('color');
  let color = proportion ? Color(theme.colors.blue.color).fade(1-proportion).string() : theme.colors.blue.color;
  // let hoverColor = theme.colors.blue.hover;

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
    transition: transform 0.1s;
    &:hover {
      transform: scale(1.02);
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
    display: flex;
    align-items: center;
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
              css={ css`${ theme.WideButton } width:100%; display: flex; padding-left: 0.6rem` }
              onClick={ () => openUrl(data) }>
              <div>
                <img css={ css`padding-right: 0.5rem;` } src={ 'https://www.google.com/s2/favicons?domain=' + data.host } ></img>
              </div>
              <div>
                <PrimaryText>{ title }</PrimaryText>
                <SecondaryText>{ host }</SecondaryText>
              </div>
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