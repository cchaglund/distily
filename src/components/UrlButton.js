/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { useState, useEffect} from 'react';
import styled from '@emotion/styled';

const UrlButton = ({ data, proportion }) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();

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

  const UrlButtonContainer = styled.div`
    display: flex;
    background-color: ${ color };
    width: auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    &:hover {
      background-color: ${ hoverColor };
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

  const Div = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const Title = styled.span`
    font-weight: bold;
    font-size: 0.7rem;
  `;

  const Host = styled.span`
    font-size: 0.7rem;
  `;

  const Delete = styled.div`
    padding: 0 1rem;
    &:hover {
      background-color: #d29095;
    }
  `;

  const openUrl = data => {
    browser.runtime.sendMessage({
      type: 'openUrl',
      data: data
    });
  };

  const deleteItem = () => {
    console.log('trying to del', data);
  };

  return (
    <UrlButtonContainer>
      <div
        css={ buttonStyle }
        onClick={ () => openUrl(data) }>
        <Div>
          <Title>{title}</Title>
          <Host>{host}</Host>
        </Div>
      </div>
      <Delete
        onClick={ () => deleteItem() }>
          x
      </Delete>
    </UrlButtonContainer>
  );
};

export default UrlButton;