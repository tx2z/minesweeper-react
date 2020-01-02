import { GAME } from '../types/types';

const gameAction = (payload) => ({
  type: GAME,
  game: payload.game,
});
export default gameAction;
