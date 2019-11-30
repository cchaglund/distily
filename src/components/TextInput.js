/** @jsx jsx */

import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from './Button';

const TextInput = ({type, text, size, clicked, error}) => {
  const [ input, setInput ] = useState('');

  const style = css`
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
  `;

  const inputStyle = css`
    flex: 1;
    padding-left: 1rem;
    border: none;
    border-bottom: 1px solid #707070;
    margin-right: 0.4rem;
  `;

  const Error = styled.p`
    height: 1rem;
    color: red;
    font-size: 0.7rem;
  `;

  const updateTitle = e => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div css={style}>
        <input
          css={inputStyle}
          value={ input } 
          onChange={ updateTitle }
          type='text' 
          placeholder='Project title' />
        <Button 
          type={type}
          text={text}
          size={size}
          clicked={() => clicked(input)} />
      </div>
      <Error>{error ? error : null }</Error>
    </div>
  );
};

export default TextInput;