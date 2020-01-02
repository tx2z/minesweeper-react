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
    this.player = '';
    this.tileClick = () => null;
    this.tileClasses = [];
    this.payload = {};

    this.flagClass = '';
    import(/* webpackMode: "lazy-once" */ 'css.gg/icons/flag.css').then(() => {
      this.flagClass = 'gg-flag';
    });

    this.treasureClass = '';
    import(/* webpackMode: "lazy-once" */ 'css.gg/icons/gift.css').then(() => {
      this.treasureClass = 'gg-gift';
    });
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

    // Check if you hit a mine
    if (game.actions.open.includes(index) && game.tiles.mines.includes(index)) {
      // TODO: Stop the game
      alert('YOU LOSE');
    }

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
        this.player = <Player />;
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
  index: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
  tool: PropTypes.string.isRequired,
  game: GAME.isRequired,
};

const TileNumber = (props) => {
  const { game, tile } = props;
  if (game.actions.open.includes(tile)) {
    const tilePosition = findTilePosition(game.tiles.position, tile);
    const minesAround = game.tiles.minesAround[tilePosition.row][tilePosition.col];
    if (tilePosition && minesAround !== 0) {
      return <span className="number">{minesAround}</span>;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
