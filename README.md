# School Management System Backend

This is the backend for the School Management System. It is built using Node.js, Express, and MongoDB, providing a RESTful API for managing schools, classrooms, students, and user authentication.

## Features
- JWT-based authentication and authorization
- Role-based access control (Superadmin and Schooladmin)
- CRUD operations for schools, classrooms, and students
- Middleware for authentication and input validation
- Secure password handling with bcrypt
- RESTful API design

## Prerequisites
Make sure you have the following installed:
- Node.js (>=14.x)
- npm (comes with Node.js)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-username/school-management-backend.git
cd school-management-backend
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

Replace `your_mongodb_connection_string` and `your_secret_key` with your MongoDB connection string and a secure secret key.

### Run the Server
```bash
npm start
```

The backend will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login and get a JWT token

### Users (Superadmin only)
- `POST /api/users`: Create a new user (Superadmin or Schooladmin)
- `GET /api/users`: Get all users
- `PUT /api/users/:userId`: Update user details
- `DELETE /api/users/:userId`: Delete a user

### Schools (Superadmin only)
- `POST /api/schools`: Create a new school
- `GET /api/schools`: Get all schools
- `GET /api/schools/:schoolId`: Get details of a specific school
- `PUT /api/schools/:schoolId`: Update school details
- `DELETE /api/schools/:schoolId`: Delete a school

### Classrooms (Superadmin , Schooladmin)
- `POST /api/classrooms`: Create a new classroom
- `GET /api/classrooms`: Get all classrooms for the authenticated school
- `GET /api/classrooms/:classroomId`: Get details of a specific classroom
- `PUT /api/classrooms/:classroomId`: Update classroom details
- `DELETE /api/classrooms/:classroomId`: Delete a classroom

### Students (Superadmin , Schooladmin)
- `POST /api/students`: Add a new student
- `GET /api/students`: Get all students for the authenticated school
- `GET /api/students/:studentId`: Get details of a specific student
- `PUT /api/students/:studentId`: Update student details
- `DELETE /api/students/:studentId`: Remove a student



## Scripts

### Start the Development Server
```bash
npm start
```

### Run in Development Mode with Nodemon
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

## Deployment
To deploy the backend, use services like Heroku, AWS, or Azure. Ensure environment variables are correctly set in the deployment environment.

```bash
npm start
```

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

## Frontend Acknowledgements
- React
- Axios
- React Router DOM
