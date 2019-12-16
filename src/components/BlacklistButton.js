/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

const BlacklistButton = ({ text, clicked }) => {
  const Color = require('color');
  let color = '#485050';
  let hoverColor = Color(color).lighten(0.2).hsl().string();

  const BlacklistButtonContainer = styled.div`
    display: flex;
    background-color: ${ color };
    color: white;
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

  const Text = styled.span`
    margin: 0;
    font-size: 0.7rem;
    font-weight: bold;
  `;

  return (
    <BlacklistButtonContainer>
      <div
        css={ buttonStyle }
        onClick={() => clicked() }>
        <Text>{ text }</Text>
      </div>
    </BlacklistButtonContainer>
  );
};

export default BlacklistButton;