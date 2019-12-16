/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const UrlButton = ({ data, proportion, theme, type, deletable }) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();
  const [ deleting, setDeleting ] = useState(false);
  const [ deleted, setDeleted ] = useState(false);

  useEffect(() => {
    setTitle(data.title);
    setHost(data.host);

    if (data.title.length > 50) {
      setTitle(data.title.substring(0,49) + '...');
    }

    if (data.host.includes('www.')) {
      setHost(data.host.replace('www.', ''));
    }

  }, []);

  const Color = require('color');
  let color = proportion ? '#A0CFF7' : '#F2F9FF';
  color = proportion ? Color(color).fade(1-proportion).string() : color;
  let hoverColor = Color('#A0CFF7').darken(0.05).hsl().string();

  const Wrapper = styled.div`
    display: flex;
    width: auto;
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
    &:hover {
      background-color: ${ hoverColor };
    }
  `;

  const Div = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const PrimaryText = styled.span`
    font-weight: bold;
    font-size: 0.7rem;
  `;

  const SecondaryText = styled.span`
    font-size: 0.7rem;
  `;

  const Delete = styled.div`
    padding: 0.2rem 0.5rem;
    background-color: #edb1b6;
    border-radius: 0 0.1rem 0.1rem 0;
    font-size: 0.7rem;
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
    background-color: lightgreen;
    width: 100%;
    text-align: center;
    padding: 0.2rem 0.5rem;
    font-size: inherit;
  `;

  const Confirm = styled.div`
    background-color: #edb1b6;
    width: 100%;
    text-align: center;
    padding: 0.2rem 0.5rem;
    font-size: inherit;
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

  const beginDelete = () => {
    setDeleting(true);
  };

  const deleteItem = () => {
    browser.runtime.sendMessage({
      type: 'deleteUrl',
      data: data.id
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
            delete
        </Delete>
      );
    }

    if ( deleting ) {
      deleteUI = (
        <Deleting>
          <Confirm
            onClick={ () => deleteItem() }>
            Delete
          </Confirm>
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
              css={ css`${ theme.WideButton }` }
              onClick={ () => openUrl(data) }>
              <Div>
                <PrimaryText>{ type === 'host' ? host : title }</PrimaryText>
                { deleting ? null : <SecondaryText>{ type === 'host' ? title : host }</SecondaryText> }
              </Div>
            </div>
            { deleteOption() }
          </UrlButtonContainer>
        </Wrapper>
      }
    </div>
  );
};

export default withTheme(UrlButton);