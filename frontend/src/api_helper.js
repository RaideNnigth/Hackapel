// src/services/api.js
import axios from 'axios';

const api_url = 'http://localhost:3000';

// Create an instance
const api = axios.create({
  baseURL: api_url,
});

// Request Interceptor: Automatically adds the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;