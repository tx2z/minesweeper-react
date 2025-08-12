import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initialState, gameTypes } from '../../configs';
import gameTypeAction from '../../actions/gameTypeAction';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import Tutorial from '../Tutorial/Tutorial';
import { GAME } from '../../types/propTypes';
import './Home.scss';

const Home = (props) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const {
    game,
    gameAction: execGameAction,
    stylesAction: execStylesAction,
    gameType,
    gameTypeAction: execChangeGameType,
  } = props;

  React.useEffect(() => {
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
  }, [game.loaded, execGameAction, execStylesAction]);

  const changeGameType = (type) => {
    const payload = {
      gameType: type,
    };
    execChangeGameType(payload);
  };

  const gameTypeButtons = gameTypes.map((type) => {
    let buttonClases = 'game-type';
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
    <div className="home-container">
      <div className="home-header">
        <h1 className="game-title">🎮 Minesweeper & Treasures</h1>
        <p className="game-subtitle">The classic game with a treasure-hunting twist!</p>
      </div>

      <div className="home-content">
        <div className="game-modes-section">
          <h3>🎯 Choose Your Game Mode</h3>
          <div id="game-types">{gameTypeButtons}</div>
        </div>

        <div className="home-actions">
          <Link to="game/test-refactor" className="play-button">
            🚀 Start Playing
          </Link>
          <button type="button" className="tutorial-button" onClick={() => setShowTutorial(true)}>
            📚 How to Play
          </button>
        </div>

        <div className="game-features">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h4>Strategic Gameplay</h4>
            <p>Use logic and deduction to avoid mines</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💎</div>
            <h4>Treasure Hunting</h4>
            <p>Find hidden treasures for bonus points</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏃</div>
            <h4>Two Game Modes</h4>
            <p>Classic clicking or adventure-style movement</p>
          </div>
        </div>
      </div>

      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </div>
  );
};
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
