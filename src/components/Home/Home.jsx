import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initialState, gameTypes } from '../../configs';
import gameTypeAction from '../../actions/gameTypeAction';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import { GAME } from '../../types/propTypes';
import './Home.scss';

class Home extends React.Component {
  componentDidMount() {
    const {
      game, gameAction: execGameAction, stylesAction: execStylesAction,
    } = this.props;
    // Reset game if have been loaded previously
    if (game.loaded) {
      const stylesPayload = {
        value: initialState.styles,
      };
      execStylesAction(stylesPayload);
      const gamePayload = {
        game: initialState.game,
      };
      execGameAction(gamePayload);
    }
  }

  render() {
    const {
      gameType, gameTypeAction: execChangeGameType,
    } = this.props;
    const changeGameType = (type) => {
      const payload = {
        gameType: type,
      };
      execChangeGameType(payload);
    };

    const gameTypeButtons = gameTypes.map((type) => {
      let buttonClases = 'game-type nes-btn';
      if (gameType === type) {
        buttonClases += ' selected';
      }
      return (
        <button
          key={type}
          type="button"
          className={buttonClases}
          onClick={() => changeGameType(type)}
        >
          {type}
        </button>
      );
    });

    return (
      <div>
        <h2>Minesweeper & Treasures</h2>
        <Link to="game/test-refactor">Game</Link>
        <div id="game-types">
          {gameTypeButtons}
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  game: GAME.isRequired,
  gameTypeAction: PropTypes.func.isRequired,
  gameType: PropTypes.string.isRequired,
  gameAction: PropTypes.func.isRequired,
  stylesAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameTypeAction: (payload) => dispatch(gameTypeAction(payload)),
  gameAction: (payload) => dispatch(gameAction(payload)),
  stylesAction: (payload) => dispatch(stylesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
