import { GAME } from '../types/actionTypes';

const gameAction = (payload) => ({
  type: GAME,
  game: payload.game,
});
export default gameAction;
