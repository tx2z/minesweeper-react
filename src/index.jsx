import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import configureStore from './store';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import * as serviceWorker from './serviceWorker';
import 'typeface-press-start-2p';
import 'nes.css/css/nes.css';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div>
        <aside>
          <Link to="/">Home</Link>
        </aside>
        <main>
          <Route path="/game/:gameId" component={Game} />
          <Route exact path="/" component={Home} />
        </main>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
