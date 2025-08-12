import React from 'react';
import { Helmet } from 'react-helmet';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import configureStore from './store';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import Modal from './components/Modal/Modal';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={configureStore()}>
    <Router>
      <Helmet>
        <title>Minesweeper & Treasures</title>
      </Helmet>

      <aside>
        <Link to="/">Home</Link>
      </aside>
      <main>
        <Routes>
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Modal />
    </Router>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
