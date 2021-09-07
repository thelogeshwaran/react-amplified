import React, { useState } from "react";
import Button from "../Button/Button";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import Dropdown from "react-dropdown";
import { observer } from "mobx-react-lite";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTodo, updateTodo } from "../../graphql/mutations";

function TodoItem({ todo }) {
  const [edit, setEdit] = useState(false);
  const options = ["low", "medium", "high"];

  async function update(value) {
    const details = {
      id: value.id,
      name: value.name,
      description: value.description,
    };
    try {
      await API.graphql(graphqlOperation(updateTodo, { input: details }));
      setEdit(false);
      todo.updateTodo(details);
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
      todo.updatePriority(value);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem(id) {
    try {
      const deleteItem = { id };
      await API.graphql(graphqlOperation(deleteTodo, { input: deleteItem }));
      todo.removeTodo();
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
      todo.updateStatus(value);
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
            </div>
          </div>
          <p>{todo.description}</p>
        </div>
      )}
    </div>
  );
}

export default observer(TodoItem);
