import { TOOL } from '../types/types';

const toolsAction = (payload) => ({
  type: TOOL,
  value: payload.value,
});
export default toolsAction;
