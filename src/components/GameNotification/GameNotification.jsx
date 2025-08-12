import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameNotification.scss';

const GameNotification = ({ type, title, message, onClose, autoClose = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getNotificationConfig = () => {
    switch (type) {
      case 'win':
        return {
          icon: '🏆',
          color: 'success',
          particles: ['🎉', '✨', '🌟', '💫', '🎊'],
          bgGradient: 'linear-gradient(135deg, #4caf50, #45a049)',
        };
      case 'lose':
        return {
          icon: '💥',
          color: 'danger',
          particles: ['💥', '⚡', '🔥', '💀', '☠️'],
          bgGradient: 'linear-gradient(135deg, #f44336, #d32f2f)',
        };
      case 'treasure':
        return {
          icon: '💎',
          color: 'treasure',
          particles: ['💎', '✨', '💰', '🌟', '💫'],
          bgGradient: 'linear-gradient(135deg, #ffd700, #ff8c00)',
        };
      case 'flag':
        return {
          icon: '🚩',
          color: 'flag',
          particles: ['🚩', '⚡', '✨', '🔥', '💫'],
          bgGradient: 'linear-gradient(135deg, #ff6b6b, #feca57)',
        };
      default:
        return {
          icon: '📢',
          color: 'info',
          particles: ['✨', '💫', '🌟'],
          bgGradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        };
    }
  };

  const config = getNotificationConfig();

  const createParticles = () =>
    Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      >
        {config.particles[Math.floor(Math.random() * config.particles.length)]}
      </div>
    ));

  return (
    <div
      className={`notification-overlay ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''}`}
    >
      <div className="particles-container">{createParticles()}</div>

      <div
        className={`notification-modal ${config.color}`}
        style={{ background: config.bgGradient }}
      >
        <button type="button" className="close-btn" onClick={handleClose}>
          ✕
        </button>

        <div className="notification-content">
          <div className="notification-icon">{config.icon}</div>

          <div className="notification-text">
            <h2>{title}</h2>
            {message && <p>{message}</p>}
          </div>
        </div>

        <div className="notification-actions">
          <button type="button" className="btn-primary" onClick={handleClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

GameNotification.propTypes = {
  type: PropTypes.oneOf(['win', 'lose', 'treasure', 'flag', 'info']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
};

GameNotification.defaultProps = {
  message: '',
  autoClose: true,
};

export default GameNotification;
