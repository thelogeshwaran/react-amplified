import React from "react";
import TodoList from "../TodoList/TodoList";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider";

const initialState = { name: "", description: "" };


function Todo() {
  const { todos,addTodo } = useTodoProvider();

  return (
    <div className="flex flex-col items-center w-2/4 m-auto">
        <TodoInputForm onSubmitTodo={addTodo} initialState={initialState} buttonValue="Create"/>
        <TodoList todos={todos}/>
    </div>
  );
}

export default Todo;

