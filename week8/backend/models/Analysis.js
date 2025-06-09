const mongoose = require('mongoose');
const analysisSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Analysis', analysisSchema);
