import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Tile/Tile';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import { prepareGame } from '../../functions/prepareGame';
import { GAME } from '../../types/propTypes';
import { CLASSIC } from '../../types/actionTypes';
import './Board.scss';

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

      const newGame = prepareGame(results.json);
      const gamePayload = {
        game: newGame,
      };
      preprareGameState(gamePayload);
    });
  }

  render() {
    const { game, gameType, styles } = this.props;

    if (!game.loaded) {
      return <div className="Loading">Loading...</div>;
    }

    const boardStyles = {
      backgroundImage: `url(/_games/${game.image})`,
      height: `${game.imageHeight}px`,
      width: `${game.imageWidth}px`,
    };

    const canCheckWin = () => {
      if (game.actions.flag.length === game.tiles.mines.length) {
        return true;
      }
      return false;
    };
    let correctFlags = 0;
    const checkWin = () => {
      correctFlags += 1;

      if (correctFlags === game.tiles.mines.length) {
        // TODO: Stop the game
        alert('YOU WIN');
      }
    };

    const newTiles = () => {
      const gameTiles = [];
      for (let i = 1; i <= game.tiles.number; i += 1) {
        if (gameType === CLASSIC) {
          // Check if all mines have flags
          if (canCheckWin() && game.actions.flag.includes(i) && game.tiles.mines.includes(i)) {
            checkWin();
          }
        }

        gameTiles.push(<Tile index={i} key={i} />);
      }
      return gameTiles;
    };

    const tiles = newTiles();

    return (
      <div className="game">
        <style>{styles}</style>
        <div className="Board" style={boardStyles}>
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
  gameType: PropTypes.string.isRequired,
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
