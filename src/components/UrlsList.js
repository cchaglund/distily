/** @jsx jsx */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import UrlButton from './UrlButton';
import sort from '../helpers/sort';
import Masonry from '../HOC/Masonry';
import cleanHost from '../helpers/cleanHost';

const UrlsList = ({urls, clicked, type, deletable, reversed }) => {
  const [urlsList, setUrlsList ] = useState();

  useEffect(() => {
    let sorted;
    let renderedList;

    switch (type) {
      case 'recent':
        sorted = sort(urls, 'lastOpened');
        renderedList = makeButtons( sorted );
        break;
      case 'added':
        sorted = sort(urls, 'added');
        renderedList = makeButtons( sorted );
        break;
      case 'top':
        sorted = sort(urls, 'top');
        renderedList = makeButtons( sorted );
        break;
      case 'host':
        sorted = sort(urls, 'host');
        renderedList = makeHostButtons(sorted);
        break;
      default:
        renderedList = makeButtons(urls);
        break;
    }

    setUrlsList(reversed ? renderedList.reverse() : renderedList);
  }, []);

  const makeHostButtons = (list) => {
    let ready = Object.keys(list).map( host => {
      let urls = makeButtons(list[host]);

      const hostName = cleanHost(host);
      
      return (
        <>
          <h6>{hostName}</h6>
          <div 
            css={ css`margin-bottom: 1.2rem` }>
            {urls}
          </div>
        </>
      );
    });

    ready = <Masonry>{ready}</Masonry>;

    return ready;
  };

  const makeButtons = (data) => {
    return data.map( url => {
      return (
        <UrlButton
          key={url.id}
          clicked={ () => clicked(url)}
          text={url.title}
          data={url}
          type={ type }
          deletable={ deletable ? true : false }
          proportion={url.proportion}/>
      );
    });
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