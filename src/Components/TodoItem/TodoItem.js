import React, { useState } from "react";
import Button from "../Button/Button";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import Dropdown from "react-dropdown";
import { observer } from "mobx-react-lite";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTodo, updateTodo } from "../../graphql/mutations";
import { useTodoProvider } from "../../Context/TodoProvider";
import { useLocation } from 'react-router-dom';

function TodoItem({ todo }) {
  const [edit, setEdit] = useState(false);
  const options = ["low", "medium", "high"];
  const { rootTree } = useTodoProvider();
  const location = useLocation();

  async function update(value) {
    const details = {
      id: value.id,
      name: value.name,
      description: value.description,
    };
    try {
      await API.graphql(graphqlOperation(updateTodo, { input: details }));
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePriority(id, value) {
    const updatedValue = {
      id: id,
      priority: value,
    };
    try {
      await API.graphql(graphqlOperation(updateTodo, { input: updatedValue }));
    } catch (err) {
      console.log(err);
    }
  }
  async function updateAdmins(id, value,todo) {
    let result = todo.admins.includes(value);
    console.log(value)
   if(!result){
    const updatedValue = {
      id: id,
      admins:  [...todo.admins,value],
    };
    console.log(updatedValue)
    try {
      await API.graphql(graphqlOperation(updateTodo, { input: updatedValue }));
    } catch (err) {
      console.log(err);
    }
   }
    
  }

  async function deleteItem(id) {
    try {
      const deleteItem = { id };
      await API.graphql(graphqlOperation(deleteTodo, { input: deleteItem }));
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }

  async function updateProgress(id, value) {
    const updatedValue = {
      id: id,
      status: value,
    };
    try {
      await API.graphql(graphqlOperation(updateTodo, { input: updatedValue }));
    } catch (err) {
      console.log("error deleting todo:", err);
    }
  }

  return (
    <div>
      {edit ? (
        <TodoInputForm
          onSubmitTodo={update}
          initialState={todo}
          buttonValue="update"
        />
      ) : (
        <div className="p-2 m-2 border-2 border-black">
          <div className="flex justify-between items-center">
            <div className="h-7 w-7">
              <input
                className="h-6 w-6"
                type="checkbox"
                defaultChecked={todo.status}
                onChange={() => updateProgress(todo.id, !todo.status)}
              />
            </div>
            <p className="text-2xl font-medium p-2 break-all">{todo.name}</p>
            <div className="flex items-center">
              <Dropdown
                className="w-20 bg-white p-2 m-2 text-black"
                options={options}
                onChange={(e) => updatePriority(todo.id, e.value)}
                value={todo.priority}
                placeholder="Select an option"
              />
              <Button content="Edit" onClick={() => setEdit(true)} />
              <Button content="Delete" onClick={() => deleteItem(todo.id)} />
              {
                location.pathname !== "/shared" &&
                <Dropdown
                className="w-auto bg-white p-2 m-2 text-black"
                options={rootTree.users? [...rootTree.users] :[]}
                onChange={(e) => updateAdmins(todo.id, e.value,todo)}
                value="Share"
                placeholder="Select an option"
              />
              }
            </div>
          </div>
          <p>{todo.description}</p>
        </div>
      )}
    </div>
  );
}

export default observer(TodoItem);
