/* eslint-disable no-undef */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import './Popup.css';


// // Get the saved stats and render the data in the popup window.
// const MAX_ITEMS = 5;

// function sorter(array) {
//   return Object.keys(array).sort((a, b) => {
//     return array[a] <= array[b];
//   });
// }

// function addElements(element, array, callback) {
//   while(element.firstChild) {
//     element.removeChild(element.firstChild);
//   }

//   for (let i=0; i < array.length; i++) {
//     if (i >= MAX_ITEMS) {
//       break;
//     }

//     const listItem = document.createElement('li');
//     listItem.textContent = callback(array[i]);
//     element.appendChild(listItem);
//   }
// }

// const gettingStoredStats = browser.storage.local.get();

// gettingStoredStats.then(results => {
//   if (results.type.length === 0 || results.host.length === 0) {
//     return;
//   }

//   let hostElement = document.getElementById('hosts');
//   let sortedHosts = sorter(results.host);
//   addElements(hostElement, sortedHosts, (host) => {
//     return `${host}: ${results.host[host]} visit(s)`;
//   });

//   let typeElement = document.getElementById('types');
//   let sortedTypes = sorter(results.type);
//   addElements(typeElement, sortedTypes, (type) => {
//     return `${type}: ${results.type[type]} use(s)`;
//   });

// });

const CreateProject = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${ props => props.active ? 'lightblue' : 'red' }
`;

const Popup = () => {
  const [ projectName, setProjectName ] = useState('');

  const changeHandler = (val) => {
    setProjectName( val );
  };

  const createHandler = () => {
    if (projectName.length !== 0 || projectName.length === '' ) {
      browser.runtime.sendMessage({ type: 'openNewWindow' });
    } else {
      console.log('enter text first!');
    }
  };

  return (
    <div className="popup">
      <div
        onClick={ () => console.log('create clicked')}>
          Create new project
      </div>
      <CreateProject>
        <input 
          type="text" 
          value={ projectName } 
          onChange={ (e) => changeHandler(e.target.value) } />
        <Button
          active={ projectName.length !== 0 || projectName.length === '' }
          onClick={createHandler}>
            Create
        </Button>
      </CreateProject>
    </div>
  );
};


export default Popup;
