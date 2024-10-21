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
   git clone https://github.com/Nimanita/taskmanager.git
   cd taskmanager
   ```
2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd taskmanagerbackened
   npm install

   # Install frontend dependencies
   cd taskmanagerfrontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `taskmanagerbackened` directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     FRONTEND_URL=your_frontend_url  
     ```
4. Set up environment variables:
   - Create a `.env` file in the `taskmanagerfrontend` directory
   - Add the following variables:
     ```
     VITE_APP_VERSION=v1.3.0
     GENERATE_SOURCEMAP=false
     VITE_APP_BASE_NAME=/
     VITE_APP_API_URL=https://localhost:5000
     ```
5. Start the backend server:
   ```
   cd taskmanagerbackened
   node app.js
   ```
6. Start the frontend development server:
   ```
   cd taskmanagerfrontend
   npm start
   ```
7. Open your browser and navigate to `http://localhost:3000` to access the application.If it is not running on port 3000 than access it wherever it is running

   
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
