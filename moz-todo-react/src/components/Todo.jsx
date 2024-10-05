import { useState, useRef, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

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
        <div className="flex justify-center p-1 items-center grow">
          <input
            id={id}
            className="grow p-2 focus:outline-none rounded-sm px-1 focus:border-slate-200 focus:ring-1 focus:ring-slate-300"
            type="text"
            placeholder={name}
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="flex items-center">
          <div className="w-16 flex flex-col py-2 ml-2 justify-center space-y-1 bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600  rounded-tr-md rounded-br-md group">
            <button
              type="button"
              className="text-xs font-medium text-white/75 hover:text-white"
              onClick={() => setEditing(false)}
            >
              Cancel
              <span className="hidden">renaming {name}</span>
            </button>
            <button
              type="submit"
              className="text-xs font-medium text-white/75 hover:text-white"
            >
              Save
              <span className="hidden">new name for {name}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex flex-col pr-0">
      <div className="flex items-center hover:cursor-pointer">
        <div className="flex justify-center items-center space-x-1.5 px-3 grow">
          <input
            id={id}
            type="checkbox"
            className="hover:cursor-pointer w-4 h-4"
            defaultChecked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label
            className="grow hover:cursor-pointer text-purple-950 text-sm font-medium"
            htmlFor={id}
          >
            {name}
          </label>
        </div>
        <div className="flex items-center">
          <div className="w-1.5 flex flex-col py-2 ml-2 justify-center space-y-1 bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600 overflow-hidden rounded-tr-md rounded-br-md group transition-all ease-in-out hover:w-16">
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100 text-xs font-medium text-white/75 hover:text-white"
              onClick={() => setEditing(true)}
              ref={editButtonRef}
            >
              Edit
            </button>
            <button
              type="button"
              className=" opacity-0 group-hover:opacity-100 text-xs font-medium text-white/85 hover:text-white"
              onClick={() => deleteTask(id)}
            >
              Delete
            </button>
          </div>
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
      className={`bg-white rounded-md relative ${
        completed ? "opacity-70" : "opacity-100"
      }`}
    >
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
