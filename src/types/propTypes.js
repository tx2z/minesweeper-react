import PropTypes, { string } from 'prop-types';
import { gameMoves } from '../configs';

const {
  shape, bool, number, array, oneOf,
} = PropTypes;

export const TILE = shape({
  open: bool,
  flag: bool,
  mine: bool,
  id: number.isRequired,
});

export const GAME = shape({
  loaded: bool.isRequired,
  rows: number,
  cols: number,
  name: string,
  author: string,
  theme: string,
  image: string,
  imageHeight: number,
  imageWidth: number,
  tiles: shape({
    number,
    width: number,
    height: number,
    block: array,
    mines: array,
    treasures: array,
    playerStart: number,
    playerEnd: number,
    position: array,
    minesAround: array,
  }),
  actions: shape({
    treasure: array,
    flag: array,
    open: array,
    focus: number,
    player: number,
    playerDirection: oneOf(gameMoves),
  }),
  found: shape({
    mines: array,
    treasures: array,
  }),
});

export default GAME;
