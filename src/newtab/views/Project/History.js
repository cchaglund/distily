/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
import Button from '../../../components/Button';
import UrlsList from '../../../components/UrlsList';
import styled from '@emotion/styled';
import FadeWrapper from '../../../HOC/FadeWrapper';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const History = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();

  useEffect(() => {
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
    ${props.theme.BottomSectionTwoColumns}
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
    <FadeWrapper>
      <BottomSection>
        {/* <Column area={ 'left' }>
          <h4>Previous session tabs</h4>
          <h6>Bulk open</h6>
          <Div>
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'Resume session'}
              clicked={() => resumeProject('recent', 10)} />
          </Div>
          { urls ? <UrlsList
            key='1'
            urls={urls}
            type={'recent'} /> : null }
          <Button 
            btnClass={'nav'}
            text={'Show more'}
            size={'regular'}
            clicked={() => showMore()} />
        </Column> */}
        <Column area={ 'left' }>
          <h4>History</h4>
          <h6>Sort</h6>
          <Div>
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'By data'} 
              clicked={() => resumeProject('top', 5)} />
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'By activity'} 
              clicked={() => resumeProject('top', 10)} />
          </Div>
          <h6>(click again to reverse order)</h6>
          { urls ? <UrlsList 
            key='2'
            urls={urls}
            type={'top'}
            deletable
            clicked={(id) => console.log('trying to open url', id)} /> : null }
          <Button 
            btnClass={'nav'}
            text={'Show more'}
            size={'regular'}
            clicked={() => showMore()} />
        </Column>
        {/* <Column area={ 'right' }>
          <h4>By domain</h4>
          { urls ? <UrlsList 
            key='3'
            urls={urls}
            type={'host'}
            clicked={(id) => console.log('trying to open url', id)} /> : null }
          <Button 
            btnClass={'nav'}
            text={'Show more'}
            size={'regular'}
            clicked={() => showMore()} />
        </Column> */}
      </BottomSection>
    </FadeWrapper>
  );
};

export default withTheme(withRouter(History));