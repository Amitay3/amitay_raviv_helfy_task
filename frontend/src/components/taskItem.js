import React from 'react';

// Functional component that renders a single task card with actions
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    
    // Helper to map priority levels to specific color codes
    const getPriorityColor = (p) => {
        if (p === 'high') return 'red';
        if (p === 'medium') return 'orange';
        return 'green';
    };

    // Helper to format date string into readable format
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        });
    }

    return (
        // Wrapper applies 'completed' class for styling if task is done
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            
            <div className="card-header">
                <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                    {task.priority}
                </span>
                
                <div className="actions">
                    <button onClick={() => onEdit(task)} className="btn-icon">Edit Task</button>
                    <button
                        onClick={() => {
                            // Confirm deletion
                            if (window.confirm('Delete this task?')) onDelete(task.id);
                        }}
                        className="btn-icon delete"
                    >
                        Delete Task
                    </button>
                </div>
            </div>

            <h4>{task.title}</h4>
            <p>{task.description}</p>

            {task.dueDate && (
                <div className="task-due-date">
                    Due: {formatDate(task.dueDate)}
                </div>
            )}

            <div className="card-footer">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                    {task.completed ? 'Completed' : 'Mark as Done'}
                </label>
            </div>
        </div>
    );
};

export default TaskItem;