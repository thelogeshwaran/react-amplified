import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthProvider } from "../../../Context/AuthProvider";
import { toast } from "react-toastify";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signup,setUserName } = useAuthProvider();

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setUserName(usernameRef.current.value);
      await signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        phoneRef.current.value
      );
      history.push("/verifySignup");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message)
    }
  }

  return (
    <div className="flex h-screen  justify-center content-center">
      <div className="w-1/4 h-auto border-2  border-black rounded-2xl p-2 m-40">
        <form
          className="flex flex-col text-xl "
          onSubmit={(event) => handleSignUp(event)}
        >
          <div className="text-4xl m-5 text-green-500 font-semibold ">
            <h1>Create New Account</h1>
          </div>
          <input
            className="border-2 h-10 m-5 p-3"
            type="text"
            ref={usernameRef}
            required
            placeholder="Username"
          ></input>
          <input
            className="border-2 h-10 m-5 p-3"
            type="text"
            ref={phoneRef}
            required
            placeholder="Phone"
          ></input>
          <input
            className="border-2 h-10 m-5 p-3"
            type="email"
            ref={emailRef}
            placeholder="Email"
            required
          ></input>
          <input
            className="border-2 h-10 m-5 p-3"
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          ></input>

          <button
            disabled={loading}
            className="bg-green-500 m-5 p-2 rounded-lg hover:bg-green-700 text-white font-semibold "
          >
            Signup
          </button>

          <div className="mx-3 p-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-blue-600 hover:bg-blue-100"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
