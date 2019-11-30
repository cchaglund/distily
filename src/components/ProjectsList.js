import React, {useState} from 'react';
import styled from '@emotion/styled';
import Button from './Button';

const ProjectsList = ({projects, clicked}) => {
  const [ openOptions, setOpenOptions] = useState();

  const clickHandler = (projId) => {
    const Div = styled.div`
      margin-left: 1rem;
    `;

    const options = (
      <Div>
        <Button
          clicked={ () => clicked(projId)}
          text={'Open fresh'} 
          type={'action'}
          size={'wide'} />
        <Button
          clicked={ () => console.log('trying to open previous session')}
          text={'Open previous session'} 
          type={'action'}
          size={'wide'} />
        <Button
          clicked={ () => clicked(projId, 'recent', 5)}
          text={'Open with recent urls'} 
          type={'action'}
          size={'wide'} />
        <Button
          clicked={ () => clicked(projId, 'top', 5)}
          text={'Open top urls'} 
          type={'action'}
          size={'wide'} />
      </Div>
    );

    setOpenOptions({
      id: projId,
      data: options
    });
  };

  const projectsList = Object.keys(projects).map( proj => {
    const project = projects[proj];

    return (
      <div key={project.id}>
        <Button
          clicked={ () => clickHandler(project.id)}
          text={project.title} 
          type={'project'}
          size={'wide'} />
        { openOptions && openOptions.id === project.id ? openOptions.data : null }
      </div>
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