import axios from '../../axios-orders';
import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  UPDATE_CONTACT_DETAILS_SUCCESS,
  UPDATE_CONTACT_DETAILS_START,
  UPDATE_CONTACT_DETAILS_FAIL,
  FETCH_CONTACT_DETAILS,
} from './actionTypes';
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from '../../firebase/firebaseUtils.js';
import { fetchOrderHistory } from '../actions/orderHistory';
import { setAlert } from './alert';

//SUBSCRIBE USER
export const subscribeUser = () => async (dispatch) => {
  if (dispatch === undefined) return;
  try {
    //subscription - Firebase checks for changes
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //timeout - in case of registering user not to run simultaneously and duplicating records
        setTimeout(async () => {
          //storing user in the DB (Firestore & Realtime) if first-time user, otherwise getting just the ref back
          const userRef = await createUserProfileDocument(userAuth);
          //get Snapshot from the DB with an Id
          userRef.onSnapshot((snapShot) => {
            if (snapShot.exists) {
              const {
                createdAt,
                email,
                displayName,
                userDbId,
              } = snapShot.data();

              const user = {
                id: snapShot.id,
                username: displayName,
                email: email,
                createdAt: createdAt.toDate(),
                userDbId: userDbId,
              };

              console.log('dispatch', dispatch);

              dispatch(setCurrentUser(user));
              dispatch(fetchOrderHistory(userDbId));
              dispatch(fetchContactDetails(userDbId));
            }
          });
        }, 1000);
      }
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//SING IN WITH GOOGLE
export const signInGoogle = () => async (dispatch) => {
  try {
    await signInWithGoogle();

    dispatch(setAlert('You are logged in successfully', 'success'));
    dispatch({
      type: AUTH_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    dispatch(setAlert('Something went wrong, please try again', 'danger'));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//SET USER
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

//LOGIN USER w EMAIL AND PASSWORD
export const loginCurrentUser = (user, history, location) => async (
  dispatch
) => {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.password);

    dispatch({
      type: LOGIN_CURRENT_USER,
    });
    dispatch(setAlert('You are logged in successfully', 'success'));
    //time needed to play the checkmark animation
    setTimeout(() => {
      dispatch({
        type: AUTH_SUCCESS,
      });
      if (location.pathname === '/checkout') return;
      history.push('/');
    }, 1000);
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setAlert('Wrong credentials, please try again', 'danger'));
  }
};

//REGISTER USER
export const registerCurrentUser = (userAuth, history) => async (dispatch) => {
  try {
    //creating user in Firestore & Realtime Db
    const { user } = await auth.createUserWithEmailAndPassword(
      userAuth.emailRegistration,
      userAuth.passwordRegistration
    );
    const additionalData = {
      displayName: userAuth.displayName,
    };

    dispatch({
      type: REGISTER_CURRENT_USER,
    });

    await createUserProfileDocument(user, additionalData);

    dispatch(setAlert('You have registered successfully', 'success'));

    setTimeout(() => {
      dispatch({
        type: AUTH_SUCCESS,
      });
      history.push('/');
    }, 1000);
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setAlert('Something went wrong, please try again', 'danger'));
  }
};

//LOGOUT USER
export const logoutCurrentUser = (history) => async (dispatch) => {
  await auth.signOut();
  history.push('/');
  dispatch({
    type: LOGOUT_CURRENT_USER,
  });
  dispatch(setAlert('You have logged out successfully', 'success'));
};

//UPDATE CONTACT DETAILS START
export const updateContactDetailsStart = () => {
  return {
    type: UPDATE_CONTACT_DETAILS_START,
  };
};

//UPDATE CONTACT DETAILS SUCCESS
export const updateContactDetailsFail = () => {
  return {
    type: UPDATE_CONTACT_DETAILS_FAIL,
  };
};

//UPDATE USER'S SHIPPING ADDRESS & CONTACT DETAILS
export const updateContactDetails = (
  updatedDetails,
  userId,
  location
) => async (dispatch) => {
  dispatch(updateContactDetailsStart());
  await axios
    .patch(`/users/${userId}/.json`, updatedDetails)
    .then((response) => {
      dispatch({
        type: UPDATE_CONTACT_DETAILS_SUCCESS,
        payload: response.data.contactDetails,
      });
      if (location.pathname === '/profile') {
        dispatch(setAlert('Your contacts have been updated', 'success'));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(updateContactDetailsFail());
    });
};

//FETCH USER'S SHIPPING ADDRESS & CONTACT DETAILS
export const fetchContactDetails = (userId) => async (dispatch) => {
  await axios
    .get(`/users/${userId}/contactDetails/.json`)
    .then((response) => {
      dispatch({
        type: FETCH_CONTACT_DETAILS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
