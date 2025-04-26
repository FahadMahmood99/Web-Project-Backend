const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, country, phone_number } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // Password is hashed automatically via User model's `pre('save')`
      country,
      phone_number,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      is_onboarded: user.is_onboarded,
      token, // Send token to client
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Include password (hidden by default)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response with token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      is_onboarded: user.is_onboarded,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};