import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tile from '../Tile/Tile';
import Talk from '../Talk/Talk';
import GameNotification from '../GameNotification/GameNotification';
import TileEffects from '../TileEffects/TileEffects';
import gameAction from '../../actions/gameAction';
import stylesAction from '../../actions/stylesAction';
import modalAction from '../../actions/modalAction';
import talkCleanAction from '../../actions/talkCleanAction';
import { prepareGame } from '../../functions/prepareGame';
import { showModal } from '../../functions/generics';
import { GAME, MODAL } from '../../types/propTypes';
import { TALK } from '../../types/types';
import './Board.scss';

const Board = (props) => {
  const [notification, setNotification] = useState(null);
  const [effects, setEffects] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const {
    gameAction: preprareGameState,
    stylesAction: prepareGameStyles,
    gameId,
    theme: choosenTheme,
    game,
    modal,
    // gameType,
    styles,
    modalAction: execModalAction,
    talkCleanAction: execTalkCleanAction,
  } = props;

  React.useEffect(() => {
    const loadGame = (gameData, theme = false) => {
      const stylesPayload = {
        value: theme,
      };
      prepareGameStyles(stylesPayload);

      const newGame = prepareGame(gameData);
      const gamePayload = {
        game: newGame,
      };
      preprareGameState(gamePayload);
    };

    const gameUrl = `${process.env.REACT_APP_GAMES_ROOT}/${gameId}/game.json`;
    fetch(gameUrl)
      .then((gameResponse) => gameResponse.json())
      .then((gameResult) => {
        const theme = gameResult.theme || choosenTheme;
        if (!theme) {
          loadGame(gameResult);
        } else {
          const themeUrl = `${process.env.REACT_APP_THEMES_ROOT}/${theme}/theme.css`;
          fetch(themeUrl)
            .then((themeResponse) => themeResponse.text())
            .then((themeResult) => {
              loadGame(gameResult, themeResult);
            });
        }
      });
  }, [gameId, choosenTheme, preprareGameState, prepareGameStyles]);

  // Add screen shake effect for explosions
  const addScreenShake = () => {
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 500);
  };

  // Show game notifications instead of alerts
  const showGameNotification = (type, title, message = '') => {
    setNotification({ type, title, message });
  };

  // Add tile effects
  const addTileEffect = (type, tileIndex) => {
    const tileElement = document.querySelector(`[data-index="${tileIndex}"]`);
    if (tileElement) {
      const rect = tileElement.getBoundingClientRect();
      const position = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const effect = {
        id: Date.now() + Math.random(),
        type,
        position,
      };

      setEffects((prev) => [...prev, effect]);

      // Remove effect after duration
      setTimeout(
        () => {
          setEffects((prev) => prev.filter((e) => e.id !== effect.id));
        },
        type === 'explosion' ? 2500 : 1500,
      );
    }
  };

  // Expose methods for child components
  const { boardRef } = props;
  React.useImperativeHandle(
    boardRef,
    () => ({
      showGameNotification,
      addTileEffect,
      addScreenShake,
    }),
    [],
  );

  // Win/Lose detection effect (must be declared before any early returns)
  React.useEffect(() => {
    if (!game.loaded || hasWon || hasLost) return;
    const { actions, tiles } = game;
    const { flag: flaggedTiles, open: openedTiles } = actions;
    const { mines, number: tilesNumber } = tiles;

    const allMinesFlagged =
      mines.length > 0 &&
      mines.every((m) => flaggedTiles.includes(m)) &&
      flaggedTiles.every((f) => mines.includes(f));

    const totalSafeTiles = tilesNumber - mines.length;
    const openedSafeTiles = openedTiles.filter((t) => !mines.includes(t)).length;
    const allSafeOpened = totalSafeTiles > 0 && openedSafeTiles === totalSafeTiles;

    if (allMinesFlagged || allSafeOpened) {
      setHasWon(true);
      setTimeout(() => {
        showGameNotification(
          'win',
          '🎉 Victory!',
          'Congratulations! You successfully cleared the board!',
        );
      }, 300);
    }
  }, [
    game.loaded,
    game.actions.flag,
    game.actions.open,
    game.tiles.mines,
    game.tiles.number,
    hasWon,
    hasLost,
  ]);

  // Talk modal handling via effect
  React.useEffect(() => {
    if (game.talk && !modal.show && !modal.content) {
      const talkConversation = [];
      game.talk
        .slice(0)
        .reverse()
        .forEach((talk, key) => {
          const talkKey = game.talk.length - 1 - key;
          const modalArgs = {
            modalAction: execModalAction,
            content: <Talk index={talkKey} />,
            type: TALK,
            callback: execTalkCleanAction,
          };
          if (key !== 0) {
            modalArgs.callback = () => showModal(talkConversation[key - 1]);
          }
          talkConversation.push(modalArgs);
        });
      showModal(talkConversation[talkConversation.length - 1]);
    }
  }, [game.talk, modal.show, modal.content, execModalAction, execTalkCleanAction]);

  if (!game.loaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const gameTile = `${game.name} | Minesweeper & Treasures`;
  const gameImage = `${process.env.REACT_APP_GAMES_ROOT}/${game.id}/${game.image}`;
  const boardStyles = {
    backgroundImage: `url(${gameImage})`,
    height: `${game.imageHeight}px`,
    width: `${game.imageWidth}px`,
    fontSize: `${game.tiles.width}px`,
    gridTemplateColumns: `repeat(${game.cols}, ${game.tiles.width}px)`,
  };

  React.useEffect(() => {
    if (!game.loaded || hasWon || hasLost) return;
    const { actions, tiles } = game;
    const { flag: flaggedTiles, open: openedTiles } = actions;
    const { mines, number: tilesNumber } = tiles;

    // Win if all mines are flagged and there are no incorrect flags
    const allMinesFlagged =
      mines.length > 0 &&
      mines.every((m) => flaggedTiles.includes(m)) &&
      flaggedTiles.every((f) => mines.includes(f));

    // Or win if all safe tiles are opened
    const totalSafeTiles = tilesNumber - mines.length;
    const openedSafeTiles = openedTiles.filter((t) => !mines.includes(t)).length;
    const allSafeOpened = totalSafeTiles > 0 && openedSafeTiles === totalSafeTiles;

    if (allMinesFlagged || allSafeOpened) {
      setHasWon(true);
      setTimeout(() => {
        showGameNotification(
          'win',
          '🎉 Victory!',
          'Congratulations! You successfully cleared the board!',
        );
      }, 300);
    }
  }, [
    game.loaded,
    game.actions.flag,
    game.actions.open,
    game.tiles.mines,
    game.tiles.number,
    hasWon,
    hasLost,
  ]);

  if (game.talk && !modal.show && !modal.content) {
    const talkConversation = [];
    game.talk
      .slice(0)
      .reverse()
      .forEach((talk, key) => {
        const talkKey = game.talk.length - 1 - key;
        const modalArgs = {
          modalAction: execModalAction,
          content: <Talk index={talkKey} />,
          type: TALK,
          callback: execTalkCleanAction,
        };
        if (key !== 0) {
          modalArgs.callback = () => showModal(talkConversation[key - 1]);
        }
        talkConversation.push(modalArgs);
      });
    showModal(talkConversation[talkConversation.length - 1]);
  }

  // removed legacy newTiles helper (handled below by IIFE)

  const handleMineHit = (tileIndex) => {
    if (hasLost || hasWon) return;
    setHasLost(true);
    addScreenShake();
    addTileEffect('explosion', tileIndex);
    setTimeout(() => {
      showGameNotification(
        'lose',
        '💥 Game Over!',
        'Oops! You hit a mine. Better luck next time, explorer!',
      );
    }, 800);
  };

  const tiles = (() => {
    const gameTiles = [];
    for (let i = 1; i <= game.tiles.number; i += 1) {
      gameTiles.push(
        <Tile
          index={i}
          key={i}
          onMineHit={() => handleMineHit(i)}
          onTreasureFound={() => {
            addTileEffect('treasure', i);
            showGameNotification(
              'treasure',
              '💎 Treasure Found!',
              'Excellent discovery! You found a hidden treasure!',
            );
          }}
          onFlagPlaced={() => {
            addTileEffect('flag', i);
          }}
          onTileRevealed={() => {
            addTileEffect('reveal', i);
          }}
        />,
      );
    }
    return gameTiles;
  })();

  return (
    <div className="game">
      <Helmet>
        <title>{gameTile}</title>
        <style>{styles}</style>
      </Helmet>

      <div className="Board" style={boardStyles}>
        {tiles}
      </div>

      {/* Game Notifications */}
      {notification && (
        <GameNotification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Tile Effects */}
      {effects.map((effect) => (
        <TileEffects
          key={effect.id}
          type={effect.type}
          position={effect.position}
          onComplete={() => {
            setEffects((prev) => prev.filter((e) => e.id !== effect.id));
          }}
        />
      ))}
    </div>
  );
};
Board.propTypes = {
  gameAction: PropTypes.func.isRequired,
  stylesAction: PropTypes.func.isRequired,
  modalAction: PropTypes.func.isRequired,
  talkCleanAction: PropTypes.func.isRequired,
  game: GAME.isRequired,
  modal: MODAL.isRequired,
  // gameType: PropTypes.string.isRequired,
  styles: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  gameId: PropTypes.string.isRequired,
  boardRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Board.defaultProps = {
  boardRef: null,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameAction: (payload) => dispatch(gameAction(payload)),
  stylesAction: (payload) => dispatch(stylesAction(payload)),
  modalAction: (payload) => dispatch(modalAction(payload)),
  talkCleanAction: (payload) => dispatch(talkCleanAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
