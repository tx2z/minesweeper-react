import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import toolsReducer from './reducers/toolsReducer';
import stylesReducer from './reducers/stylesReducer';
import gameTypeReducer from './reducers/gameTypeReducer';
import { CLEAN } from './types/toolTypes';
import { PLAYER } from './types/actionTypes';

const initialState = {
  game: {
    loaded: false,
  },
  tool: CLEAN,
  styles: '',
  gameType: PLAYER,
};

const rootReducer = combineReducers({
  game: gameReducer,
  tool: toolsReducer,
  styles: stylesReducer,
  gameType: gameTypeReducer,
});

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
