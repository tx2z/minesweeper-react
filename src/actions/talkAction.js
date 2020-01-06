import { TALK } from '../types/types';

const talkAction = (payload) => ({
  type: TALK,
  clean: false,
  character: payload.character,
  text: payload.text,
});
export default talkAction;
