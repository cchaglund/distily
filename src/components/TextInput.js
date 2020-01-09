/** @jsx jsx */

import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from './Button';

const TextInput = ({type, text, size, clicked, option, placeholder, projects, inputType, initialValue }) => {
  const [ input, setInput ] = useState('');
  const [ error, setError ] = useState('');

  useEffect( ()=> {
    setInput(initialValue);
  }, []);

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
    background-color: transparent;
    border-bottom: 1px solid #707070;
    margin-right: 0.4rem;
    width: 15rem;
  `;

  const Error = styled.p`
    height: 1rem;
    color: red;
    font-size: 0.7rem;
  `;

  const updateTitle = e => {
    setInput(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' ) {
      clicked(input);
    }    
  };

  const titleChangeHandler = (title) => {
    // TODO: use controller's uniqueProjectTitleCheck instead
    const titleExists = projects ? projects.filter( project => {
      return project.title === title;
    }) : null;

    if (titleExists && titleExists.length !== 0) {
      setError(`Project '${title}' already exists`);
      return;
    }

    clicked(title);
  };

  return (
    <div>
      <div css={style}>
        <input
          css={inputStyle}
          value={ input } 
          onChange={ updateTitle }
          type='text' 
          placeholder={ placeholder ? placeholder : 'Project title' } 
          onKeyDown={(e) => handleEnterPress(e)}/>
        <Button 
          btnClass={type}
          text={text}
          size={size}
          clicked={() => {
            if (inputType !== 'search' ) {
              titleChangeHandler(input);  
            } else {
              clicked(input);
            }
          }} 
          inactive={ option ? true : false } />
      </div>
      { error ? <Error>{ error }</Error> : null }
      { option ? option : null }
    </div>
  );
};

export default TextInput;