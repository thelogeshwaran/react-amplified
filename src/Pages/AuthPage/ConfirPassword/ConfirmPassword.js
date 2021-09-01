import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

function ConfirmPassword() {
  const history = useHistory();
  const location = useLocation();
  const codeRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  function verifypassword(e) {
    e.preventDefault();

    Auth.forgotPasswordSubmit(
      location.state.username,
      codeRef.current.value,
      passwordRef.current.value
    )
      .then((data) => {
        console.log(data);
        history.push("/");
        toast.success("Password has changed!");
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <div className="flex h-screen  justify-center content-center">
      <div className="w-1/4 h-2/5 border-2  border-black rounded-2xl p-2 m-40">
        <form
          className="flex flex-col text-xl "
          onSubmit={(event) => verifypassword(event)}
        >
          <div className="text-4xl m-5 text-green-500 font-semibold ">
            <h1>Enter New Password</h1>
          </div>
          <input
            type="text"
            className="border-2 h-10 m-5 p-3"
            ref={codeRef}
            placeholder="Code"
            required
          />
          <input
            type="password"
            className="border-2 h-10 m-5 p-3"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <input
            type="password"
            className="border-2 h-10 m-5 p-3"
            ref={confirmpasswordRef}
            placeholder="Re-Enter Password"
            required
          />

          <button className="bg-green-500 m-5 p-2 rounded-lg hover:bg-green-700 text-white font-semibold ">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmPassword;
