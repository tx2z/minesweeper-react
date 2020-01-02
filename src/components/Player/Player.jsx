import React from 'react';
import './Player.scss';

const Player = () => {
  const playerClasses = 'nes-octocat animate';

  return (
    <div className="Player">
      <i className={playerClasses} />
    </div>
  );
};
Player.propTypes = {};

export default Player;
