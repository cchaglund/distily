import React from 'react';
import styled from '@emotion/styled';
import Url from './Url';

const Button = ({size, text, type, clicked, data}) => {
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

  const ButtonContainer = styled.div`
    background-color: ${color};
    width: ${ size === 'wide' ? 'auto' : 'max-content'};
    padding: ${ size === 'wide' ? '0.2rem 0.3rem' : '0.4rem 0.6rem'};
    ${ size === 'wide' ? 'padding-left: 1rem; padding-right: 1rem;' : null}
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    border: 1px solid ${color};
    cursor: pointer;
  `;

  const ButtonText = styled.h5`
    margin: 0;
  `;

  return (
    <ButtonContainer
      onClick={() => clicked()}>
      { type === 'url' ? <Url data={data}/>
        : <ButtonText>{ text }</ButtonText> }
    </ButtonContainer>
  );
};

export default Button;