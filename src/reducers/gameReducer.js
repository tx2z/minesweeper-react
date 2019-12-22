import {
  GAME, TILE, MOVE, MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM,
} from '../types/actionTypes';
import { CLEAN, FLAG, TREASURE } from '../types/toolTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GAME: {
      return action.game;
    }
    case MOVE: {
      const newState = JSON.parse(JSON.stringify(state));
      const playerIndex = state.tiles.findIndex((tile) => tile.player === true);
      let newPlayerIndex = playerIndex;
      const playerTile = newState.tiles[playerIndex];
      const currentCol = playerTile.col;
      const currentRow = playerTile.row;
      switch (action.direction) {
        case MOVELEFT: {
          newPlayerIndex = state.tiles.findIndex(
            (tile) => tile.col === currentCol - 1 && tile.row === currentRow,
          );
          break;
        }
        case MOVETOP: {
          newPlayerIndex = state.tiles.findIndex(
            (tile) => tile.col === currentCol && tile.row === currentRow - 1,
          );
          break;
        }
        case MOVERIGHT: {
          newPlayerIndex = state.tiles.findIndex(
            (tile) => tile.col === currentCol + 1 && tile.row === currentRow,
          );
          break;
        }
        case MOVEBOTTOM: {
          newPlayerIndex = state.tiles.findIndex(
            (tile) => tile.col === currentCol && tile.row === currentRow + 1,
          );
          break;
        }
        default:
          break;
      }
      if (newPlayerIndex !== -1 && newState.tiles[newPlayerIndex].block !== true) {
        newState.tiles[newPlayerIndex].player = true;
        newState.tiles[playerIndex].player = false;
      }
      return newState;
    }
    case TILE: {
      const newState = JSON.parse(JSON.stringify(state));
      const actionTile = newState.tiles[action.tile];
      if (actionTile.block !== true && actionTile.open !== true) {
        switch (action.method) {
          case CLEAN: {
            actionTile.open = true;
            break;
          }
          case FLAG: {
            if (actionTile.flag) {
              newState.addedFlags -= 1;
              actionTile.flag = false;
            } else {
              newState.addedFlags += 1;
              actionTile.flag = true;
            }
            break;
          }
          case TREASURE: {
            if (actionTile.treasure === true) {
              actionTile.block = true;
              actionTile.foundTreasure = true;
            } else {
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
