import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const Header = () => {
  const { isAuthenticated, logout, user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate('/');
  };
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span className="nav-username">
          {user && `Welcome, ${user.username}`}
        </span>
      </li>
      <li className="nav-item">
        <Link to="/create-blog" className="nav-link">
          Create Blog
        </Link>
      </li>
      <li className="nav-item">
        <button onClick={onLogout} className="btn btn-link nav-link">
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Blog CMS
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
