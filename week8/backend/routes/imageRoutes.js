const express = require('express');
const multer = require('multer');
const { uploadImage, getResults } = require('../controllers/analysisController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('image'), uploadImage);
router.get('/results', getResults);
module.exports = router;
