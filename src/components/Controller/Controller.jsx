import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gameMoves } from '../../configs';
import moveAction from '../../actions/moveAction';
import tilesAction from '../../actions/tilesAction';
import { CLEAN, FLAG, TREASURE } from '../../types/toolTypes';
import {
  MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM,
} from '../../types/actionTypes';
import { GAME } from '../../types/propTypes';
import './Controller.css';

const Controller = (props) => {
  const {
    game, tool, moveAction: execMoveAction, tilesAction: execTileAction,
  } = props;
  const movePlayer = (direction) => {
    const playerIndex = game.tiles.findIndex((tile) => tile.player === true);
    let newPlayerIndex = playerIndex;
    const playerTile = game.tiles[playerIndex];
    const currentCol = playerTile.col;
    const currentRow = playerTile.row;

    switch (direction) {
      case MOVELEFT: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol - 1 && tile.row === currentRow,
        );
        break;
      }
      case MOVETOP: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol && tile.row === currentRow - 1,
        );
        break;
      }
      case MOVERIGHT: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol + 1 && tile.row === currentRow,
        );
        break;
      }
      case MOVEBOTTOM: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol && tile.row === currentRow + 1,
        );
        break;
      }
      default:
        break;
    }
    if (newPlayerIndex === -1) {
      return null;
    }

    switch (tool) {
      case CLEAN: {
        const payload = {
          direction,
          tile: newPlayerIndex,
        };
        execMoveAction(payload);
        break;
      }
      case FLAG:
      case TREASURE: {
        const payload = {
          method: tool,
          tile: newPlayerIndex,
        };
        execTileAction(payload);
        break;
      }
      default:
        break;
    }

    return null;
  };

  const gameMoveButtons = gameMoves.map((movement) => (
    <button
      key={movement}
      type="button"
      onClick={() => movePlayer(movement)}
    >
      {movement}
    </button>
  ));

  return (
    <div id="controller">
      {gameMoveButtons}
    </div>
  );
};
Controller.propTypes = {
  tool: PropTypes.string.isRequired,
  moveAction: PropTypes.func.isRequired,
  tilesAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  moveAction: (payload) => dispatch(moveAction(payload)),
  tilesAction: (payload) => dispatch(tilesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
