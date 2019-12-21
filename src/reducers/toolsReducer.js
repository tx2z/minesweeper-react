import { TOOL } from '../types/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case TOOL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.tool = action.value;
      return newState;
    }
    default:
      return state;
  }
};
