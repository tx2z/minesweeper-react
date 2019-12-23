import { GAMETYPE } from '../types/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GAMETYPE: {
      return action.gameType;
    }
    default:
      return state;
  }
};
