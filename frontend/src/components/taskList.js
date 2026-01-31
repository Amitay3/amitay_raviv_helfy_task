import React, { useState } from 'react';
import TaskItem from './taskItem';
import './taskList.css';

// Renders an infinite carousel of tasks with navigation and animations
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="empty-state-modern">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  const len = tasks.length;

  // Cycles forward through the task array
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % len);
  };

  // Cycles backward through the task array
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + len) % len);
  };

  // Determines CSS class
  const getCardClass = (index) => {
    if (index === activeIndex) return 'active';
    if (index === (activeIndex + 1) % len) return 'next';
    if (index === (activeIndex - 1 + len) % len) return 'prev';
    return 'hidden';
  };

  return (
    <div className="modern-carousel-wrapper">
      <button className="carousel-nav prev" onClick={prevSlide}>&#10094;</button>

      <div className="carousel-stage">
        {tasks.map((task, index) => {
          const positionClass = getCardClass(index);
          
          return (
            <div 
              key={task.id} 
              className={`carousel-card ${positionClass}`}
            >
              <TaskItem 
                task={task} 
                onToggle={onToggle} 
                onDelete={onDelete} 
                onEdit={onEdit} 
              />
              {positionClass !== 'active' && (
                <div 
                  className="overlay-blocker" 
                  onClick={positionClass === 'next' ? nextSlide : prevSlide}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      <button className="carousel-nav next" onClick={nextSlide}>&#10095;</button>

      <div className="modern-indicators">
        {tasks.map((_, idx) => (
          <span 
            key={idx} 
            className={`modern-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;