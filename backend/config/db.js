const mongoose = require('mongoose');
const config = require('../config'); // Import the configuration file

const connectDB = async () => {
  try {
    console.log('MONGO_URI:', config.MONGO_URI); // Log MONGO_URI for debugging

    const conn = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
