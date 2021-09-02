import React, { useRef } from "react";
import { useAuthProvider } from "../../../Context/AuthProvider";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function ConfirmLogin() {
  const { confirmLogin } = useAuthProvider();
  const history = useHistory();
  const codeRef = useRef();

  async function verifyLogin(e) {
    e.preventDefault();
    try {
      await confirmLogin(codeRef.current.value);
      toast.success("Logged In!");
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div className="flex h-screen  justify-center content-center">
      <div className="w-1/4 h-2/5 border-2  border-black rounded-2xl p-2 m-40">
        <form
          className="flex flex-col text-xl "
          onSubmit={(event) => verifyLogin(event)}
        >
          <div className="text-4xl m-5 text-green-500 font-semibold ">
            <h1>Enter the code</h1>
          </div>
          <input
            className="border-2 h-10 m-5 p-3"
            ref={codeRef}
            placeholder="Code"
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

export default ConfirmLogin;
