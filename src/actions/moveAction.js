import { MOVE } from '../types/actionTypes';

const tilesAction = (payload) => ({
  type: MOVE,
  tile: payload.tile,
});
export default tilesAction;
