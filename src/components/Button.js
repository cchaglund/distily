/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Button = ({ text, type, clicked, active, theme }) => {
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

  const Text = styled.h6`
    margin: 0;
  `;

  return (
    <ButtonContainer>
      <div
        css={ css`${ theme.SmallButton }` }
        onClick={() => clicked() }>
        <Text>{ text }</Text>
      </div>
    </ButtonContainer>
  );
};

export default withTheme(Button);