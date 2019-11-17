export default (state, action) => {
  switch (action.type) {
    case 'tiles': {
      let newTiles = JSON.parse(JSON.stringify(state.tiles));
      const currentTile = newTiles[action.tile];
      if (currentTile.block !== true) {
        switch (action.method) {
          case 'click': {
            currentTile.open = true;
            break;
          }
          default: 
            break;
        }
      }
      return {
        tiles: newTiles
      };
    }
    default:
      return state;
  }
};