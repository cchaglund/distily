/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
// import Button from '../../../components/Button';
// import UrlsList from '../../../components/UrlsList';
import styled from '@emotion/styled';
import BarChart from '../../Charts/BarChart/chart.js';
import BubbleChart from '../../Charts/BubbleChart/chart.js';

const Charts = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();

  useEffect(() => {
    console.log('charts');
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
    ${props.theme.BottomSectionFull}
  `;

  const Column = styled.div`
    ${ props.theme.Column}
    grid-area: ${ props => props.area};
  `;

  return (
    <BottomSection>
      <Column area={ 'full' }>
        { urls && 
          <div>
            {/* <BarChart 
              urls={urls}/> */}
            <BubbleChart
              urls={urls}/>
          </div>
        }
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(Charts));