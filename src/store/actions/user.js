import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
} from './actionTypes';
import {
  auth,
  createUserProfileDocument,
} from '../../firebase/firebaseUtils.js';

//SUBSCRIBE USER
export const subscribeUser = () => async (dispatch) => {
  //subscription
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      //storing user in the DB (Firestore)
      const userRef = await createUserProfileDocument(userAuth);
      //get Snapshot from the DB with an Id
      userRef.onSnapshot((snapShot) => {
        const { createdAt, email, displayName } = snapShot.data();

        const user = {
          id: snapShot.id,
          username: displayName,
          email: email,
          createdAt: createdAt.toDate(),
        };

        dispatch({
          type: SET_CURRENT_USER,
          payload: user,
        });
      });
    }
  });
};

//SET USER
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

//LOGIN USER
export const loginCurrentUser = (user, history) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(user.email, user.password);

    dispatch({
      type: LOGIN_CURRENT_USER,
    });

    history.push('/');
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//REGISTER USER
export const registerCurrentUser = (userAuth, history) => async (dispatch) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    );
    const displayName = userAuth.displayName;

    await createUserProfileDocument(user, { displayName });
    dispatch({
      type: REGISTER_CURRENT_USER,
    });
    history.push('/');
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//LOGOUT USER
export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});