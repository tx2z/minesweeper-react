import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Tile/Tile';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import * as functions from '../../functions/functions';
import { GAME } from '../../types/propTypes';
import './Board.css';

class Board extends React.Component {
  componentDidMount() {
    const {
      gameAction: preprareGameState,
      stylesAction: prepareGameStyles,
      gameId,
      theme,
    } = this.props;

    const assets = [
      { type: 'css', url: `/_themes/${theme}/theme.css` },
      { type: 'json', url: `/_games/${gameId}.json` },
    ];
    const list = [];
    const results = {};

    assets.forEach((asset) => {
      list.push(
        fetch(asset.url)
          .then((response) => {
            let result = '';
            if (asset.type === 'css') {
              result = response.text();
            } else if (asset.type === 'json') {
              result = response.json();
            }
            return result;
          })
          .then((result) => {
            results[asset.type] = result;
          }),
      );
    });

    Promise.all(list).then(() => {
      const stylesPayload = {
        value: results.css,
      };
      prepareGameStyles(stylesPayload);

      const newGame = functions.prepareGame(results.json);
      const gamePayload = {
        game: newGame,
      };
      preprareGameState(gamePayload);
    });
  }

  render() {
    const { game, styles } = this.props;

    if (!game.loaded) {
      return <div className="Loading">Loading...</div>;
    }

    const boardSize = {
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
      <div className="game">
        <style>{styles}</style>
        <div className="Board" style={boardSize}>
          {tiles}
        </div>
      </div>
    );
  }
}
Board.propTypes = {
  gameAction: PropTypes.func.isRequired,
  stylesAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
  styles: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameAction: (payload) => dispatch(gameAction(payload)),
  stylesAction: (payload) => dispatch(stylesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
