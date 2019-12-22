import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moveAction from '../../actions/moveAction';
import {
  MOVELEFT, MOVETOP, MOVERIGHT, MOVEBOTTOM,
} from '../../types/actionTypes';
import './Controller.css';

const Controller = (props) => {
  const { moveAction: execMoveAction } = props;
  const movePlayer = (direction) => {
    const payload = {
      direction,
    };
    execMoveAction(payload);
  };
  const moveLeft = () => {
    movePlayer(MOVELEFT);
  };
  const moveTop = () => {
    movePlayer(MOVETOP);
  };
  const moveRight = () => {
    movePlayer(MOVERIGHT);
  };
  const moveBottom = () => {
    movePlayer(MOVEBOTTOM);
  };
  return (
    <div className="Controller">
      <button type="button" onClick={moveLeft}>
        left
      </button>
      <button type="button" onClick={moveTop}>
        top
      </button>
      <button type="button" onClick={moveRight}>
        right
      </button>
      <button type="button" onClick={moveBottom}>
        bottom
      </button>
    </div>
  );
};
Controller.propTypes = {
  moveAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  moveAction: (payload) => dispatch(moveAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
