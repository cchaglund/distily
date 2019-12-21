/* eslint-disable no-undef */
/** @jsx jsx */

import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { MdClose } from 'react-icons/md';
import DeleteModal from './DeleteModal';

const BlacklistButton = ({ blacklistTerm, clicked, theme }) => {
  const [ deleting, setDeleting ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);

  const BlacklistButtonContainer = styled.div`
    display: flex;
    background-color: ${ theme.colors.black.color };
    color: white;
    width: auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    &:hover {
      background-color: ${ theme.colors.black.hover };
    }
  `;

  const buttonStyle = css`
    padding: 0.2rem 1rem;
    text-align: start;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `;

  const Text = styled.span`
    margin: 0;
    font-size: 0.7rem;
    font-weight: bold;
  `;

  const DeleteCross = styled.div`
    display: flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    background-color: #edb1b6;
    border-radius: 0 0.1rem 0.1rem 0;
    font-size: 1rem;
    color: black;
    &:hover {
      background-color: #ed9ea5;
    }
  `;

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
        <BlacklistButtonContainer>
          <div
            css={ buttonStyle }
            onClick={() => clicked() }>
            <Text>{ blacklistTerm.term }</Text>
          </div>
          <DeleteCross onClick={ () => setDeleting(true) }>
            <MdClose />
          </DeleteCross>
          { deleting ? 
            <DeleteModal
              type={ 'blacklist'}
              id={ blacklistTerm.id }
              title={ blacklistTerm.term }
              confirmClick={ () => deleteConfirmed() }
              cancelClick={ () => cancelDeletion() } /> 
            : null }
        </BlacklistButtonContainer>
      }
    </div>
  );
};

export default withTheme(BlacklistButton);