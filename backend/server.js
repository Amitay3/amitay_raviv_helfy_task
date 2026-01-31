const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); 

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});