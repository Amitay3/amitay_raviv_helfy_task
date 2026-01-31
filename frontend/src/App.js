import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from './services/apiCalls';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import TaskFilter from './components/taskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      // Ensure we always set an array to prevent crashes
      setTasks(Array.isArray(response.data) ? response.data : []); 
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  // Handle both Create and Update logic based on state
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const res = await updateTask(editingTask.id, taskData);
        setTasks(tasks.map(t => t.id === editingTask.id ? res.data : t));
      } else {
        const res = await createTask(taskData);
        setTasks([...tasks, res.data]);
      }
      closeModal();
    } catch (err) {
      alert('Error saving task');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      // Close modal if the deleted task was currently open
      if (editingTask && editingTask.id === id) closeModal();
    } catch (err) {
      alert('Error deleting task');
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTaskCompletion(id);
      setTasks(tasks.map(t => t.id === id ? res.data : t));
    } catch (err) {
      alert('Error updating status');
    }
  };

  // Combine Status Filter and Search Query
  const getFilteredTasks = () => {
    let result = tasks;

    if (filter === 'completed') result = result.filter(t => t.completed);
    if (filter === 'pending') result = result.filter(t => !t.completed);

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(lowerQuery) || 
        (t.description && t.description.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  };

  return (
    <div className="app-container">
      {/* Header with Search and Create Button */}
      <header className="app-header">
        <h1>Amitay's Task Manager</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="btn-create-main" onClick={openCreateModal}>
          <span className="plus-icon">+</span> New Task
        </button>
      </header>

      <main>
        {error && <div className="error-msg">{error}</div>}
        
        <section className="controls-section">
          <TaskFilter currentFilter={filter} setFilter={setFilter} />
        </section>

        {/* 3D Carousel List */}
        <section className="list-section">
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList 
              tasks={getFilteredTasks()} 
              onToggle={handleToggle} 
              onDelete={handleDelete}
              onEdit={openEditModal} 
            />
          )}
        </section>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close-icon" onClick={closeModal}>&times;</button>
              <TaskForm 
                onSave={handleSaveTask} 
                editingTask={editingTask} 
                onCancel={closeModal}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;