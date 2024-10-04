export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          name: action.name,
          completed: false,
        },
      ];
    }
    case "toggleCompleted": {
      return tasks.map((t) => {
        if (t.id === action.id) {
          return { ...t, completed: !t.completed };
        } else {
          return t;
        }
      });
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.id) {
          return { ...t, name: action.name };
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
