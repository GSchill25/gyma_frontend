import Exercise from './Exercise';
import React from 'react';

const ExerciseList = props => {
  
  let width = (window.location.hash.indexOf('add_exercise') === -1) ? "twelve" : "ten"
  let classes = `sixteen wide tablet ${width} wide computer column`
  return (
    <div className={classes}>
      <table className="ui blue table">
        {/*}
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Description</th>
          </tr>
        </thead>
      */}
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
