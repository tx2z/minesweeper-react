import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import modalAction from '../../actions/modalAction';
import gameControllerAction from '../../actions/gameControllerAction';
import { showModal } from '../../functions/generics';
import { GAME } from '../../types/propTypes';
import { MINE } from '../../types/types';
import './GameOver.scss';

const GameOver = (props) => {
  const {
    game,
    reason,
    history,
    modalAction: execModalAction,
    gameControllerAction: showController,
  } = props;

  if (game.controller && game.over) {
    showController({ value: false });
  }

  const returnHome = () => {
    showModal({ modalAction: execModalAction, show: false });
    history.push('/');
  };

  const reload = () => {
    showModal({ modalAction: execModalAction, show: false });
    history.push(`/refresh${history.location.pathname}`);
  };
  const loadMessage = () => {
    if (reason === MINE) {
      return 'You hit a mine';
    }
    return 'GAME OVER';
  };

  const message = loadMessage();

  return (
    <div className="GameOver">
      {message}
      <div className="buttons">
        <button type="button" onClick={() => returnHome()}>
          Return to the home page
        </button>
        <button type="button" onClick={() => reload()}>
          Play again
        </button>
      </div>
    </div>
  );
};
GameOver.propTypes = {
  game: GAME.isRequired,
  reason: PropTypes.string.isRequired,
  modalAction: PropTypes.func.isRequired,
  gameControllerAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  modalAction: (payload) => dispatch(modalAction(payload)),
  gameControllerAction: (payload) => dispatch(gameControllerAction(payload)),
});

const GameOverWithRouter = withRouter(GameOver);
export default connect(mapStateToProps, mapDispatchToProps)(GameOverWithRouter);
