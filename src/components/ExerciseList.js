import Exercise from './Exercise';
import React from 'react';

const ExerciseList = props => {
  return (
    <div>
      {
        props.exercises.map(exercise => {
          return (
            <Exercise
              exercise={exercise}
              currentUser={props.currentUser}
              slug={props.slug}
              key={exercise.id} />
          );
        })
      }
    </div>
  );
};

export default ExerciseList;
