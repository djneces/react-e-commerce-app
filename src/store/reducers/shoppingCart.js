/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ITEM_TO_CART,
  TOGGLE_CART_MENU,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
  CLEAR_ALL_CART,
} from '../actions/actionTypes';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from './cartUtils';
const initialState = { items: [], toggle: false };

const ShoppingCart = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_TO_CART:
      return { ...state, items: addItemToCart(state.items, payload) };
    case TOGGLE_CART_MENU:
      return { ...state, toggle: !state.toggle };
    case REMOVE_ITEM_FROM_CART:
      return { ...state, items: removeItemFromCart(state.items, payload) };
    case CLEAR_ITEM_FROM_CART:
      return { ...state, items: clearItemFromCart(state.items, payload) };
    case CLEAR_ALL_CART:
      return { ...state, items: [], toggle: false };
    default:
      return state;
  }
};

export default ShoppingCart;
