import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import modalAction from '../../actions/modalAction';
import gameControllerAction from '../../actions/gameControllerAction';
import gameOverAction from '../../actions/gameOverAction';
import { showModal } from '../../functions/generics';
import { GAME } from '../../types/propTypes';
import { MINE, LASTTILE, OVER } from '../../types/types';
import './GameOver.scss';

const GameOver = (props) => {
  const {
    game,
    reason,
    history,
    modalAction: execModalAction,
    gameControllerAction: showController,
    gameOverAction: execgameOverAction,
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

  const continuePlaying = () => {
    showModal({ modalAction: execModalAction, show: false });
    showController({ value: true });
    const gameOverPayload = {
      method: OVER,
      value: false,
      cancelOver: true,
      reason: '',
    };
    execgameOverAction(gameOverPayload);
  };

  const loadMessage = () => {
    if (reason === MINE) {
      return { title: 'You hit a mine', msg: '' };
    }
    if (reason === LASTTILE) {
      return { title: 'Level finished!', msg: game.endMessage || 'You did it!' };
    }
    return { title: 'GAME OVER', msg: '' };
  };

  const loadButtons = () => {
    if (reason === LASTTILE) {
      return (
        <button type="button" onClick={() => continuePlaying()}>
          Continue playing
        </button>
      );
    }
    return '';
  };

  const message = loadMessage();
  const extrabuttons = loadButtons();

  return (
    <div className="GameOver">
      <h2>{message.title}</h2>
      <p>{message.msg}</p>
      <div className="buttons">
        {extrabuttons}
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
  gameOverAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  modalAction: (payload) => dispatch(modalAction(payload)),
  gameControllerAction: (payload) => dispatch(gameControllerAction(payload)),
  gameOverAction: (payload) => dispatch(gameOverAction(payload)),
});

const GameOverWithRouter = withRouter(GameOver);
export default connect(mapStateToProps, mapDispatchToProps)(GameOverWithRouter);
