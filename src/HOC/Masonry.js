import React from 'react';
import Masonry from 'react-masonry-css';
import './masonry.css';


const MasonryHOC = ({ children }) => {
  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      { children }
    </Masonry>
  );
};

export default MasonryHOC;