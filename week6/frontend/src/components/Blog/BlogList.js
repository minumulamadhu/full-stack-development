import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="blog-list-container">
      <h1>Blogs</h1>
      {isAuthenticated && (
        <Link to="/create-blog" className="btn btn-primary mb-3">
          Create New Blog
        </Link>
      )}
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <div className="blog-list">
          {blogs.map(blog => (
            <div key={blog._id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>
                <small>
                  By {blog.author?.username || 'Unknown'} on{' '}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </small>
              </p>
              <div className="blog-content-preview">
                {blog.content.length > 150
                  ? `${blog.content.substring(0, 150)}...`
                  : blog.content}
              </div>
              <div className="blog-card-footer">
                <br/>
                <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
                  Read More
                </Link>
                {isAuthenticated && user && user._id === blog.author?._id && (
                  <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary ml-2">
                    Edit
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
