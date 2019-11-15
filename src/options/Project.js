import React from 'react';
import { withRouter } from 'react-router-dom';

const Project = (props) => {
  const urls = props.location.params.data.urls;

  const renderedUrls = urls ? Object.keys(urls).map( href => {
    return (
      <li key={href}>
        {href}
      </li>
    );
  }) : null;

  return (
    <div>
      {props.location.params.title}
      {renderedUrls}
    </div>
  );
};

export default withRouter(Project);