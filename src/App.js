/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
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

Amplify.configure(awsExports);

const App = () => {
  return (
    <div className="bg-green-100 h-full">
      <ToastContainer/>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
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

export default App;
