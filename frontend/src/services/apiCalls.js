// Service module handling all HTTP requests for task management operations
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks';

export const fetchTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const toggleTaskCompletion = (id) => axios.patch(`${API_URL}/${id}/toggle`);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);