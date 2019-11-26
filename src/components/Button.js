import React from 'react';
import styled from '@emotion/styled';

const Button = ({size, text, type, clicked}) => {
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
    case 'link':
      color = '#F2F9FF';
      break;
    case 'project':
      color = '#FDEBD6';
      break;
  }

  const ButtonContainer = styled.div`
    background-color: ${color};
    width: ${ size === 'wide' ? 'auto' : 'max-content'};
    padding: ${ size === 'wide' ? '0.1rem 0.15rem' : '0.4rem 0.6rem'};
    ${ size === 'wide' ? 'padding-left: 1rem;' : null}
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border: 1px solid ${color};
    cursor: pointer;
  `;

  const ButtonText = styled.h5`
    margin: 0;
  `;

  return (
    <ButtonContainer
      onClick={() => clicked()}>
      <ButtonText>{ text }</ButtonText>
    </ButtonContainer>
  );
};

export default Button;