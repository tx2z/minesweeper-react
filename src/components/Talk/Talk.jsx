import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GAME } from '../../types/propTypes';
import './Talk.scss';

const Talk = (props) => {
  const { game, index } = props;

  if (!game.talk) {
    return '';
  }

  const { character, text } = game.talk[index];

  return <div className="Talk">{`${character}: ${text}`}</div>;
};
Talk.propTypes = {
  game: GAME.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Talk);
