import { TOOL } from '../types/actionTypes';

const toolsAction = (payload) => ({
  type: TOOL,
  value: payload.value,
});
export default toolsAction;
