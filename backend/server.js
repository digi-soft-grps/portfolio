import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: [
    "https://portfolio-git-main-digisofts-projects-f9ffcae3.vercel.app",
    "https://portfolio-admindz.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.CLIENT_URL,
    process.env.ADMIN_URL
  ].filter(Boolean),
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Database Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Dual Dreams Portfolio Backend API is Running');
});

// API Status Endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "API is working 🚀"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
