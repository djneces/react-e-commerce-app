import {
  ADD_ITEM_TO_CART,
  TOGGLE_CART_MENU,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
  CLEAR_ALL_CART,
} from './actionTypes';

//quantity + 1
export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});

//quantity -1
export const removeItemFromCart = (item) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: item,
});

export const toggleCartMenu = () => ({
  type: TOGGLE_CART_MENU,
});

//remove from cart
export const clearItemFromCart = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});

//remove from cart
export const clearAllCart = () => ({
  type: CLEAR_ALL_CART,
});
