import React from 'react';
import Tile from '../Tile/Tile'
import './Board.css';

import { connect } from 'react-redux';
// import tilesAction from './actions/tilesAction';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      height: this.props.rows + 'em',
      width: this.props.cols + 'em',
    }
  }
  
  render() {
    const tiles = this.props.tiles.map((value, index) => {
      return (
        <Tile 
          index={index}
          key={value.id}
        />
      );
    });

    return (
      <div 
        className="Board"
        style={this.styles}
      >
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
/*
const mapDispatchToProps = dispatch => ({
  tilesAction: (payload) => dispatch(tilesAction(payload))
});
*/
export default connect(mapStateToProps/*, mapDispatchToProps*/)(Board);
