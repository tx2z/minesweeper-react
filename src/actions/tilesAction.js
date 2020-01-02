import { TILE } from '../types/types';

const tilesAction = (payload) => ({
  type: TILE,
  method: payload.method,
  tile: payload.tile,
});
export default tilesAction;
