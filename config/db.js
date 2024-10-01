// server/config/db.js
const mongoose = require('mongoose');

// Replace 'your_mongo_uri' with your actual MongoDB connection string
const mongoURI = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/fileUploadApp"; // Use environment variable or fallback to default

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
