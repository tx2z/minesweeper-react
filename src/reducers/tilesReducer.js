export default (state, action) => {
    switch (action.type) {
        case 'tiles': {
            let newTiles = JSON.parse(JSON.stringify(state.tiles));
            switch (action.method) {
                case 'click': {
                    newTiles[action.tile].open = true;
                    break;
                }
                default: 
                    break;
            }
            return {
                tiles: newTiles
            };
        }
        default:
            return state;
    }
};
  