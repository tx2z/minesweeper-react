import {
  CLASSIC, PLAYER, LEFT, TOP, RIGHT, BOTTOM, CLEAN, FLAG, TREASURE, MODAL,
} from './types/types';

export const initialState = {
  game: {
    loaded: false,
  },
  tool: CLEAN,
  styles: '',
  gameType: PLAYER,
  modal: {
    show: false,
    content: false,
    callback: false,
    modalType: MODAL,
  },
};

export const gameTypes = [CLASSIC, PLAYER];

export const gameMoves = [LEFT, TOP, RIGHT, BOTTOM];

export const tools = [CLEAN, FLAG, TREASURE];
