import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import toolsReducer from './reducers/toolsReducer';

const initialState = {
  game: {
    loaded: false,
  },
  tools: {
    tool: 'clean',
  },
};

const rootReducer = combineReducers({
  game: gameReducer,
  tools: toolsReducer,
});

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
