import { TILE } from '../types/actionTypes';

const tilesAction = (payload) => ({
  type: TILE,
  method: payload.method,
  tile: payload.tile,
});
export default tilesAction;
