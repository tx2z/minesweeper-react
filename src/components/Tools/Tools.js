import React from 'react';
import toolsAction from '../../actions/toolsAction';
import './Tools.css';

import { connect } from 'react-redux';

class Tools extends React.Component {
  render() {
    const toolClick = (value) => {
      const payload = {
        value,
      };
      this.props.toolsAction(payload);
    };
    return (
      <nav id="tools">
        <ul>
          <li onClick={() => toolClick('clean')}>clean</li>
          <li onClick={() => toolClick('flag')}>flag</li>
          <li onClick={() => toolClick('treasure')}>treasure</li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  toolsAction: (payload) => dispatch(toolsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
