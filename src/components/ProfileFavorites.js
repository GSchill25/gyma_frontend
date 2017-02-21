'use strict';

import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'PROFILE_FAVORITES_PAGE_UNLOADED' })
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Workouts.favoritedBy(this.props.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <div className="ui top attached tabular menu">
        <div className="item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}`}>
            My Workouts
          </Link>
        </div>

        <div className="item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}/favorites`}>
            Favorited Workouts
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
