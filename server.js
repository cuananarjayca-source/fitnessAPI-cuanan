require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Import CORS
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Connect to Database
connectDB();

// Initialize Express framework
const app = express();

// Global Middleware
app.use(cors()); // 2. Enable CORS for all incoming requests
app.use(express.json()); // Parse JSON bodies



// Mount routes here
app.use('/users', authRoutes);
app.use('/workouts', workoutRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Fitness API' });
});

// Define the port (Aligned to your .env setup)
const PORT = process.env.PORT || 4001;
console.log("Environment Port:", process.env.PORT);
console.log("Listening Port:", PORT);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
