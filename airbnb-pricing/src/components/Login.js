import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../store/actions";

function Login(props) {
  const [creds, setCreds] = useState({
      username: "",
      password: ""
  });

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.login(creds, props.history);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={creds.username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={creds.password}
          onChange={handleChange}
        ></input>

        <button type="submit"> Log In </button>
      </form>

      {props.loginError && (
        <p style={{ color: "red", marginTop: "10vh" }}>
          There has been an issue logging in. Please check your credentials.
        </p>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  loginError: state.loginError
});

export default connect(mapStateToProps, { login })(withRouter(Login));
