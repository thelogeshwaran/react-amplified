import React, { useContext, useEffect, createContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { setupRootStore } from "../MST/Setup";
import {
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
} from "../graphql/subscriptions";
import { useAuthProvider } from "./AuthProvider";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { currentUser } = useAuthProvider();
  const { rootTree } = setupRootStore();
  let subscription;
  let subscriptionDelete;
  let subscriptionUpdate;

  useEffect(() => {
    if (currentUser) {
      rootTree.fetchTodos(currentUser.username);
      rootTree.fetchUsers(currentUser);
      rootTree.fetchSharedTodos(currentUser.username);
    }
  }, [currentUser, rootTree]);

  useEffect(() => {
    if (currentUser) {
      subscriptions();
    }
    return () => {
      if (currentUser) {
        subscription.unsubscribe();
        subscriptionDelete.unsubscribe();
        subscriptionUpdate.unsubscribe();
      }
    };
  }, [currentUser]);

  async function subscriptions() {
    subscription = API.graphql(
      graphqlOperation(onCreateTodo, { owner: currentUser.username })
    ).subscribe({
      next: ({ provider, value }) => {
        rootTree.addNewTodo(value.data.onCreateTodo);
      },
      error: (error) => console.log(error),
    });
    subscriptionUpdate = API.graphql(
      graphqlOperation(onUpdateTodo, { owner: currentUser.username })
    ).subscribe({
      next: ({ provider, value }) => {
        rootTree.updateItem(value.data.onUpdateTodo);
        value.data.onUpdateTodo.admins &&
          rootTree.updateSharedItem(value.data.onUpdateTodo, currentUser);
      },
      error: (error) => console.log(error),
    });
    subscriptionDelete = API.graphql(
      graphqlOperation(onDeleteTodo, { owner: currentUser.username })
    ).subscribe({
      next: ({ provider, value }) => {
        rootTree.deleteItem(value.data.onDeleteTodo);
        rootTree.deleteSharedItem(value.data.onDeleteTodo);
      },
      error: (error) => console.log(error),
    });
  }

  async function addTodo(todo) {
    try {
      const newTodo = {
        ...todo,
        status: false,
        priority: "high",
        owner: currentUser.username,
        admins: [],
      };
      await API.graphql(graphqlOperation(createTodo, { input: newTodo }));
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
