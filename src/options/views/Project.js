import React from 'react';
import { withRouter } from 'react-router-dom';
// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Project = (props) => {
  // const urls = props.location.params.data.urls;

  // const adjustedData = Object.keys(urls).map( url => {
  //   return {
  //     ...urls[url],
  //     url: url
  //   };
  // });

  return (
    <div>
      {props.location.params.title}
      {/*
      <BarChart 
        urls={adjustedData}/>
      <BubbleChart
        urls={urls}/> */}
    </div>
  );
};

export default withRouter(Project);