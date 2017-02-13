'use strict';

import WorkoutPreview from './WorkoutPreview';
import ListPagination from './ListPagination';
import React from 'react';

const WorkoutList = props => {
  if (!props.workouts) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.workouts.length === 0) {
    return (
      <div className="article-preview">
        No workouts are here... yet.
      </div>
    );
  }

  return (
    <div className="ui feed sixteen wide column">
      {
        props.workouts.map(workout => {
          return (
            <WorkoutPreview workout={workout} key={workout.slug} />
          );
        })
      }

      <ListPagination
        workoutsCount={props.workoutsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default WorkoutList;
