const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const config = require('../config');


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email' });
      }

      const hashedPasswordCheck = await bcrypt.hash(password, 10);
      console.log(hashedPasswordCheck, password, user.password);
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: password + 'Invalid password' +user.password});
      }
  
      // Generate a JWT token (if you're using JWT for authentication)
      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.JWT_SECRET, // Use your secret key here
        { expiresIn: '1h' } // Token expiry
      );
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { registerUser, loginUser };
