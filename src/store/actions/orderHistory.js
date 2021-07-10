import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  CLEAR_ORDER_HISTORY,
} from './actionTypes';
import { setAlert } from '../actions/alert';

import { database } from '../../firebase/firebaseUtils';

//FETCH ORDERS FAIL
export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

//FETCH ORDER START
export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

//CLEAR ALL HISTORY
export const clearOrderHistory = () => {
  return {
    type: CLEAR_ORDER_HISTORY,
  };
};

//FETCH ALL ORDERS
export const fetchOrderHistory = (userId) => async (dispatch) => {
  dispatch(fetchOrdersStart());
  try {
    const query = database
      .ref('users')
      .orderByChild('userDbId')
      .equalTo(userId);
    query.on('value', function (snapshot) {
      // If not data
      if (!snapshot.hasChildren()) {
        dispatch(fetchOrdersFail('No records found'));
        return;
      }
      // Otherwise fetch the data if any
      snapshot.forEach(function (userSnapshot) {
        if (userSnapshot) {
          if (userSnapshot.val().orders === undefined) {
            dispatch(fetchOrdersFail('No records found'));
            return;
          }
          const fetchedOrders = Object.values(userSnapshot.val()?.orders);
          dispatch({
            type: FETCH_ORDERS_SUCCESS,
            payload: fetchedOrders,
          });
        }
      });
    });
  } catch (err) {
    dispatch(fetchOrdersFail(err));
    dispatch(setAlert('Data could not be loaded', 'danger'));
    console.error(err);
  }
};
