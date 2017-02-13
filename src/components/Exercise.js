import DeleteButton from './Workout/DeleteButton';
import { Link } from 'react-router';
import React from 'react';

const Exercise = props => {
  const exercise = props.exercise;
  const show = props.currentUser &&
    props.currentUser.username === exercise.author.username;
  const imageSource = `/images/${exercise.etype.toLowerCase()}_icon.png`;
  const setsAndReps = (exercise.sets !="" && exercise.reps != "") ? true : false
  return (
    <tr>
      <td><DeleteButton show={show} slug={props.slug} exerciseId={exercise.id} /></td>
      <td><span><h5><img className="ui avatar image" src={imageSource} />
        {exercise.name}</h5></span>
      </td>
      {setsAndReps  &&
        <td className="card-text">{exercise.sets} Sets x {exercise.reps} </td>
      }
      <td className="meta">{exercise.description}</td>
    </tr>
  );
};

export default Exercise;
