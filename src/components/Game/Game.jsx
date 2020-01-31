import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Board from '../Board/Board';
import Controller from '../Controller/Controller';

const useQuery = () => new URLSearchParams(useLocation().search);

const Game = () => {
  const { gameId } = useParams();
  const theme = useQuery().get('theme') || false;

  return (
    <div>
      <Board gameId={gameId} theme={theme} />
      <Controller />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
