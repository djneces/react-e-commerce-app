import {
  PURCHASE_START,
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const Purchase = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PURCHASE_START:
      return { ...state, loading: true };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        purchased: true,
        loading: false,
        orders: [...state.orders, payload],
      };
    case PURCHASE_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default Purchase;
