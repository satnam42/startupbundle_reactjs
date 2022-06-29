import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/header/Header";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = false;
  if (localStorage.getItem("token") !== null) {
    auth = true;
  }
  return auth ? (
    <>
      <Header />
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
