import React,{ useState } from "react";
import Button from "../Button/Button";

function TodoInputForm({ initialState,onSubmitTodo, buttonValue}) {
  const [formState, setFormState] = useState(initialState);
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.description) return;
      onSubmitTodo(formState)
      setFormState(initialState);
  }
  return (
    <div className='flex w-full m-3 p-3 justify-center'>
      <form className="flex flex-col w-3/5 text-xl" onSubmit={(e) => handleSubmit(e)}>
        <input
        className="border-2 h-10 m-2 my-5 p-3"
          onChange={(event) => setInput("name", event.target.value)}
          value={formState.name}
          placeholder="Name"
        />
        <input
        className="border-2 h-10 m-2 p-3"
          onChange={(event) => setInput("description", event.target.value)}
          value={formState.description}
          placeholder="Description"
        />
        <Button content={buttonValue}/>
      </form>
    </div>
  );
}

export default TodoInputForm;
