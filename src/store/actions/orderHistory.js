import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
} from './actionTypes';
import { setAlert } from '../actions/alert';
import { subscribeUser } from '../actions/user';
import { database } from '../../firebase/firebaseUtils';

export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
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
      snapshot.forEach(function (userSnapshot) {
        const fetchedOrders = Object.values(userSnapshot.val().orders);
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: fetchedOrders,
        });
      });
    });
  } catch (err) {
    dispatch(fetchOrdersFail(err));
    dispatch(setAlert('Data could not be loaded', 'danger'));
    console.error(err);
  }
};
