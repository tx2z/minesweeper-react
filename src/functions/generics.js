export const findTilePosition = (tilesPosition, tileIndex) => {
  for (let i = 0; i < tilesPosition.length; i += 1) {
    const index = tilesPosition[i].indexOf(tileIndex);
    if (index !== -1) {
      return {
        row: i,
        col: index,
      };
    }
  }
  return false;
};

/**
 * Open a modal window using the Modal component
 * @param {object} args
 * @param {function} args.modalAction Redux action that change the state of the modal
 * @param {boolean} [args.show=true] Show of hide the modal
 * @param {string} [args.content=''] The content inside the modal
 * @param {string} [args.type=''] Type of modal to apply styles. Options are MODAL, TALK
 * @param {function} [args.callback=null] Executed when the modal is closed
 */
export const showModal = (args) => {
  const argsDefault = {
    show: true,
    content: '',
    type: '',
    callback: null,
  };
  const argsWithDefaults = { ...argsDefault, ...args };
  const {
    modalAction, show, content, type, callback,
  } = argsWithDefaults;

  const payload = {
    show,
  };
  if (content) {
    payload.content = content;
  }
  if (callback !== null) {
    payload.callback = callback;
  }
  if (type) {
    payload.modalType = type;
  }
  modalAction(payload);
};
