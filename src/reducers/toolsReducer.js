import { TOOL } from '../types/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case TOOL: {
      return action.value;
    }
    default:
      return state;
  }
};
