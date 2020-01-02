import { MOVE } from '../types/types';

const tilesAction = (payload) => ({
  type: MOVE,
  tile: payload.tile,
});
export default tilesAction;
