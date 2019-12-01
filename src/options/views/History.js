/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
import Button from '../../components/Button';
import UrlsList from '../../components/UrlsList';
import styled from '@emotion/styled';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const History = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();

  useEffect(() => {
    console.log('hist');
    if (props.project && props.urls) {
      const project = props.project;

      setProject(project);
      setUrls(props.urls);
    }
  }, [props]);

  const resumeProject = (openType, tabCount) => {
    browser.runtime.sendMessage({
      type: 'resumeProject',
      data: {
        projectId: project.id,
        openType: openType,
        tabCount: tabCount
      }
    });
  };

  const Div = styled.div`
    display: flex;
    > * {
      margin: 0.5rem 0.7rem 0.5rem 0;
    }
  `;

  const BottomSection = styled.div`
    ${props.theme.BottomSection}
  `;

  const Column = styled.div`
    ${ props.theme.Column}
    grid-area: ${ props => props.area};
  `;

  {/*
  <BarChart 
    urls={adjustedData}/>
  <BubbleChart
    urls={urls}/> */}

  return (
    <BottomSection>
      <Column area={ 'left' }>
        <h5>Recent URLs</h5>
        <h6>Bulk open</h6>
        <Div>
          <Button
            type={'action'}
            size={'regular'}
            text={'Recent 5'}
            clicked={() => resumeProject('recent', 5)} />
          <Button
            type={'action'}
            size={'regular'}
            text={'Recent 10'} 
            clicked={() => resumeProject('recent', 10)} />
        </Div>
        { urls ? <UrlsList
          key='1'
          urls={urls}
          type={'recent'} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'mid' }>
        <h5>Top URLS</h5>
        <h6>Bulk open</h6>
        <Div>
          <Button
            type={'action'}
            size={'regular'}
            text={'Top 5'} 
            clicked={() => resumeProject('top', 5)} />
          <Button
            type={'action'}
            size={'regular'}
            text={'Top 10'} 
            clicked={() => resumeProject('top', 10)} />
        </Div>
        { urls ? <UrlsList 
          key='2'
          urls={urls}
          type={'top'}
          clicked={(id) => console.log('trying to open url', id)} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
      <Column area={ 'right' }>
        <h5>By domain</h5>
        { urls ? <UrlsList 
          key='3'
          urls={urls}
          type={'host'}
          clicked={(id) => console.log('trying to open url', id)} /> : null }
        <Button 
          type={'nav'}
          text={'Show more'}
          size={'regular'}
          clicked={() => showMore()} />
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(History));