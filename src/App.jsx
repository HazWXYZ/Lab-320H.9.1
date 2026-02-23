import { useReducer, useState } from "react";
import "./App.css";

const initialState = [
  { id: 4, title: "et porro tempora", completed: true },
  { id: 8, title: "quo adipisci enim quam ut ab", completed: true },
  { id: 1, title: "delectus aut autem", completed: false },
  { id: 2, title: "quis ut nam facilis et officia qui", completed: false },
  { id: 3, title: "fugiat veniam minus", completed: false },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        { id: Date.now(), title: action.title, completed: false },
        ...state,
      ];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, title: action.title } : todo
      );
    default:
      return state;
  }
}

function TodoItem({ todo, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(todo.title);

  function handleSave() {
    if (editVal.trim()) {
      dispatch({ type: "EDIT", id: todo.id, title: editVal.trim() });
    }
    setEditing(false);
  }

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
      />

      {editing ? (
        <>
          <input
            className="edit-input"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <button onClick={() => { setEditVal(todo.title); setEditing(true); }}>
            Edit
          </button>
          <button
            onClick={() => dispatch({ type: "DELETE", id: todo.id })}
            disabled={!todo.completed}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");

  function handleAdd() {
    if (newTodo.trim()) {
      dispatch({ type: "ADD", title: newTodo.trim() });
      setNewTodo("");
    }
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="add-row">
        <input
          placeholder="Add a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}
