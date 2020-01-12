/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
// import { css, jsx } from '@emotion/core';
import Button from '../../../components/Button';
import UrlsList from '../../../components/UrlsList';
import styled from '@emotion/styled';
import FadeWrapper from '../../../HOC/FadeWrapper';

const History = (props) => {
  const [ urls, setUrls ] = useState();
  // const [ project, setProject ] = useState();
  const [ type, setType ] = useState('recent');
  const [ reverse, setReverse ] = useState(false);

  useEffect(() => {
    // if (props.project && props.urls) {
    //   const project = props.project;

    //   // setProject(project);
      
    // }
    setUrls(props.urls);
  }, [props]);

  //  const sort = () => {

  //  }

  const Div = styled.div`
    display: flex;
    > * {
      margin: 0.5rem 0.7rem 0.5rem 0;
    }
  `;

  const H6 = styled.h6`
    margin-right: 1rem;
  `;

  const BottomSection = styled.div`
    ${props.theme.BottomSectionOneTwoColumns}
  `;

  const Column = styled.div`
    ${ props.theme.Column}
    grid-area: ${ props => props.area};
  `;

  return (
    <FadeWrapper>
      <BottomSection>
        <Column area={ 'left' }>
          <h4>All urls</h4>
          <H6>Sort by</H6>
          <Div>
            <Button
              btnClass={'nav'}
              size={'regular'}
              text={'Date added'} 
              clicked={() => {
                if (type === 'added') {
                  setReverse(! reverse);
                } else {
                  setType('added');
                }
              }} />
            <Button
              btnClass={'nav'}
              size={'regular'}
              text={'Activity'} 
              clicked={() => {
                if (type === 'top') {
                  setReverse(! reverse);
                } else {
                  setType('top');
                }
              }} />
            <Button
              btnClass={'nav'}
              size={'regular'}
              text={'Recent'} 
              clicked={() => {
                if (type === 'recent') {
                  setReverse(! reverse);
                } else {
                  setType('recent');
                }
              }} />
          </Div>
          { urls ? <UrlsList 
            key='2'
            urls={urls}
            type={type}
            reversed={reverse}
            deletable
            clicked={(id) => console.log('trying to open url', id)} /> : null }
        </Column>
        <Column area={ 'right' }>
          <h4>Domains</h4>
          { urls ? <UrlsList
            key='3'
            urls={urls}
            type={'host'}
            clicked={(id) => console.log('trying to open url', id)} /> : null }
        </Column>
      </BottomSection>
    </FadeWrapper>
  );
};

export default withTheme(withRouter(History));