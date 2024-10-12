const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to handle JSON
app.use(express.json());

// Logger middleware
app.use(logger);

// Define Routes
app.use('/api/v1/user', require('./routes/user'));  // User routes
app.use('/api/v1/emp', require('./routes/employee'));

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
