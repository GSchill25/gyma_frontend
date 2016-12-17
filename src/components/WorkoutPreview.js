'use strict';

import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: 'WORKOUT_FAVORITED',
    payload: agent.Workouts.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: 'WORKOUT_UNFAVORITED',
    payload: agent.Workouts.unfavorite(slug)
  })
});

const WorkoutPreview = props => {
  const workout = props.workout;
  const favoriteButtonClass = workout.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (workout.favorited) {
      props.unfavorite(workout.slug);
    } else {
      props.favorite(workout.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${workout.author.username}`}>
          <img src={workout.author.image} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${workout.author.username}`}>
            {workout.author.username}
          </Link>
          <span className="date">
            {new Date(workout.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {workout.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`workout/${workout.slug}`} className="preview-link">
        <h1>{workout.title}</h1>
        <p>{workout.subtitle}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            workout.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(WorkoutPreview);
