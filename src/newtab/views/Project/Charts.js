/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
import styled from '@emotion/styled';
import BubbleChart from '../../Charts/BubbleChart/chart.js';

const Charts = (props) => {
  const [ urls, setUrls ] = useState();
  // const [ project, setProject ] = useState();

  useEffect(() => {
    setUrls(props.urls);
  }, [props]);

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
            <BubbleChart
              urls={urls}/>
          </div>
        }
      </Column>
    </BottomSection>
  );
};

export default withTheme(withRouter(Charts));