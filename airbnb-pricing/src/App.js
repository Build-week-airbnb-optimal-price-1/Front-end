import React from 'react';
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./store/actions";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PropertyList from "./components/PropertyList";
import AddProperty from './components/AddProperty';

function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          path="/properties"
          exact
          component={localStorage.getItem("token") ? PropertyList : Signup}
        />
        <PrivateRoute
          path="/add"
          exact
          component={localStorage.getItem("token") ? AddProperty : Signup}
        />
        {/* <PrivateRoute path="/properties" exact component={PropertyList} />
        <PrivateRoute path="/add" exact component={AddProperty} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("token") ? <Redirect to="/properties" /> : <Signup />
          }
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  loginStart: state.loginStart,
  token: state.token
});

export default connect(mapStateToProps, { logout })(withRouter(App));
