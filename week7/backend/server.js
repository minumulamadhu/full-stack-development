const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const httpServer = createServer(app);
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST']
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(' MongoDB connection error:', error));
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/messages', (req, res) => {
  res.status(405).json({ message: 'Direct POST disabled. Use socket connection.' });
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: '*',  
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('sendMessage', async (messageData) => {
    console.log('Received message:', messageData);
    try {
      const message = new Message({
        username: messageData.username,
        text: messageData.text
      });
      await message.save();
      io.emit('receiveMessage', message);
    } catch (error) {
      console.error('Error saving message:', error.message);
    }
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
