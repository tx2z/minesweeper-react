import { STYLES } from '../types/actionTypes';

const stylesAction = (payload) => ({
  type: STYLES,
  value: payload.value,
});
export default stylesAction;
