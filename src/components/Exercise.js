import DeleteButton from './Workout/DeleteButton';
import { Link } from 'react-router';
import React from 'react';

const Exercise = props => {
  const exercise = props.exercise;
  const show = props.currentUser &&
    props.currentUser.username === exercise.author.username;
  return (
    <tr>
      <td className="card-text">{exercise.etype}</td>
      <td className="card-text">{exercise.name}</td>
      <td className="card-text">{exercise.sets}</td>
      <td className="card-text">{exercise.reps}</td>
      <td className="card-text">{exercise.description}</td>
      <td>
        <DeleteButton show={show} slug={props.slug} exerciseId={exercise.id} />
      </td>
    </tr>
  );
};

export default Exercise;
