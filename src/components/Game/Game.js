import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import Board from '../Board/Board';
import Tools from '../Tools/Tools';

class Game extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Tools />
        <Board />
      </Provider>
    );
  }
}
export default Game;
