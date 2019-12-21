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
      if (currentTile.block !== true) {
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
            // TODO: explode around
            currentTile.open = true;
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
