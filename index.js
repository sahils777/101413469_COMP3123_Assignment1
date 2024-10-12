require('dotenv').config(); // Load environment variables from .env file

const app = require('./server'); // Import the express app from server.js

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file.');
    process.exit(1); // Exit the process if MONGO_URI is not set
}

// Define the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

// Optional: Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
        process.exit(1); // Exit the process on unhandled promise rejection
    });
});
