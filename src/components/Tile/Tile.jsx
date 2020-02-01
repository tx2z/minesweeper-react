import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findTilePosition } from '../../functions/generics';
import tilesAction from '../../actions/tilesAction';
import focusAction from '../../actions/focusAction';
import gameOverAction from '../../actions/gameOverAction';
import Player from '../Player/Player';
import './Tile.scss';
import { GAME } from '../../types/propTypes';
import {
  CLASSIC, PLAYER, CLEAN, OVER,
} from '../../types/types';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    const { styles } = this.props;

    this.player = '';
    this.playerMine = false;
    this.tileClick = () => null;
    this.tileClasses = [];
    this.tilePayload = {};
    this.focusPayload = {};

    this.flagClass = '';
    this.treasureClass = '';

    if (!styles) {
      import('./TileDefaults.scss');
      this.flagClass = 'gg-flag';
      this.treasureClass = 'gg-gift';
    }
  }

  render() {
    const {
      game,
      gameType,
      index,
      tool,
      tilesAction: execTileClick,
      focusAction: execFocusAction,
      gameOverAction: execgameOverAction,
    } = this.props;

    // Check if you hit a mine
    if (!game.over && game.actions.open.includes(index) && game.tiles.mines.includes(index)) {
      this.playerMine = true;
      // Stop the game
      const gameOverPayload = {
        method: OVER,
        value: true,
      };
      execgameOverAction(gameOverPayload);
    }

    if (gameType === PLAYER) {
      // Playing in PLAYER mode
      if (game.actions.player === index && !game.actions.open.includes(index)) {
        this.tilePayload = {
          method: CLEAN,
          tile: index,
        };
        execTileClick(this.tilePayload);
      }
      if (game.actions.player === index) {
        this.player = <Player direction={game.actions.playerDirection} mine={this.playerMine} />;
      } else {
        this.player = '';
      }
    } else if (gameType === CLASSIC) {
      // Playing in CLASSIC mode
      this.tileClick = () => {
        this.focusPayload = {
          tile: index,
        };
        execFocusAction(this.focusPayload);

        this.tilePayload = {
          method: tool,
          tile: index,
        };
        execTileClick(this.tilePayload);
      };
    }

    this.tileClasses = ['tile'];
    if (game.actions.open.includes(index) && game.tiles.mines.includes(index)) {
      this.tileClasses.push('mine');
    }
    if (game.actions.open.includes(index)) {
      this.tileClasses.push('open');
    }

    if (gameType === CLASSIC && game.actions.player === index) {
      this.tileClasses.push('focus');
    }

    const tileStyles = {
      height: `${game.tiles.height}px`,
      width: `${game.tiles.width}px`,
    };

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        role="button"
        tabIndex={0}
        className={this.tileClasses.join(' ')}
        data-index={index}
        onClick={this.tileClick}
        style={tileStyles}
      >
        <TileNumber game={game} tile={index} />
        <TileFlag game={game} tile={index} flagClass={this.flagClass} />
        <TileTreasure game={game} tile={index} treasureClass={this.treasureClass} />
        {this.player}
      </div>
    );
  }
}
Tile.propTypes = {
  tilesAction: PropTypes.func.isRequired,
  focusAction: PropTypes.func.isRequired,
  gameOverAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  tool: PropTypes.string.isRequired,
  styles: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  game: GAME.isRequired,
};

const TileNumber = (props) => {
  const { game, tile } = props;
  if (game.actions.open.includes(tile) && !game.tiles.mines.includes(tile)) {
    const tilePosition = findTilePosition(game.tiles.position, tile);
    const minesAround = game.tiles.minesAround[tilePosition.row][tilePosition.col];
    const numberClasses = `number number${minesAround}`;
    if (tilePosition && minesAround !== 0) {
      return <span className={numberClasses}>{minesAround}</span>;
    }
  }
  return null;
};
TileNumber.propTypes = {
  game: GAME.isRequired,
  tile: PropTypes.number.isRequired,
};

const TileFlag = (props) => {
  const { game, tile, flagClass } = props;
  const flagClasses = `flag ${flagClass}`;
  if (game.actions.flag.includes(tile)) {
    return <span className={flagClasses} />;
  }
  return null;
};
TileFlag.propTypes = {
  game: GAME.isRequired,
  tile: PropTypes.number.isRequired,
  flagClass: PropTypes.string.isRequired,
};

const TileTreasure = (props) => {
  const { game, tile, treasureClass } = props;
  const treaClasses = `treasure ${treasureClass}`;
  if (game.found.treasures.includes(tile)) {
    return <span className={treaClasses} />;
  }
  return null;
};
TileTreasure.propTypes = {
  game: GAME.isRequired,
  tile: PropTypes.number.isRequired,
  treasureClass: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  focusAction: (payload) => dispatch(focusAction(payload)),
  gameOverAction: (payload) => dispatch(gameOverAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
