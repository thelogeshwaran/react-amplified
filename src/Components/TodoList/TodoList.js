import { observer } from "mobx-react-lite";
import React from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({ todos }) {
  return (
    <div className="flex flex-col w-3/4">
      {todos.map((todo) => (
        <TodoItem key={todo?.id} todo={todo} />
      ))}
    </div>
  );
}

export default observer(TodoList);
