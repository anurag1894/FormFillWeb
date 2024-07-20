const express = require('express');
const router = express.Router();
const { createForm, getFormById, submitForm, getAllForms} = require('../controllers/formController');
const auth = require('../middleware/auth');

// Route to create a new form
router.post('/', auth, createForm);

// Route to get a specific form by ID
router.get('/:id', auth, getFormById);

router.get('/', auth, getAllForms);
// Route to submit form responses
router.post('/submit/:id', auth, submitForm);

module.exports = router;
