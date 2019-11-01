import React from 'react';
import Tile from './components/Tile/Tile'
import './App.css';

import { connect } from 'react-redux';
import tilesAction from './actions/tilesAction';

import * as game from './_games/test'

class App extends React.Component {

  styles = {
    height: game.gameRows + 'em',
    width: game.gameCols + 'em',
  }

  render() {
    const tiles = game.arrayGameClasses.map((value, index) => {
      return (
        <Tile 
          index={index}
          key={index} 
          class={value}
          state={this.props.tiles[index]}
          onClick={() => this.props.tilesAction({tile: index, state: -1})}
        />
      );
    });

    return (
      <div 
        className="App"
        style={this.styles}
      >
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  tilesAction: (payload) => dispatch(tilesAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
