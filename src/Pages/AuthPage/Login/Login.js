import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthProvider } from "../../../Context/AuthProvider";
import {  toast } from 'react-toastify';

function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const { login, currentUser } = useAuthProvider();

  useEffect(() => {
    currentUser && history.push("/");
  }, [currentUser]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(userNameRef.current.value, passwordRef.current.value);
      toast.success("Logged in!")
      history.push("/");
    } catch {
      setLoading(false);
      alert("Failed to connect");
    }
  }

  return (
    <div className="flex h-screen  justify-center content-center">
      <div className="w-1/4 h-2/4 border-2  border-black rounded-2xl p-2 m-40">
        <form
          className="flex flex-col text-xl"
          onSubmit={(event) => handleLogin(event)}
        >
          <div className="text-4xl m-5 text-green-500 font-semibold ">
            <h1>Welcome Back!</h1>
          </div>
          <input
            className="border-2 h-10 m-5 p-3"
            type="text"
            ref={userNameRef}
            placeholder="Username"
            required
          ></input>
          <input
            type="password"
            className="border-2 h-10 m-5 p-3"
            ref={passwordRef}
            required
            placeholder="Password"
          ></input>

          <button disabled={loading} className="bg-green-500 m-5 p-2 rounded-lg hover:bg-green-700 text-white font-semibold ">
            Login
          </button>

          <div className="mx-3 p-3 ">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="underline text-blue-600 hover:bg-blue-50"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
