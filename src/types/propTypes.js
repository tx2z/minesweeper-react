import PropTypes from 'prop-types';

const {
  string, shape, bool, number, arrayOf,
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
  addedFlags: number,
  totalMines: number,
  tiles: arrayOf(TILE),
});

export const TOOLS = shape({
  tool: string.isRequired,
});

export default GAME;
