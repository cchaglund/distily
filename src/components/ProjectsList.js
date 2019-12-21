import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import ProjectButton from './ProjectButton';

const ProjectsList = ({ projects, clicked, clickAction, type }) => {
  const [ projectsList, setProjectsList ] = useState();
  const [ openOptions, setOpenOptions] = useState();
  const [ activeButton, setActiveButton] = useState();

  useEffect(() => {
    let sorted = projects;

    switch (type) {
      case 'recent':
        // first sort projects by activity to give proportional color, then by date
        sorted = sortProjects('timesOpened', projects);
        sorted = sortProjects('lastOpened', sorted);
        break;
      case 'top':
        sorted = sortProjects('timesOpened', projects);
        break;
    }

    setProjectsList(sorted);
  }, []);

  const clickHandler = (project) => {
    setActiveButton(project.id);

    if (clickAction === 'open') {
      clicked(project);
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
          btnClass={'action'}
          wide />
        <Button
          clicked={ () => clicked(project.id, 'recent', 5)}
          text={'Open with recent urls'} 
          btnClass={'action'}
          wide />
        <Button
          clicked={ () => clicked(project.id, 'top', 5)}
          text={'Open top urls'} 
          btnClass={'action'}
          wide />
      </Div>
    );

    options = projects.active ? null : options;

    setOpenOptions({
      id: project.id,
      data: options
    });
  };

  const sortProjects = (property, projectsList) => {
    // Deep clone
    let sortedProjects = JSON.parse(JSON.stringify(projectsList));

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

    return sortedProjects;
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
              clicked={ () => clickHandler(project) }
              activeClicked={ () => {
                activeButton === project.id ? 
                  clicked( project.id, project.active ? 'switchWindow' : null ) 
                  : null; }
              }
              activeButton={ activeButton === project.id ? true : false }
              activeText={ project.active ? 'Switch to project window' : 'Open fresh' }
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