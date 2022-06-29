import React from "react";
import { Route, Switch } from "react-router-dom";
import Forget from "../pages/forget/Forget";
import Login from "../pages/signin/Login";
import Otp from "../pages/otp/Otp";
import PrivateRoute from "./PrivateRoute";
import ChangePass from "../pages/changePass/ChangePass";
import ChatBox from "../pages/chat/Chatbox";
import RegisterForm from "../pages/signup/RegisterForm";
import Index from "../pages/profile1/index";
import Gallary from "../pages/gallary/Gallary";
import Dashboard from "../pages/dashboard/Dashboard";
import Error from "../pages/error/Error";
import SimpleNotification from "./Notify";
const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/profile" component={Index} />
    <Route exact path="/forgot" component={Forget} />
    <Route exact path="/otp" component={Otp} />
    <PrivateRoute exact path="/changepass" component={ChangePass} />
    <PrivateRoute exact path="/chat" component={ChatBox} />
    <PrivateRoute exact path="/gallary" component={Gallary} />
    <Route exact path="/signup" component={RegisterForm} />
    <Route exact path="*" component={Error} />
  </Switch>
);
export default Routes;
