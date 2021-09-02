import React from "react";

function Button({ content, onClick, disabled }) {
  return (
    <button
      className="bg-green-500 m-2  p-2  rounded-lg hover:bg-green-700 text-white font-semibold"
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
