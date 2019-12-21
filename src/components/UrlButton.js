/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import deleteHelper from '../helpers/delete';
import { withTheme } from 'emotion-theming';
import { MdClose } from 'react-icons/md';

const UrlButton = ({ data, proportion, theme, type, deletable }) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();
  const [ deleting, setDeleting ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);

  useEffect(() => {
    setTitle(data.title);
    setHost(data.host);

    // if (data.title.length > 50) {
    //   setTitle(data.title.substring(0,49) + '...');
    // }

    // if (data.host.includes('www.')) {
    //   setHost(data.host.replace('www.', ''));
    // }

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
  `;

  const Delete = styled.div`
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

  const Deleting = styled.div`
    display: flex;
    width: 60%;
    border-radius: 0 0.1rem 0.1rem 0;
    font-size: 0.7rem;
  `;

  const Cancel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ theme.colors.green.color };
    width: 100%;
    text-align: center;
    padding: 0.2rem 0.5rem;
    font-size: inherit;
    &:hover {
      background-color: ${ theme.colors.green.hover };
    }
  `;

  const Confirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ theme.colors.red.color };
    width: 100%;
    text-align: center;
    padding: 0.2rem 0.5rem;
    font-size: inherit;
    &:hover {
      background-color: ${ theme.colors.red.hover };
    }
  `;

  const openUrl = data => {
    browser.runtime.sendMessage({
      type: 'openUrl',
      data: data
    });
  };

  const beginDelete = () => {
    setDeleting(true);
  };

  const deleteItem = () => {
    deleteHelper({
      type: 'url',
      id: data.id
    });
    setDeleted(true);
  };

  const cancelDeletion = () => {
    setDeleting(false);
  };

  const deleteOption = () => {
    let deleteUI;

    if ( deletable ) {
      deleteUI = (
        <Delete
          onClick={ () => beginDelete() }>
          <MdClose />
        </Delete>
      );
    }

    if ( deleting ) {
      deleteUI = (
        <Deleting>
          <Confirm
            onClick={ () => deleteItem() }>
            Delete</Confirm>
          <Cancel
            onClick={ () => cancelDeletion() }>
            Cancel</Cancel>
        </Deleting>
      );
    }

    return deleteUI;
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
            { deleteOption() }
          </UrlButtonContainer>
        </Wrapper>
      }
    </div>
  );
};

export default withTheme(UrlButton);