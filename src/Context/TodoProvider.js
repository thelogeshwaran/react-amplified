import React, { useState, useContext, useEffect, createContext } from "react";
import { listTodos } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "../graphql/mutations";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      console.log(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(todo) {
    try {
      const newTodo = { ...todo, status : false , priority : "high" };
      const { data } = await API.graphql(
        graphqlOperation(createTodo, { input: newTodo })
      );
      setTodos([data.createTodo, ...todos]);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
  async function deleteItem(id) {
    try {
      const deleteItem = { id };
      const response = await API.graphql(
        graphqlOperation(deleteTodo, { input: deleteItem })
      );
      const filteredData = todos.filter((item) => item.id !== id);
      setTodos(filteredData);
      console.log(response);
      console.log(deleteItem);
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }
  async function updateItem(todo) {
    try {
      const { data } = await API.graphql(
        graphqlOperation(updateTodo, { input: todo })
      );
      const updatedData = todos.map((item) => {
        if (item.id === todo.id) {
          return data.updateTodo;
        } else {
          return item;
        }
      });
      setTodos(updatedData);
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }
  

  async function updatePriority(id, value){
    const updatedValue = {
      id : id,
      priority : value
    }
    try {
      const { data } = await API.graphql(
        graphqlOperation(updateTodo, { input: updatedValue })
      );
      const updatedData = todos.map((item) => {
        if (item.id === id) {
          item.priority = value;
          return item;
        } else {
          return item;
        }
      });
      setTodos(updatedData);
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }

  async function updateProgress(id, value){
    const updatedValue = {
      id : id,
      status : value
    }
    try {
      const { data } = await API.graphql(
        graphqlOperation(updateTodo, { input: updatedValue })
      );
      const updatedData = todos.map((item) => {
        if (item.id === id) {
          item.status = value;
          return item;
        } else {
          return item;
        }
      });
      setTodos(updatedData);
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }
  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, deleteItem, updateItem, updatePriority,updateProgress }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoProvider() {
  return useContext(TodoContext);
}
