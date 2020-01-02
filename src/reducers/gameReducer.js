import { findTilePosition } from '../functions/generics';
import {
  GAME, TILE, MOVE, FOCUS, CLEAN, FLAG, TREASURE,
} from '../types/types';

export default (state = {}, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GAME: {
      return action.game;
    }
    case MOVE: {
      if (!state.tiles.block.includes(action.tile)) {
        newState.actions.player = action.tile;
      }
      return newState;
    }
    case FOCUS: {
      newState.actions.focus = action.tile;
      return newState;
    }
    case TILE: {
      if (!state.tiles.block.includes(action.tile)) {
        switch (action.method) {
          case CLEAN: {
            if (!state.actions.open.includes(action.tile)) {
              newState.actions.open.push(action.tile);
            }
            break;
          }
          case FLAG: {
            if (state.actions.flag.includes(action.tile)) {
              const indexFlag = state.actions.flag.indexOf(action.tile);
              newState.actions.flag.splice(indexFlag, 1);
              if (state.tiles.mines.includes(action.tile)) {
                const indexMine = state.found.mines.indexOf(action.tile);
                newState.found.mines.splice(indexMine, 1);
              }
            } else if (!state.actions.open.includes(action.tile)) {
              newState.actions.flag.push(action.tile);
              if (state.tiles.mines.includes(action.tile)) {
                newState.found.mines.push(action.tile);
              }
            }
            break;
          }
          case TREASURE: {
            newState.actions.treasure.push(action.tile);
            if (state.tiles.treasures.includes(action.tile)) {
              newState.found.treasures.push(action.tile);
              newState.found.treasures = [...new Set(newState.found.treasures)];
            } else {
              const tilePosition = findTilePosition(state.tiles.position, action.tile);
              const tilesUp = state.tiles.position[tilePosition.row - 1];
              const tilesSame = state.tiles.position[tilePosition.row];
              const tilesDown = state.tiles.position[tilePosition.row + 1];
              const tilesToOpen = new Set();
              tilesToOpen.add(action.tile);
              if (tilesUp) {
                tilesToOpen.add(tilesUp[tilePosition.col - 1]);
                tilesToOpen.add(tilesUp[tilePosition.col]);
                tilesToOpen.add(tilesUp[tilePosition.col + 1]);
              }
              tilesToOpen.add(tilesSame[tilePosition.col - 1]);
              tilesToOpen.add(tilesSame[tilePosition.col + 1]);
              if (tilesDown) {
                tilesToOpen.add(tilesDown[tilePosition.col - 1]);
                tilesToOpen.add(tilesDown[tilePosition.col]);
                tilesToOpen.add(tilesDown[tilePosition.col + 1]);
              }
              tilesToOpen.delete(undefined);
              tilesToOpen.forEach((value) => {
                if (state.actions.open.includes(value) && state.tiles.block.includes(value)) {
                  tilesToOpen.delete(value);
                }
              });

              newState.actions.open = [...new Set([...state.actions.open, ...tilesToOpen])];
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
