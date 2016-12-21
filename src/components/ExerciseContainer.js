import ExerciseInput from './ExerciseInput';
import ExerciseList from './ExerciseList';
import { Link } from 'react-router';
import React from 'react';

const ExerciseContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors}></list-errors>
          <ExerciseInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <ExerciseList
          exercises={props.exercises}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  } else { //if user needs to sign in
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="login">Sign in</Link>
          &nbsp;to add exercises.
        </p>

        <ExerciseList
          exercises={props.exercises}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }
};

export default ExerciseContainer;
