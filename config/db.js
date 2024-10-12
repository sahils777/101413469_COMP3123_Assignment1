const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from the .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected to Atlas');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
