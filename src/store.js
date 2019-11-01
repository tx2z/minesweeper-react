import { createStore } from "redux";
import tilesReducer from "./reducers/tilesReducer";

import * as game from './_games/test'

const initialState = {
    tiles: Array(game.arrayGameClasses.length).fill(0),
}
function configureStore(state = initialState) {
    return createStore(tilesReducer, state);
}

export default configureStore;
