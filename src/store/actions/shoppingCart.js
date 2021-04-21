import { ADD_ITEM_TO_CART, TOGGLE_CART_MENU } from './actionTypes';

export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});

export const toggleCartMenu = () => ({
  type: TOGGLE_CART_MENU,
});
