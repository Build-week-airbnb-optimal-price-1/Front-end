import { axiosWithAuth } from "../../utils/axiosWithAuth";

// const urlServer = "http://localhost:5500/api";
// const urlDs = "http://localhost:5500/api";

const urlServer = "https://carl-shouts.herokuapp.com/api";
const urlDs = "https://ds-unit4-bw-airbnb.herokuapp.com";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (creds, history) => dispatch => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post(`${urlServer}/auth/login`, creds)
    .then(res => {
      console.log(res);
      setTimeout(() => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        setTimeout(() => {
          dispatch({ type: LOGIN_SUCCESS });
          history.push("/properties");
        }, 1000);
      }, 1000);
    })
    .catch(err => dispatch({ type: LOGIN_ERROR }));
};

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (creds, history) => dispatch => {
  dispatch({ type: SIGNUP_START });

  axiosWithAuth()
    .post(`${urlServer}/auth/register`, creds)
    .then(res => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        localStorage.setItem("token", res.data.token);
        history.push("/login");
      }, 1000);
    })
    .catch(err => dispatch({ type: SIGNUP_ERROR }));
};

export const GET_PROPERTIES_START = "GET_PROPERTIES_START";
export const GET_PROPERTIES_SUCCESS = "GET_PROPERTIES_SUCCESS";
export const GET_PROPERTIES_ERROR = "GET_PROPERTIES_ERROR";

export const getProperties = (token) => dispatch => {
  const userId = localStorage.getItem("user_id");
  dispatch({ type: GET_PROPERTIES_START });
  axiosWithAuth(token)
    .get(`${urlServer}/listings/${userId}`)
    .then(res => {
      console.log(res.data);
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
    console.log(property);
    dispatch({ type: POST_PROPERTY_START });
    axiosWithAuth(token)
      .post(`${urlDs}/predict`, property)
      .then(res => {
        setTimeout(() => {
          axiosWithAuth(token)
            .post(`${urlServer}/listings/insertlisting`, res.data.replace(/'/g, '"'))
            .then(res => {
              console.log(res);
              setTimeout(() => {
                dispatch({ type: POST_PROPERTY_SUCCESS });
                history.push("/properties");
              }, 1000);
            })
            .catch(err => dispatch({ type: POST_PROPERTY_ERROR }));
        }, 1000);
      })
      .catch(err => dispatch({ type: POST_PROPERTY_ERROR }));
};

// export const postProperty = (token, property, history) => dispatch => {
//   console.log(property);
//   dispatch({ type: POST_PROPERTY_START });
//     axiosWithAuth(token)
//       .post(`${urlServer}/listings/insertlisting`, property)
//       .then(res => {
//         console.log(res);
//         setTimeout(() => {
//           dispatch({ type: POST_PROPERTY_SUCCESS, payload: res.data });
//           history.push("/properties");
//         }, 1500);
//       })
//       .catch(err => dispatch({ type: POST_PROPERTY_ERROR }));
// };

export const EDIT_PROPERTY_START = "EDIT_PROPERTY_START";
export const EDIT_PROPERTY_ERROR = "EDIT_PROPERTY_ERROR";

export const editProperty = (token, property, history) => dispatch => {
  dispatch({ type: EDIT_PROPERTY_START, payload: property });
  history.push("/add");
  // axiosWithAuth(token)
  //   .put(`${url}/listings/updatelisting/${property.id}`, property)
  //   .then(res => {
  //     console.log(res);
  //     setTimeout(() => {
  //       dispatch({ type: EDIT_PROPERTY_SUCCESS, payload: res.data });
  //       history.push("/properties");
  //     }, 1500);
  //   })
  //   .catch(err => dispatch({ type: EDIT_PROPERTY_ERROR }));
};

export const SAVE_EDIT_PROPERTY_START = "SAVE_EDIT_PROPERTY_START";
export const SAVE_EDIT_PROPERTY_SUCCESS = "SAVE_EDIT_PROPERTY_SUCCESS";
export const SAVE_EDIT_PROPERTY_ERROR = "SAVE_EDIT_PROPERTY_ERROR";

// export const saveEditProperty = (token, property, history) => dispatch => {
//   dispatch({ type: SAVE_EDIT_PROPERTY_START });
//   axiosWithAuth(token)
//     .put(`${urlServer}/listings/updatelisting/${property.id}`, property)
//     .then(res => {
//       console.log(res);
//       setTimeout(() => {
//         dispatch({ type: SAVE_EDIT_PROPERTY_SUCCESS, payload: res.data });
//         history.push("/properties");
//       }, 1500);
//     })
//     .catch(err => dispatch({ type: SAVE_EDIT_PROPERTY_ERROR }));
// };

export const saveEditProperty = (token, property, history) => dispatch => {
  dispatch({ type: SAVE_EDIT_PROPERTY_START });
  axiosWithAuth(token)
    .post(`${urlDs}/predict`, property)
    .then(res => {
      setTimeout(() => {
        axiosWithAuth(token)
          .put(`${urlServer}/listings/updatelisting/${property.id}`, res.data.replace(/'/g, '"'))
          .then(res => {
            console.log(res.data);
            setTimeout(() => {
              dispatch({ type: SAVE_EDIT_PROPERTY_SUCCESS });
              history.push("/properties");
            }, 1000);
          })
          .catch(err => dispatch({ type: SAVE_EDIT_PROPERTY_ERROR }));
      }, 1000);
    })
    .catch(err => dispatch({ type: SAVE_EDIT_PROPERTY_ERROR }));
};

export const DELETE_PROPERTY_START = "DELETE_PROPERTY_START";
export const DELETE_PROPERTY_SUCCESS = "DELETE_PROPERTY_SUCCESS";
export const DELETE_PROPERTY_ERROR = "DELETE_PROPERTY_ERROR";

export const deleteProperty = (token, property) => dispatch => {
  const userId = localStorage.getItem("user_id");
  dispatch({ type: DELETE_PROPERTY_START });
  axiosWithAuth(token)
    .delete(`${urlServer}/listings/deletelisting/${property.id}`)
    .then(res => {
      dispatch({ type: GET_PROPERTIES_START });
      axiosWithAuth(token)
        .get(`${urlServer}/listings/${userId}`)
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
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  history.push("/login");
};