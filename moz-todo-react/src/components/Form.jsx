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
    <form className="flex space-y-12 flex-col" onSubmit={handleSubmit}>
      <h2 className="text-center text-4xl text-purple-950 font-extrabold uppercase">
        <label htmlFor="new-todo-input">ToDo List</label>
      </h2>
      <div className="flex space-x-2 bg-white rounded-md px-3 py-2">
        <input
          type="text"
          id="new-todo-input"
          className="flex-grow
          focus:outline-none rounded-sm px-1 focus:border-slate-200 focus:ring-1 focus:ring-slate-300"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-md bg-purple-600 text-white text-base py-1.5 px-2 bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-600 hover:via-purple-600 hover:to-purple-700"
        >
          Add task
        </button>
      </div>
    </form>
  );
}

export default Form;
