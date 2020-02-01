import { OVER } from '../types/types';

const gameOverAction = (payload) => ({
  type: OVER,
  value: payload.value,
});
export default gameOverAction;
