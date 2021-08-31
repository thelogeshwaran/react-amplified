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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure(awsExports);

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/verify" component={Confirmsignup}/>
      </Switch>
    </div>
  );
};

export default App;
