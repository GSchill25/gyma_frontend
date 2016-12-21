import DeleteButton from './Workout/DeleteButton';
import { Link } from 'react-router';
import React from 'react';

const Exercise = props => {
  const exercise = props.exercise;
  const show = props.currentUser &&
    props.currentUser.username === exercise.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{exercise.etype}</p>
        <p className="card-text">{exercise.name}</p>
        <p className="card-text">{exercise.sets}</p>
        <p className="card-text">{exercise.reps}</p>
        <p className="card-text">{exercise.description}</p>
      </div>
      <div className="card-footer">
        <DeleteButton show={show} slug={props.slug} exerciseId={exercise.id} />
      </div>
    </div>
  );
};

export default Exercise;
