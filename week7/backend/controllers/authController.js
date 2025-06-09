const User = require('../models/User');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'User registration failed' });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'User login failed' });
  }
};
