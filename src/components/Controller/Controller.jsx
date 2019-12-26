import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { ControllerKeyMap } from './ControllerKeyMap';
import { gameMoves, tools } from '../../configs';
import moveAction from '../../actions/moveAction';
import tilesAction from '../../actions/tilesAction';
import toolsAction from '../../actions/toolsAction';
import { CLEAN, FLAG, TREASURE } from '../../types/toolTypes';
import {
  MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM, PLAYER,
} from '../../types/actionTypes';
import { GAME } from '../../types/propTypes';
import './Controller.css';

const Controller = (props) => {
  const {
    game,
    gameType,
    tool: selectedTool,
    toolsAction: chooseTool,
    moveAction: execMoveAction,
    tilesAction: execTileAction,
  } = props;

  const toolClick = (value) => {
    const payload = {
      value,
    };
    chooseTool(payload);
  };

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

    switch (selectedTool) {
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
          method: selectedTool,
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

  const toolButtons = tools.map((tool) => {
    let buttonClases = 'tool';
    if (selectedTool === tool) {
      buttonClases += ' selected';
    }
    return (
      <button
        key={tool}
        type="button"
        className={buttonClases}
        onClick={() => toolClick(tool)}
      >
        {tool}
      </button>
    );
  });

  const gameMoveButtons = gameMoves.map((movement) => (
    <button
      key={movement}
      type="button"
      onClick={() => movePlayer(movement)}
    >
      {movement}
    </button>
  ));

  const ControllerHandlers = {
    MOVELEFT: () => movePlayer(MOVELEFT),
    MOVETOP: () => movePlayer(MOVETOP),
    MOVERIGHT: () => movePlayer(MOVERIGHT),
    MOVEBOTTOM: () => movePlayer(MOVEBOTTOM),
    CLEAN: () => toolClick(CLEAN),
    FLAG: () => toolClick(FLAG),
    TREASURE: () => toolClick(TREASURE),
  };

  return (
    <div id="controller">
      <HotKeys keyMap={ControllerKeyMap} handlers={ControllerHandlers} allowChanges>
        <div id="tools">
          {toolButtons}
        </div>
        {gameType === PLAYER ? gameMoveButtons : ''}
      </HotKeys>
    </div>
  );
};
Controller.propTypes = {
  tool: PropTypes.string.isRequired,
  gameType: PropTypes.string.isRequired,
  moveAction: PropTypes.func.isRequired,
  tilesAction: PropTypes.func.isRequired,
  toolsAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  moveAction: (payload) => dispatch(moveAction(payload)),
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  toolsAction: (payload) => dispatch(toolsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
