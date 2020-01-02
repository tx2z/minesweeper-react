import { STYLES } from '../types/types';

const stylesAction = (payload) => ({
  type: STYLES,
  value: payload.value,
});
export default stylesAction;
