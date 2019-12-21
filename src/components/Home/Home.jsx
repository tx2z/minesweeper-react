import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Minesweeper & Treasures</h2>
    <Link to="/game">Game</Link>
  </div>
);
export default Home;
