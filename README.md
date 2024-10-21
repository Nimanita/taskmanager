# Task Management App

A comprehensive task management application built with React, Redux, Node.js, Express.js, and MongoDB. This app allows users to create tasks, assign them to categories, and track their progress.

## Features

- User authentication (signup, login, logout)
- Create, view, edit, and delete tasks
- Categorize tasks
- Filter tasks by category and status
- Mark tasks as complete or in-progress
- Create and manage categories
- Calendar view for tasks with due dates
- Pagination for task list
- Responsive design
- bcrypt to hash passwords

## Tech Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```
2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. Start the backend server:
   ```
   cd backend
   npm start
   ```
5. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000` to access the application.

   
## API Endpoints

- **POST /api/auth/signup**: Create a new user account
- **POST /api/auth/login**: Authenticate user and get JWT token
- **GET /api/tasks**: Get all tasks for logged-in user
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/**: Update a task
- **DELETE /api/tasks/:id**: Delete a task
- **GET /api/categories**: Get all categories for logged-in user
- **POST /api/categories**: Create a new category

## Bonus Features Implemented

- Pagination for tasks view
- React frontend with Redux for state management
- JWT authentication
- Calendar view for tasks with due dates
- Deployed on render with MongoDB Atlas for backened
- Deployed on netlify for frontend

## Future Improvements

- Implement unit tests using Jest or Mocha
- Add email notifications for upcoming task due dates
- Implement task sharing between users
- Create mobile apps using React Native

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
