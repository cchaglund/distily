import React from 'react';
import { Link } from 'react-router-dom';

const Overview = (props) => {
  const projectList = props.projects ? Object.keys(props.projects).map( index => {
    const project = props.projects[index];

    return (
      <li key={project.id}>
        <Link
          to={{ 
            pathname: '/project',
            params: {
              title: project.title,
              data: project
            }
          }}>
          {project.title}
        </Link>
      </li>
    );
  }) : null;

  return (
    <div className="App-header">
      Projects
      <ul>
        { props.projects ? projectList : null }
      </ul>
    </div>
  );
};

export default Overview;