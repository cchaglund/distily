/* eslint-disable no-undef */
/** @jsx jsx */

import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useDebouncedCallback } from 'use-debounce';

// import BarChart from './Charts/BarChart/chart.js';
// import BubbleChart from './Charts/BubbleChart/chart.js';

const Notes = ({ projectID, notes}) => {
  const [ initialNotes ] = useState(notes);
  const [value, setValue] = useState();
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
      browser.runtime.sendMessage({
        type: 'saveNotes',
        data: {
          projID: projectID,
          notes: value
        }
      });
    },
    // delay in ms
    1000
  );

  const notesStyle = css`
    box-shadow: lightgray 0 1px;
    font-family: inherit;
    font-size: 0.7rem;
    background-color: #FFF7E5;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    min-height: 20rem;
    border: none;
    outline: none;
    resize: none;
    &:hover {
      background-color: rgb(255, 242, 212);
    }
  `;

  return (
    <div>
      <h4>Notes</h4>
      <textarea
        css={ notesStyle }
        defaultValue={ initialNotes ? initialNotes : null }
        onChange={(e) => debouncedCallback(e.target.value)} />
    </div>
  );
};

export default Notes;