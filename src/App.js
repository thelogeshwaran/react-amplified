/* src/App.js */
import React from "react";
import { Switch,Route } from "react-router-dom";
import Login from "./Pages/AuthPage/Login/Login";
import Signup from "./Pages/AuthPage/Signup/Signup";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import HomePage from "./Pages/HomePage/HomePage";
import Confirmsignup from "./Pages/AuthPage/ConfirmSingnup/Confirmsignup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmLogin from "./Pages/AuthPage/ConfirmLogin/ConfirmLogin";
import ForgotPassword from "./Pages/AuthPage/ForgotPassword/ForgotPassword";
import ConfirmPassword from "./Pages/AuthPage/ConfirPassword/ConfirmPassword";
import FilesPage from "./Pages/FilesPage/FilesPage";
import NavBar from "./Components/NavBar/NavBar";
import { observer } from "mobx-react-lite";
import SharedPage from "./Pages/SharedPage/SharedPage";
import config from "./aws-exports";
import Amplify from "@aws-amplify/core";

Amplify.configure(config);


const App = () => {
  return (
    <div className="bg-green-100 h-full">
      <ToastContainer/>
      <NavBar/>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/files" component={FilesPage} />
        <PrivateRoute path="/shared" component={SharedPage} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/verifySignup" component={Confirmsignup}/>
        <Route path="/verifyLogin" component={ConfirmLogin}/>
        <Route path="/forgotpassword" component={ForgotPassword}/>
        <Route path="/resetpassword" component={ConfirmPassword}/>
      </Switch>
    </div>
  );
};

export default observer(App);
