import React from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

import { connect } from 'react-redux';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      height: `${this.props.game.rows}em`,
      width: `${this.props.game.cols}em`,
    };
  }

  render() {
    const canCheckWin = () => {
      if (this.props.game.addedFlags === this.props.game.totalMines) {
        return true;
      }
      return false;
    };
    let correctFlags = 0;
    const checkWin = () => {
      correctFlags++;
      console.log(correctFlags);
      if (correctFlags === this.props.game.totalMines) {
        // TODO: Stop the game
        alert('YOU WIN');
      }
    };
    const tiles = this.props.game.tiles.map((tile, index) => {
      // Check if you hit a mine
      if (tile.open && tile.mine) {
        // TODO: Stop the game
        alert('YOU LOSE');
      }
      // Check if all mines have flags
      if (canCheckWin() && tile.flag && tile.mine) {
        checkWin();
      }
      return <Tile index={index} key={tile.id} />;
    });

    return (
      <div className="Board" style={this.styles}>
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps)(Board);
