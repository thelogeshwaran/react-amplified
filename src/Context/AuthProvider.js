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
      console.log("Come", user);
      user && setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(userName);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

  async function signup(username, email, password) {
    console.log(username,password,email)
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function confirmSignUp(code) {
    try {
      await Auth.confirmSignUp(userName, code);
      setUserName("")
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

  async function login(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      setCurrentUser(user);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, signOut,setCurrentUser, confirmSignUp,setUserName,resendConfirmationCode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  return useContext(AuthContext);
}
