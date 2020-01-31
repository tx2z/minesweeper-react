import { MODAL, DELETE } from '../types/types';

export default (state = {}, action) => {
  switch (action.type) {
    case MODAL: {
      const newState = {
        show: action.show,
        content: state.content,
        callback: state.callback,
        modalType: state.modalType,
      };
      if (action.callback) {
        newState.callback = action.callback;
      }
      if (action.content) {
        newState.content = action.content;
      }
      if (action.content === DELETE) {
        newState.content = false;
        newState.callback = false;
      }
      if (action.modalType) {
        newState.modalType = action.modalType;
      }

      return newState;
    }
    default:
      return state;
  }
};
