const Form = require('../models/Forms');

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const form = new Form({ title, fields, user: req.user.id });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    console.error('Create Form Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    console.error('Get Form Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit form responses
const submitForm = async (req, res) => {
  const { name, email, responses } = req.body;
  try {
    // Handle form submission logic here
    // Example: Save responses to a database or process them
    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Submit Form Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllForms = async (req, res) => {
  try {
    console.log(req.user.id);
    const forms = await Form.find({ user: req.user.id });
    res.json(forms);
  } catch (error) {
    console.error('Get All Forms Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createForm, getFormById, submitForm, getAllForms };
