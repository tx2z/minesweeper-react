import { findTilePosition } from './generics';
import { RIGHT } from '../types/types';

/**
 * Create a 2D array with the position of the tiles in the board
 * @param {object} game
 */
const tilesPosition = (game) => {
  const position = [...new Array(game.rows)].map((rowValue, rowIndex) => {
    const row = [...new Array(game.cols)].map((colValue, colIndex) => {
      const index = colIndex + 1;
      const lastRowTile = rowIndex * game.cols;
      return index + lastRowTile;
    });
    return row;
  });
  return position;
};
/**
 * Create a 2D array with thenumber of mines around every position
 * @param {object} game
 */
const tilesMines = (game) => {
  const minesAround = [...new Array(game.rows)].map(() => {
    const row = [...new Array(game.cols)].map(() => 0);
    return row;
  });

  game.tiles.mines.forEach((mineTile) => {
    const minePosition = findTilePosition(game.tiles.position, mineTile);
    const tilesUp = minesAround[minePosition.row - 1];
    const tilesSame = minesAround[minePosition.row];
    const tilesDown = minesAround[minePosition.row + 1];
    if (tilesUp) {
      tilesUp[minePosition.col - 1] += 1;
      tilesUp[minePosition.col] += 1;
      tilesUp[minePosition.col + 1] += 1;
    }
    tilesSame[minePosition.col - 1] += 1;
    tilesSame[minePosition.col + 1] += 1;
    if (tilesDown) {
      tilesDown[minePosition.col - 1] += 1;
      tilesDown[minePosition.col] += 1;
      tilesDown[minePosition.col + 1] += 1;
    }
  });

  return minesAround;
};
/**
 * Prepare the game data to be played
 * @param {json} gameData
 */
export const prepareGame = (gameData) => {
  const game = JSON.parse(JSON.stringify(gameData));

  game.actions = {
    treasure: [],
    flag: [],
    open: [],
    focus: 1,
    player: game.tiles.playerStart,
    playerDirection: RIGHT,
  };
  game.found = {
    mines: [],
    treasures: [],
  };
  game.tiles.position = tilesPosition(game);
  game.tiles.minesAround = tilesMines(game);
  game.talk = false;
  game.over = false;
  game.cancelOver = false;
  game.overReason = '';
  game.controller = true;
  game.history = [];
  game.loaded = true;

  return game;
};
export default prepareGame;
