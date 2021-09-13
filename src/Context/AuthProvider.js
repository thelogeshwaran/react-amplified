import React, { useState, useContext, useEffect, createContext } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user && setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  async function signup(username, email, password, number) {
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: "+91" + number,
      },
    });
  }

  async function confirmSignUp(code) {
    await Auth.confirmSignUp(userName, code);
  }

  async function resendConfirmationCode() {
    await Auth.resendSignUp(userName);
  }

  async function login(username, password) {
    const user = await Auth.signIn(username, password);
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  async function confirmLogin(code) {
    const loggedUser = await Auth.confirmSignIn(currentUser, code, "SMS_MFA");
    console.log(loggedUser);
    setCurrentUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }

  async function signOut() {
    await Auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        signOut,
        setCurrentUser,
        confirmSignUp,
        setUserName,
        resendConfirmationCode,
        confirmLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  return useContext(AuthContext);
}
