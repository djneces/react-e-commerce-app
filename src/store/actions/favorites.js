import axios from '../../axios-orders';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_FAIL,
} from './actionTypes';
import { database } from '../../firebase/firebaseUtils.js';

//FETCH FAVORITES FAIL
export const fetchFavoritesFail = (error) => {
  return {
    type: FETCH_FAVORITES_FAIL,
    error: error,
  };
};

//FETCH FAVORITES START
export const fetchFavoritesStart = () => {
  return {
    type: FETCH_FAVORITES_START,
  };
};

//ADD ITEM TO FAVORITES
export const addToFavorites = (userId, itemToAdd) => async (dispatch) => {
  await axios
    .post(`/users/${userId}/favorites/.json`, itemToAdd)
    .then(() => {
      dispatch({
        type: ADD_TO_FAVORITES,
      });
      // dispatch(fetchFavorites());
    })
    .catch((err) => {
      console.error(err);
    });
};
//REMOVE FROM FAVORITES
//userId (Real time DB id), itemToRemove (object, Real time DB id)
export const removeFromFavorites = (userId, itemToRemove) => async (
  dispatch
) => {
  await axios
    .delete(`/users/${userId}/favorites/${itemToRemove}.json`)
    .then(() => {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: itemToRemove,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

//CLEAR FAVORITES
export const clearFavorites = () => {
  return {
    type: CLEAR_FAVORITES,
  };
};

//FETCH ALL Favorites
export const fetchFavorites = (userId) => async (dispatch) => {
  try {
    dispatch(fetchFavoritesStart());
    const query = database
      .ref('users')
      .orderByChild('userDbId')
      .equalTo(userId);
    query.on('value', function (snapshot) {
      snapshot.forEach(function (userSnapshot) {
        if (userSnapshot) {
          if (userSnapshot.val().favorites === undefined) {
            return;
          }
          const fetchedFavorites = userSnapshot.val()?.favorites;
          dispatch({
            type: FETCH_FAVORITES_SUCCESS,
            payload: fetchedFavorites,
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
    dispatch(fetchFavoritesFail(err));
  }
};
