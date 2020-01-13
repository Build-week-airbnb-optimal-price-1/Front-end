import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { signup } from "../store/actions";
import style from "styled-components";

const LoginContainer = style.div`
  display: flex;
  height: 100%;
`;

const LoginLeft = style.div`
  width: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginRight = style.div`
  width: 66.66%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #2281bf;
`;

const Quote = style.h2`
  width: 347px;
  height: 210px;
  font-weight: 500;
  color: #fff;
  font-size: 24px;
  line-height: 1.5;
`;

const StyleLogin = style.form`
  width: 222px;
  height: 350px;
  border-radius: 1px;
  background: #fff;
`;

const Title = style.h1`
  font-size: 26px;
  font-weight: 900;
  color: #363131;
`;

const Label = style.label`
  font-size: 12px;
  font-weight: 600;
  color: #8f8d8d;
  margin-top: 10px;
`;

const Details = style.p`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #8f8d8d;
`;

const Button = style.button`
    background-color: #2281bf;
    color: #fff;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    &:disabled {
      opacity: .5;
    }
  }
`;

const StyleInput = style.input`
  border: 1px solid #a9a9a9;
  padding: 10px;
  width: 100%;
  border-radius: 3px;
  border: solid 1px #e2e0e0;
  background-color: #f3f3f3;
  box-sizing: border-box;
  margin-top: 10px;
`;

const StyleLink = style(Link)`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: #2281bf;
  display: block;
`;

function Signup(props) {
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
    props.signup(creds, props.history);
  };

  return (
    <>
      <LoginContainer>
        <LoginLeft>
          <StyleLogin onSubmit={onSubmit}>
            <img src="images/Logo.svg" />
            <Title>Airbnb Pricer</Title>
            <Label>Username</Label>
            <StyleInput
              required
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
            ></StyleInput>
            <Label>Password</Label>
            <StyleInput
              required
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
            ></StyleInput>
            {props.signupStart ? (
              <Button type="submit" disabled>
                Loading...
              </Button>
            ) : (
              <Button type="submit">Sign up</Button>
            )}
            {props.signupError && (
              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                There has been an issue signing up. Please alert your local
                government.
              </p>
            )}
            <Details>Have an account?</Details>
            <StyleLink to={`/login`}>Login</StyleLink>
          </StyleLogin>
        </LoginLeft>
        <LoginRight>
          <Quote>
            “Within 15 minutes of using Airbnb Pricer, I was transformed. Where
            before I was but a child, I was now able to stare into the
            transcendence of infinity. “
          </Quote>
        </LoginRight>
      </LoginContainer>
    </>
  );
}

const mapStateToProps = state => ({
  signupStart: state.signupStart,
  signupError: state.signupError
});

export default connect(mapStateToProps, { signup })(withRouter(Signup));
