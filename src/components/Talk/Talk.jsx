import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import talkCleanAction from '../../actions/talkCleanAction';
import { GAME } from '../../types/propTypes';
import './Talk.scss';

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
    <div className="Talk modal">
      <div className="modal-content">
        <div className="character">{character}</div>
        <div className="text">{text}</div>
        <button type="button" onClick={closeTalk}>Close</button>
      </div>
    </div>
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
