import Exercise from './Exercise';
import React from 'react';

const ExerciseList = props => {
  return (
    <div className="fourteen wide tablet ten wide computer column">
      <table className="ui blue table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
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
      </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
