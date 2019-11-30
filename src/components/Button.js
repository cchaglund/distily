/* eslint-disable no-undef */

import React from 'react';
import styled from '@emotion/styled';
import Url from './Url';
import Ctrl from '../background/controller';

const Controller = new Ctrl(browser);

const Button = ({size, text, type, clicked, data}) => {
  const Color = require('color');

  let color;

  switch (type) {
    case 'nav':
      color = '#F6EFFF';
      break;
    case 'action':
      color = '#D1FFDB';
      break;
    case 'search':
      color = '#FDFFD1';
      break;
    case 'url':
      color = '#F2F9FF';
      break;
    case 'project':
      color = '#FDEBD6';
      break;
  }

  const hoverColor = Color(color).darken(0.05).hsl().string();

  const ButtonContainer = styled.div`
    background-color: ${color};
    width: ${ size === 'wide' ? 'auto' : 'max-content'};
    padding: ${ size === 'wide' ? '0.2rem 1rem' : '0.4rem 1rem'};
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    border: 1px solid ${color};
    cursor: pointer;
    &:hover {
      background-color: ${hoverColor};
    }
  `;

  const ButtonText = styled.h5`
    margin: 0;
  `;

  const openUrl = data => {
    Controller.openUrl(data);
  };

  return (
    <ButtonContainer
      onClick={() => {
        type === 'url' ? openUrl(data) : clicked();
      }}>
      { type === 'url' ? <Url data={data}/>
        : <ButtonText>{ text }</ButtonText> }
    </ButtonContainer>
  );
};

export default Button;