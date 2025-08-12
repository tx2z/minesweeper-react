import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findTilePosition } from '../../functions/generics';
import tilesAction from '../../actions/tilesAction';
import focusAction from '../../actions/focusAction';
import Player from '../Player/Player';
import './Tile.scss';
import { GAME } from '../../types/propTypes';
import { CLASSIC, PLAYER, CLEAN } from '../../types/types';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    const { styles } = this.props;

    this.player = '';
    this.tileClick = () => null;
    this.tileClasses = [];
    this.payload = {};

    if (!styles) {
      import('./TileDefaults.scss');
    }
  }

  componentDidUpdate(prevProps) {
    const { game, index, onMineHit, onTreasureFound, onFlagPlaced, onTileRevealed } = this.props;
    const wasOpen = prevProps.game.actions.open.includes(index);
    const isOpen = game.actions.open.includes(index);
    const isMine = game.tiles.mines.includes(index);
    const wasFlagged = prevProps.game.actions.flag.includes(index);
    const isFlagged = game.actions.flag.includes(index);
    const wasTreasure = prevProps.game.found.treasures.includes(index);
    const isTreasure = game.found.treasures.includes(index);

    // Mine hit: when a mine transitions to open
    if (!wasOpen && isOpen && isMine) {
      onMineHit?.();
      return;
    }

    // Treasure newly found
    if (!wasTreasure && isTreasure) {
      onTreasureFound?.();
    }

    // Flag placed
    if (!wasFlagged && isFlagged) {
      onFlagPlaced?.();
    }

    // Tile revealed (non-mine)
    if (!wasOpen && isOpen && !isMine) {
      onTileRevealed?.();
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
    } = this.props;

    if (gameType === PLAYER) {
      // Playing in PLAYER mode
      if (game.actions.player === index && !game.actions.open.includes(index)) {
        this.payload = {
          method: CLEAN,
          tile: index,
        };
        execTileClick(this.payload);
      }
      if (game.actions.player === index) {
        this.player = <Player direction={game.actions.playerDirection} />;
      } else {
        this.player = '';
      }
    } else if (gameType === CLASSIC) {
      // Playing in CLASSIC mode
      this.tileClick = () => {
        this.payload = {
          tile: index,
        };
        execFocusAction(this.payload);

        this.payload = {
          method: tool,
          tile: index,
        };
        execTileClick(this.payload);
      };
    }

    this.tileClasses = ['tile'];
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
        <TileFlag game={game} tile={index} />
        <TileTreasure game={game} tile={index} />
        {this.player}
      </div>
    );
  }
}
Tile.propTypes = {
  tilesAction: PropTypes.func.isRequired,
  focusAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  tool: PropTypes.string.isRequired,
  styles: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  game: GAME.isRequired,
  onMineHit: PropTypes.func,
  onTreasureFound: PropTypes.func,
  onFlagPlaced: PropTypes.func,
  onTileRevealed: PropTypes.func,
};

Tile.defaultProps = {
  onMineHit: null,
  onTreasureFound: null,
  onFlagPlaced: null,
  onTileRevealed: null,
};

const TileNumber = (props) => {
  const { game, tile } = props;
  if (game.actions.open.includes(tile)) {
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
  const { game, tile } = props;
  if (game.actions.flag.includes(tile)) {
    return <span className="flag">🚩</span>;
  }
  return null;
};
TileFlag.propTypes = {
  game: GAME.isRequired,
  tile: PropTypes.number.isRequired,
};

const TileTreasure = (props) => {
  const { game, tile } = props;
  if (game.found.treasures.includes(tile)) {
    return <span className="treasure">💎</span>;
  }
  return null;
};
TileTreasure.propTypes = {
  game: GAME.isRequired,
  tile: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  focusAction: (payload) => dispatch(focusAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
