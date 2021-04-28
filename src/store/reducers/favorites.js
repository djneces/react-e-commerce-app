import _ from 'lodash';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_FAIL,
} from '../actions/actionTypes';
const INITIAL_STATE = {
  favorites: {},
  loading: false,
};

const favorites = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_FAVORITES_START:
      return { ...state, loading: true };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: { ...state.favorites, payload },
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: _.omit(state.favorites, payload),
      };
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: { ...payload },
        loading: false,
      };
    case FETCH_FAVORITES_FAIL:
      return { ...state, loading: false };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default favorites;
