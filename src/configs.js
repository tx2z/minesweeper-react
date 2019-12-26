import {
  CLASSIC, PLAYER, LEFT, TOP, RIGHT, BOTTOM,
} from './types/actionTypes';
import { CLEAN, FLAG, TREASURE } from './types/toolTypes';

export const initialState = {
  game: {
    loaded: false,
  },
  tool: CLEAN,
  styles: '',
  gameType: PLAYER,
};

export const gameTypes = [CLASSIC, PLAYER];

export const gameMoves = [LEFT, TOP, RIGHT, BOTTOM];

export const tools = [CLEAN, FLAG, TREASURE];
