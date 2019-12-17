/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const BlacklistButton = ({ text, clicked, theme }) => {
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

export default withTheme(BlacklistButton);