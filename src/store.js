import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import toolsReducer from './reducers/toolsReducer';
import stylesReducer from './reducers/stylesReducer';
import { CLEAN } from './types/toolTypes';

const initialState = {
  game: {
    loaded: false,
  },
  tools: {
    tool: CLEAN,
  },
  styles: '',
};

const rootReducer = combineReducers({
  game: gameReducer,
  tools: toolsReducer,
  styles: stylesReducer,
});

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
