import { combineReducers } from 'redux';
import userReducer from './user';
import alertReducer from './alert';
import toggleMenu from './accountDetails';
import shoppingCart from './shoppingCart';

export default combineReducers({
  user: userReducer,
  alerts: alertReducer,
  toggleMenu: toggleMenu,
  cart: shoppingCart,
});
