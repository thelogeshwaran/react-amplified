import React from "react";
import TodoList from "../TodoList/TodoList";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import { useTodoProvider } from "../../Context/TodoProvider";
import { observer } from "mobx-react-lite";

const initialState = { name: "", description: "" };

function Todo() {
  const { addTodo, rootTree } = useTodoProvider();
  const inprogressTodos = rootTree.inProgressList();
  const completedTodos = rootTree.completedList();

  return (
    <div className="flex flex-col items-center w-3/4 m-auto">
      <TodoInputForm
        onSubmitTodo={addTodo}
        initialState={initialState}
        buttonValue="Create"
      />
      <div>
        <h1 className="text-4xl m-3">Inprogress</h1>
      </div>
      <TodoList todos={inprogressTodos} />
      <div>
        <h1 className="text-4xl m-3">Completed</h1>
      </div>
      <TodoList todos={completedTodos} />
    </div>
  );
}

export default observer(Todo);
