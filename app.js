const express = require('express');
const cors = require('cors')
require('dotenv').config();

const { connectDB } = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoute');
const classroomRoutes = require('./routes/classRoute');
const studentRoutes = require('./routes/studeRoute');
const { authMiddleware } = require('./middleware/auth');

const app = express();

app.use(express.json()); 

// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  };
  
  app.use(cors(corsOptions));
connectDB();


app.use('/api/users', userRoutes);
app.use('/api/schools', authMiddleware, schoolRoutes);
app.use('/api/classrooms', authMiddleware, classroomRoutes);
app.use('/api/students', authMiddleware, studentRoutes);

module.exports = app;
