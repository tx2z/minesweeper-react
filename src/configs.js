import {
  CLASSIC, PLAYER, MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM,
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

export const gameMoves = [MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM];

export const tools = [CLEAN, FLAG, TREASURE];
