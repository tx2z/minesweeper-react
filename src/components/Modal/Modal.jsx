import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import modalAction from '../../actions/modalAction';
import { showModal } from '../../functions/generics';
import './Modal.scss';
import { DELETE, TALK, OVER } from '../../types/types';
import { MODAL } from '../../types/propTypes';

const Modal = (props) => {
  const { modal, modalAction: execModalAction } = props;

  const execCallback = () => {
    if (!modal.show && modal.content) {
      const modalArgs = {
        modalAction: execModalAction,
        show: false,
        content: DELETE,
      };
      showModal(modalArgs);
      if (modal.callback) {
        modal.callback();
      }
    }
  };

  const showCloseButton = () => {
    if (modal.modalType !== TALK && modal.modalType !== OVER) {
      return (
        <button
          className="close"
          type="button"
          onClick={() => showModal({ modalAction: execModalAction, show: false })}
        >
        X
        </button>
      );
    }
    return '';
  };

  const closeButton = showCloseButton();

  return (
    <Rodal
      visible={modal.show}
      onAnimationEnd={execCallback}
      onClose={execCallback}
      showCloseButton={false}
      animation="slideDown"
      width={80}
      height={60}
      measure="%"
      className={modal.modalType}
    >
      <div className="modal-content">
        {modal.content}
        {closeButton}
      </div>
    </Rodal>
  );
};
Modal.propTypes = {
  modal: MODAL.isRequired,
  modalAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  modalAction: (payload) => dispatch(modalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
