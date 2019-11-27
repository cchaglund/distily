/** @jsx jsx */

import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from './Button';

const UrlsList = ({urls, clicked, type}) => {
  const [urlsList, setUrlsList ] = useState();

  useEffect(() => {
    let renderedList;

    switch (type) {
      case 'recent':
        renderedList = sortUrls('lastOpened');
        break;
      case 'top':
        renderedList = sortUrls('visits') ;
        break;
      case 'host':
        renderedList = sortByHost();
    }

    setUrlsList(renderedList);
  }, []);

  const sortUrls = (property) => {
    let sortedUrls = [...urls ];

    sortedUrls.sort( (urlA, urlB) => {
      return (urlA[property] < urlB[property]) ? 1 : -1;
    });

    sortedUrls = sortedUrls.map( url => {
      return (
        <Button
          key={url.id}
          clicked={ () => clicked(url.id)}
          text={url.title} 
          type={'url'}
          size={'wide'} 
          data={url}/>
      );
    });

    return sortedUrls;
  };

  const sortByHost = () => {
    let hosts = {};

    urls.forEach( url => {
      if (!hosts[url.host]) {
        hosts[url.host] = [];
      }
      hosts[url.host].push(url);
    });

    let ready = Object.keys(hosts).map( host => {
      let urls = hosts[host].map( url => {
        return (
          <Button
            key={url.id}
            clicked={ () => clicked(url.id)}
            text={url.title} 
            type={'url'}
            size={'wide'} 
            data={url}/>
        );
      });
      host = host.includes('www.') ? host.replace('www.', '') : host;
      
      return (
        <div 
          key={host}
          css={ css`margin-top: 1.2rem` }>
          {urls}
        </div>
      );
    });

    console.log(ready);

    return ready;
  };
  
  const UrlsListContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
  `;

  return (
    <UrlsListContainer>
      { urlsList ? urlsList : null }
    </UrlsListContainer>
  );
};

export default UrlsList;