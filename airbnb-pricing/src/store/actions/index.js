import { axiosWithAuth } from "../../utils/axiosWithAuth";

const url = "http://localhost:5500/api";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (creds, history) => dispatch => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post(`${url}/auth/login`, creds)
    .then(res => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: LOGIN_SUCCESS });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        history.push("/properties");
      }, 1500);
    })
    .catch(err => dispatch({ type: LOGIN_ERROR }));
};

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (creds, history) => dispatch => {
  dispatch({ type: SIGNUP_START });

  axiosWithAuth()
    .post(`${url}/auth/register`, creds)
    .then(res => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        localStorage.setItem("token", res.data.token);
        history.push("/login");
      }, 1500);
    })
    .catch(err => dispatch({ type: SIGNUP_ERROR }));
};

export const GET_PROPERTIES_START = "GET_PROPERTIES_START";
export const GET_PROPERTIES_SUCCESS = "GET_PROPERTIES_SUCCESS";
export const GET_PROPERTIES_ERROR = "GET_PROPERTIES_ERROR";

export const getProperties = (token) => dispatch => {
  dispatch({ type: GET_PROPERTIES_START });

  axiosWithAuth(token)
    .get(`${url}/listings`)
    .then(res => {
      setTimeout(() => {
        dispatch({ type: GET_PROPERTIES_SUCCESS, payload: res.data });
      }, 1000);
    })
    .catch(err => {
      dispatch({ type: GET_PROPERTIES_ERROR });
      console.log(err);
    });
};

export const POST_PROPERTY_START = "POST_PROPERTY_START";
export const POST_PROPERTY_SUCCESS = "POST_PROPERTY_SUCCESS";
export const POST_PROPERTY_ERROR = "POST_PROPERTY_ERROR";

export const postProperty = (token, property, history) => dispatch => {
    dispatch({ type: POST_PROPERTY_START });
    console.log(property);
    axiosWithAuth(token)
      .post(`${url}/listings/insertlisting`, property)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          dispatch({ type: POST_PROPERTY_SUCCESS, payload: res.data });
          history.push("/properties");
        }, 1500);
      })
      .catch(err => dispatch({ type: POST_PROPERTY_ERROR }));
};

export const DELETE_PROPERTY_START = "DELETE_PROPERTY_START";
export const DELETE_PROPERTY_SUCCESS = "DELETE_PROPERTY_SUCCESS";
export const DELETE_PROPERTY_ERROR = "DELETE_PROPERTY_ERROR";

export const deleteProperty = (token, id) => dispatch => {
  dispatch({ type: DELETE_PROPERTY_START });
  axiosWithAuth(token)
    .delete(`${url}/listings/deletelisting/${id}`)
    .then(res => {
      dispatch({ type: GET_PROPERTIES_START });
      axiosWithAuth(token)
        .get(`${url}/listings`)
        .then(res => {
          setTimeout(() => {
            dispatch({ type: GET_PROPERTIES_SUCCESS, payload: res.data });
          }, 1000);
        })
        .catch(err => {
          dispatch({ type: GET_PROPERTIES_ERROR });
          console.log(err);
        });
    })
    .catch(err => dispatch({ type: DELETE_PROPERTY_ERROR }));
};

export const LOGOUT = "LOGOUT";

export const logout = history => dispatch => {
  dispatch({ type: LOGOUT });
  history.push("/login");
};