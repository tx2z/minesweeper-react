import { GAMETYPE } from '../types/types';

const stylesAction = (payload) => ({
  type: GAMETYPE,
  gameType: payload.gameType,
});
export default stylesAction;
