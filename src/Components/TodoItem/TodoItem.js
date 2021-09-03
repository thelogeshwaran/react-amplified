import React, { useState } from "react";
import { useTodoProvider } from "../../Context/TodoProvider";
import Button from "../Button/Button";
import TodoInputForm from "../TodoInputForm/TodoInputForm";
import Dropdown from "react-dropdown";

function TodoItem({ todo }) {
  const [edit, setEdit] = useState(false);
  const options = ["low", "medium", "high"];
  const { deleteItem, updateItem,updatePriority, updateProgress} = useTodoProvider();
  async function update(value) {
    const details = {
      id: value.id,
      name: value.name,
      description: value.description,
    };
    await updateItem(details);
    setEdit(false);
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

export default TodoItem;
