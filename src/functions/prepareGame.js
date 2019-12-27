/**
 * Add col and row to every tile in the tiles array
 * @param {array} tiles An array of tiles
 * @param {number} cols Number of colums in the game
 */
const tilesPosition = (tiles, cols) => {
  let currentCol = 0;
  let currentRow = 0;
  const tilesWithPosition = tiles.map((tile, index) => {
    const newTile = tile;
    newTile.row = Math.floor(index / cols);
    if (tile.row !== currentRow) {
      currentRow += 1;
      currentCol = 0;
    }
    newTile.col = currentCol;
    currentCol += 1;
    return tile;
  });
  return tilesWithPosition;
};

/**
 * Add the number of mines around to every tile
 * @param {array} tiles An array of tiles
 */
const tilesNumber = (tiles) => {
  const tilesWithNumber = tiles.map((tile) => {
    const newTile = tile;
    newTile.number = 0;
    if (newTile.mine !== true && newTile.block !== true) {
      // Find mines around
      tiles.filter((item) => {
        if (
          item.col >= newTile.col - 1
          && item.col <= newTile.col + 1
          && item.row >= newTile.row - 1
          && item.row <= newTile.row + 1
          && item.mine === true
        ) {
          newTile.number += 1;
        }
        return item;
      });
    }
    return newTile;
  });
  return tilesWithNumber;
};
/**
 * Add the player & focus at his initial position
 * @param {array} tiles An array of tiles
 */
const tilesPlayerFocus = (tiles) => {
  const tilesWithPlayer = tiles.map((tile, index) => {
    const newTile = tile;
    if (tile.initPlayer) {
      newTile.player = true;
    }
    if (index === 0) {
      newTile.focus = true;
    }
    return newTile;
  });
  return tilesWithPlayer;
};

/**
 * Prepare the game data to be played
 * @param {json} gameData
 */
export const prepareGame = (gameData) => {
  const game = JSON.parse(JSON.stringify(gameData));

  // Add position to tiles
  const tilesWithPosition = tilesPosition(gameData.tiles, gameData.cols);

  // Add mine around number to tiles
  const tilesWithNumber = tilesNumber(tilesWithPosition);

  // Add player to his initial position tile
  const tilesWithPlayer = tilesPlayerFocus(tilesWithNumber);

  game.tiles = tilesWithPlayer;
  game.addedFlags = 0;
  game.loaded = true;

  return game;
};
export default prepareGame;
