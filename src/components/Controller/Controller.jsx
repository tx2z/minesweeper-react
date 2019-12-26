import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';
import { ControllerKeyMap } from './ControllerKeyMap';
import { gameMoves, tools } from '../../configs';
import moveAction from '../../actions/moveAction';
import tilesAction from '../../actions/tilesAction';
import toolsAction from '../../actions/toolsAction';
import { CLEAN, FLAG, TREASURE } from '../../types/toolTypes';
import {
  LEFT, TOP, RIGHT, BOTTOM, PLAYER,
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

  const whereToMove = (direction) => {
    const playerIndex = game.tiles.findIndex((tile) => tile.player === true);
    let newPlayerIndex = playerIndex;
    const playerTile = game.tiles[playerIndex];
    const currentCol = playerTile.col;
    const currentRow = playerTile.row;

    switch (direction) {
      case LEFT: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol - 1 && tile.row === currentRow,
        );
        break;
      }
      case TOP: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol && tile.row === currentRow - 1,
        );
        break;
      }
      case RIGHT: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol + 1 && tile.row === currentRow,
        );
        break;
      }
      case BOTTOM: {
        newPlayerIndex = game.tiles.findIndex(
          (tile) => tile.col === currentCol && tile.row === currentRow + 1,
        );
        break;
      }
      default:
        break;
    }
    return newPlayerIndex;
  };

  const playerAction = (direction, tool = selectedTool) => {
    if (gameType !== PLAYER) {
      return null;
    }

    const newPlayerIndex = whereToMove(direction);
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
      onClick={() => playerAction(movement)}
    >
      {movement}
    </button>
  ));

  let ControllerHandlers = {
    KEY_CLEAN: () => toolClick(CLEAN),
    KEY_FLAG: () => toolClick(FLAG),
    KEY_TREASURE: () => toolClick(TREASURE),
  };

  if (gameType === PLAYER) {
    ControllerHandlers = {
      KEY_LEFT: () => playerAction(LEFT, CLEAN),
      KEY_TOP: () => playerAction(TOP, CLEAN),
      KEY_RIGHT: () => playerAction(RIGHT, CLEAN),
      KEY_BOTTOM: () => playerAction(BOTTOM, CLEAN),
      KEY_FLAG_LEFT: () => playerAction(LEFT, FLAG),
      KEY_FLAG_TOP: () => playerAction(TOP, FLAG),
      KEY_FLAG_RIGHT: () => playerAction(RIGHT, FLAG),
      KEY_FLAG_BOTTOM: () => playerAction(BOTTOM, FLAG),
      KEY_TREASURE_LEFT: () => playerAction(LEFT, TREASURE),
      KEY_TREASURE_TOP: () => playerAction(TOP, TREASURE),
      KEY_TREASURE_RIGHT: () => playerAction(RIGHT, TREASURE),
      KEY_TREASURE_BOTTOM: () => playerAction(BOTTOM, TREASURE),
    };
  }

  return (
    <div id="controller">
      <GlobalHotKeys keyMap={ControllerKeyMap} handlers={ControllerHandlers} allowChanges>
        <div id="tools">
          {toolButtons}
        </div>
        {gameType === PLAYER ? gameMoveButtons : ''}
      </GlobalHotKeys>
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
