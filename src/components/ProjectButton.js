/* eslint-disable no-undef */
/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const ProjectButton = ({ text, clicked, activeClicked, activeButton, activeText, proportion, type, theme }) => {
  const Color = require('color');
  let color = proportion ? Color(theme.colors.orange.color).fade(1-proportion).string() : theme.colors.orange.color;

  if ( type === 'neutral') {
    color = '#e5edeb';
  }

  if ( type === 'single') {
    color = theme.colors.green.color;
  }

  // let hoverColor = Color(color).darken(0.05).hsl().string();

  const ProjectButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${ activeButton ? theme.colors.green.color : color };
    ${ type === 'single' && 'width: max-content;'}
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    border-radius: 0.1rem;
    box-shadow: lightgray 0 1px;
    transition: transform 0.1s;
    &:hover {
      ${ activeButton ? 'background-color:' + theme.colors.green.hover : 'transform: scale(1.02)' };
    }
  `;

  const Text = styled.span`
    margin: 0;
    font-size: 0.7rem;
    font-weight: bold;
  `;

  const ActiveText = styled.h6`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0.2rem 1rem; 
    line-height: 180%
  `;

  const SingleProjectText = styled.h6`
    margin: 0;
  `;

  return (
    <ProjectButtonContainer onClick={() => activeButton ? activeClicked() : clicked() }>
      <div css={ css`${ theme.WideButton }` }>
        { type !== 'single' ?
          <Text>{ text }</Text>
          : <SingleProjectText>OPEN</SingleProjectText>
        }
      </div>
      { activeButton ? <ActiveText>{ activeText }</ActiveText> : null }
    </ProjectButtonContainer>
  );
};

export default withTheme(ProjectButton);