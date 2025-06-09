import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to Blog CMS</h1>
        <p>A simple blog content management system with authentication and role-based access control</p>
        <div className="home-buttons">
          <Link to="/blogs" className="btn btn-primary">
            View Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;