const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // Ensure dotenv is imported correctly
const connectDB = require('./config/db');

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the connectDB function
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
  process.exit(1);
});
