/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props) {
  const { id, name, completed, toggleTaskCompleted, deleteTask, editTask } =
    props;

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName) {
      editTask(id, newName);
      setNewName("");
      setEditing(false);
    }
  }

  const editingTemplate = (
    <form className="flex flex-col pr-0" onSubmit={handleSubmit}>
      <div className="flex items-center hover:cursor-pointer">
        <div className="flex grow items-center justify-center p-1">
          <input
            id={id}
            className="grow rounded-sm p-2 focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
            type="text"
            placeholder={name}
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="group flex w-16 flex-col justify-center space-y-1 rounded-br-md rounded-tr-md bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600 py-2">
          <button
            type="submit"
            className="text-xs font-medium text-white/80 hover:text-white"
          >
            Save
            <span className="hidden">new name for {name}</span>
          </button>
          <button
            type="button"
            className="text-xs font-medium text-white/70 hover:text-white"
            onClick={() => setEditing(false)}
          >
            Cancel
            <span className="hidden">renaming {name}</span>
          </button>
        </div>
        <div className="flex items-center"></div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex flex-col pr-0">
      <div className="flex items-center hover:cursor-pointer">
        <div className="flex grow items-center justify-center space-x-1.5 px-3">
          <input
            id={id}
            type="checkbox"
            className="h-4 w-4 hover:cursor-pointer"
            defaultChecked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label
            className="grow text-sm font-medium text-purple-950 hover:cursor-pointer"
            htmlFor={id}
          >
            {name}
          </label>
        </div>
        <div className="group flex w-1.5 flex-col justify-center space-y-1 overflow-hidden rounded-br-md rounded-tr-md bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600 py-2 transition-all ease-in-out hover:w-16">
          <button
            type="button"
            className="text-xs font-medium text-white/75 opacity-0 hover:text-white group-hover:opacity-100"
            onClick={() => setEditing(true)}
            ref={editButtonRef}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-xs font-medium text-white/85 opacity-0 hover:text-white group-hover:opacity-100"
            onClick={() => deleteTask(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li
      className={`relative rounded-md bg-white ${
        completed ? "opacity-70" : "opacity-100"
      }`}
    >
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
