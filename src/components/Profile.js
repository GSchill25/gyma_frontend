'use strict';

import WorkoutList from './WorkoutList';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="ui button tiny">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'ui button';
  if (props.user.following) {
    classes += 'teal';
  } else {
    classes += 'teal inverted';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  ...state.workoutList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Workouts.byAuthor(this.props.params.username)
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
            className="nav-link active"
            to={`@${this.props.profile.username}`}>
            My Workouts
          </Link>
        </div>

        <div className="item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}/favorites`}>
            Favorited Workouts
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="ui raised segment">

                <img src={profile.image} className="ui tiny centered circular image" />
                <h4>@{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <WorkoutList
                workouts={this.props.workouts}
                workoutsCount={this.props.workoutsCount}
                state={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile as Profile, mapStateToProps as mapStateToProps };
