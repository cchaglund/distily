/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const ProjectButton = ({ text, clicked, proportion, type, theme }) => {
  const Color = require('color');
  let color = proportion ? Color('#fcca92').fade(1-proportion).string() : '#FDEBD6';

  if ( type === 'neutral') {
    color = '#e5edeb';
  }

  let hoverColor = Color(color).darken(0.05).hsl().string();

  const ProjectButtonContainer = styled.div`
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

  const Text = styled.span`
    margin: 0;
    font-size: 0.7rem;
    font-weight: bold;
  `;

  return (
    <ProjectButtonContainer>
      <div
        css={ css`${ theme.WideButton }` }
        onClick={() => clicked() }>
        <Text>{ text }</Text>
      </div>
    </ProjectButtonContainer>
  );
};

export default withTheme(ProjectButton);