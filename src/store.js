import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import toolsReducer from './reducers/toolsReducer';
import modalReducer from './reducers/modalReducer';
import stylesReducer from './reducers/stylesReducer';
import gameTypeReducer from './reducers/gameTypeReducer';
import { initialState } from './configs';

const rootReducer = combineReducers({
  game: gameReducer,
  tool: toolsReducer,
  modal: modalReducer,
  styles: stylesReducer,
  gameType: gameTypeReducer,
});

function configureStore(state = initialState) {
  return createStore(rootReducer, state);
}

export default configureStore;
