/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

const Button = ({ text, type, clicked, active }) => {
  const Color = require('color');
  
  let color;
  let hoverColor;

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
  }

  hoverColor = Color(color).darken(0.05).hsl().string();

  const ButtonContainer = styled.div`
    display: flex;
    background-color: ${ active ? 'white' : color};
    width: max-content;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    &:hover {
      background-color: ${active ? 'white' : hoverColor};
    }
  `;

  const buttonStyle = css`
    padding: 0.4rem 1rem;
    text-align: start;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `;

  const Text = styled.h6`
    margin: 0;
  `;

  return (
    <ButtonContainer>
      <div
        css={ buttonStyle }
        onClick={() => clicked() }>
        <Text>{ text }</Text>
      </div>
    </ButtonContainer>
  );
};

export default Button;