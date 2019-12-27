import { FOCUS } from '../types/actionTypes';

const focusAction = (payload) => ({
  type: FOCUS,
  tile: payload.tile,
});
export default focusAction;
