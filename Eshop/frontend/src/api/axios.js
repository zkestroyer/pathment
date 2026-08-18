import axios from 'axios';
import { server } from '../server.js';

const API = axios.create({
  baseURL: server,
  withCredentials: true,
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
