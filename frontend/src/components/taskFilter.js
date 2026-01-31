import React from 'react';

// Component for filtering tasks based on their completion status
const TaskFilter = ({ currentFilter, setFilter }) => {
  return (
    <div className="filter-container">
      <button 
        className={currentFilter === 'all' ? 'active' : ''} 
        onClick={() => setFilter('all')}
      >
        All
      </button>

      <button 
        className={currentFilter === 'completed' ? 'active' : ''} 
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>

      <button 
        className={currentFilter === 'pending' ? 'active' : ''} 
        onClick={() => setFilter('pending')}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;