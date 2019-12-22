import { MOVE } from '../types/actionTypes';

const tilesAction = (payload) => ({
  type: MOVE,
  direction: payload.direction,
  tile: payload.tile,
});
export default tilesAction;
