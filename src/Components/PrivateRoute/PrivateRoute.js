import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthProvider";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuthProvider();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
