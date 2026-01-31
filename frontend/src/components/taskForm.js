import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  // Populate form if we are editing a task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      if (editingTask.dueDate) {
        setDueDate(new Date(editingTask.dueDate).toISOString().split('T')[0]);
      } else {
        setDueDate('');
      }
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({ title, description, priority, dueDate });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Task Title (Required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label style={{ fontSize: '0.9rem', color: '#666', display: 'block', marginBottom: '5px' }}>
          Due Date (Optional)
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button type="submit" className="btn-save">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        
        {editingTask && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;