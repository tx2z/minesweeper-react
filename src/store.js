import { createStore } from "redux";
import tilesReducer from "./reducers/tilesReducer";

import testGame from './_games/test'

const initialState = testGame;

function configureStore(state = initialState) {
    return createStore(tilesReducer, state);
}

export default configureStore;
