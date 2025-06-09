const fs = require('fs');
const axios = require('axios');
const path = require('path');
const uploadImage = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base',
      imageBuffer,
      {
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_TOKEN}`,
          'Content-Type': 'application/octet-stream'
        }
      }
    );
    const caption = response.data[0]?.generated_text || 'No caption generated';
    res.json({ caption });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Image processing failed');
  }
};
const getResults = (req, res) => {
  res.json({ message: 'GET /results is not implemented in Hugging Face mode' });
};
module.exports = { uploadImage, getResults };
