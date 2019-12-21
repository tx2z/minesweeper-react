import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tilesAction from '../../actions/tilesAction';
import './Tile.css';

const Tile = (props) => {
  const {
    game, index, tools, tilesAction: execTileClick,
  } = props;
  const tileContent = game.tiles.find((obj) => obj.id === index);

  const tileClick = () => {
    const payload = {
      method: tools.tool,
      tile: tileContent.id,
    };
    execTileClick(payload);
  };

  const handleKeyPress = (event) => {
    // TODO: Add keyboard events
    if (event.key === 'q') {
      console.log(event.target);
    }
  };

  let tileClasses = 'tile ';
  if (!tileContent.open || tileContent.block) {
    tileClasses += tileContent.class;
  } else {
    tileClasses += 'free';
  }

  return (
    <div
      role="button"
      tabIndex={index}
      className={tileClasses}
      data-index={index}
      onClick={tileClick}
      onKeyPress={handleKeyPress}
    >
      <TileNumber open={tileContent.open} number={tileContent.number} />
      <TileFlag open={tileContent.flag} />
    </div>
  );
};
Tile.propTypes = {
  tilesAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  tools: PropTypes.shape({
    tool: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    tiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const TileNumber = (props) => {
  const { open, number } = props;
  if (open) {
    return <span className="number">{number}</span>;
  }
  return null;
};
TileNumber.propTypes = {
  open: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
};

const TileFlag = (props) => {
  const { open } = props;
  if (open) {
    return <span className="flag" />;
  }
  return null;
};
TileFlag.propTypes = {
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  tilesAction: (payload) => dispatch(tilesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
