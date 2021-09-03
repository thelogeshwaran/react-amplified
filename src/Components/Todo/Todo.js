import React from "react";
import TodoList from "../TodoList/TodoList";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider";

const initialState = { name: "", description: "" };


function Todo() {
  const { todos,addTodo } = useTodoProvider();
  const inprogressTodos = todos.filter( item => item.status === false)
  const completedTodos = todos.filter( item => item.status)

  return (
    <div className="flex flex-col items-center w-2/4 m-auto">
        <TodoInputForm onSubmitTodo={addTodo} initialState={initialState} buttonValue="Create"/>
        <div>
          <h1 className="text-4xl m-3">Inprogress</h1>
        </div>
        <TodoList todos={inprogressTodos}/>
        <div>
          <h1 className="text-4xl m-3">Completed</h1>
        </div>
        <TodoList todos={completedTodos}/>
    </div>
  );
}

export default Todo;

