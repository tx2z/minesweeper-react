import { MOVE } from '../types/types';

const moveAction = (payload) => ({
  type: MOVE,
  tile: payload.tile,
  direction: payload.direction,
});
export default moveAction;
