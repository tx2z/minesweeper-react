import React from 'react';
import { Provider } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import configureStore from '../../store';
import Board from '../Board/Board';
import Tools from '../Tools/Tools';

const useQuery = () => new URLSearchParams(useLocation().search);

const Game = () => {
  const { gameId } = useParams();
  const theme = useQuery().get('theme') || 'default';

  return (
    <Provider store={configureStore()}>
      <Tools />
      <Board gameId={gameId} theme={theme} />
    </Provider>
  );
};
export default Game;
