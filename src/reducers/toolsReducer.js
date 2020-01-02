import { TOOL } from '../types/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TOOL: {
      return action.value;
    }
    default:
      return state;
  }
};
