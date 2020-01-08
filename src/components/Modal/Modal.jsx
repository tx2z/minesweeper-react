import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = (props) => {
  const { children, close } = props;
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button type="button" onClick={close}>Close</button>
      </div>
    </div>
  );
};
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
