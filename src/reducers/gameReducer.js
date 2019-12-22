import { GAME, TILE } from '../types/actionTypes';
import { CLEAN, FLAG, TREASURE } from '../types/toolTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GAME: {
      return action.game;
    }
    case TILE: {
      const newState = JSON.parse(JSON.stringify(state));
      const currentTile = newState.tiles[action.tile];
      if (currentTile.block !== true && currentTile.open !== true) {
        switch (action.method) {
          case CLEAN: {
            currentTile.open = true;
            break;
          }
          case FLAG: {
            if (currentTile.flag) {
              newState.addedFlags -= 1;
              currentTile.flag = false;
            } else {
              newState.addedFlags += 1;
              currentTile.flag = true;
            }
            break;
          }
          case TREASURE: {
            if (currentTile.treasure === true) {
              currentTile.block = true;
              currentTile.foundTreasure = true;
            } else {
              newState.tiles = state.tiles.map((item) => {
                const tile = item;
                if (
                  tile.col >= currentTile.col - 1
                  && tile.col <= currentTile.col + 1
                  && tile.row >= currentTile.row - 1
                  && tile.row <= currentTile.row + 1
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
