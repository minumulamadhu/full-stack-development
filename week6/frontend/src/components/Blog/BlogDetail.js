import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlog, deleteBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin } = useContext(AuthContext);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlog(id);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);
  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      navigate('/blogs');
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const isAuthor = isAuthenticated && user && user._id === blog.author._id;
  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin();

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <div className="blog-meta">
        <p>
          <small>
            By {blog.author.username} on{' '}
            {new Date(blog.createdAt).toLocaleDateString()}
          </small>
        </p>
      </div>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      
      <div className="blog-actions">
        <Link to="/blogs" className="btn btn-secondary">
          Back to Blogs
        </Link>
        
        {canEdit && (
          <Link to={`/edit-blog/${blog._id}`} className="btn btn-primary ml-2">
            Edit
          </Link>
        )}
        
        {canDelete && (
          <>
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="btn btn-danger ml-2"
              >
                Delete
              </button>
            ) : (
              <div className="delete-confirm">
                <p>Are you sure you want to delete this blog?</p>
                <button onClick={handleDelete} className="btn btn-danger">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="btn btn-secondary ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
