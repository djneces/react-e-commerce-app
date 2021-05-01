import axios from '../../axios-orders';

import { setAlert } from '../../store/actions/alert';
import { clearAllCart } from '../../store/actions/shoppingCart';
import {
  PURCHASE_START,
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
  CLEAR_ALL_PURCHASES,
} from './actionTypes';

//purchase start
export const purchaseStart = () => {
  return {
    type: PURCHASE_START,
  };
};

//purchase success
export const purchaseSuccess = (id, orderData) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: { id: id, orderItems: orderData },
  };
};

//purchase fail
export const purchaseFail = (error) => {
  return {
    type: PURCHASE_FAIL,
    error: error,
  };
};

//clear all purchases
export const clearAllPurchases = () => {
  return {
    type: CLEAR_ALL_PURCHASES,
  };
};

//create order
export const createOrder = (orderDetails, userId, history) => (dispatch) => {
  const { orderItems } = orderDetails;
  if (orderItems.length > 0) {
    dispatch(purchaseStart());
    axios
      .post(`/users/${userId}/orders/.json`, orderDetails)
      .then((response) => {
        setTimeout(() => {
          dispatch(purchaseSuccess(response.data.name, orderDetails));
          dispatch(clearAllCart());
          dispatch(
            setAlert(
              'Purchase completed, thank you for shopping with us',
              'purchased',
              8000
            )
          );
          history.push('/');
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        dispatch(purchaseFail(err));
        dispatch(setAlert('Something went wrong, please try again', 'danger'));
      });
  } else {
    dispatch(setAlert('Please add items in your basket', 'danger'));
  }
};
