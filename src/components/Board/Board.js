import React from 'react';
import Tile from '../Tile/Tile';
import gameAction from '../../actions/gameAction';
import * as functions from '../../functions/functions';
import './Board.css';
import { connect } from 'react-redux';

class Board extends React.Component {
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/tx2z/minesweeper-react/master/src/_games/test.json')
      .then((response) => response.json())
      .then((game) => {
        const newGame = functions.prepareGame(game);
        const payload = {
          game: newGame,
        };
        this.props.gameAction(payload);
      });
  }

  render() {
    if (!this.props.game.loaded) {
      return <div className="Loading">Loading...</div>;
    }
    const styles = {
      height: `${this.props.game.rows}em`,
      width: `${this.props.game.cols}em`,
    };
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
      <div className="Board" style={styles}>
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameAction: (payload) => dispatch(gameAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
