import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import ProjectButton from './ProjectButton';

const ProjectsList = ({ projects, clicked, clickAction, type }) => {
  const [ projectsList, setProjectsList ] = useState();
  const [ openOptions, setOpenOptions] = useState();
  const [ activeButton, setActiveButton] = useState();

  useEffect(() => {
    switch (type) {
      case 'recent':
        sortProjects('lastOpened');
        break;
      case 'top':
        sortProjects('timesOpened') ;
        break;
      default:
        setProjectsList(projects);
        break;
    }
  }, []);

  const clickHandler = (projId) => {
    setActiveButton(projId);

    if (clickAction === 'open') {
      clicked(projId);
      return;
    }
    
    const Div = styled.div`
      margin-left: 1rem;
    `;

    let options = (
      <Div>
        <Button
          clicked={ () => console.log('trying to open previous session')}
          text={'Open previous session'} 
          type={'action'}
          wide />
        <Button
          clicked={ () => clicked(projId, 'recent', 5)}
          text={'Open with recent urls'} 
          type={'action'}
          wide />
        <Button
          clicked={ () => clicked(projId, 'top', 5)}
          text={'Open top urls'} 
          type={'action'}
          wide />
      </Div>
    );

    options = projects[projId - 1].active ? null : options;

    setOpenOptions({
      id: projId,
      data: options
    });
  };

  const sortProjects = (property) => {
    // Deep clone
    let sortedProjects = JSON.parse(JSON.stringify(projects));

    let maxVisits = 0;

    // get the highest visits value
    if (property === 'timesOpened') {
      sortedProjects.forEach( project => {
        const projectVisits = parseInt(project.timesOpened);

        if (projectVisits > maxVisits ) {
          maxVisits = projectVisits;
        }
      });

      sortedProjects = sortedProjects.map( project => {
        let propor = parseInt(project.timesOpened)/maxVisits;
        let percent = Math.round(propor * 100) / 100;
        project.proportion = percent;
        return project;
      });
    }

    sortedProjects.sort( (projectA, projectB) => {
      return (projectA[property] < projectB[property]) ? 1 : - 1;
    });

    setProjectsList(sortedProjects);
  };
  
  const ProjectsListContainer = styled.div`
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <ProjectsListContainer>
      { projectsList ? projectsList.map( project => {
        return (
          <div key={ project.id }>
            <ProjectButton
              clicked={ () => clickHandler(project.id) }
              activeClicked={ () => {
                activeButton === project.id ? 
                  clicked( project.id, projects[project.id - 1].active ? 'switchWindow' : null ) 
                  : null; }
              }
              activeButton={ activeButton === project.id ? true : false }
              activeText={ projects[project.id - 1].active ? 'Switch to project window' : 'Open fresh' }
              text={ project.title } 
              type={ type }
              proportion={ project.proportion ? project.proportion : null }/>
            { openOptions && openOptions.id === project.id ? openOptions.data : null }
          </div>
        );
      }) : null }
    </ProjectsListContainer>
  );
};

export default ProjectsList;