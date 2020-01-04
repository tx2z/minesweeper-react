import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MobileView } from 'react-device-detect';
import { GlobalHotKeys } from 'react-hotkeys';
import { ControllerKeyMap } from './ControllerKeyMap';
import { gameMoves, tools } from '../../configs';
import { findTilePosition } from '../../functions/generics';
import moveAction from '../../actions/moveAction';
import tilesAction from '../../actions/tilesAction';
import toolsAction from '../../actions/toolsAction';
import focusAction from '../../actions/focusAction';
import {
  LEFT, TOP, RIGHT, BOTTOM, PLAYER, NONE, CLASSIC, CLEAN, FLAG, TREASURE,
} from '../../types/types';
import { GAME } from '../../types/propTypes';
import './Controller.scss';

const Controller = (props) => {
  const {
    game,
    gameType,
    tool: selectedTool,
    toolsAction: chooseTool,
    moveAction: execMoveAction,
    tilesAction: execTileAction,
    focusAction: execFocusAction,
  } = props;

  const toolClick = (value) => {
    const payload = {
      value,
    };
    chooseTool(payload);
  };

  const whereToMove = (direction) => {
    const type = gameType === PLAYER ? 'player' : 'focus';
    const playerIndex = game.actions[type];
    if (direction === NONE) {
      return playerIndex;
    }
    const playerPosition = findTilePosition(game.tiles.position, playerIndex);
    let { col, row } = playerPosition;

    switch (direction) {
      case LEFT: {
        col -= 1;
        break;
      }
      case TOP: {
        row -= 1;
        break;
      }
      case RIGHT: {
        col += 1;
        break;
      }
      case BOTTOM: {
        row += 1;
        break;
      }
      default:
        break;
    }
    if (game.tiles.position[row] && game.tiles.position[row][col]) {
      return game.tiles.position[row][col];
    }
    return -1;
  };

  const playerAction = (direction, tool = selectedTool, event = null) => {
    if (event) {
      event.preventDefault();
    }

    const tileIndex = whereToMove(direction);

    if (tileIndex === -1) {
      return null;
    }

    switch (tool) {
      case CLEAN: {
        const payload = {
          tile: tileIndex,
        };
        if (gameType === PLAYER) {
          payload.direction = direction;
          execMoveAction(payload);
        } else if (gameType === CLASSIC) {
          payload.method = CLEAN;
          execTileAction(payload);
        }
        break;
      }
      case FLAG: {
        const payload = {
          method: FLAG,
          tile: tileIndex,
        };
        execTileAction(payload);
        break;
      }
      case TREASURE: {
        const payload = {
          method: TREASURE,
          tile: tileIndex,
        };
        execTileAction(payload);
        if (gameType === PLAYER) {
          payload.direction = direction;
          execMoveAction(payload);
        }
        break;
      }
      default:
        break;
    }

    return null;
  };

  const focusTile = (direction) => {
    const newFocusIndex = whereToMove(direction);
    if (newFocusIndex === -1) {
      return null;
    }
    const payload = {
      tile: newFocusIndex,
    };
    execFocusAction(payload);
    return null;
  };

  const HandlersClassic = {
    KEY_CLEAN: () => toolClick(CLEAN),
    KEY_FLAG: () => toolClick(FLAG),
    KEY_TREASURE: () => toolClick(TREASURE),

    KEY_LEFT: () => focusTile(LEFT),
    KEY_TOP: () => focusTile(TOP),
    KEY_RIGHT: () => focusTile(RIGHT),
    KEY_BOTTOM: () => focusTile(BOTTOM),

    KEY_EXEC: () => playerAction(NONE),
  };

  const HandlersPlayer = {
    KEY_FLAG: () => toolClick(FLAG),
    KEY_TREASURE: () => {
      toolClick(TREASURE);
      playerAction(NONE, TREASURE);
    },

    KEY_LEFT: (event) => playerAction(LEFT, CLEAN, event),
    KEY_TOP: (event) => playerAction(TOP, CLEAN, event),
    KEY_RIGHT: (event) => playerAction(RIGHT, CLEAN, event),
    KEY_BOTTOM: (event) => playerAction(BOTTOM, CLEAN, event),

    KEY_FLAG_LEFT: (event) => playerAction(LEFT, FLAG, event),
    KEY_FLAG_TOP: (event) => playerAction(TOP, FLAG, event),
    KEY_FLAG_RIGHT: (event) => playerAction(RIGHT, FLAG, event),
    KEY_FLAG_BOTTOM: (event) => playerAction(BOTTOM, FLAG, event),

    KEY_COMMAND_UP: () => toolClick(CLEAN),
  };

  const ControllerHandlers = gameType === PLAYER ? HandlersPlayer : HandlersClassic;

  return (
    <div id="controller">
      <GlobalHotKeys keyMap={ControllerKeyMap} handlers={ControllerHandlers} allowChanges>
        <Tools selectedTool={selectedTool} toolClick={toolClick} />
        <MoveTouch gameType={gameType} playerAction={playerAction} />
        <ToolTouch gameType={gameType} toolClick={toolClick} playerAction={playerAction} />
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
  focusAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
};

const Tools = (props) => {
  const { selectedTool, toolClick } = props;
  const toolButtons = tools.map((tool) => {
    let buttonClases = 'tool nes-btn is-primary';
    if (selectedTool === tool) {
      buttonClases += ' selected';
    }
    return (
      <button key={tool} type="button" className={buttonClases} onClick={() => toolClick(tool)}>
        {tool}
      </button>
    );
  });
  return <div id="Tools">{toolButtons}</div>;
};
Tools.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  toolClick: PropTypes.func.isRequired,
};

const MoveTouch = (props) => {
  const { gameType, playerAction } = props;
  if (gameType === PLAYER) {
    const moveIcons = {
      LEFT: 'gg-chevron-left',
      TOP: 'gg-chevron-up',
      RIGHT: 'gg-chevron-right',
      BOTTOM: 'gg-chevron-down',
    };
    const moveTouchButtons = gameMoves.map((movement) => (
      <div key={movement} className={movement}>
        <button
          type="button"
          className="nes-btn is-primary"
          onTouchStart={() => playerAction(movement)}
        >
          <i className={moveIcons[movement]} />
        </button>
      </div>
    ));
    return (<div id="MoveTouch">{moveTouchButtons}</div>);
  }
  return null;
};
MoveTouch.propTypes = {
  gameType: PropTypes.string.isRequired,
  playerAction: PropTypes.func.isRequired,
};

const ToolTouch = (props) => {
  const { gameType, toolClick, playerAction } = props;
  if (gameType === PLAYER) {
    const buttonTool = {
      buttonA: 'nes-btn is-error',
      buttonB: 'nes-btn is-success',
    };

    return (
      <div id="ToolTouch">
        <div key="buttonA" className="buttonA">
          <button
            type="button"
            className={buttonTool.buttonA}
            onTouchStart={() => toolClick(FLAG)}
            onTouchEnd={() => toolClick(CLEAN)}
          >
            A
          </button>
        </div>
        <div key="buttonB" className="buttonB">
          <button
            type="button"
            className={buttonTool.buttonB}
            onTouchStart={() => {
              toolClick(TREASURE);
              playerAction(NONE, TREASURE);
            }}
            onTouchEnd={() => toolClick(CLEAN)}
          >
            B
          </button>
        </div>
      </div>
    );
  }
  return null;
};
ToolTouch.propTypes = {
  gameType: PropTypes.string.isRequired,
  toolClick: PropTypes.func.isRequired,
  playerAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  moveAction: (payload) => dispatch(moveAction(payload)),
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  toolsAction: (payload) => dispatch(toolsAction(payload)),
  focusAction: (payload) => dispatch(focusAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
