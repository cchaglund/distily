import React from 'react';
import { Link } from 'react-router-dom';

const Overview = (props) => {
  const projectList = props.projects ? Object.keys(props.projects).map( projTitle => {
    console.log(projTitle);
    return (
      <li key={projTitle}>
        <Link
          to={{ 
            pathname: '/project',
            params: {
              title: projTitle,
              data: props.projects[projTitle]
            }
          }}>
          {projTitle}
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