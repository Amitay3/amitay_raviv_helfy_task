// In-memory data storage
let tasks = [];
let currentId = 1;

// Returns the full list of tasks currently in memory
const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

// Creates a new task with default values for optional fields
const createTask = (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const newTask = {
    id: currentId++, // Assign ID and increment counter
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false, // Default status is always pending
    createdAt: new Date(),
    dueDate: dueDate ? new Date(dueDate) : null,
    priority: priority || 'medium' // Default priority
  };

  tasks.push(newTask);
  res.status(201).json(newTask); // 201 Created
};

// Updates an existing task. Uses partial updates (keeps existing data if new data is missing)
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, priority, completed, dueDate } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Merge Strategy: Use the new value if provided, otherwise fall back to the existing value.
  // This prevents overwriting existing data with 'undefined' if the frontend only sends partial data.
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ? title.trim() : tasks[taskIndex].title,
    description: description !== undefined ? description.trim() : tasks[taskIndex].description,
    priority: priority || tasks[taskIndex].priority,
    completed: typeof completed === 'boolean' ? completed : tasks[taskIndex].completed,
    dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : tasks[taskIndex].dueDate
  };

  res.status(200).json(tasks[taskIndex]);
};

// A specialized endpoint just to flip the 'completed' boolean
const toggleTaskStatus = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Toggle the logic
  task.completed = !task.completed;
  res.status(200).json(task);
};

// Removes the task from the array based on ID
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully', task: deletedTask[0] });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
};