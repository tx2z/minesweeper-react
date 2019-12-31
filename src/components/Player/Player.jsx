import React from 'react';
import './Player.css';

const playerClasses = 'nes-octocat animate';

const Player = () => (
  <div className="Player">
    <i className={playerClasses} />
  </div>
);
Player.propTypes = {};

export default Player;
