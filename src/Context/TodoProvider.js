import React, { useContext, useEffect, createContext } from "react";
import { API, graphqlOperation,Hub } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { setupRootStore } from "../MST/Setup";
import * as subscriptions from '../graphql/subscriptions';
import { useAuthProvider } from "./AuthProvider";
import { DataStore, Predicates } from "@aws-amplify/datastore"
import {Todo} from "../models"



const TodoContext = createContext();


export function TodoProvider({ children }) {
  const { currentUser } = useAuthProvider();
  const { rootTree } = setupRootStore();
  let subscription;
  let subscriptionDelete;
  let subscriptionUpdate;

  useEffect(() => {
if(currentUser){
  const removeListener = Hub.listen('datastore', async ({ payload }) => {
    if (payload.event === 'ready') {
      console.log('DataStore ready');
      rootTree.fetchTodos();
      if (subscription) {
        removeListener();
      }
    }
  });
  DataStore.start();
  const subscription = DataStore.observe(Todo).subscribe((data) => {
    rootTree.fetchTodos()
  })
}

    return () => {
      if(currentUser){
        subscription.unsubscribe()
      }
    }
  }, [rootTree, currentUser]);

  async function addTodo(todo) {
    try {
      const newTodo = {
        ...todo,
        status: false,
        priority: "high",
        owner: currentUser.username,
        editors: [],
      };
      const response = await DataStore.save(
        new Todo({...newTodo})
      );
      console.log({...response})
    //  const response =  await API.graphql(graphqlOperation(createTodo, { input: newTodo }));
     rootTree.addNewTodo({...response})
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




  // useEffect(() => {
  //   if (currentUser) {
  //     subscriptioned();
  //   }
  //   return () => {
  //     if (currentUser) {
  //       subscription.unsubscribe();
  //       subscriptionDelete.unsubscribe();
  //       subscriptionUpdate.unsubscribe();
  //     }
  //   };
  // }, [currentUser]);

  // async function subscriptioned() {
  //   subscription = API.graphql(
  //     graphqlOperation(subscriptions.onCreateTodo,{owner: currentUser.username })
  //   ).subscribe({
  //     next: (data ) => {
  //       // rootTree.addNewTodo(value.data.onCreateTodo);
  //       console.log(data)
  //     },
  //     error: (error) => console.log(error),
  //   });
  //   subscriptionUpdate = API.graphql(
  //     graphqlOperation(subscriptions.onUpdateTodo)
  //   ).subscribe({
  //     next: ( value) => {
  //       // rootTree.updateItem(value.data.onUpdateTodo);
  //       console.log("came")
  //       console.log(value.data)
  //       // value.data.onUpdateTodo.editors &&
  //         // rootTree.updateSharedItem(value.data.onUpdateTodo, currentUser);
  //     },
  //     error: (error) => console.log(error),
  //   });
  //   subscriptionDelete = API.graphql(
  //     graphqlOperation(subscriptions.onDeleteTodo, { owner: currentUser.username })
  //   ).subscribe({
  //     next: ({ provider, value }) => {
  //       // rootTree.deleteItem(value.data.onDeleteTodo);
  //       // rootTree.deleteSharedItem(value.data.onDeleteTodo);
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }
