import React from "react";
import Todo from "../../Components/Todo/Todo";

function HomePage() {
  return (
    <div className='min-h-screen'>
        <div className="flex text-5xl justify-center p-7 font-bold ">
            <h1>Todo</h1>
        </div>
      <Todo />
    </div>
  );
}

export default HomePage;
