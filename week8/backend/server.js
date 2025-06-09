const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes'); 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('Welcome to the AI Image Recognition API!');
});
app.use('/api', imageRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});