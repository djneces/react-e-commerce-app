import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
} from '../actions/actionTypes';
const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case REGISTER_CURRENT_USER:
      return {
        ...state,
      };
    case LOGIN_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case LOGOUT_CURRENT_USER:
    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default userReducer;
