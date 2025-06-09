import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog, getBlog, updateBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await getBlog(id);
          const blog = response.data;
          
          // Make sure current user is the author
          if (isAuthenticated && user && user._id === blog.author._id) {
            setFormData({
              title: blog.title,
              content: blog.content
            });
          } else {
            setError('You are not authorized to edit this blog');
          }
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch blog');
          setLoading(false);
        }
      };
      
      fetchBlog();
    }
  }, [id, isAuthenticated, user]);

  const { title, content } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Validate input
    if (!title || !content) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEdit) {
        await updateBlog(id, formData);
        navigate(`/blogs/${id}`);
      } else {
        const response = await createBlog(formData);
        navigate(`/blogs/${response.data._id}`);
      }
    } catch (err) {
      setError('Failed to save blog');
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="blog-form">
      <h1>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={title}
            onChange={onChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']
              ]
            }}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;