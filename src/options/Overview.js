import React from 'react';

const Overview = (props) => {
  const projectList = props.projects ? Object.keys(props.projects).map( projTitle => {
    return <li key={projTitle}>{projTitle}</li>;
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