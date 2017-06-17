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
      <div className="ui buttons">


        <Link
          to={`/editor/${workout.slug}`}
          className="ui button button-size-sm">
          <i className="edit icon"></i> Edit Workout
        </Link>

        <Link
          to={`/add_exercise/${workout.slug}`}
          className="ui button button-size-sm">
          <i className="edit icon"></i> Add Exercises
        </Link>

        <button className="ui button red button-size-sm" onClick={del}>
          <i className="trash outline icon"></i>Delete
        </button>

      </div>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(WorkoutActions);
