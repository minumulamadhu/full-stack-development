const Message = require('../models/Message');
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
exports.postMessage = async (req, res) => {
  try {
    const { sender, content } = req.body;
    const message = await Message.create({ sender, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Failed to send message' });
  }
};
