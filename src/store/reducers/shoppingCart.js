/* eslint-disable import/no-anonymous-default-export */
import { ADD_ITEM_TO_CART, TOGGLE_CART_MENU } from '../actions/actionTypes';
const initialState = { items: [], toggle: false };

const ShoppingCart = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_TO_CART:
      return { ...state, items: [...state.items, payload] };
    case TOGGLE_CART_MENU:
      return { ...state, toggle: !state.toggle };
    default:
      return state;
  }
};

export default ShoppingCart;
