import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//use local storage (session storage is another folder)
import storage from 'redux-persist/lib/storage';
import userReducer from './user';
import alertReducer from './alert';
import toggleMenu from './accountDetails';
import shoppingCart from './shoppingCart';
import purchase from './purchase';
import orderHistory from './orderHistory';
import { reducer as formReducer } from 'redux-form';

const persistConfig = {
  key: 'root',
  storage,
  //reducers we need to persist
  whitelist: ['cart', 'orderHistory', 'user', 'purchase'],
};
const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertReducer,
  toggleMenu: toggleMenu,
  cart: shoppingCart,
  purchase: purchase,
  orderHistory: orderHistory,
  form: formReducer,
});

export default persistReducer(persistConfig, rootReducer);
