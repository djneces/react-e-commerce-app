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
} from '../actions/actionTypes';
const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: null,
  isLoading: false,
  contactDetails: null,
  contactsLoading: false,
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
        isLoading: true,
      };
    case LOGIN_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case FETCH_CONTACT_DETAILS:
    case UPDATE_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        contactDetails: { ...state.contactDetails, ...payload },
        contactsLoading: false,
      };
    case UPDATE_CONTACT_DETAILS_START:
      return {
        ...state,
        contactsLoading: true,
      };
    case UPDATE_CONTACT_DETAILS_FAIL:
      return {
        ...state,
        contactsLoading: false,
      };
    case LOGOUT_CURRENT_USER:
    case AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        contactDetails: null,
      };

    default:
      return state;
  }
};

export default userReducer;
