# Task Manager App

A React-based task manager featuring a custom 3D infinite carousel, live search, and smooth animations.

## Setup & Execution

**1. Backend**
Navigate to the backend folder to install dependencies and start the backend server.

    cd backend
    npm install
    npm start
    # Runs on http://localhost:4000 

**2. Frontend**
Open a new terminal, navigate to the frontend folder, and start the React app.

    cd frontend
    npm install
    npm start
    # Runs on http://localhost:3000

## API Documentation

Base URL: http://localhost:4000/api/tasks

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| GET | / | Get all tasks | - |
| POST | / | Create task | { title, description, priority, dueDate } |
| PUT | /:id | Update task | { title, description, priority, completed, dueDate } |
| PATCH | /:id/toggle | Toggle status | - |
| DELETE | /:id | Delete task | - |

## Time Spent

* **Backend & API Setup:** 1.5 hours
* **Frontend Core & State:** 1 hour
* **Carousel Implementation (Logic + CSS), and styling overall:** 1 hours
* **Testing and Debugging:** 30 minutes 
