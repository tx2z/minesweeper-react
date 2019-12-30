export const findTilePosition = (tilesPosition, tileIndex) => {
  for (let i = 0; i < tilesPosition.length; i += 1) {
    const index = tilesPosition[i].indexOf(tileIndex);
    if (index !== -1) {
      return {
        row: i,
        col: index,
      };
    }
  }
  return false;
};

export const otrafunc = () => null;
