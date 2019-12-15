import React from 'react';
import { connect } from 'react-redux';
import tilesAction from '../../actions/tilesAction';
import './Tile.css';

class Tile extends React.Component {
  render() {
    const tileContent = this.props.game.tiles.find((obj) => obj.id === this.props.index);

    const tileClick = () => {
      const payload = {
        method: this.props.tools.tool,
        tile: tileContent.id,
      };
      this.props.tilesAction(payload);
    };

    let tileClasses = 'tile ';
    if (!tileContent.open || tileContent.block) {
      tileClasses += tileContent.class;
    } else {
      tileClasses += 'free';
    }

    return (
      <div className={tileClasses} data-index={this.props.index} onClick={tileClick}>
        <TileNumber open={tileContent.open} number={tileContent.number} />
        <TileFlag open={tileContent.flag} />
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
function TileFlag(props) {
  if (props.open) {
    return <span className="flag" />;
  }
  return null;
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  tilesAction: (payload) => dispatch(tilesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
