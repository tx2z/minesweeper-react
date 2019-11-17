import { createStore } from "redux";
import tilesReducer from "./reducers/tilesReducer";

import game from './_games/test'
import * as functions from './functions/functions'

const newGame = functions.prepareGame(game);

const initialState = newGame;

function configureStore(state = initialState) {
  return createStore(tilesReducer, state);
}

export default configureStore;
