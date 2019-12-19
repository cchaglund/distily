/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Button = ({ text, btnClass, clicked, active, theme, wide }) => {  
  let colorName;

  switch (btnClass) {
    case 'nav':
      colorName = 'purple';
      break;
    case 'action':
      colorName = 'green';
      break;
    case 'search':
      colorName = 'yellow';
      break;
  }

  const ButtonContainer = styled.div`
    display: flex;
    background-color: ${ active ? 'white' : theme.colors[colorName].color };
    width: ${ wide ? 'auto' : 'max-content' };
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    &:hover {
      background-color: ${active ? 'white' : theme.colors[colorName].hover };
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