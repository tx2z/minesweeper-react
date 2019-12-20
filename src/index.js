import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './_themes/default/theme.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from './components/Game/Game';
import * as serviceWorker from './serviceWorker';

const Home = () => (
  <div>
    <h2>Minesweeper & Treasures</h2>
    <Link to="/game">Game</Link>
  </div>
);

ReactDOM.render(
  <Router>
    <div>
      <aside>
        <Link to="/">Home</Link>
      </aside>
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
      </main>
    </div>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
