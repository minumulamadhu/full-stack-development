import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios
        .get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUser(res.data.data))
        .catch(err => {
          console.error('Error fetching user:', err);
          setError(err.response?.data?.error || 'Unable to fetch user data');
          setIsAuthenticated(false);
        });
    }
  }, []);
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user);
      setError(null); // Clear error on success
      return true;
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      localStorage.setItem('token', res.data.token); // Save token
      setIsAuthenticated(true);
      setUser(res.data.user);
      setError(null); // Clear error on success
      return true;
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setError(null); // Clear error on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
