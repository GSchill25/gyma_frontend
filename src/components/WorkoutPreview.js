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
    <div className="event">
      <div className="ui card">
        <div className="content">
          <div className="right floated meta"> 
            {new Date(workout.createdAt).toDateString()}
          </div>
          <img className="ui avatar image" src={workout.author.image} />
          <Link className="author" to={`@${workout.author.username}`}>
            {workout.author.username}
          </Link>
        </div>
        <div className="card-background">
          <div className="content">
            <Link to={`workout/${workout.slug}`} className="preview-link">
              <div className="card-title">
                <h6>{workout.title}</h6>
                <p> {workout.subtitle} </p>
              </div>
            </Link>
          </div>
          <div className="content-icons">  
            <div className="flex-halves-one">
              <p className="fcol">
                <img className="ui avatar image" src={`/images/warmup_icon.png`} />
                {workout.exerciseCount[0].value}  
              </p>
              <p className="fcol">
                <img className="ui avatar image" src={`/images/stretch_icon.png`} />
                {workout.exerciseCount[1].value}  
              </p>
            </div>
            <div className="ui divider"></div>
            <div className="flex-halves-two">
              <p className="fcol">
                <img className="ui avatar image" src={`/images/run_icon.png`} />
                {workout.exerciseCount[2].value}  
              </p>
              <p className="fcol">
                <img className="ui avatar image" src={`/images/lift_icon.png`} />
                {workout.exerciseCount[3].value}  
              </p>
            </div>
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">
            <ul className="tag-list">
              {
                workout.tagList.map(tag => {
                  return (
                    <li key={tag}>
                      <button 
                      disabled
                      className="ui teal basic button">
                        {tag}
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </span>
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {workout.favoritesCount} likes
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(WorkoutPreview);
