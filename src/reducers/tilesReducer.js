export default (state, action) => {
    switch (action.type) {
        case "tiles": {
            let newTiles = state.tiles.slice(0, state.tiles.length);
            newTiles[action.payload.tile] = action.payload.state;
            return {
                tiles: newTiles
            };
        }
        default:
            return state;
    }
};
  