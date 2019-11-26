import React from 'react';
import styled from '@emotion/styled';
import Button from './Button';

const ProjectsList = ({projects, method}) => {
  const projectsList = Object.keys(projects).map( proj => {
    return (
      <Button
        key={projects[proj].id}
        onClick={ () => method(projects[proj].id)}
        text={projects[proj].title} 
        type={'project'}
        size={'wide'} />
    );
  });
  
  const ProjectsListContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
  `;

  return (
    <ProjectsListContainer>
      { projectsList }
    </ProjectsListContainer>
  );
};

export default ProjectsList;