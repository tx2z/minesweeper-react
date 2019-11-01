import React from 'react';
import './Tile.css';

function Tile(props) {
  return (
    <div
      className={props.class + ' tile'}
      data-index={props.index}
      data-status={props.state}
      onClick={props.onClick}
    >
    </div>
  );
}

export default Tile;