import React, { useState, useEffect } from 'react';
import Search from './Search';
import List from './List';

function Todo() {
  const initialData = JSON.parse(document.getElementById('initial_data').textContent);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setTodos(initialData.todo);
  }, []);

  const handleToggleAllChange = () => {
    const allCompleted = todos.every(todo => todo.done);
    setTodos(todos.map(todo => ({ ...todo, done: !allCompleted })));
  };

  const handleTodoChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'active') return !todo.done;
    if (activeFilter === 'completed') return todo.done;
    return true;
  });

  return (
    <div>
      <section className="todoapp">
        <Search
          newTodo={newTodo}
          handleNewTodoChange={handleNewTodoChange}
          handleNewTodoSubmit={handleNewTodoSubmit}
        />
        {todos.length > 0 && (
          <List
            todos={filteredTodos}
            handleToggleAllChange={handleToggleAllChange}
            handleTodoChange={handleTodoChange}
            handleDeleteTodo={handleDeleteTodo}
            handleClearCompleted={handleClearCompleted}
            activeFilter={activeFilter}
            handleFilterChange={handleFilterChange}
          />
        )}
      </section>
    </div>
  );
}

export default Todo;
