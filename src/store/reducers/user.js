import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
} from '../actions/actionTypes';
const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
      };
    case REGISTER_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
      };
    case LOGOUT_CURRENT_USER:
    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
