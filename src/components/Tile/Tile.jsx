import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tilesAction from '../../actions/tilesAction';
import Player from '../Player/Player';
import './Tile.css';
import { GAME, TOOLS, TILE } from '../../types/propTypes';
import { CLEAN } from '../../types/toolTypes';

const Tile = (props) => {
  const {
    game, index, tools, tilesAction: execTileClick,
  } = props;
  const tileContent = game.tiles.find((obj) => obj.id === index);

  if (tileContent.player === true && !tileContent.open) {
    const payload = {
      method: CLEAN,
      tile: tileContent.id,
    };
    execTileClick(payload);
  }
  let player = '';
  if (tileContent.player === true) {
    player = <Player />;
  }

  /*
  const tileClick = () => {
    const payload = {
      method: tools.tool,
      tile: tileContent.id,
    };
    execTileClick(payload);
  };
  */
  /*
  const handleKeyPress = (event) => {
    // TODO: Add keyboard events
    if (event.key === 'q') {
      console.log(event.target);
    }
  };
*/
  let tileClasses = 'tile ';
  if (!tileContent.open || tileContent.block) {
    tileClasses += tileContent.class;
  } else {
    tileClasses += 'free';
  }

  return (
    <div
      className={tileClasses}
      data-index={index}
      /* onClick={tileClick} */
      /* onKeyPress={handleKeyPress} */
    >
      <TileNumber tile={tileContent} />
      <TileFlag tile={tileContent} />
      <TileTreasure tile={tileContent} />
      {player}
    </div>
  );
};
Tile.propTypes = {
  tilesAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  tools: TOOLS.isRequired,
  game: GAME.isRequired,
};

const TileNumber = (props) => {
  const { tile } = props;
  if (tile.open) {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
