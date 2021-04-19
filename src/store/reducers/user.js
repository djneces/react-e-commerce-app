import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  LOGIN_CURRENT_USER,
  REGISTER_CURRENT_USER,
  AUTH_ERROR,
} from '../actions/actionTypes';
const INITIAL_STATE = {
  currentUser: null,
  loading: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_CURRENT_USER:
      return {
        ...state,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        loading: false,
      };
    case LOGIN_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        loading: true,
      };
    case LOGOUT_CURRENT_USER:
    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
