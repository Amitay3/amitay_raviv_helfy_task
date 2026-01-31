// Middleware to validate task input
const validateTaskInput = (req, res, next) => {
  const { title, priority } = req.body;

  // Check if title is provided and is a string
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ 
      error: 'Title is required and must be a non-empty string.' 
    });
  }

  // Check priority if provided (default is medium, but if one is sent, it must be valid)
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ 
      error: 'Priority must be either low, medium, or high.' 
    });
  }

  next();
};

module.exports = { validateTaskInput };