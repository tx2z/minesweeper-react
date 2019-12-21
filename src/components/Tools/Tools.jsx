import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toolsAction from '../../actions/toolsAction';
import './Tools.css';

const Tools = (props) => {
  const { toolsAction: chooseTool } = props;
  const toolClick = (value) => {
    const payload = {
      value,
    };
    chooseTool(payload);
  };
  return (
    <nav id="tools">
      <ul>
        <li>
          <button type="button" onClick={() => toolClick('clean')}>
            clean
          </button>
        </li>
        <li>
          <button type="button" onClick={() => toolClick('flag')}>
            flag
          </button>
        </li>
        <li>
          <button type="button" onClick={() => toolClick('treasure')}>
            treasure
          </button>
        </li>
      </ul>
    </nav>
  );
};
Tools.propTypes = {
  toolsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  toolsAction: (payload) => dispatch(toolsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
