import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../store/actions";

function Signup(props) {
  const [creds, setCreds] = useState({});

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.signup(creds, props.history);
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

        <button type="submit"> Sign Up </button>
      </form>

      {props.loginError && (
        <p style={{ color: "red", marginTop: "10vh" }}>
          There has been an issue signing up in. Please check your credentials.
        </p>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  loginError: state.loginError
});

export default connect(mapStateToProps, { signup })(withRouter(Signup));
