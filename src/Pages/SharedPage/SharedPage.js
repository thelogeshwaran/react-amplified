import React from "react";
import TodoList from "../../Components/TodoList/TodoList";
import { useTodoProvider } from "../../Context/TodoProvider";
import { observer } from "mobx-react-lite";

function SharedPage() {
  const { rootTree } = useTodoProvider();
  const inprogressTodos = rootTree.inProgressSharedList();
  const completedTodos = rootTree.completedSharedList();

  return (
    <div className="flex flex-col items-center w-2/4 m-auto min-h-screen">
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

export default observer(SharedPage);
