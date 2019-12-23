import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gameTypeAction from '../../actions/gameTypeAction';

const Home = (props) => {
  const {
    gameType, gameTypeAction: execChangeGameType,
  } = props;
  const changeGameType = (type) => {

  };
  return (
    <div>
      <h2>Minesweeper & Treasures</h2>
      <Link to="game/test">Game</Link>
    </div>
  );
};
Home.propTypes = {
  gameTypeAction: PropTypes.func.isRequired,
  gameType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameTypeAction: (payload) => dispatch(gameTypeAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
