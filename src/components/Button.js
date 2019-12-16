/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
// import React from 'react';
import styled from '@emotion/styled';
import Url from './Url';
import Ctrl from '../background/controller';

const Controller = new Ctrl(browser);

const Button = ({size, text, type, clicked, data, active, proportion}) => {
  const Color = require('color');
  
  let color;
  let hoverColor;

  switch (type) {
    case 'nav':
      color = '#F6EFFF';
      hoverColor = Color(color).darken(0.05).hsl().string();
      break;
    case 'action':
      color = '#D1FFDB';
      hoverColor = Color(color).darken(0.05).hsl().string();
      break;
    case 'search':
      color = '#FDFFD1';
      hoverColor = Color(color).darken(0.05).hsl().string();
      break;
    case 'url':
      color = proportion ? '#A0CFF7' : '#F2F9FF';
      hoverColor = Color('#A0CFF7').darken(0.05).hsl().string();
      break;
    case 'project':
      color = proportion ? '#fcca92' : '#FDEBD6';
      hoverColor = Color('#fcca92').darken(0.05).hsl().string();
      break;
    case 'blacklisted':
      color = '#485050';
      hoverColor = Color(color).lighten(0.2).hsl().string();
      break;
    case 'neutral':
      color = '#e5edeb';
      hoverColor = Color(color).darken(0.05).hsl().string();
      break;
  }

  if ( proportion ) {
    color = Color(color).fade(1-proportion).string();
  }

  const ButtonContainer = styled.div`
    display: flex;
    background-color: ${ active ? 'white' : color};
    ${ type === 'blacklisted' ? 'color: white;' : null }
    width: ${ size === 'wide' ? 'auto' : 'max-content'};
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    &:hover {
      background-color: ${active ? 'white' : hoverColor};
    }
  `;

  const buttonStyle = css`
    padding: ${ size === 'wide' ? '0.2rem 1rem' : '0.4rem 1rem'};
    text-align: start;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `;

  const ButtonText = styled.h6`
    margin: 0;
  `;

  const TitleText = styled.span`
    margin: 0;
    font-size: 0.7rem;
    font-weight: bold;
  `;

  const Delete = styled.div`
    padding: 0 1rem;
    &:hover {
      background-color: #d29095;
    }
  `;

  const BtnText = type === 'search' || type === 'action'  || type === 'nav' ? ButtonText : TitleText;

  const openUrl = data => {
    Controller.openUrl(data);
  };

  const deleteItem = () => {
    console.log('trying to del', data);
  };

  return (
    <ButtonContainer>
      <div
        css={ buttonStyle }
        onClick={() => type === 'url' ? openUrl(data) : clicked() }>
        { type === 'url' ? <Url data={data}/> : <BtnText>{ text }</BtnText> }
      </div>
      {
        type === 'url' || type === 'project' ?
          <Delete
            onClick={() => deleteItem()}>
              x
          </Delete> : null
      }
    </ButtonContainer>
  );
};

export default Button;