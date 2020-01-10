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
  EDIT_PROPERTY_START,
  EDIT_PROPERTY_ERROR,
  SAVE_EDIT_PROPERTY_START,
  SAVE_EDIT_PROPERTY_SUCCESS,
  SAVE_EDIT_PROPERTY_ERROR,
  DELETE_PROPERTY_START,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_ERROR,
  LOGOUT
} from "../actions";

const initialState = {
  username: "",
  password: "",
  currentProperty: null,
  properties: null,
  loginStart: false,
  loginError: false,
  signupStart: false,
  signupNew: false,
  signupError: false,
  getPropertiesStart: false,
  getPropertiesError: false,
  postPropertyStart: false,
  postPropertySuccess: false,
  postPropertyError: false,
  editPropertyStart: false,
  editPropertyError: false,
  saveEditPropertyStart: false,
  saveEditPropertySuccess: false,
  saveEditPropertyError: false,
  deletePropertyStart: false,
  deletePropertySuccess: false,
  deletePropertyError: false
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
        signupNew: false
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
        signupStart: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupStart: false,
        signupNew: true
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        signupStart: false,
        signupError: true
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

    case EDIT_PROPERTY_START:
      return {
        ...state,
        editPropertyStart: true,
        currentProperty: action.payload
      };

    case EDIT_PROPERTY_ERROR:
      return {
        ...state,
        editPropertyStart: false,
        editPropertyError: true
      };

    case SAVE_EDIT_PROPERTY_START:
      return {
        ...state,
        saveEditPropertyStart: true
      };

    case SAVE_EDIT_PROPERTY_SUCCESS:
      return {
        ...state,
        saveEditPropertyStart: false,
        saveEditPropertySuccess: true,
        editPropertyStart: false,
        properties: action.payload
      };

    case SAVE_EDIT_PROPERTY_ERROR:
      return {
        ...state,
        saveEditPropertyStart: false,
        editPropertyStart: false,
        saveEditPropertyError: true
      };

    case DELETE_PROPERTY_START:
      return {
        ...state,
        deletePropertyStart: true
      };

    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        deletePropertyStart: false,
        deletePropertySuccess: true,
        properties: action.payload
      };

    case DELETE_PROPERTY_ERROR:
      return {
        ...state,
        deletePropertyStart: false,
        deletePropertyError: true
      };

    case LOGOUT:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default reducer;