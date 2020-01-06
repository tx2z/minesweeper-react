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
import talkCleanAction from '../../actions/talkCleanAction';
import {
  LEFT,
  TOP,
  RIGHT,
  BOTTOM,
  PLAYER,
  NONE,
  CLASSIC,
  CLEAN,
  FLAG,
  TREASURE,
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
    talkCleanAction: execTalkCleanAction,
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

  const closeTalk = () => {
    execTalkCleanAction();
  };

  const HandlersClassic = {
    KEY_CLEAN: () => toolClick(CLEAN),
    KEY_A: () => toolClick(FLAG),
    KEY_B: () => toolClick(TREASURE),

    KEY_LEFT: () => focusTile(LEFT),
    KEY_TOP: () => focusTile(TOP),
    KEY_RIGHT: () => focusTile(RIGHT),
    KEY_BOTTOM: () => focusTile(BOTTOM),

    KEY_EXEC: () => playerAction(NONE),
  };

  const HandlersPlayer = {
    KEY_A: () => toolClick(FLAG),
    KEY_B: () => {
      toolClick(TREASURE);
      playerAction(NONE, TREASURE);
    },

    KEY_LEFT: (event) => playerAction(LEFT, CLEAN, event),
    KEY_TOP: (event) => playerAction(TOP, CLEAN, event),
    KEY_RIGHT: (event) => playerAction(RIGHT, CLEAN, event),
    KEY_BOTTOM: (event) => playerAction(BOTTOM, CLEAN, event),

    KEY_A_LEFT: (event) => playerAction(LEFT, FLAG, event),
    KEY_A_TOP: (event) => playerAction(TOP, FLAG, event),
    KEY_A_RIGHT: (event) => playerAction(RIGHT, FLAG, event),
    KEY_A_BOTTOM: (event) => playerAction(BOTTOM, FLAG, event),

    KEY_COMMAND_UP: () => toolClick(CLEAN),
  };

  const gameTalk = !!game.talk;

  const Handlers = gameType === PLAYER ? HandlersPlayer : HandlersClassic;
  const HandlersModal = {
    KEY_A: () => closeTalk(),
    KEY_B: () => closeTalk(),
  };
  const ControllerHandlers = gameTalk ? HandlersModal : Handlers;

  return (
    <div id="controller">
      <GlobalHotKeys keyMap={ControllerKeyMap} handlers={ControllerHandlers} allowChanges>
        <Tools selectedTool={selectedTool} toolClick={toolClick} />
        <MoveTouch
          gameTalk={gameTalk}
          gameType={gameType}
          playerAction={playerAction}
        />
        <ButtonsTouch
          gameTalk={gameTalk}
          gameType={gameType}
          toolClick={toolClick}
          playerAction={playerAction}
          closeTalk={closeTalk}
        />
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
  talkCleanAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
};

const Tools = (props) => {
  const { selectedTool, toolClick } = props;
  const toolButtons = tools.map((tool) => {
    let buttonClases = 'tool';
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
  const { gameType, playerAction, gameTalk } = props;
  if (gameType === PLAYER) {
    const moveIcons = {
      LEFT: 'gg-chevron-left',
      TOP: 'gg-chevron-up',
      RIGHT: 'gg-chevron-right',
      BOTTOM: 'gg-chevron-down',
    };

    const action = (movement) => {
      if (!gameTalk) {
        playerAction(movement);
      }
    };

    const moveTouchButtons = gameMoves.map((movement) => (
      <div key={movement} className={movement}>
        <button type="button" className="" onTouchStart={() => action(movement)}>
          <i className={moveIcons[movement]} />
        </button>
      </div>
    ));
    return <div id="MoveTouch">{moveTouchButtons}</div>;
  }
  return null;
};
MoveTouch.propTypes = {
  gameType: PropTypes.string.isRequired,
  playerAction: PropTypes.func.isRequired,
  gameTalk: PropTypes.bool.isRequired,
};

const ButtonsTouch = (props) => {
  const {
    gameType, toolClick, playerAction, closeTalk, gameTalk,
  } = props;
  if (gameType === PLAYER) {
    const buttonTool = {
      buttonA: 'button-styles',
      buttonB: 'button-styles',
    };

    const action = (button) => {
      if (gameTalk) {
        closeTalk();
      } else {
        switch (button) {
          case 'buttonA': {
            toolClick(FLAG);
            break;
          }
          case 'buttonB': {
            toolClick(TREASURE);
            playerAction(NONE, TREASURE);
            break;
          }
          default:
            break;
        }
      }
    };

    return (
      <div id="ButtonsTouch">
        <div key="buttonA" className="buttonA">
          <button
            type="button"
            className={buttonTool.buttonA}
            onTouchStart={() => action('buttonA')}
            onTouchEnd={() => toolClick(CLEAN)}
          >
            A
          </button>
        </div>
        <div key="buttonB" className="buttonB">
          <button
            type="button"
            className={buttonTool.buttonB}
            onTouchStart={() => action('buttonB')}
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
ButtonsTouch.propTypes = {
  gameType: PropTypes.string.isRequired,
  toolClick: PropTypes.func.isRequired,
  playerAction: PropTypes.func.isRequired,
  closeTalk: PropTypes.func.isRequired,
  gameTalk: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  moveAction: (payload) => dispatch(moveAction(payload)),
  tilesAction: (payload) => dispatch(tilesAction(payload)),
  toolsAction: (payload) => dispatch(toolsAction(payload)),
  focusAction: (payload) => dispatch(focusAction(payload)),
  talkCleanAction: (payload) => dispatch(talkCleanAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
