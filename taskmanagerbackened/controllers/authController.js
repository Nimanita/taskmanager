const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  const { username, password , email } = req.body;
  try {
    const user = new User({ username, password , email});
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      // Duplicate username or email
      const field = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
      const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
      return res.status(400).json({ message , error });
    }
    res.status(400).json({ message: 'Signup Failed', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(username , password)
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

module.exports = { signup, login };
