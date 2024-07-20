const express = require('express');
const auth = require('../middleware/auth');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route example
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'You have access to this protected route' });
});

module.exports = router;
