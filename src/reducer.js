'use strict';

import workout from './reducers/workout';
import workoutList from './reducers/workoutList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import profileFavorites from './reducers/profileFavorites';
import settings from './reducers/settings';

export default combineReducers({
  workout,
  workoutList,
  auth,
  common,
  editor,
  home,
  profile,
  profileFavorites,
  settings
});
