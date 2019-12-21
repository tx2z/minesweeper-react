import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import * as serviceWorker from './serviceWorker';
import './index.css';

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
