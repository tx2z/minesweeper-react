import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import configureStore from './store';

import './_themes/default/theme.css';

import Board from './components/Board/Board';
import Tools from './components/Tools/Tools';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Tools />
    <Board />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
