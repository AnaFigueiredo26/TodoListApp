/* eslint-disable react/prop-types */
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import tasksReducer from "./helpers/taskReducer";
import { nanoid } from "nanoid";
import { useState, useRef, useEffect, useReducer } from "react";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : props.tasks;
  });
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(taskName) {
    dispatch({
      type: "added",
      id: `todo-${nanoid()}`,
      name: taskName,
    });
  }

  function toggleTaskCompleted(taskId) {
    dispatch({
      type: "toggleCompleted",
      id: taskId,
    });
  }

  function deleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  function editTask(taskId, newName) {
    dispatch({
      type: "changed",
      id: taskId,
      name: newName,
    });
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-200 via-pink-200 to-purple-300">
      <div className="min-h-96 w-6/12 rounded-2xl bg-slate-50/65 px-14 py-12">
        <h2 className="mb-8 text-center text-4xl font-extrabold uppercase text-purple-950">
          ToDo List
        </h2>
        <Form addTask={addTask} />
        <div className="mb-2 mt-8 flex items-end justify-between px-1 text-purple-950">
          <div className="flex space-x-4">{filterList}</div>
          <span
            id="list-heading"
            className="text-xs font-medium"
            tabIndex="-1"
            ref={listHeadingRef}
          >
            {headingText}
          </span>
        </div>
        <ul
          role="list"
          className="mt-4 flex h-[244px] flex-col space-y-3 overflow-auto"
          aria-labelledby="list-heading"
        >
          {taskList.length ? taskList : "🥱 Zzzzzz..."}
        </ul>
      </div>
    </div>
  );
}

export default App;
