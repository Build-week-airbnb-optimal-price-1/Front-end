import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../store/actions";
import style from "styled-components";

const StyleLogin = style.form`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 1364px;
  height: 814px;
  margin: 0 auto;
  border: 2px solid #FF8C00;
  border-radius: 1px;
  background: #eee;
`;

const Image = style.img`
  styles
  margin-right: 1000px;
`;

const Title = style.label`
  display: flex;
  color: gray;
  margin-right: 1000px;
`;

const Button = style.button`
    background: blue;
    color: #fff;
    padding: 10px;
    margin: 5px;
    width: 150px;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    margin-right: 1000px;
    margin-top: 10px;
  }
`;

const StyleInput = style.input`
  border: 1px solid #a9a9a9;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  width: 150px;
  box-sizing: border-box;
  margin-right: 1000px;
  margin-top: 10px;
`;

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
      <StyleLogin onSubmit={onSubmit}>
        <Image src="images/Logo.svg" />
        <Title>Aribnb Pricer</Title>
        <Title>Username</Title>
        <StyleInput
          required
          type="text"
          name="username"
          placeholder="username"
          value={creds.username}
          onChange={handleChange}></StyleInput>
        <Title>Password</Title>
        <StyleInput
          required
          type="password"
          name="password"
          placeholder="password"
          value={creds.password}
          onChange={handleChange}></StyleInput>
        <Button type="submit"> Register </Button>
        <Title>Have an account?</Title>
        <Title>Login</Title>
      </StyleLogin>
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
