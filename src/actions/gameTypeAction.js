import { GAMETYPE } from '../types/actionTypes';

const stylesAction = (payload) => ({
  type: GAMETYPE,
  gameType: payload.gameType,
});
export default stylesAction;
