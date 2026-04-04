import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Dual Dreams Portfolio Backend API is Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
