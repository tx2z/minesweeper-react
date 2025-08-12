import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TileEffects.scss';

const TileEffects = ({ type, position, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleConfigs = {
      explosion: {
        count: 15,
        particles: ['💥', '🔥', '⚡', '💀', '☠️'],
        colors: ['#ff6b6b', '#ff8e53', '#ff6b35', '#c44569'],
        duration: 2000,
      },
      treasure: {
        count: 12,
        particles: ['💎', '✨', '💰', '🌟', '💫'],
        colors: ['#ffd700', '#ffb347', '#ff8c00', '#ffa500'],
        duration: 1500,
      },
      flag: {
        count: 8,
        particles: ['🚩', '⭐', '✨', '🔥'],
        colors: ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'],
        duration: 1000,
      },
      reveal: {
        count: 6,
        particles: ['✨', '💫', '🌟'],
        colors: ['#74b9ff', '#0984e3', '#00b894', '#00cec9'],
        duration: 800,
      },
    };

    const config = particleConfigs[type] || particleConfigs.reveal;

    const newParticles = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      particle: config.particles[Math.floor(Math.random() * config.particles.length)],
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      angle: (360 / config.count) * i + Math.random() * 30,
      velocity: 2 + Math.random() * 3,
      life: config.duration + Math.random() * 500,
      size: 0.8 + Math.random() * 0.4,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, config.duration);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  if (!position) return null;

  return (
    <div
      className={`tile-effects tile-effects--${type}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="effect-particle"
          style={{
            '--angle': `${particle.angle}deg`,
            '--velocity': particle.velocity,
            '--life': `${particle.life}ms`,
            '--size': particle.size,
            '--color': particle.color,
            animationDuration: `${particle.life}ms`,
          }}
        >
          {particle.particle}
        </div>
      ))}

      {type === 'explosion' && <div className="shockwave" />}

      {type === 'treasure' && <div className="sparkle-ring" />}
    </div>
  );
};

TileEffects.propTypes = {
  type: PropTypes.oneOf(['explosion', 'treasure', 'flag', 'reveal']).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  onComplete: PropTypes.func,
};

TileEffects.defaultProps = {
  position: null,
  onComplete: null,
};

export default TileEffects;
