import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { GAME } from '../../types/propTypes';
import gameAction from '../../actions/gameAction';

const Refresh = (props) => {
  const { gameAction: preprareGameState, game, path } = props;

  return (
    <div className="test">
      <Route
        path={path}
        component={({ history, location, match }) => {
          // Clean game info
          if (game.loaded) {
            const gamePayload = {
              game: { loaded: false },
            };
            preprareGameState(gamePayload);
          }
          // Redirect to page
          history.replace({
            ...location,
            pathname: location.pathname.substring(match.path.length),
          });
          return null;
        }}
      />
    </div>
  );
};
Refresh.propTypes = {
  game: GAME.isRequired,
  gameAction: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  gameAction: (payload) => dispatch(gameAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Refresh);
