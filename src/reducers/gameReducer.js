import {
  GAME, TILE, MOVE, FOCUS,
} from '../types/actionTypes';
import { CLEAN, FLAG, TREASURE } from '../types/toolTypes';

export default (state = {}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GAME: {
      return action.game;
    }
    case MOVE: {
      const playerIndex = state.tiles.findIndex((tile) => tile.player === true);
      if (newState.tiles[action.tile].block !== true) {
        newState.tiles[action.tile].player = true;
        newState.tiles[playerIndex].player = false;
      }
      return newState;
    }
    case FOCUS: {
      const focusIndex = state.tiles.findIndex((tile) => tile.focus === true);

      newState.tiles[action.tile].focus = true;
      newState.tiles[focusIndex].focus = false;

      return newState;
    }
    case TILE: {
      const actionTile = newState.tiles[action.tile];
      if (actionTile.block !== true) {
        switch (action.method) {
          case CLEAN: {
            if (actionTile.open !== true) {
              actionTile.open = true;
            }
            break;
          }
          case FLAG: {
            if (actionTile.flag) {
              newState.addedFlags -= 1;
              actionTile.flag = false;
            } else if (actionTile.open !== true) {
              newState.addedFlags += 1;
              actionTile.flag = true;
            }
            break;
          }
          case TREASURE: {
            if (actionTile.treasure === true && actionTile.open !== true) {
              actionTile.foundTreasure = true;
            } else if (actionTile.open !== true) {
              newState.tiles = state.tiles.map((item) => {
                const tile = item;
                if (
                  tile.col >= actionTile.col - 1
                  && tile.col <= actionTile.col + 1
                  && tile.row >= actionTile.row - 1
                  && tile.row <= actionTile.row + 1
                  && tile.block !== true
                  && tile.open !== true
                  && tile.flag !== true
                ) {
                  tile.open = true;
                }
                return tile;
              });
            }
            break;
          }
          default:
            break;
        }
      }
      return newState;
    }
    default:
      return state;
  }
};
