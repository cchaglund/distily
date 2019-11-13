/* eslint-disable no-undef */

import React, { useState } from 'react';
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

const Popup = () => {
  const [ projectName, setProjectName ] = useState();

  const changeHandler = () => {
    setProjectName( e.target.value );
  };

  return (
    <div className="popup">
      <div
        onClick={ () => console.log('create clicked')}>
          Create new project
      </div>
      <input 
        type="text" 
        value={ projectName } 
        onChange={ () => changeHandler }>
        { projectName }
      </input>
    </div>
  );
};


export default Popup;
