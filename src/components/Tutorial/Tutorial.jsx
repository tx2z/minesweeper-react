import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tutorial.scss';

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: '🎮 Welcome to Minesweeper & Treasures!',
      content: (
        <div className="tutorial-content">
          <p>
            This is a special minesweeper with a twist! Not only do you avoid mines, but you can
            also find treasures!
          </p>
          <div className="game-modes">
            <div className="mode">
              <h4>🎯 Classic Mode</h4>
              <p>Click tiles to explore, use tools to mark flags and treasures</p>
            </div>
            <div className="mode">
              <h4>🏃 Player Mode</h4>
              <p>Move your character around the board like an adventure game</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🔨 How to Use Tools',
      content: (
        <div className="tutorial-content">
          <div className="tools-guide">
            <div className="tool">
              <div className="tool-icon clean">🧹</div>
              <div>
                <h4>CLEAN Tool</h4>
                <p>Reveals what&apos;s under a tile. Use this to explore safe areas.</p>
              </div>
            </div>
            <div className="tool">
              <div className="tool-icon flag">🚩</div>
              <div>
                <h4>FLAG Tool</h4>
                <p>
                  Mark tiles where you suspect mines are hidden. Helps you track dangerous areas!
                </p>
              </div>
            </div>
            <div className="tool">
              <div className="tool-icon treasure">💎</div>
              <div>
                <h4>TREASURE Tool</h4>
                <p>
                  Mark tiles where you think treasures are hidden. Collect all treasures to win
                  bonus points!
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🎮 Controls & Tips',
      content: (
        <div className="tutorial-content">
          <div className="controls-section">
            <h4>⌨️ Keyboard Controls</h4>
            <div className="controls-grid">
              <div className="control">
                <kbd>Arrow Keys</kbd>
                <span>Move focus (Classic) / Move player (Player)</span>
              </div>
              <div className="control">
                <kbd>Enter</kbd>
                <span>Use selected tool (Classic)</span>
              </div>
              <div className="control">
                <kbd>Space</kbd>
                <span>Clean</span>
              </div>
              <div className="control">
                <kbd>A</kbd>
                <span>Select Flag</span>
              </div>
              <div className="control">
                <kbd>B</kbd>
                <span>Select Treasure</span>
              </div>
              <div className="control">
                <kbd>A + Arrow</kbd>
                <span>Player mode: flag tile in that direction</span>
              </div>
              <div className="control">
                <kbd>B</kbd>
                <span>Player mode: use treasure on current tile</span>
              </div>
            </div>

            <h4>📱 On‑screen Controls</h4>
            <ul className="tips-list">
              <li>Use the arrow pad to move in Player mode.</li>
              <li>Press and hold A then tap an arrow to place a flag in that direction.</li>
              <li>Press B to try the Treasure tool on your current tile.</li>
            </ul>

            <h4>💡 Pro Tips</h4>
            <ul className="tips-list">
              <li>Numbers on revealed tiles show how many mines are adjacent.</li>
              <li>Use flags to mark suspected mines—this helps you avoid them!</li>
              <li>Look for treasure clues in the game world.</li>
              <li>In Player mode, you move like a character in an adventure game.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '🏆 How to Win',
      content: (
        <div className="tutorial-content">
          <div className="win-conditions">
            <h4>Victory Conditions:</h4>
            <div className="condition">
              <div className="condition-icon">✅</div>
              <div>
                <h5>Avoid All Mines</h5>
                <p>
                  Don&apos;t click on any tiles with mines! Use the number clues to deduce safe
                  areas.
                </p>
              </div>
            </div>
            <div className="condition">
              <div className="condition-icon">🚩</div>
              <div>
                <h5>Flag All Mines (Classic Mode)</h5>
                <p>In classic mode, correctly flag all mine locations to win!</p>
              </div>
            </div>
            <div className="condition">
              <div className="condition-icon">💎</div>
              <div>
                <h5>Find All Treasures</h5>
                <p>Locate and mark all hidden treasures for bonus points!</p>
              </div>
            </div>
          </div>
          <div className="ready-section">
            <p className="ready-text">Ready to start your adventure?</p>
            <p className="encouragement">Good luck, explorer! 🍀</p>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2>{tutorialSteps[currentStep].title}</h2>
          <button type="button" className="close-btn" onClick={skipTutorial}>
            ✕
          </button>
        </div>

        <div className="tutorial-body">{tutorialSteps[currentStep].content}</div>

        <div className="tutorial-footer">
          <div className="step-indicators">
            {tutorialSteps.map((step, index) => (
              <div
                key={tutorialSteps[index].title}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
                onKeyPress={(e) => e.key === 'Enter' && setCurrentStep(index)}
                role="button"
                tabIndex={0}
              />
            ))}
          </div>

          <div className="tutorial-buttons">
            {currentStep > 0 && (
              <button type="button" className="btn-secondary" onClick={prevStep}>
                ← Back
              </button>
            )}
            <button type="button" className="btn-skip" onClick={skipTutorial}>
              Skip Tutorial
            </button>
            <button type="button" className="btn-primary" onClick={nextStep}>
              {currentStep === tutorialSteps.length - 1 ? 'Start Playing!' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Tutorial.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Tutorial;
