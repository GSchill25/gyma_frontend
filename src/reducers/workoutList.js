'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'WORKOUT_FAVORITED':
    case 'WORKOUT_UNFAVORITED':
      return {
        ...state,
        workouts: state.workouts.map(workout => {
          if (workout.slug === action.payload.workout.slug) {
            return {
              ...workout,
              favorited: action.payload.workout.favorited,
              favoritesCount: action.payload.workout.favoritesCount
            };
          }
          return workout;
        })
      };
    case 'SET_PAGE':
      return {
        ...state,
        workouts: action.payload.workouts,
        workoutsCount: action.payload.workoutsCount,
        currentPage: action.page
      };
    case 'APPLY_TAG_FILTER':
      return {
        ...state,
        workouts: action.payload.workouts,
        workoutsCount: action.payload.workoutsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        tags: action.payload[0].tags,
        workouts: action.payload[1].workouts,
        workoutsCount: action.payload[1].workoutsCount,
        currentPage: 0,
        tab: action.tab
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
    case 'CHANGE_TAB':
      return {
        ...state,
        workouts: action.payload.workouts,
        workoutsCount: action.payload.workoutsCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case 'APPLY_TAG_FILTER':
      return {
        ...state,
        workouts: action.payload.workouts,
        workoutsCount: action.payload.workoutsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case 'PROFILE_PAGE_LOADED':
    case 'PROFILE_FAVORITES_PAGE_LOADED':
      return {
        ...state,
        workouts: action.payload[1].workouts,
        workoutsCount: action.payload[1].workoutsCount,
        currentPage: 0
      };
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
      return {};
  }

  return state;
};
