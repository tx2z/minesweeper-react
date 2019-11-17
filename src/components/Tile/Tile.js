import React from 'react';
import { connect } from 'react-redux';
import tilesAction from '../../actions/tilesAction';
import './Tile.css';

class Tile extends React.Component {
  render() {
    const tileContent = this.props.tiles.find(obj => {
      return obj.id === this.props.index;
    });

    if (tileContent.open && tileContent.mine) {
      // TODO: Stop the game
      alert('YOU LOSE');
    }

    const tileClick = () => {
      const payload = {
        method: 'click',
        tile: tileContent.id,
      }
      this.props.tilesAction(payload)
    }
    
    let tileClasses = 'tile ';
    if(!tileContent.open || tileContent.block) {
      tileClasses += tileContent.class;
    } else {
      tileClasses += 'free';
    }

    return (
      <div
        className={tileClasses}
        data-index={this.props.index}
        onClick={tileClick}
      >
        <TileNumber
          open={tileContent.open}
          number={tileContent.number}
        />
      </div>
    );
  }
}

function TileNumber(props) {
  if (props.open) {
    return <span className="number">{props.number}</span>;
  }
  return null;
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  tilesAction: (payload) => dispatch(tilesAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
