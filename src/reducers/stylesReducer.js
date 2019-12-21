import { STYLES } from '../types/actionTypes';

export default (state = '', action) => {
  switch (action.type) {
    case STYLES: {
      return action.value;
    }
    default:
      return state;
  }
};
