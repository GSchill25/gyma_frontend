'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'EDITOR_PAGE_LOADED':
      return {
        ...state,
        workoutSlug: action.payload ? action.payload.workout.slug : '',
        title: action.payload ? action.payload.workout.title : '',
        subtitle: action.payload ? action.payload.workout.subtitle : '',
        tagInput: '',
        tagList: action.payload ? action.payload.workout.tagList : []
      };
    case 'EDITOR_PAGE_UNLOADED':
      return {};
    case 'WORKOUT_SUBMITTED':
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      if (action.subtype === 'WORKOUT_SUBMITTED') {
        return { ...state, inProgress: true };
      }
      break;
    case 'ADD_TAG':
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case 'UPDATE_FIELD_EDITOR':
      return { ...state, [action.key]: action.value };
  }

  return state;
};
