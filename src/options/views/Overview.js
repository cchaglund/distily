/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Overview = (props) => {
  const projectList = props.projects ? Object.keys(props.projects).map( index => {
    const project = props.projects[index];

    return (
      <Link
        key={project.id}
        to={{ 
          pathname: '/project',
          params: {
            title: project.title,
            data: project
          }
        }}>
        <Button 
          type={'project'}
          text={project.title}
          size={'wide'} />
      </Link>
    );
  }) : null;

  const TopSection = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 180px;
    grid-template-rows: auto;
    grid-template-areas: 
      "create search"
  `;

  const BottomSection = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 50px;
    grid-template-rows: auto;
    grid-template-areas: 
      "open urls inspect"
  `;
  
  const Column = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const OverviewContainer = styled.div`
    width: 90vw;
    height: 100%;
    margin: auto;
  `;

  return (
    <OverviewContainer>
      <TopSection>
        <div css={ css`grid-area: create`}>
          <TextInput
            text={'Create new project'}
            type={'action'}
            size={'regular'} />
        </div>
        <div css={ css`grid-area: search`}>
          <TextInput
            text={'Search project'}
            type={'search'}
            size={'regular'}/>
        </div>
      </TopSection>
      <BottomSection>
        <div css={ css`grid-area: open`}>
          <Column>
            <h5>Jump back in</h5>
            <h6>Recent projects</h6>
            { props.projects ? projectList : null }
          </Column>
        </div>
        <div css={ css`grid-area: urls`}>
          <Column>
            <h5>Top URLS</h5>
            { props.projects ? projectList : null }
          </Column>
        </div>
        <div css={ css`grid-area: inspect`}>
          <Column>
            <h5>Inspect</h5>
            { props.projects ? projectList : null }
          </Column>
        </div>
      </BottomSection>
    </OverviewContainer>
  );
};

export default Overview;