import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_PROPERTIES_START,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_ERROR,
  POST_PROPERTY_START,
  POST_PROPERTY_SUCCESS,
  POST_PROPERTY_ERROR,
  LOGOUT
} from "../actions";

const initialState = {
  properties: null,
  token: null,
  loginStart: false,
  loginError: false,
  signupStart: false,
  signupError: false,
  getPropertiesStart: false,
  getPropertiesError: false,
  postPropertyStart: false,
  postPropertySuccess: false,
  postPropertyError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginStart: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStart: false,
        token: action.payload
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginStart: false,
        loginError: true
      };

    case SIGNUP_START:
      return {
        ...state,
        loginStart: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loginStart: false,
        token: action.payload
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        loginStart: false,
        loginError: true
      };

    case GET_PROPERTIES_START:
      return {
        ...state,
        getPropertiesStart: true
      };

    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        getPropertiesStart: false,
        properties: action.payload
      };

    case GET_PROPERTIES_ERROR:
      return {
        ...state,
        getPropertiesStart: false,
        getPropertiesError: true
      };

    case POST_PROPERTY_START:
      return {
        ...state,
        postPropertyStart: true
      };

    case POST_PROPERTY_SUCCESS:
      return {
        ...state,
        postPropertyStart: false,
        postPropertySuccess: true,
        properties: action.payload
      };

    case POST_PROPERTY_ERROR:
      return {
        ...state,
        postPropertyStart: false,
        postPropertyError: true
      };

    case LOGOUT:
      return {
        ...state,
        token: null
      };

    default:
      return state;
  }
};

export default reducer;