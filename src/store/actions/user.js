import axios from '../../axios-orders';
import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
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
  try {
    //subscription
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //storing user in the DB (Firestore) if needed
        const userRef = await createUserProfileDocument(userAuth);
        //get Snapshot from the DB with an Id
        userRef.onSnapshot((snapShot) => {
          const { createdAt, email, displayName, userDbId } = snapShot.data();

          const user = {
            id: snapShot.id,
            username: displayName,
            email: email,
            createdAt: createdAt.toDate(),
            userDbId: userDbId,
          };

          dispatch({
            type: SET_CURRENT_USER,
            payload: user,
          });
          dispatch(fetchOrderHistory(userDbId));
        });
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
export const loginCurrentUser = (user, history) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.password);

    dispatch({
      type: LOGIN_CURRENT_USER,
    });
    dispatch(setAlert('You are logged in successfully', 'success'));
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
    dispatch(setAlert('Wrong credentials, please try again', 'danger'));
  }
};

//REGISTER USER
export const registerCurrentUser = (userAuth, history) => async (dispatch) => {
  try {
    const newUser = {
      email: userAuth.emailRegistration,
      username: userAuth.displayName,
    };

    //creating user profile in Realtime DB
    let newUserId;
    await axios
      .post('/users/.json', newUser)
      .then((response) => {
        newUserId = response.data.name;
        dispatch({
          type: REGISTER_CURRENT_USER,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: AUTH_ERROR,
        });
      });
    console.log(newUserId);

    //creating user in Firestore
    const { user } = await auth.createUserWithEmailAndPassword(
      userAuth.emailRegistration,
      userAuth.passwordRegistration
    );
    const additionalData = {
      displayName: userAuth.displayName,
      userDbId: newUserId,
    };

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
  auth.signOut();
  dispatch({
    type: LOGOUT_CURRENT_USER,
  });
  dispatch(setAlert('You have logged out successfully', 'success'));
  history.push('/');
};

//UPDATE USER'S SHIPPING ADDRESS & CONTACT DETAILS
export const updateContactDetails = (updatedDetails, userId) => async (
  dispatch
) => {
  await axios
    .patch(`/users/${userId}/.json`, updatedDetails)
    .then((response) => {
      console.log(response.data.name);
    })
    .catch((err) => {
      console.error(err);
    });
};
