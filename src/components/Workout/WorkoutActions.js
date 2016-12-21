import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_WORKOUT', payload })
});

const WorkoutActions = props => {
  const workout = props.workout;
  const del = () => {
    props.onClickDelete(agent.Workouts.del(workout.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${workout.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Workout
        </Link>

        <Link
          to={`/add_exercise/${workout.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Add Exercises
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Workout
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(WorkoutActions);
