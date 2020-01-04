import React from 'react';
import PropTypes from 'prop-types';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { connect } from 'react-redux';
import { gameMoves } from '../../configs';
import {
  LEFT, TOP, RIGHT, BOTTOM,
} from '../../types/types';
import './Player.scss';

class Player extends React.Component {
  constructor(props) {
    super(props);

    const { styles } = this.props;

    this.element = '';

    this.moveClasses = {
      LEFT,
      TOP,
      RIGHT,
      BOTTOM,
    };

    if (!styles) {
      import('./PlayerDefaults.scss');
      this.moveClasses = {
        LEFT: 'gg-arrow-left-o',
        TOP: 'gg-arrow-up-o',
        RIGHT: 'gg-arrow-right-o',
        BOTTOM: 'gg-arrow-down-o',
      };
    }
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  scroll() {
    this.element = document.querySelector('#Player');
    scrollIntoViewIfNeeded(this.element, {
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  }

  render() {
    const { direction } = this.props;

    const playerClasses = `Player ${this.moveClasses[direction]}`;

    return (
      <div id="Player" className={playerClasses} />
    );
  }
}
Player.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  direction: PropTypes.oneOf(gameMoves).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Player);
