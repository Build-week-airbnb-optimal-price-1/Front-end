import React from 'react';
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup";
import PropertyList from "./components/PropertyList";

function App(props) {
  
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/properties" exact component={loggedIn ? PropertyList : Signup} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  loginStart: state.loginStart
});

export default connect(mapStateToProps, { logout })(withRouter(App));