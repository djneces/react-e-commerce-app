import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
} from '../actions/actionTypes';

const initialState = {
  orderHistory: [],
  loading: false,
};

const Purchase = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_START:
      return { ...state, loading: true };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orderHistory: payload, loading: false };
    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default Purchase;
