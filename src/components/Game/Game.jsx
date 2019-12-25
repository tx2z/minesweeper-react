import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Board from '../Board/Board';
import Tools from '../Tools/Tools';
import Controller from '../Controller/Controller';
import { PLAYER } from '../../types/actionTypes';

const useQuery = () => new URLSearchParams(useLocation().search);

const Game = (props) => {
  const { gameType } = props;
  const { gameId } = useParams();
  const theme = useQuery().get('theme') || 'default';

  let gameControls = '';
  if (gameType === PLAYER) {
    gameControls = <Controller />;
  }

  return (
    <div>
      <Board gameId={gameId} theme={theme} />
      <Tools />
      {gameControls}
    </div>
  );
};
Game.propTypes = {
  gameType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
