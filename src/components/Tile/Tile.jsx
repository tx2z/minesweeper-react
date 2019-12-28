import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tilesAction from '../../actions/tilesAction';
import focusAction from '../../actions/focusAction';
import Player from '../Player/Player';
import './Tile.css';
import { GAME, TILE } from '../../types/propTypes';
import { CLEAN } from '../../types/toolTypes';
import { CLASSIC, PLAYER } from '../../types/actionTypes';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.player = '';
    this.tileClick = () => null;
    this.tileClasses = [];
    this.payload = {};
  }

  render() {
    const {
      game, gameType, index, tool, tilesAction: execTileClick, focusAction: execFocusAction,
    } = this.props;
    const tileContent = game.tiles.find((obj) => obj.id === index);

    if (gameType === PLAYER) {
    // Playing in PLAYER mode
      if (tileContent.player === true && !tileContent.open) {
        this.payload = {
          method: CLEAN,
          tile: tileContent.id,
        };
        execTileClick(this.payload);
      }
      if (tileContent.player === true) {
        this.player = <Player />;
      } else {
        this.player = '';
      }
    } else if (gameType === CLASSIC) {
    // Playing in CLASSIC mode
      this.tileClick = () => {
        this.payload = {
          tile: tileContent.id,
        };
        execFocusAction(this.payload);

        this.payload = {
          method: tool,
          tile: tileContent.id,
        };
        execTileClick(this.payload);
      };
    }

    this.tileClasses = ['tile'];
    if (!tileContent.open || tileContent.block) {
      this.tileClasses.push(tileContent.class);
    } else {
      this.tileClasses.push('free');
    }

    if (gameType === CLASSIC && tileContent.focus === true) {
      this.tileClasses.push('focus');
    }

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        role="button"
        tabIndex={0}
        className={this.tileClasses.join(' ')}
        data-index={index}
        onClick={this.tileClick}
      >
        <TileNumber tile={tileContent} />
        <TileFlag tile={tileContent} />
        <TileTreasure tile={tileContent} />
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
  const { tile } = props;
  if (tile.open && tile.number !== 0) {
    return <span className="number">{tile.number}</span>;
  }
  return null;
};
TileNumber.propTypes = {
  tile: TILE.isRequired,
};

const TileFlag = (props) => {
  const { tile } = props;
  if (tile.flag) {
    return <span className="flag" />;
  }
  return null;
};
TileFlag.propTypes = {
  tile: TILE.isRequired,
};

const TileTreasure = (props) => {
  const { tile } = props;
  if (tile.foundTreasure) {
    return <span className="treasure" />;
  }
  return null;
};
TileTreasure.propTypes = {
  tile: TILE.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  focusAction: (payload) => dispatch(focusAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
