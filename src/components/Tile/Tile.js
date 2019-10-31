import React from 'react';
import './Tile.css';

function Tile(props) {
  return (
    <div
      index={props.index}
      class={props.class + ' tile'}
    >
    </div>
  );
}

export default Tile;