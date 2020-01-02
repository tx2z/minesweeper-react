import { FOCUS } from '../types/types';

const focusAction = (payload) => ({
  type: FOCUS,
  tile: payload.tile,
});
export default focusAction;
