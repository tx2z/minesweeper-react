export default (state = {}, action) => {
  switch (action.type) {
    case 'game': {
      return action.game;
    }
    case 'tiles': {
      const newState = JSON.parse(JSON.stringify(state));
      const currentTile = newState.tiles[action.tile];
      if (currentTile.block !== true) {
        switch (action.method) {
          case 'clean': {
            currentTile.open = true;
            break;
          }
          case 'flag': {
            if (currentTile.flag) {
              newState.addedFlags -= 1;
              currentTile.flag = false;
            } else {
              newState.addedFlags += 1;
              currentTile.flag = true;
            }
            break;
          }
          case 'treasure': {
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
