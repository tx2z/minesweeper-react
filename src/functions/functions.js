/**
 * Add col and row to every tile in the tiles array
 * @param {array} tiles An array of tiles
 * @param {number} cols Number of colums in the game
 */
const tilesPosition = (tiles, cols) => {
  let currentCol = 0;
  let currentRow = 0;
  const tilesWithPosition = tiles.map((tile, index) => {
    tile.row = Math.floor(index / cols);
    if (tile.row !== currentRow) {
      currentRow++;
      currentCol = 0;
    }
    tile.col = currentCol;
    currentCol++;
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
    tile.number = 0;
    if (tile.mine !== true && tile.block !== true) {
      // Find mines around
      tiles.filter((item) => {
        if (
          item.col >= tile.col - 1
          && item.col <= tile.col + 1
          && item.row >= tile.row - 1
          && item.row <= tile.row + 1
          && item.mine === true
        ) {
          tile.number++;
        }
        return item;
      });
    }
    return tile;
  });
  return tilesWithNumber;
};

/**
 * Prepare the game data to be played
 * @param {json} initialGame
 */
export const prepareGame = (initialGame) => {
  const game = JSON.parse(JSON.stringify(initialGame));

  // Add position to tiles
  const tilesWithPosition = tilesPosition(initialGame.tiles, initialGame.cols);

  // Add mine around number to tiles
  const tilesWithNumber = tilesNumber(tilesWithPosition);

  game.tiles = tilesWithNumber;

  game.addedFlags = 0;

  const tools = {
    tool: 'clean',
  };

  return {
    game,
    tools,
  };
};
export default prepareGame;
