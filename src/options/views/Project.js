/* eslint-disable no-undef */
/** @jsx jsx */

import { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Ctrl from '../../background/controller';
import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import UrlsList from '../../components/UrlsList';
import styled from '@emotion/styled';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Controller = new Ctrl(browser);

const Project = (props) => {
  const [ urls, setUrls ] = useState();
  const [ project, setProject ] = useState();

  useEffect(() => {
    // data can come from two places, depending on if it's from outside of, or within the router (dashboard or every other component)
    const project = props.location.params ? props.location.params.data : props.location.state.params.data;
    
    setProject(project);

    Controller.getAllProjectURLS(project.id)
      .then((res) => {
        setUrls(res);
      });
  }, []);  

  const Div = styled.div`
    display: flex;
    > * {
      margin: 0.5rem 0.7rem 0.5rem 0;
    }
  `;

  const Span = styled.span`
    color: #9F9F9F;
    font-size: 0.7rem;
  `;

  const leftComponent = (
    <div>
      <h3>{ project ? project.title : null }</h3>
      <Div>
        <Span>URLs visited: 72</Span>
        <Span>Times opened: 5</Span>
        <Span>Created: 5/11/19</Span>
        <Span>Last Opened: 7/11/19</Span>
      </Div>
      <Div>
        <Button
          type={'nav'}
          size={'regular'}
          text={'Overview'} />
        <Button
          type={'nav'}
          size={'regular'}
          text={'History'} />
        <Button
          type={'nav'}
          size={'regular'}
          text={'Charts'} />
      </Div>
    </div>
  );

  const rightComponent = (
    <TextInput
      text={'Search for URL'}
      type={'search'}
      size={'regular'}/>
  );

  {/*
  <BarChart 
    urls={adjustedData}/>
  <BubbleChart
    urls={urls}/> */}

  return (
    <Layout
      topComponents={{
        left: leftComponent,
        right: rightComponent
      }}
      columnsData={[
        <div>
          <h5>Recent URLs</h5>
          <h6>Bulk open</h6>
          <Div>
            <Button
              type={'action'}
              size={'regular'}
              text={'Recent 5'} />
            <Button
              type={'action'}
              size={'regular'}
              text={'Recent 10'} />
          </Div>
          { urls ? <UrlsList
            key='1'
            urls={urls}
            type={'recent'}
            clicked={() => console.log('trying to open url')} /> : null }
        </div>,
        <div>
          <h5>Top URLS</h5>
          <h6>Bulk open</h6>
          <Div>
            <Button
              type={'action'}
              size={'regular'}
              text={'Top 5'} />
            <Button
              type={'action'}
              size={'regular'}
              text={'Top 10'} />
          </Div>
          { urls ? <UrlsList 
            key='2'
            urls={urls}
            type={'top'}
            clicked={() => console.log('trying to open url')} /> : null }
        </div>,
        <div>
          <h5>By domain</h5>
          { urls ? <UrlsList 
            key='3'
            urls={urls}
            type={'host'}
            clicked={() => console.log('trying to open url')} /> : null }
        </div>
      ]} />
  );
};

export default withRouter(Project);