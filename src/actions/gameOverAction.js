import { OVER } from '../types/types';

const gameOverAction = (payload) => ({
  type: OVER,
  value: payload.value,
  reason: payload.reason,
  cancelOver: payload.cancelOver || false,
});
export default gameOverAction;
