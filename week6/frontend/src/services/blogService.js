import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const authAxios = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data.data;
};
export const getBlog = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data.data;
};
export const createBlog = async (blogData) => {
  const response = await authAxios().post(`${API_URL}/blogs`, blogData);
  return response.data.data;
};
export const updateBlog = async (id, blogData) => {
  const response = await authAxios().put(`${API_URL}/blogs/${id}`, blogData);
  return response.data.data;
};
export const deleteBlog = async (id) => {
  const response = await authAxios().delete(`${API_URL}/blogs/${id}`);
  return response.data;
};
