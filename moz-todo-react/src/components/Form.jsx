/* eslint-disable react/prop-types */
import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      props.addTask(name);
      setName("");
    }
  }

  return (
    <form className="flex flex-col space-y-12" onSubmit={handleSubmit}>
      <h2 className="text-center text-4xl font-extrabold uppercase text-purple-950">
        <label htmlFor="new-todo-input">ToDo List</label>
      </h2>
      <div className="flex space-x-1 rounded-md bg-white p-1">
        <input
          type="text"
          id="new-todo-input"
          className="flex-grow rounded-sm p-2 focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-md bg-purple-600 bg-gradient-to-r from-purple-600 to-purple-600 px-2 py-1.5 text-base text-white hover:from-purple-600 hover:via-purple-600 hover:to-purple-700"
        >
          Add task
        </button>
      </div>
    </form>
  );
}

export default Form;
