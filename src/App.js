import React from 'react';
import Tile from './components/Tile/Tile'
import './App.css';

import { connect } from 'react-redux';
// import tilesAction from './actions/tilesAction';

class App extends React.Component {

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
        className="App"
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
export default connect(mapStateToProps/*, mapDispatchToProps*/)(App);
