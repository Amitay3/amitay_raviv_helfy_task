const express = require('express');
const router = express.Router();
const { validateTaskInput } = require('../middleware/validation');
const { 
  getTasks, 
  createTask, 
  updateTask, 
  toggleTaskStatus, 
  deleteTask 
} = require('../controllers/taskController');


// /api/tasks
router.get('/', getTasks);

// /api/tasks
router.post('/', validateTaskInput, createTask);

// /api/tasks/:id
router.put('/:id', validateTaskInput, updateTask);

// /api/tasks/:id/toggle
router.patch('/:id/toggle', toggleTaskStatus);

// /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;