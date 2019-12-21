import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Tile/Tile';
import gameAction from '../../actions/gameAction';
import * as functions from '../../functions/functions';
import './Board.css';

class Board extends React.Component {
  componentDidMount() {
    const { gameAction: preprareGameState } = this.props;
    fetch('https://raw.githubusercontent.com/tx2z/minesweeper-react/master/src/_games/test.json')
      .then((response) => response.json())
      .then((game) => {
        const newGame = functions.prepareGame(game);
        const payload = {
          game: newGame,
        };
        preprareGameState(payload);
      });
  }

  render() {
    const { game } = this.props;

    if (!game.loaded) {
      return <div className="Loading">Loading...</div>;
    }
    const styles = {
      height: `${game.rows}em`,
      width: `${game.cols}em`,
    };
    const canCheckWin = () => {
      if (game.addedFlags === game.totalMines) {
        return true;
      }
      return false;
    };
    let correctFlags = 0;
    const checkWin = () => {
      correctFlags += 1;

      if (correctFlags === game.totalMines) {
        // TODO: Stop the game
        alert('YOU WIN');
      }
    };
    const tiles = game.tiles.map((tile, index) => {
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
Board.propTypes = {
  gameAction: PropTypes.func.isRequired,
  game: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    rows: PropTypes.number,
    cols: PropTypes.number,
    addedFlags: PropTypes.number,
    totalMines: PropTypes.number,
    tiles: PropTypes.arrayOf(
      PropTypes.shape({
        open: PropTypes.bool,
        flag: PropTypes.bool,
        mine: PropTypes.bool,
        id: PropTypes.number,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameAction: (payload) => dispatch(gameAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
