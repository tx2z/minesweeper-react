import { MODAL } from '../types/types';

const modalAction = (payload) => ({
  type: MODAL,
  show: payload.show,
  content: payload.content,
  callback: payload.callback,
  modalType: payload.modalType,
});
export default modalAction;
