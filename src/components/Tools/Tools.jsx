import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tools } from '../../configs';
import toolsAction from '../../actions/toolsAction';
import './Tools.css';

const Tools = (props) => {
  const { tool: selectedTool, toolsAction: chooseTool } = props;
  const toolClick = (value) => {
    const payload = {
      value,
    };
    chooseTool(payload);
  };

  const toolButtons = tools.map((tool) => {
    let buttonClases = 'tool';
    if (selectedTool === tool) {
      buttonClases += ' selected';
    }
    return (

      <button
        key={tool}
        type="button"
        className={buttonClases}
        onClick={() => toolClick(tool)}
      >
        {tool}
      </button>
    );
  });

  return (
    <div id="tools">
      {toolButtons}
    </div>
  );
};
Tools.propTypes = {
  toolsAction: PropTypes.func.isRequired,
  tool: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  toolsAction: (payload) => dispatch(toolsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
