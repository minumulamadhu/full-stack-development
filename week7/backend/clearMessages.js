const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);
(async () => {
  try {
    const result = await Message.deleteMany({});
    console.log(`All messages cleared. Deleted count: ${result.deletedCount}`);
  } catch (err) {
    console.error('Error clearing messages:', err);
  } finally {
    mongoose.disconnect();
  }
})();
