import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Board from './components/Board/Board';
import BoardCollection from './components/BoardCollection/BoardCollection';
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';

function App(props) {

  const { isAuthenticated, isLoading } = props.auth;

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          exact path="/home/:access"
          component={BoardCollection}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/board/:id" component={Board} isAuthenticated={isAuthenticated}/>

        <Redirect path="/home" to="/home/boards" />
        <Redirect path="/" to="/home" />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
