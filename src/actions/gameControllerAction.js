import { CONTROLLER } from '../types/types';

const gameController = (payload) => ({
  type: CONTROLLER,
  value: payload.value,
});
export default gameController;
