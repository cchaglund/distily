import React, {useState, useEffect} from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBubble = ({urls}) => {
  const [data, setData] = useState();

  useEffect(() => {
    init();
  }, []);
  
  const init = () => {
    let domains = {
      name: 'All sites',
      children: []
    };

    let tempDomains = {};

    Object.keys(urls).forEach( url => {
      const host = urls[url].host;

      if (!tempDomains[host]) {
        tempDomains[host] = {
          name: host,
          children: []
        };
      }

      const shortTitle = urls[url].title;

      tempDomains[host].children.push({
        name: shortTitle,
        fullUrl: url,
        focused: urls[url].focuses,
        visited: urls[url].visits
      });
      
    });

    domains.children = Object.keys(tempDomains).map( domain => {
      return ({
        ...tempDomains[domain]
      });
    });

    setData(domains);
  };

  return (
    <div style={{ width: '100%', height:'700px'}}>
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        identity="name"
        value="focused"
        colors={{ scheme: 'blues' }}
        padding={10}
        // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        borderWidth={1}
        // enableLabel={false}
        borderColor={{ theme: 'labels.text.fill' }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'none',
            color: 'inherit',
            rotation: -45,
            lineWidth: 5,
            spacing: 8
          }
        ]}
        fill={[ { match: { depth: 1 }, id: 'lines' } ]}
        animate={true}
        motionStiffness={90}
        motionDamping={16}
      />
    </div>
  );
};

export default MyResponsiveBubble;