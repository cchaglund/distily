/* eslint-disable no-undef */

import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'emotion-theming';
import Button from '../../../components/Button';
import sort from '../../../helpers/sort';
import Notes from './Notes';
import UrlsList from '../../../components/UrlsList';
import styled from '@emotion/styled';
import FadeWrapper from '../../../HOC/FadeWrapper';

const Overview = ({ theme, project, urls}) => {
  const [ top10Urls, setTop10Urls ] = useState();
  const [ top20Urls, setTop20Urls ] = useState();
  const [ showMoreTopUrls, setShowMoreTopUrls ] = useState(false);
  const [ recent10Urls, setRecent10Urls ] = useState();
  const [ recent20Urls, setRecent20Urls ] = useState();
  const [ showMoreRecentUrls, setShowMoreRecentUrls ] = useState(false);

  useEffect(() => {
    const sortedTopUrls = sort(urls, 'top');
    const sortedRecentUrls = sort(urls, 'recent');

    let top10 = [];
    let topAll = [];

    for (let i = 0; i < 20; i++) {
      if (sortedTopUrls.length === i) break;
      if (top10.length < 10) {
        top10.push(sortedTopUrls[i]);
        topAll.push(sortedTopUrls[i]);
      } else {
        topAll.push(sortedTopUrls[i]);
      }
    }

    setTop10Urls(top10);
    setTop20Urls(topAll);

    let recent10 = [];
    let recentAll = [];

    for (let i = 0; i < 20; i++) {
      if (sortedRecentUrls.length === i) break;
      if (recent10.length < 10) {
        recent10.push(sortedRecentUrls[i]);
        recentAll.push(sortedRecentUrls[i]);
      } else {
        recentAll.push(sortedRecentUrls[i]);
      }
    }

    setRecent10Urls(recent10);
    setRecent20Urls(recentAll);

  }, []);

  const Div = styled.div`
    display: flex;
    > * {
      margin: 0.5rem 0.7rem 0.5rem 0;
    }
  `;

  const BottomSection = styled.div`
    ${theme.BottomSectionFourColumns}
  `;

  const Column = styled.div`
    ${ theme.Column}
    grid-area: ${ props => props.area};
  `;

  const showMore = (type) => {
    if (type === 'top') setShowMoreTopUrls(true);
    if (type === 'recent') setShowMoreRecentUrls(true);
  };

  return (
    <FadeWrapper>
      <BottomSection>
        <Column area={ 'left' }>
          <Notes 
            projectID={ project ? project.id : null }
            notes={ project ? project.notes : null }/>
        </Column>
        <Column area={ 'mid-left'}>
          <h4>Recent URLs</h4>
          <Div>
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'Open recent 5'}
              clicked={() => resumeProject(project.id, 'recent', 5)} />
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'Recent 10'} 
              clicked={() => resumeProject(project.id, 'recent', 10)} />
          </Div>
          { recent10Urls ? <UrlsList 
            urls={ showMoreRecentUrls ? recent20Urls : recent10Urls } type={'recent'} /> : null }
          { urls.length > 11 && ! showMoreRecentUrls ?
            <Button 
              btnClass={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore('recent')} /> : null
          }
        </Column>
        <Column area={ 'mid-right' }>
          <h4>Top URLS</h4>
          <Div>
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'Open top 5'} 
              clicked={() => resumeProject('top', 5)} />
            <Button
              btnClass={'action'}
              size={'regular'}
              text={'Top 10'} 
              clicked={() => resumeProject('top', 10)} />
          </Div>
          { top10Urls ? <UrlsList 
            urls={ showMoreTopUrls ? top20Urls : top10Urls } type={'top'} /> : null }
          { urls.length > 11 && ! showMoreTopUrls ?
            <Button 
              btnClass={'nav'}
              text={'Show more'}
              size={'regular'}
              clicked={() => showMore('top')} /> : null
          }
        </Column>
        {/* <Column area={ 'right' }>
          <h4>By domain</h4>
          { urls ? <UrlsList 
            key='3'
            urls={urls}
            type={'host'}
            clicked={(id) => console.log('trying to open url', id)} /> : null }
        </Column> */}
      </BottomSection>
    </FadeWrapper>
  );
};

export default withTheme(withRouter(Overview));