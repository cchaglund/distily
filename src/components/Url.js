import React from 'react';
import styled from '@emotion/styled';
import { useState, useEffect} from 'react';

const Url = ({data}) => {
  const [ title, setTitle ] = useState();
  const [ host, setHost ] = useState();

  useEffect(() => {
    setTitle(data.title);
    setHost(data.host);

    if (data.title.length > 50) {
      setTitle(data.title.substring(0,49) + '...');
    }

    if (data.host.includes('www.')) {
      setHost(data.host.replace('www.', ''));
    }

  }, []);

  const Div = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const Title = styled.span`
    font-weight: bold;
    font-size: 0.7rem;
  `;

  const Host = styled.span`
    font-size: 0.7rem;
  `;

  return (
    <Div>
      <Title>{title}</Title>
      <Host>{host}</Host>
    </Div>
  );
};

export default Url;