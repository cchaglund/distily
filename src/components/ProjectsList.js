/** @jsx jsx */

import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from './Button';

const ProjectsList = ({projects, clicked, clickAction, type}) => {
  const [ projectsList, setProjectsList ] = useState();
  const [ openOptions, setOpenOptions] = useState();

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
    if (clickAction === 'open') {
      clicked(projId);
      return;
    }
    
    const Div = styled.div`
      margin-left: 1rem;
    `;

    console.log(projId);

    let options = (
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

    options = projects[projId -1].active ?
      <Div>
        <Button
          clicked={ () => clicked(projId, 'switchWindow')}
          text={'Switch to project window'} 
          type={'action'}
          size={'wide'} />
      </Div>
      : options;

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
      return (projectA[property] < projectB[property]) ? 1 : -1;
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
          <div key={project.id}>
            <Button
              clicked={ () => clickHandler(project.id)}
              text={project.title} 
              type={ type === 'neutral' ? 'neutral' : 'project'}
              size={'wide'} 
              proportion={project.proportion ? project.proportion : null}/>
            { openOptions && openOptions.id === project.id ? openOptions.data : null }
          </div>
        );
      }) : null }
    </ProjectsListContainer>
  );
};

export default ProjectsList;

// import React, {useState} from 'react';
// import styled from '@emotion/styled';
// import Button from './Button';

// const ProjectsList = ({projects, clicked, clickAction}) => {
//   const [ openOptions, setOpenOptions] = useState();

//   const clickHandler = (projId) => {
//     if (clickAction === 'open') {
//       clicked(projId);
//       return;
//     }
    
//     const Div = styled.div`
//       margin-left: 1rem;
//     `;

//     const options = (
//       <Div>
//         <Button
//           clicked={ () => clicked(projId)}
//           text={'Open fresh'} 
//           type={'action'}
//           size={'wide'} />
//         <Button
//           clicked={ () => console.log('trying to open previous session')}
//           text={'Open previous session'} 
//           type={'action'}
//           size={'wide'} />
//         <Button
//           clicked={ () => clicked(projId, 'recent', 5)}
//           text={'Open with recent urls'} 
//           type={'action'}
//           size={'wide'} />
//         <Button
//           clicked={ () => clicked(projId, 'top', 5)}
//           text={'Open top urls'} 
//           type={'action'}
//           size={'wide'} />
//       </Div>
//     );

//     setOpenOptions({
//       id: projId,
//       data: options
//     });
//   };

//   const projectsList = Object.keys(projects).map( proj => {
//     const project = projects[proj];

//     return (
//       <div key={project.id}>
//         <Button
//           clicked={ () => clickHandler(project.id)}
//           text={project.title} 
//           type={'project'}
//           size={'wide'} />
//         { openOptions && openOptions.id === project.id ? openOptions.data : null }
//       </div>
//     );
//   });
  
//   const ProjectsListContainer = styled.div`
//     margin-top: 0.3rem;
//     margin-bottom: 0.5rem;
//   `;

//   return (
//     <ProjectsListContainer>
//       { projectsList }
//     </ProjectsListContainer>
//   );
// };

// export default ProjectsList;