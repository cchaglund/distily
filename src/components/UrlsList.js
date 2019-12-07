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
        break;
      default:
        renderedList = makeButtons(urls);
        break;
    }

    setUrlsList(renderedList);
  }, []);

  const makeButtons = (data) => {
    return data.map( url => {
      return (
        <Button
          key={url.id}
          clicked={ () => clicked(url)}
          text={url.title} 
          type={'url'}
          size={'wide'} 
          data={url}
          proportion={url.proportion}/>
      );
    });
  };

  const sortUrls = (property) => {
    // Deep clone
    let sortedUrls = JSON.parse(JSON.stringify(urls));
    let maxVisits = 0;

    // get the highest visits value
    if (property === 'visits') {
      sortedUrls.forEach( url => {
        const urlVisits = parseInt(url.visits);

        if (urlVisits > maxVisits ) {
          maxVisits = urlVisits;
        }
      });

      sortedUrls = sortedUrls.map( url => {
        let propor = parseInt(url.visits)/maxVisits;
        let percent = Math.round(propor * 100) / 100;
        url.proportion = percent;
        return url;
      });
    }

    sortedUrls.sort( (urlA, urlB) => {
      return (urlA[property] < urlB[property]) ? 1 : -1;
    });

    sortedUrls = makeButtons(sortedUrls);

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
      let urls = makeButtons(hosts[host]);

      host = host.includes('www.') ? host.replace('www.', '') : host;
      
      return (
        <div 
          key={host}
          css={ css`margin-bottom: 1.2rem` }>
          {urls}
        </div>
      );
    });

    return ready;
  };
  
  const UrlsListContainer = styled.div`
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <UrlsListContainer>
      { urlsList ? urlsList : null }
    </UrlsListContainer>
  );
};

export default UrlsList;