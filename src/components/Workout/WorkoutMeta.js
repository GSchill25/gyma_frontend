import WorkoutActions from './WorkoutActions';
import { Link } from 'react-router';
import React from 'react';

const WorkoutMeta = props => {
  const workout = props.workout;
  return (
    <div className="article-meta">
      <Link to={`@${workout.author.username}`}>
        <img src={workout.author.image} className="ui avatar image" />
      </Link>
      <Link to={`@${workout.author.username}`} className="author">
        {workout.author.username}
      </Link>

      <div className="workout-header-info">  
        <span className="date">
          {new Date(workout.createdAt).toDateString()}
        </span>
      </div>

      <WorkoutActions canModify={props.canModify} workout={workout} />
    </div>
  );
};

export default WorkoutMeta;
