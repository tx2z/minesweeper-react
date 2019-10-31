import React from 'react';
import Tile from './components/Tile/Tile'
import './App.css';

import * as game from './_games/test'

function App() {
  const styles = {
    height: game.gameRows + 'em',
    width: game.gameCols + 'em',
  }

  const tiles = game.arrayGameClasses.map((value, index) => {
    return (
      <Tile 
        index={index} 
        class={value} 
      />
    );
  })

  return (
    <div 
      className="App"
      style={styles}
    >
      {tiles}
    </div>
  );
}

export default App;
