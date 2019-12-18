import { createStore, combineReducers } from 'redux';

import tilesReducer from './reducers/tilesReducer';
import toolsReducer from './reducers/toolsReducer';

// import game from './_games/test';
// import * as functions from './functions/functions';

// const newGame = functions.prepareGame(game);

const initialState = {
  game: {
    loaded: false,
  },
  tools: {
    tool: 'clean',
  },
};

const rootReducer = combineReducers({
  game: tilesReducer,
  tools: toolsReducer,
});

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
