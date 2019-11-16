import React, {useState} from 'react';
import { ResponsiveBar } from '@nivo/bar';

// import dataSet from '../data/data';
import config from './config';

import './chart.css';

const BarChart = (props) => {
  const [data, setData] = useState(props.urls);

  const updateData = () => {
    console.log('hej');
    console.log('data in state', data);
    const updatedData = data.map( country => {
      const ran = Math.floor(Math.random() * 40);
      if (country.country === 'AE') {
        country['hot dog'] = country['hot dog'] + ran;
      }

      return {
        ...country
      };
    });
    
    setData(updatedData);
  };

  return (
    <div 
      className="chart"
      onClick={() => updateData()}>
      <ResponsiveBar
        data={data}
        keys={config.keys}
        indexBy="host"
        groupMode='stacked'
        layout="horizontal"
        margin={config.margin}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={config.defs}
        fill={config.fill}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        enableGridY={false}
        enableGridX={true}
        axisBottom={config.axisBottom}
        axisLeft={config.axisLeft}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={config.legends}
      />
    </div>
  );
};

export default BarChart;

// import React, { Component } from 'react';
// import * as d3 from 'd3';

// class App extends Component {
//   // temperatureData = [ 8, 5, 13, 9, 12 ];
//   constructor(props) {
//     super(props);
//     // Don't call this.setState() here!
//     this.d3handle = d3;
//     this.handleClick = this.handleClick.bind(this);
//   }

//   this.d3handle.select(this.refs.temperatures)
//     .selectAll("h2")
//     .data(temperatureData)
//     .enter()
//       .append("h2")
//       .text("New Temperature")


//     render() {
//       return (
//         <div ref="temperatures"></div>
//       )
//     }
// }

// export default App



