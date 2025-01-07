import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleError } from './utils/errorHandler.js';
import studentRouter from './routers/student.js';
import teacherRouter from './routers/teacher.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('MongoDB connection error:', err));


// Error handling middleware
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
