const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();
router
  .route('/')
  .get(getBlogs)
  .post(protect, createBlog);
router
  .route('/:id')
  .get(getBlog)
  .put(protect, updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);
module.exports = router;