import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

function ForgotPassword() {
  const history = useHistory();
  const usernameRef = useRef();

  function forgotPassword(e) {
    e.preventDefault();
    Auth.forgotPassword(usernameRef.current.value)
      .then((data) => {
        console.log(data);
        history.push({
          pathname: "/resetpassword",
          state: { username: usernameRef.current.value },
        });
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className="flex h-screen  justify-center content-center">
      <div className="w-1/4 h-2/5 border-2  border-black rounded-2xl p-2 m-40">
        <form
          className="flex flex-col text-xl "
          onSubmit={(event) => forgotPassword(event)}
        >
          <div className="text-4xl m-5 text-green-500 font-semibold ">
            <h1>Enter Your Username</h1>
          </div>
          <input
            className="border-2 h-10 m-5 p-3"
            type="text"
            ref={usernameRef}
            placeholder="Username"
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

export default ForgotPassword;
