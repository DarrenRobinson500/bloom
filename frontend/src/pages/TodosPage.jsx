import { useState, useEffect } from 'react';
import { todosApi } from '../api/client';

export default function TodosPage({ openTodoModal }) {
  const [todos, setTodos] = useState([]);

  const load = () =>
    todosApi.list().then((res) => setTodos(res.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const toggle = async (todo) => {
    await todosApi.update(todo.id, { completed: !todo.completed });
    load();
  };

  const remove = async (id) => {
    await todosApi.remove(id);
    load();
  };

  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Todos</h2>
        <button
          onClick={() => openTodoModal()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
        >
          + New Todo
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-gray-400 text-center py-16">No todos yet — add one!</p>
      )}

      {pending.length > 0 && (
        <div className="mb-6 space-y-2">
          {pending.map((todo) => (
            <TodoRow key={todo.id} todo={todo} onToggle={toggle} onEdit={openTodoModal} onDelete={remove} />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Completed</h3>
          <div className="space-y-2 opacity-60">
            {done.map((todo) => (
              <TodoRow key={todo.id} todo={todo} onToggle={toggle} onEdit={openTodoModal} onDelete={remove} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TodoRow({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        onClick={() => onEdit(todo)}
        role="button"
      >
        {todo.title}
      </span>
      {todo.due_date && (
        <span className="text-xs text-gray-400 flex-shrink-0">{todo.due_date}</span>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none"
        title="Delete"
      >
        ×
      </button>
    </div>
  );
}
