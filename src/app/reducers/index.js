import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import users from './users';
import user from './user';

const rootReducer = combineReducers({
  routing,
  users,
  user,
});

export default rootReducer;
