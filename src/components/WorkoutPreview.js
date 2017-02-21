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
    "ui label favorite" :
    "ui label";

  const handleClick = ev => {
    ev.preventDefault();
    if (workout.favorited) {
      props.unfavorite(workout.slug);
    } else {
      props.favorite(workout.slug);
    }
  };

  const cardWidth = {
    width: window.innerWidth + "px"
  };

  return (
    <div className="event sixteen wide column">
      <div className="ui card" style={cardWidth}>
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
                <h3>{workout.title}</h3>
                <p> {workout.subtitle} </p>
              </div>
            </Link>
          </div>
          <div className="content-icons">  
            <div className="flex-halves-one">
              <p className="fcol">
                <img className="ui avatar image preview" src={`/images/warmup_icon.png`} />
                {workout.exerciseCount[0].value}  
              </p>
              <p className="fcol">
                <img className="ui avatar image preview" src={`/images/stretch_icon.png`} />
                {workout.exerciseCount[1].value}  
              </p>
            </div>
            <div className="ui divider"></div>
            <div className="flex-halves-two">
              <p className="fcol">
                <img className="ui avatar image preview" src={`/images/run_icon.png`} />
                {workout.exerciseCount[2].value}  
              </p>
              <p className="fcol">
                <img className="ui avatar image preview" src={`/images/lift_icon.png`} />
                {workout.exerciseCount[3].value}  
              </p>
            </div>
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">
            <div className="tag-list">
              {
                workout.tagList.map(tag => {
                  return (
                      <button 
                      key={tag}
                      disabled
                      className="ui teal basic button">
                        {tag}
                      </button>
                  )
                })
              }
            </div>
          </span>
          <a className={favoriteButtonClass} onClick={handleClick}>
            <i className="heart icon"></i> {workout.favoritesCount} likes
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(WorkoutPreview);
