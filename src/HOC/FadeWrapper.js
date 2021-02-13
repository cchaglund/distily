/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

const FadeWrapper = ({ children }) => {
  const [state, toggle] = useState(true);

  const transition = useTransition(state, null, { 
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transition.map(({ item, key, props }) =>
    item && 
    <animated.div key={key} style={props}>
      { children }
    </animated.div>
  );
};

export default FadeWrapper;