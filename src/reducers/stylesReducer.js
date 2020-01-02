import { STYLES } from '../types/types';

export default (state = '', action) => {
  switch (action.type) {
    case STYLES: {
      return action.value;
    }
    default:
      return state;
  }
};
