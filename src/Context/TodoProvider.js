import React, { useContext, useEffect, createContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { setupRootStore } from "../MST/Setup";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { rootTree } = setupRootStore();
  useEffect(() => {
    rootTree.fetchTodos();
    console.log("fetched")
  }, [rootTree]);

  async function addTodo(todo) {
    try {
      const newTodo = { ...todo, status: false, priority: "high" };
      const { data } = await API.graphql(
        graphqlOperation(createTodo, { input: newTodo })
      );
      rootTree.addNewTodo(data.createTodo);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <TodoContext.Provider
      value={{
        rootTree,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoProvider() {
  return useContext(TodoContext);
}
