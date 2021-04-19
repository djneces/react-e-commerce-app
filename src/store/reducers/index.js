import { combineReducers } from 'redux';
import userReducer from './user';
import alertReducer from './alert';

export default combineReducers({
  user: userReducer,
  alert: alertReducer,
});
