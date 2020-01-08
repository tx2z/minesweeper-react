import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import talkCleanAction from '../../actions/talkCleanAction';
import { GAME } from '../../types/propTypes';
import Modal from '../Modal/Modal';

const Talk = (props) => {
  const { game, talkCleanAction: execTalkCleanAction } = props;

  if (!game.talk) {
    return '';
  }

  const { character, text } = game.talk;

  const closeTalk = () => {
    execTalkCleanAction();
  };

  return (
    <Modal close={closeTalk}>
      <div className="character">{character}</div>
      <div className="text">{text}</div>
    </Modal>
  );
};
Talk.propTypes = {
  game: GAME.isRequired,
  talkCleanAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  talkCleanAction: (payload) => dispatch(talkCleanAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Talk);
