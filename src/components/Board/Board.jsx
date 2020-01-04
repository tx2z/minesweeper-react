import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Tile/Tile';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import { prepareGame } from '../../functions/prepareGame';
import { GAME } from '../../types/propTypes';
import { CLASSIC } from '../../types/types';
import './Board.scss';

class Board extends React.Component {
  componentDidMount() {
    const {
      gameAction: preprareGameState,
      stylesAction: prepareGameStyles,
      gameId,
      theme: choosenTheme,
    } = this.props;

    const loadGame = (game, theme = false) => {
      const stylesPayload = {
        value: theme,
      };
      prepareGameStyles(stylesPayload);

      const newGame = prepareGame(game);
      const gamePayload = {
        game: newGame,
      };
      preprareGameState(gamePayload);
    };

    const gameUrl = `${process.env.REACT_APP_GAMES_ROOT}/${gameId}/game.json`;
    fetch(gameUrl)
      .then((gameResponse) => gameResponse.json())
      .then((gameResult) => {
        const theme = gameResult.theme || choosenTheme;
        if (!theme) {
          loadGame(gameResult);
        } else {
          const themeUrl = `${process.env.REACT_APP_THEMES_ROOT}/${theme}/theme.css`;
          fetch(themeUrl)
            .then((themeResponse) => themeResponse.text())
            .then((themeResult) => {
              loadGame(gameResult, themeResult);
            });
        }
      });
  }

  render() {
    const { game, gameType, styles } = this.props;

    if (!game.loaded) {
      return <div className="Loading">Loading...</div>;
    }

    const gameTile = `${game.name} | Minesweeper & Treasures`;

    const gameImage = `${process.env.REACT_APP_GAMES_ROOT}/${game.id}/${game.image}`;
    const boardStyles = {
      backgroundImage: `url(${gameImage})`,
      height: `${game.imageHeight}px`,
      width: `${game.imageWidth}px`,
      fontSize: `${game.tiles.width}px`,
      gridTemplateColumns: `repeat(${game.cols}, ${game.tiles.width}px)`,
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
        <Helmet>
          <title>{gameTile}</title>
          <style>{styles}</style>
        </Helmet>

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
  styles: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
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
