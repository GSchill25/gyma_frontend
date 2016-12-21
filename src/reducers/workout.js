'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'WORKOUT_PAGE_LOADED':
      return {
        ...state,
        workout: action.payload[0].workout,
        comments: action.payload[1].comments,
        exercises: action.payload[2].exercises
      };
      break;
    case 'EXERCISE_PAGE_LOADED':
      return {
        ...state,
        workout: action.payload[0].workout,
        exercises: action.payload[1].exercises
      };
      break;
    case 'WORKOUT_PAGE_UNLOADED':
      return {};
    case 'ADD_COMMENT':
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ?
          null :
          (state.comments || []).concat([action.payload.comment])
      };
    case 'DELETE_COMMENT':
      const commentId = action.commentId
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
    case 'ADD_EXERCISE':
      return {
        ...state,
        exerciseErrors: action.error ? action.payload.errors : null,
        exercises: action.error ?
          null :
          (state.exercises || []).concat([action.payload.exercise])
      };
    case 'DELETE_EXERCISE':
      const exerciseId = action.exerciseId
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== exerciseId)
      };
  }

  return state;
};
