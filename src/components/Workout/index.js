'use strict';

import WorkoutMeta from './WorkoutMeta';
import CommentContainer from './CommentContainer';
import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
//import marked from 'marked'; markdown

const mapStateToProps = state => ({
  ...state.workout,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'WORKOUT_PAGE_LOADED', payload }),
  onUnload: () =>
    dispatch({ type: 'WORKOUT_PAGE_UNLOADED' })
});

class Workout extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Workouts.get(this.props.params.id),
      agent.Comments.forWorkout(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.workout) {
      return null;
    }

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.workout.author.username;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.workout.title}</h1>
            <WorkoutMeta
              workout={this.props.workout}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <ul className="tag-list">
                {
                  this.props.workout.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout);
